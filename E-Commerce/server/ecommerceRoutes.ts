import { Router, Request, Response } from 'express';
import { INITIAL_PRODUCTS, AVAILABLE_COUPONS } from '../src/data/seedProducts';
import { Product, Order, AdminAnalytics, Coupon } from '../src/types/ecommerce';

export const ecommerceRouter = Router();

// In-memory state simulating a persistent MongoDB collection
let products: Product[] = JSON.parse(JSON.stringify(INITIAL_PRODUCTS));

let orders: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'ORD-98241',
    customerName: 'Sarah Jenkins',
    customerEmail: 'sarah.j@example.com',
    shippingAddress: {
      fullName: 'Sarah Jenkins',
      email: 'sarah.j@example.com',
      address: '742 Evergreen Terrace',
      city: 'Austin',
      postalCode: '78701',
      country: 'United States'
    },
    items: [
      {
        productId: 'prod-1',
        name: 'ApexStudio Pro Noise-Cancelling Headphones',
        price: 249,
        quantity: 1,
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
      }
    ],
    subtotal: 249,
    discount: 0,
    tax: 20.54,
    shippingFee: 0,
    total: 269.54,
    paymentMethod: 'stripe',
    paymentStatus: 'paid',
    status: 'delivered',
    createdAt: '2026-09-02T10:30:00Z'
  },
  {
    id: 'ord-1002',
    orderNumber: 'ORD-98242',
    customerName: 'Marcus Vance',
    customerEmail: 'marcus.v@example.com',
    shippingAddress: {
      fullName: 'Marcus Vance',
      email: 'marcus.v@example.com',
      address: '120 Market St, Suite 400',
      city: 'San Francisco',
      postalCode: '94105',
      country: 'United States'
    },
    items: [
      {
        productId: 'prod-2',
        name: 'KeyCraft Pro 75% Wireless Mechanical Keyboard',
        price: 179,
        quantity: 1,
        imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80'
      },
      {
        productId: 'prod-6',
        name: 'AeroStand CNC Solid Walnut & Aluminum Laptop Dock',
        price: 69,
        quantity: 1,
        imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80'
      }
    ],
    subtotal: 248,
    discount: 49.6,
    tax: 16.37,
    shippingFee: 0,
    total: 214.77,
    couponApplied: 'MERN20',
    paymentMethod: 'credit_card',
    paymentStatus: 'paid',
    status: 'shipped',
    createdAt: '2026-09-05T16:15:00Z'
  }
];

// 1. GET /api/ecommerce/products - with search, category filtering & sorting
ecommerceRouter.get('/products', (req: Request, res: Response) => {
  const { category, search, sort, inStockOnly } = req.query;

  let result = [...products];

  if (category && category !== 'All') {
    result = result.filter(p => p.category.toLowerCase() === String(category).toLowerCase());
  }

  if (search) {
    const q = String(search).toLowerCase();
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  if (inStockOnly === 'true') {
    result = result.filter(p => p.stock > 0);
  }

  if (sort === 'price_asc') {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === 'price_desc') {
    result.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    result.sort((a, b) => b.rating - a.rating);
  } else {
    // Default newest / featured
    result.sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0));
  }

  res.json({
    success: true,
    count: result.length,
    products: result
  });
});

// 2. GET /api/ecommerce/products/:id
ecommerceRouter.get('/products/:id', (req: Request, res: Response) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, error: 'Product not found' });
  }
  res.json({ success: true, product });
});

// 3. POST /api/ecommerce/products - Admin add product
ecommerceRouter.post('/products', (req: Request, res: Response) => {
  try {
    const { name, tagline, description, price, category, imageUrl, stock, badge, features, specs } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ success: false, error: 'Name, price, and category are required.' });
    }

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name,
      tagline: tagline || `${category} Innovation for Modern Workflows`,
      description: description || 'High-quality engineered tech product designed for durability and performance.',
      price: Number(price),
      originalPrice: req.body.originalPrice ? Number(req.body.originalPrice) : undefined,
      category,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
      additionalImages: req.body.additionalImages || [],
      stock: Number(stock) >= 0 ? Number(stock) : 10,
      rating: 5.0,
      reviewCount: 1,
      badge: badge || undefined,
      features: features && features.length ? features : ['Engineered with premium materials', '1-year manufacturer warranty', 'Eco-conscious packaging'],
      specs: specs || { 'Warranty': '12 Months', 'Status': 'Ready to Ship' },
      createdAt: new Date().toISOString()
    };

    products.unshift(newProduct);
    res.status(201).json({ success: true, product: newProduct });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. PUT /api/ecommerce/products/:id - Admin update product/stock
ecommerceRouter.put('/products/:id', (req: Request, res: Response) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Product not found' });
  }

  const updated = {
    ...products[index],
    ...req.body,
    price: req.body.price !== undefined ? Number(req.body.price) : products[index].price,
    stock: req.body.stock !== undefined ? Number(req.body.stock) : products[index].stock
  };

  products[index] = updated;
  res.json({ success: true, product: updated });
});

// 5. DELETE /api/ecommerce/products/:id - Admin delete product
ecommerceRouter.delete('/products/:id', (req: Request, res: Response) => {
  const exists = products.some(p => p.id === req.params.id);
  if (!exists) {
    return res.status(404).json({ success: false, error: 'Product not found' });
  }

  products = products.filter(p => p.id !== req.params.id);
  res.json({ success: true, message: 'Product removed from database' });
});

// 6. POST /api/ecommerce/apply-coupon
ecommerceRouter.post('/apply-coupon', (req: Request, res: Response) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ success: false, error: 'Coupon code is required' });
  }

  const coupon = AVAILABLE_COUPONS.find(c => c.code.toUpperCase() === String(code).trim().toUpperCase());
  if (!coupon) {
    return res.status(404).json({ success: false, error: 'Invalid coupon code. Try MERN20 or DEV10' });
  }

  res.json({ success: true, coupon });
});

// 7. POST /api/ecommerce/checkout - Simulated Stripe Checkout session & order creation
ecommerceRouter.post('/checkout', (req: Request, res: Response) => {
  try {
    const { items, shippingAddress, couponCode, paymentMethod } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ success: false, error: 'Cart is empty' });
    }

    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.email) {
      return res.status(400).json({ success: false, error: 'Shipping details are required' });
    }

    // Calculate subtotal
    let subtotal = 0;
    const orderItems = items.map((item: any) => {
      const liveProduct = products.find(p => p.id === item.productId);
      const price = liveProduct ? liveProduct.price : item.price;
      subtotal += price * item.quantity;

      // Decrement stock in database
      if (liveProduct && liveProduct.stock >= item.quantity) {
        liveProduct.stock -= item.quantity;
      }

      return {
        productId: item.productId,
        name: item.name,
        price,
        quantity: item.quantity,
        imageUrl: item.imageUrl
      };
    });

    // Calculate discount
    let discount = 0;
    if (couponCode) {
      const coupon = AVAILABLE_COUPONS.find(c => c.code.toUpperCase() === couponCode.toUpperCase());
      if (coupon) {
        discount = (subtotal * coupon.discountPercent) / 100;
      }
    }

    const discountedSubtotal = Math.max(0, subtotal - discount);
    const tax = Number((discountedSubtotal * 0.0825).toFixed(2));
    const shippingFee = discountedSubtotal > 150 ? 0 : 15;
    const total = Number((discountedSubtotal + tax + shippingFee).toFixed(2));

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      customerName: shippingAddress.fullName,
      customerEmail: shippingAddress.email,
      shippingAddress,
      items: orderItems,
      subtotal: Number(subtotal.toFixed(2)),
      discount: Number(discount.toFixed(2)),
      tax,
      shippingFee,
      total,
      couponApplied: couponCode || undefined,
      paymentMethod: paymentMethod || 'stripe',
      paymentStatus: 'paid',
      status: 'processing',
      createdAt: new Date().toISOString()
    };

    orders.unshift(newOrder);

    res.status(201).json({
      success: true,
      message: 'Payment verified and order successfully created',
      order: newOrder
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 8. GET /api/ecommerce/orders - Admin/Customer Orders list
ecommerceRouter.get('/orders', (req: Request, res: Response) => {
  res.json({
    success: true,
    count: orders.length,
    orders
  });
});

// 9. PATCH /api/ecommerce/orders/:id/status - Update fulfillment status
ecommerceRouter.patch('/orders/:id/status', (req: Request, res: Response) => {
  const { status } = req.body;
  const order = orders.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, error: 'Order not found' });
  }

  if (['processing', 'shipped', 'delivered', 'cancelled'].includes(status)) {
    order.status = status;
    return res.json({ success: true, order });
  }

  res.status(400).json({ success: false, error: 'Invalid order status' });
});

// 10. GET /api/ecommerce/analytics - Dashboard metrics
ecommerceRouter.get('/analytics', (req: Request, res: Response) => {
  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'paid' ? o.total : 0), 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const lowStockCount = products.filter(p => p.stock <= 5).length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Group sales by category
  const catMap: Record<string, { sales: number; count: number }> = {};
  orders.forEach(o => {
    o.items.forEach(item => {
      const prod = products.find(p => p.id === item.productId);
      const cat = prod ? prod.category : 'Tech Gear';
      if (!catMap[cat]) {
        catMap[cat] = { sales: 0, count: 0 };
      }
      catMap[cat].sales += item.price * item.quantity;
      catMap[cat].count += item.quantity;
    });
  });

  const salesByCategory = Object.entries(catMap).map(([category, data]) => ({
    category,
    sales: Number(data.sales.toFixed(2)),
    count: data.count
  }));

  const analytics: AdminAnalytics = {
    totalRevenue: Number(totalRevenue.toFixed(2)),
    totalOrders,
    totalProducts,
    lowStockCount,
    averageOrderValue: Number(averageOrderValue.toFixed(2)),
    salesByCategory,
    recentOrders: orders.slice(0, 5)
  };

  res.json({ success: true, analytics });
});

// 11. POST /api/ecommerce/reset-demo - Quick reset demo data
ecommerceRouter.post('/reset-demo', (req: Request, res: Response) => {
  products = JSON.parse(JSON.stringify(INITIAL_PRODUCTS));
  res.json({ success: true, message: 'Database reset to initial demo products' });
});

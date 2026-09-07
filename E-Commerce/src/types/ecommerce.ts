export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'Audio' | 'Workstation' | 'Wearables' | 'Smart Home' | 'Developer Gear';
  imageUrl: string;
  additionalImages?: string[];
  stock: number;
  rating: number;
  reviewCount: number;
  badge?: 'Best Seller' | 'New' | 'Sale' | 'Featured';
  features: string[];
  specs: Record<string, string>;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: ShippingAddress;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  tax: number;
  shippingFee: number;
  total: number;
  couponApplied?: string;
  paymentMethod: 'credit_card' | 'stripe' | 'apple_pay';
  paymentStatus: 'paid' | 'pending' | 'failed';
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

export interface AdminAnalytics {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  lowStockCount: number;
  averageOrderValue: number;
  salesByCategory: { category: string; sales: number; count: number }[];
  recentOrders: Order[];
}

export interface Coupon {
  code: string;
  discountPercent: number;
  description: string;
}

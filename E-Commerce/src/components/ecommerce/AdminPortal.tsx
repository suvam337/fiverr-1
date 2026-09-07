import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  ShoppingBag,
  Package,
  AlertTriangle,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  RefreshCw,
  Clock,
  Terminal,
  Code2,
  ExternalLink,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { Product, Order, AdminAnalytics } from '../../types/ecommerce';

interface AdminPortalProps {
  onBackToStore: () => void;
  onRefreshTrigger: () => void;
}

export function AdminPortal({ onBackToStore, onRefreshTrigger }: AdminPortalProps) {
  const [activeSubTab, setActiveSubTab] = useState<'inventory' | 'orders' | 'api_architecture'>('inventory');
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Product Form State
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<Product['category']>('Developer Gear');
  const [newProdPrice, setNewProdPrice] = useState('149');
  const [newProdStock, setNewProdStock] = useState('15');
  const [newProdImage, setNewProdImage] = useState('https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80');
  const [newProdTagline, setNewProdTagline] = useState('High-performance developer workspace accessory');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchAdminData = async () => {
    setIsLoading(true);
    try {
      const [prodRes, orderRes, analyticsRes] = await Promise.all([
        fetch('/api/ecommerce/products'),
        fetch('/api/ecommerce/orders'),
        fetch('/api/ecommerce/analytics'),
      ]);

      const [prodData, orderData, analyticsData] = await Promise.all([
        prodRes.json(),
        orderRes.json(),
        analyticsRes.json(),
      ]);

      if (prodData.products) setProducts(prodData.products);
      if (orderData.orders) setOrders(orderData.orders);
      if (analyticsData.analytics) setAnalytics(analyticsData.analytics);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleUpdateStock = async (productId: string, currentStock: number, delta: number) => {
    const newStock = Math.max(0, currentStock + delta);
    try {
      const res = await fetch(`/api/ecommerce/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stock: newStock }),
      });
      const data = await res.json();
      if (data.success) {
        setProducts(products.map(p => p.id === productId ? { ...p, stock: newStock } : p));
        onRefreshTrigger();
      }
    } catch (err) {
      console.error('Error updating stock:', err);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to remove this product from the database?')) return;
    try {
      const res = await fetch(`/api/ecommerce/products/${productId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setProducts(products.filter(p => p.id !== productId));
        onRefreshTrigger();
      }
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      const res = await fetch(`/api/ecommerce/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      }
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/ecommerce/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newProdName,
          category: newProdCategory,
          price: Number(newProdPrice),
          stock: Number(newProdStock),
          imageUrl: newProdImage,
          tagline: newProdTagline,
          description: 'A precision-built developer product engineered for maximum workflow comfort and longevity.',
          features: ['Engineered with aerospace materials', 'Plug-and-play setup', '1-year warranty'],
          specs: { 'Warranty': '12 Months', 'Shipment': 'Express Priority' }
        }),
      });

      const data = await res.json();
      if (data.success && data.product) {
        setProducts([data.product, ...products]);
        setIsAddModalOpen(false);
        setNewProdName('');
        onRefreshTrigger();
      }
    } catch (err) {
      console.error('Failed to create product:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetDemo = async () => {
    if (!confirm('Reset product database to initial seeds?')) return;
    await fetch('/api/ecommerce/reset-demo', { method: 'POST' });
    fetchAdminData();
    onRefreshTrigger();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-800 text-xs font-bold uppercase tracking-wider">
              Backend Controller & Database
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-mono">Express.js API + MongoDB Schema</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Admin Inventory & Order Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Manage live catalog inventory, inspect real-time customer orders, and verify RESTful CRUD operations.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchAdminData}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Sync Data</span>
          </button>
          <button
            onClick={handleResetDemo}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
          >
            Reset Seed Data
          </button>
          <button
            onClick={onBackToStore}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs cursor-pointer"
          >
            Go to Storefront →
          </button>
        </div>
      </div>

      {/* Analytics KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Gross Revenue</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900">
            ${analytics ? analytics.totalRevenue.toFixed(2) : '484.31'}
          </div>
          <div className="mt-1 text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>Simulated Stripe settlements</span>
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Total Orders</span>
            <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900">
            {orders.length}
          </div>
          <div className="mt-1 text-[11px] text-slate-500">
            Live fulfilled customer orders
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Active Products</span>
            <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900">
            {products.length}
          </div>
          <div className="mt-1 text-[11px] text-slate-500">
            5 categories cataloged
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Low Stock Items</span>
            <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-amber-600">
            {products.filter(p => p.stock <= 8).length}
          </div>
          <div className="mt-1 text-[11px] text-slate-500">
            Stock reorder threshold ≤ 8
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-6">
        <button
          onClick={() => setActiveSubTab('inventory')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'inventory'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Package className="w-4 h-4" />
          Product Inventory ({products.length})
        </button>
        <button
          onClick={() => setActiveSubTab('orders')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'orders'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          Live Orders ({orders.length})
        </button>
        <button
          onClick={() => setActiveSubTab('api_architecture')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'api_architecture'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Code2 className="w-4 h-4" />
          REST API & MERN Architecture
        </button>
      </div>

      {/* SUB-TAB 1: PRODUCT INVENTORY TABLE */}
      {activeSubTab === 'inventory' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm text-slate-800">
              Live Catalog Database Collection (`products`)
            </h3>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Product</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3 px-4">Item</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Unit Price</th>
                    <th className="py-3 px-4">Stock Level</th>
                    <th className="py-3 px-4">Rating</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                          />
                          <div>
                            <span className="font-bold text-slate-900 block line-clamp-1 max-w-xs">
                              {product.name}
                            </span>
                            <span className="text-[11px] text-slate-400 font-mono">
                              ID: {product.id}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                          {product.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        ${product.price}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-semibold ${
                              product.stock > 8
                                ? 'text-emerald-700'
                                : product.stock > 0
                                ? 'text-amber-700'
                                : 'text-rose-600'
                            }`}
                          >
                            {product.stock} units
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleUpdateStock(product.id, product.stock, -1)}
                              className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold cursor-pointer"
                              title="Decrease stock -1"
                            >
                              -
                            </button>
                            <button
                              onClick={() => handleUpdateStock(product.id, product.stock, 5)}
                              className="w-5 h-5 rounded bg-emerald-100 hover:bg-emerald-200 text-emerald-800 flex items-center justify-center font-bold cursor-pointer"
                              title="Restock +5"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-700">
                        ★ {product.rating.toFixed(1)} ({product.reviewCount})
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                          title="Delete from DB"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: ORDERS MANAGEMENT */}
      {activeSubTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm text-slate-800">
              Customer Orders Log (`orders` collection)
            </h3>
            <span className="text-xs text-slate-500 font-mono">
              Live state updated on checkout
            </span>
          </div>

          <div className="space-y-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono font-bold text-slate-900 text-sm">
                      {order.orderNumber}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                        order.status === 'delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : order.status === 'shipped'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {order.status}
                    </span>
                    <span className="text-slate-400 text-xs">•</span>
                    <span className="text-xs text-slate-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mt-1">
                    Customer: <strong className="text-slate-800">{order.customerName}</strong> ({order.customerEmail})
                    • Destination: {order.shippingAddress.city}, {order.shippingAddress.country}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {order.items.map((item, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-700"
                      >
                        <img src={item.imageUrl} alt="" className="w-3.5 h-3.5 rounded object-cover" />
                        <span>{item.quantity}x {item.name}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 justify-between md:justify-end border-t md:border-t-0 pt-2 md:pt-0 border-slate-100">
                  <div className="text-right">
                    <div className="text-base font-extrabold text-slate-900">
                      ${order.total.toFixed(2)}
                    </div>
                    <div className="text-[11px] text-emerald-600 font-semibold uppercase">
                      Stripe Paid
                    </div>
                  </div>

                  {/* Status update controller */}
                  <select
                    value={order.status}
                    onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as any)}
                    className="px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none focus:border-indigo-600"
                  >
                    <option value="processing">Mark Processing</option>
                    <option value="shipped">Mark Shipped</option>
                    <option value="delivered">Mark Delivered</option>
                    <option value="cancelled">Cancel Order</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: MERN ARCHITECTURE & REST API */}
      {activeSubTab === 'api_architecture' && (
        <div className="space-y-6">
          {/* Visual Architecture Diagram */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl">
            <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              MERN Stack Architecture Data Flow
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              How this application routes state and data between the React 19 client and Express/Node.js backend:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700">
                <div className="text-xs font-bold text-indigo-400 uppercase">1. Client Layer</div>
                <div className="text-base font-black text-white mt-1">React 19 + Tailwind</div>
                <p className="text-xs text-slate-400 mt-2">
                  Client components, responsive cart state, dynamic catalog filtering, and Stripe modal.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700">
                <div className="text-xs font-bold text-emerald-400 uppercase">2. API Router</div>
                <div className="text-base font-black text-white mt-1">Express.js Engine</div>
                <p className="text-xs text-slate-400 mt-2">
                  RESTful routing (`/api/ecommerce/*`), input sanitization, and coupon discount logic.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700">
                <div className="text-xs font-bold text-amber-400 uppercase">3. Business Logic</div>
                <div className="text-base font-black text-white mt-1">Node.js Runtime</div>
                <p className="text-xs text-slate-400 mt-2">
                  Inventory validation, auto stock decrementing, tax calculations, and order creation.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700">
                <div className="text-xs font-bold text-rose-400 uppercase">4. Data Store</div>
                <div className="text-base font-black text-white mt-1">MongoDB Document Schemas</div>
                <p className="text-xs text-slate-400 mt-2">
                  Collections for `products`, `orders`, `categories`, and `reviews` with timestamps.
                </p>
              </div>
            </div>
          </div>

          {/* Endpoints Table */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <h4 className="font-bold text-sm text-slate-900 mb-3">
              REST Endpoints Implemented
            </h4>
            <div className="space-y-2 font-mono text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold mr-2">GET</span>
                  <span className="text-slate-800">/api/ecommerce/products?category=&search=&sort=</span>
                </div>
                <span className="text-[11px] text-slate-500">Fetch catalog with filters</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold mr-2">POST</span>
                  <span className="text-slate-800">/api/ecommerce/checkout</span>
                </div>
                <span className="text-[11px] text-slate-500">Stripe payment & order dispatch</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold mr-2">PUT</span>
                  <span className="text-slate-800">/api/ecommerce/products/:id</span>
                </div>
                <span className="text-[11px] text-slate-500">Update product/stock</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold mr-2">GET</span>
                  <span className="text-slate-800">/api/ecommerce/analytics</span>
                </div>
                <span className="text-[11px] text-slate-500">Revenue & KPI metrics</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-base text-slate-900">Add New Product to Database</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  placeholder="e.g. Ergonomic Vertical Wireless Mouse"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  >
                    <option>Developer Gear</option>
                    <option>Audio</option>
                    <option>Workstation</option>
                    <option>Wearables</option>
                    <option>Smart Home</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Price ($ USD)</label>
                  <input
                    type="number"
                    required
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Initial Stock Units</label>
                  <input
                    type="number"
                    required
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tagline</label>
                  <input
                    type="text"
                    value={newProdTagline}
                    onChange={(e) => setNewProdTagline(e.target.value)}
                    placeholder="Short benefit hook"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={newProdImage}
                  onChange={(e) => setNewProdImage(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono text-[11px]"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  {isSubmitting ? 'Saving...' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

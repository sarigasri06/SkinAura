import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import API from '../api/axios';
import { formatCurrency } from '../utils/helpers';
import { toast } from 'react-toastify';

const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('stats');
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [productForm, setProductForm] = useState({
    name: '', description: '', price: '', category: 'cleanser', stock: 0,
    ingredients: '', skinType: '', concerns: '', compareAtPrice: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsRes, ordersRes] = await Promise.all([
        API.get('/admin/stats'),
        API.get('/admin/orders'),
      ]);
      setStats(statsRes.data);
      setOrders(ordersRes.data);
    } catch (error) {
      toast.error('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, status) => {
    try {
      await API.put(`/admin/orders/${orderId}/status`, { status });
      toast.success('Order status updated');
      fetchData();
    } catch (error) {
      toast.error('Failed to update order status');
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...productForm,
        price: Number(productForm.price),
        compareAtPrice: Number(productForm.compareAtPrice) || 0,
        stock: Number(productForm.stock),
        ingredients: productForm.ingredients.split(',').map(s => s.trim()).filter(Boolean),
        skinType: productForm.skinType.split(',').map(s => s.trim()).filter(Boolean),
        concerns: productForm.concerns.split(',').map(s => s.trim()).filter(Boolean),
      };
      await API.post('/products', data);
      toast.success('Product created!');
      setProductForm({
        name: '', description: '', price: '', category: 'cleanser', stock: 0,
        ingredients: '', skinType: '', concerns: '', compareAtPrice: '',
      });
    } catch (error) {
      toast.error('Failed to create product');
    }
  };

  if (loading && !stats) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b">
        {['stats', 'orders', 'products'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-rose-500 text-rose-500'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab === 'stats' ? 'Overview' : tab === 'orders' ? 'Orders' : 'Add Product'}
          </button>
        ))}
      </div>

      {/* Stats Tab */}
      {activeTab === 'stats' && stats && (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Revenue', value: formatCurrency(stats.totalRevenue) },
              { label: 'Total Orders', value: stats.totalOrders },
              { label: 'Total Users', value: stats.totalUsers },
              { label: 'Products', value: stats.totalProducts },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border">
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
            ))}
          </div>

          {stats.lowStockProducts?.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm border mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">⚠️ Low Stock Products</h3>
              {stats.lowStockProducts.map((p) => (
                <p key={p._id} className="text-sm text-gray-600">
                  {p.name} — <span className="text-rose-500">{p.stock} left</span>
                </p>
              ))}
            </div>
          )}

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h3 className="font-semibold text-gray-800 mb-3">Recent Orders</h3>
            {stats.recentOrders?.map((order) => (
              <div key={order._id} className="flex justify-between py-2 border-b text-sm">
                <span>#{order._id.slice(-8)} — {order.user?.name}</span>
                <span className="font-medium">{formatCurrency(order.totalPrice)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-xl p-4 shadow-sm border">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-sm">#{order._id.slice(-8)} — {order.user?.name}</p>
                  <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold">{formatCurrency(order.totalPrice)}</span>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                    className="border rounded-lg px-3 py-1 text-sm"
                  >
                    {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Product Tab */}
      {activeTab === 'products' && (
        <form onSubmit={handleCreateProduct} className="bg-white rounded-xl p-6 shadow-sm border max-w-2xl">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm text-gray-600 mb-1">Product Name</label>
              <input
                type="text" value={productForm.name} required
                onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                className="input-field"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm text-gray-600 mb-1">Description</label>
              <textarea
                value={productForm.description} required rows="3"
                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Price (₹)</label>
              <input
                type="number" value={productForm.price} required min="0"
                onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Compare At Price</label>
              <input
                type="number" value={productForm.compareAtPrice} min="0"
                onChange={(e) => setProductForm({ ...productForm, compareAtPrice: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Category</label>
              <select
                value={productForm.category}
                onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                className="input-field"
              >
                <option value="cleanser">Cleanser</option>
                <option value="moisturizer">Moisturizer</option>
                <option value="serum">Serum</option>
                <option value="toner">Toner</option>
                <option value="sunscreen">Sunscreen</option>
                <option value="mask">Mask</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Stock</label>
              <input
                type="number" value={productForm.stock} min="0"
                onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Ingredients (comma-separated)</label>
              <input
                type="text" value={productForm.ingredients}
                onChange={(e) => setProductForm({ ...productForm, ingredients: e.target.value })}
                className="input-field" placeholder="Vitamin C, Hyaluronic Acid"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Skin Types</label>
              <input
                type="text" value={productForm.skinType}
                onChange={(e) => setProductForm({ ...productForm, skinType: e.target.value })}
                className="input-field" placeholder="oily, dry"
              />
            </div>
          </div>
          <button type="submit" className="btn-primary mt-4">Create Product</button>
        </form>
      )}
    </div>
  );
};

export default AdminDashboardPage;

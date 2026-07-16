import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../store/orderSlice';
import { formatCurrency } from '../utils/helpers';
import { FiPackage, FiCheckCircle, FiBox, FiTruck, FiHome } from 'react-icons/fi';

const trackingSteps = [
  { key: 'confirmed', label: 'Confirmed', icon: FiCheckCircle },
  { key: 'packed', label: 'Packed', icon: FiBox },
  { key: 'shipped', label: 'Shipped', icon: FiTruck },
  { key: 'out-for-delivery', label: 'Out for Delivery', icon: FiTruck },
  { key: 'delivered', label: 'Delivered', icon: FiHome },
];

const getStepIndex = (status) => {
  const idx = trackingSteps.findIndex((s) => s.key === status);
  return idx === -1 ? 0 : idx;
};

const statusColors = {
  pending: 'bg-rose-100 text-rose-700',
  confirmed: 'bg-rose-100 text-rose-700',
  packed: 'bg-rose-100 text-rose-700',
  shipped: 'bg-rose-200 text-rose-700',
  'out-for-delivery': 'bg-rose-200 text-rose-700',
  delivered: 'bg-rose-200 text-rose-700',
  cancelled: 'bg-rose-100 text-rose-700',
};

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-rose-50">
      <h1 className="text-3xl font-serif font-bold text-rose-800 mb-8">My Orders</h1>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20">
          <FiPackage size={64} className="mx-auto text-rose-300 mb-4" />
          <h2 className="text-2xl font-semibold text-rose-800 mb-2">No orders yet</h2>
          <p className="text-rose-500 mb-6">You haven't placed any orders yet.</p>
          <Link to="/products" className="btn-primary">Start Shopping</Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const stepIndex = getStepIndex(order.status);
            return (
              <div key={order._id} className="bg-white rounded-xl p-6 shadow-sm border border-rose-100">
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                  <div>
                    <p className="text-sm text-rose-400">Order #{order._id.slice(-8).toUpperCase()}</p>
                    <p className="text-sm text-rose-500">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-2 sm:mt-0">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <span className="font-bold text-lg text-rose-800">{formatCurrency(order.totalPrice)}</span>
                  </div>
                </div>

                {/* Tracking Progress */}
                {order.status !== 'cancelled' && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between">
                      {trackingSteps.map((step, idx) => {
                        const done = idx <= stepIndex;
                        const current = idx === stepIndex;
                        return (
                          <div key={step.key} className="flex flex-col items-center flex-1">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                              done ? 'bg-rose-500 text-white' : 'bg-rose-100 text-rose-400'
                            } ${current ? 'ring-2 ring-rose-300 ring-offset-2' : ''}`}>
                              <step.icon size={14} />
                            </div>
                            <span className={`text-[10px] mt-1 font-medium whitespace-nowrap ${done ? 'text-rose-600' : 'text-rose-400'}`}>
                              {step.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    {/* Progress bar */}
                    <div className="relative mt-2 mb-1">
                      <div className="absolute top-0 left-0 h-1 bg-rose-100 w-full rounded-full" />
                      <div className="absolute top-0 left-0 h-1 bg-rose-500 rounded-full transition-all duration-500"
                        style={{ width: `${(stepIndex / (trackingSteps.length - 1)) * 100}%` }} />
                    </div>
                  </div>
                )}

                {/* Items */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {order.items.map((item, idx) => (
                    <span key={idx} className="text-sm text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
                      {item.name} x {item.quantity}
                    </span>
                  ))}
                </div>

                {/* Estimated Delivery */}
                {order.estimatedDelivery && order.status !== 'delivered' && order.status !== 'cancelled' && (
                  <p className="text-xs text-rose-500 mt-2">
                    📅 Est. Delivery: {new Date(order.estimatedDelivery).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </p>
                )}

                <div className="flex gap-4 mt-3 text-sm text-rose-500">
                  <span>{order.isPaid ? '✅ Paid' : '⏳ Payment Pending'}</span>
                  <span>{order.isDelivered ? '📦 Delivered' : '🚚 In Transit'}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;

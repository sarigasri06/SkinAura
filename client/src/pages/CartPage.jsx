import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, updateCartItem, removeFromCart, clearCart } from '../store/cartSlice';
import { formatCurrency } from '../utils/helpers';
import { FiTrash2, FiMinus, FiPlus, FiShoppingCart } from 'react-icons/fi';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchCart());
    }
  }, [dispatch, user]);

  const handleQuantityChange = (itemId, newQty) => {
    if (newQty < 1) {
      dispatch(removeFromCart(itemId));
    } else {
      dispatch(updateCartItem({ itemId, quantity: newQty }));
    }
  };

  const handleRemove = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 999 ? 0 : 99;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <FiShoppingCart size={64} className="mx-auto text-rose-300 mb-4" />
        <h2 className="text-2xl font-semibold text-rose-800 mb-2">Please Login</h2>
        <p className="text-rose-500 mb-6">You need to be logged in to view your cart.</p>
        <Link to="/login" className="btn-primary">Login</Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-serif font-bold text-rose-900 mb-8">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <FiShoppingCart size={64} className="mx-auto text-rose-300 mb-4" />
          <h2 className="text-2xl font-semibold text-rose-800 mb-2">Your cart is empty</h2>
          <p className="text-rose-500 mb-6">Add some skincare goodies to get started!</p>
          <Link to="/products" className="btn-primary">Continue Shopping</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item._id} className="flex gap-4 bg-white rounded-xl p-4 shadow-sm border">
                <div className="w-24 h-24 bg-rose-100 rounded-lg overflow-hidden flex-shrink-0">
                  {item.product?.images?.[0] ? (
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl">🧴</div>
                  )}
                </div>
                <div className="flex-1">
                  <Link to={`/products/${item.product?._id}`} className="font-medium text-rose-800 hover:text-rose-500">
                    {item.product?.name || 'Product'}
                  </Link>
                  <p className="text-rose-500 font-semibold mt-1">{formatCurrency(item.price)}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-rose-300 rounded-lg">
                      <button onClick={() => handleQuantityChange(item._id, item.quantity - 1)} className="p-2 hover:bg-rose-100">
                        <FiMinus size={14} />
                      </button>
                      <span className="px-4 font-medium text-sm">{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item._id, item.quantity + 1)} className="p-2 hover:bg-rose-100">
                        <FiPlus size={14} />
                      </button>
                    </div>
                    <button onClick={() => handleRemove(item._id)} className="text-rose-400 hover:text-rose-600 p-2">
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-semibold text-rose-900">{formatCurrency(item.price * item.quantity)}</p>
                </div>
              </div>
            ))}

            <button onClick={() => dispatch(clearCart())} className="text-sm text-rose-400 hover:text-rose-500 transition-colors">
              Clear Cart
            </button>
          </div>

          {/* Summary */}
          <div className="bg-rose-50 rounded-xl p-6 h-fit sticky top-24">
            <h3 className="text-lg font-semibold text-rose-800 mb-4">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-rose-500">Subtotal</span>
                <span className="font-medium">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-rose-500">Shipping</span>
                <span className={shipping === 0 ? 'text-rose-500 font-medium' : 'font-medium'}>
                  {shipping === 0 ? 'FREE' : formatCurrency(shipping)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-rose-500">Tax (18%)</span>
                <span className="font-medium">{formatCurrency(tax)}</span>
              </div>
              <hr className="border-rose-300" />
              <div className="flex justify-between text-base font-bold">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>

            {subtotal < 999 && (
              <p className="text-xs text-rose-500 mt-2">
                Add {formatCurrency(999 - subtotal)} more for FREE shipping!
              </p>
            )}

            <button
              onClick={() => navigate('/checkout')}
              className="btn-primary w-full mt-6"
            >
              Proceed to Checkout
            </button>
            <Link to="/products" className="block text-center text-sm text-rose-500 hover:text-rose-500 mt-3">
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;

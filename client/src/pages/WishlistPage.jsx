import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlist, toggleWishlist } from '../store/wishlistSlice';
import { addToCart } from '../store/cartSlice';
import ProductCard from '../components/product/ProductCard';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { toast } from 'react-toastify';

const WishlistPage = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchWishlist());
    }
  }, [dispatch, user]);

  const handleRemove = (productId) => {
    dispatch(toggleWishlist(productId));
    toast.success('Removed from wishlist');
  };

  const handleAddAllToCart = () => {
    products.forEach((product) => {
      dispatch(addToCart({ productId: product._id, quantity: 1 }));
    });
    toast.success('All items added to cart!');
  };

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <FiHeart size={64} className="mx-auto text-rose-300 mb-4" />
        <h2 className="text-2xl font-semibold text-rose-800 mb-2">Please Login</h2>
        <p className="text-rose-500 mb-6">Login to view your wishlist.</p>
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-rose-900">My Wishlist</h1>
          <p className="text-rose-500 mt-1">{products.length} {products.length === 1 ? 'item' : 'items'}</p>
        </div>
        {products.length > 0 && (
          <button onClick={handleAddAllToCart} className="btn-primary flex items-center gap-2">
            <FiShoppingCart size={18} />
            Add All to Cart
          </button>
        )}
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <FiHeart size={64} className="mx-auto text-rose-300 mb-4" />
          <h2 className="text-2xl font-semibold text-rose-800 mb-2">Your wishlist is empty</h2>
          <p className="text-rose-500 mb-6">Save your favorite products by clicking the heart icon!</p>
          <Link to="/products" className="btn-primary">Browse Products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;

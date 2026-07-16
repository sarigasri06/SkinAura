import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { toggleWishlist } from '../../store/wishlistSlice';
import { formatCurrency } from '../../utils/helpers';
import { FiStar, FiShoppingCart, FiHeart } from 'react-icons/fi';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { products: wishlistProducts } = useSelector((state) => state.wishlist);
  const isWishlisted = wishlistProducts.some((p) => p._id === product._id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.info('Please login to add items to cart');
      return;
    }

    dispatch(addToCart({ productId: product._id, quantity: 1 }));
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.info('Please login to use wishlist');
      return;
    }

    dispatch(toggleWishlist(product._id));
    toast.success(
      isWishlisted
        ? 'Removed from wishlist'
        : 'Added to wishlist!'
    );
  };

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <Link to={`/products/${product._id}`} className="card group">
      {/* Image */}
      <div className="relative h-64 bg-gray-100 overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span className="text-4xl">🧴</span>
          </div>
        )}

        {/* Discount Badge */}
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-rose-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            {discount}% OFF
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
          title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <FiHeart
            size={18}
            className={isWishlisted ? 'text-rose-500 fill-current' : 'text-gray-400'}
          />
        </button>

        {/* Quick Add */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-80 text-white py-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2"
          disabled={product.stock === 0}
        >
          <FiShoppingCart size={16} />
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-xs text-rose-500 font-medium uppercase tracking-wide">
            {product.category}
          </p>
          {product.brand && (
            <>
              <span className="text-xs text-gray-300">•</span>
              <p className="text-xs text-gray-600 font-medium">{product.brand}</p>
            </>
          )}
        </div>
        <h3 className="text-gray-800 font-medium truncate">{product.name}</h3>

        {/* Rating */}
        <div className="flex items-center mt-1">
          <FiStar className="text-yellow-400 fill-current" size={14} />
          <span className="text-sm text-gray-500 ml-1">
            {product.rating > 0 ? product.rating.toFixed(1) : 'New'} ({product.numReviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-lg font-semibold text-gray-900">{formatCurrency(product.price)}</span>
          {product.compareAtPrice > 0 && (
            <span className="text-sm text-gray-400 line-through">{formatCurrency(product.compareAtPrice)}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

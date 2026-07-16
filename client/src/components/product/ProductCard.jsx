import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { toggleWishlist } from '../../store/wishlistSlice';
import { formatCurrency } from '../../utils/helpers';
import { FiStar, FiShoppingCart, FiHeart, FiTrendingUp, FiClock } from 'react-icons/fi';
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

  const isBestSeller = product.rating >= 4.5 && product.numReviews >= 100;
  const isNewArrival = product.stock >= 150 && product.numReviews < 100;

  return (
    <Link to={`/products/${product._id}`} className="card group relative">
      {/* Image */}
      <div className="relative h-64 bg-rose-100 overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-rose-400">
            <span className="text-4xl">🧴</span>
          </div>
        )}

        {/* Badges Stack */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {/* Discount Badge */}
          {discount > 0 && (
            <span className="bg-rose-500 text-white text-xs px-2.5 py-1 rounded-full font-semibold shadow-sm">
              {discount}% OFF
            </span>
          )}
          {/* Best Seller Badge */}
          {isBestSeller && (
            <span className="bg-amber-100 text-amber-800 text-[10px] px-2 py-0.5 rounded-full font-semibold flex items-center gap-1 shadow-sm">
              <FiTrendingUp size={10} /> BEST SELLER
            </span>
          )}
          {/* New Arrival Badge */}
          {isNewArrival && (
            <span className="bg-green-100 text-green-800 text-[10px] px-2 py-0.5 rounded-full font-semibold flex items-center gap-1 shadow-sm">
              <FiClock size={10} /> NEW
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
          title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <FiHeart
            size={18}
            className={isWishlisted ? 'text-rose-500 fill-current' : 'text-rose-400'}
          />
        </button>

        {/* Quick Add */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-0 left-0 right-0 bg-rose-900/80 backdrop-blur-sm text-white py-2.5 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center gap-2"
          disabled={product.stock === 0}
        >
          <FiShoppingCart size={16} />
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-rose-500 font-medium uppercase tracking-wide mb-1">
          {product.category}
        </p>
        <h3 className="text-rose-800 font-medium truncate text-sm">{product.name}</h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1.5">
          <FiStar className="text-rose-400 fill-current" size={14} />
          <span className="text-xs text-rose-500 font-medium">
            {product.rating > 0 ? product.rating.toFixed(1) : 'New'}
          </span>
          <span className="text-xs text-rose-400">({product.numReviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-lg font-bold text-rose-800">{formatCurrency(product.price)}</span>
          {product.compareAtPrice > 0 && (
            <span className="text-xs text-rose-400 line-through">{formatCurrency(product.compareAtPrice)}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

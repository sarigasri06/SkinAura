import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, createReview } from '../store/productSlice';
import { addToCart } from '../store/cartSlice';
import { toggleWishlist } from '../store/wishlistSlice';
import { formatCurrency } from '../utils/helpers';
import { FiStar, FiShoppingCart, FiMinus, FiPlus, FiHeart } from 'react-icons/fi';
import { toast } from 'react-toastify';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product, loading } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const { products: wishlistProducts } = useSelector((state) => state.wishlist);
  const isWishlisted = product ? wishlistProducts.some((p) => p._id === product._id) : false;

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [rating, setRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    dispatch(addToCart({ productId: product._id, quantity }));
    toast.success(`${product.name} added to cart!`);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    dispatch(
      createReview({
        productId: product._id,
        review: { rating, title: reviewTitle, comment: reviewComment },
      })
    );
    toast.success('Review submitted!');
    setReviewTitle('');
    setReviewComment('');
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-gray-800">Product not found</h2>
      </div>
    );
  }

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Images */}
        <div>
          <div className="bg-gray-100 rounded-2xl overflow-hidden mb-4 h-96 flex items-center justify-center">
            {product.images && product.images.length > 0 ? (
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-8xl">🧴</span>
            )}
          </div>
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === idx ? 'border-rose-500' : 'border-gray-200'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="text-sm text-rose-500 font-medium uppercase tracking-wide mb-2">
            {product.category}
          </p>
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <FiStar
                  key={star}
                  size={18}
                  className={star <= Math.round(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-gray-500">({product.numReviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold text-gray-900">{formatCurrency(product.price)}</span>
            {product.compareAtPrice > 0 && (
              <>
                <span className="text-lg text-gray-400 line-through">{formatCurrency(product.compareAtPrice)}</span>
                <span className="text-sm bg-rose-100 text-rose-600 px-2 py-1 rounded-full font-medium">{discount}% OFF</span>
              </>
            )}
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

          {/* Skin Type */}
          {product.skinType && product.skinType.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Suitable For:</h4>
              <div className="flex flex-wrap gap-2">
                {product.skinType.map((type) => (
                  <span key={type} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">{type}</span>
                ))}
              </div>
            </div>
          )}

          {/* Ingredients */}
          {product.ingredients && product.ingredients.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Key Ingredients:</h4>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ing) => (
                  <span key={ing} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">{ing}</span>
                ))}
              </div>
            </div>
          )}

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 hover:bg-gray-100 transition-colors"
              >
                <FiMinus size={16} />
              </button>
              <span className="px-6 font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="p-3 hover:bg-gray-100 transition-colors"
              >
                <FiPlus size={16} />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="btn-primary flex items-center gap-2 flex-1 justify-center"
            >
              <FiShoppingCart size={20} />
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
            <button
              onClick={() => {
                if (!user) {
                  toast.info('Please login to use wishlist');
                  return;
                }
                dispatch(toggleWishlist(product._id));
                toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist!');
              }}
              className={`p-3 rounded-lg border-2 transition-colors ${
                isWishlisted
                  ? 'border-rose-500 text-rose-500 bg-rose-50'
                  : 'border-gray-300 text-gray-400 hover:border-rose-300 hover:text-rose-500'
              }`}
              title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <FiHeart size={20} className={isWishlisted ? 'fill-current' : ''} />
            </button>
          </div>

          {/* Stock */}
          <p className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Currently out of stock'}
          </p>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="border-t pt-12">
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8">Customer Reviews</h2>

        {/* Write Review */}
        {user && (
          <form onSubmit={handleSubmitReview} className="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="font-medium text-gray-800 mb-4">Write a Review</h3>
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-2">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} type="button" onClick={() => setRating(star)}>
                    <FiStar
                      size={24}
                      className={star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                    />
                  </button>
                ))}
              </div>
            </div>
            <input
              type="text"
              value={reviewTitle}
              onChange={(e) => setReviewTitle(e.target.value)}
              placeholder="Review title (optional)"
              className="input-field mb-3"
            />
            <textarea
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Share your experience..."
              rows="3"
              className="input-field mb-4"
            />
            <button type="submit" className="btn-primary">Submit Review</button>
          </form>
        )}

        {/* Reviews List */}
        {product.reviews && product.reviews.length > 0 ? (
          <div className="space-y-4">
            {product.reviews.map((review) => (
              <div key={review._id} className="border-b pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-gray-800">{review.name}</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <FiStar
                        key={s}
                        size={14}
                        className={s <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                </div>
                {review.title && <p className="font-medium text-gray-700 text-sm mb-1">{review.title}</p>}
                {review.comment && <p className="text-gray-500 text-sm">{review.comment}</p>}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No reviews yet. Be the first to review!</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchFeatured } from '../store/productSlice';
import ProductCard from '../components/product/ProductCard';
import {
  FiDroplet, FiSun, FiEye, FiGlobe, FiPlus, FiGift,
  FiGrid, FiShield, FiCoffee, FiClipboard
} from 'react-icons/fi';

const categoryCards = [
  { name: 'Cleanser', slug: 'cleanser', desc: 'Gentle & effective face washes', icon: FiDroplet, color: 'from-cyan-400 to-blue-500' },
  { name: 'Moisturizer', slug: 'moisturizer', desc: 'Deep hydration for every skin type', icon: FiShield, color: 'from-emerald-400 to-teal-500' },
  { name: 'Serum', slug: 'serum', desc: 'Targeted treatments & actives', icon: FiPlus, color: 'from-purple-400 to-violet-500' },
  { name: 'Toner', slug: 'toner', desc: 'Balance & prep your skin', icon: FiGrid, color: 'from-pink-400 to-rose-500' },
  { name: 'Sunscreen', slug: 'sunscreen', desc: 'Daily UV protection', icon: FiSun, color: 'from-amber-400 to-orange-500' },
  { name: 'Mask', slug: 'mask', desc: 'Deep treatments & pampering', icon: FiClipboard, color: 'from-indigo-400 to-blue-600' },
  { name: 'Eye Care', slug: 'eye-care', desc: 'Brighten & depuff', icon: FiEye, color: 'from-sky-400 to-cyan-500' },
  { name: 'Lip Care', slug: 'lip-care', desc: 'Nourish & protect lips', icon: FiCoffee, color: 'from-rose-400 to-pink-500' },
  { name: 'Body Care', slug: 'body-care', desc: 'Full body skincare', icon: FiGlobe, color: 'from-lime-400 to-green-500' },
  { name: 'Face Care', slug: 'face-care', desc: 'Oils, mists & treatments', icon: FiShield, color: 'from-fuchsia-400 to-purple-500' },
  { name: 'Sets', slug: 'set', desc: 'Curated routine bundles', icon: FiGift, color: 'from-yellow-400 to-amber-500' },
];

const HomePage = () => {
  const dispatch = useDispatch();
  const { featured } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchFeatured());
  }, [dispatch]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
            Your Skin, <span className="text-rose-500">Your Glow</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Discover premium skincare products crafted with natural ingredients and backed by science.
            Because you deserve to shine every day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products" className="btn-primary text-lg px-8 py-4">
              Shop Now
            </Link>
            <Link to="/register" className="btn-outline text-lg px-8 py-4">
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Natural Ingredients', desc: 'Formulated with the finest botanicals', icon: '🌿' },
              { title: 'Dermatologist Tested', desc: 'Safe for all skin types', icon: '🔬' },
              { title: 'Free Shipping', desc: 'On orders above ₹999', icon: '📦' },
            ].map((feature, index) => (
              <div key={index} className="text-center p-6">
                <span className="text-4xl mb-4 block">{feature.icon}</span>
                <h3 className="text-xl font-serif font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Browsing Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Find exactly what your skin needs — browse our carefully organized categories and discover products tailored for every concern.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categoryCards.map((cat) => (
              <Link
                key={cat.slug}
                to={`/products?category=${cat.slug}`}
                className="group flex flex-col items-center p-5 rounded-2xl bg-gray-50 hover:bg-rose-50 border border-gray-100 hover:border-rose-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${cat.color} flex items-center justify-center mb-3 shadow-md group-hover:shadow-lg transition-shadow`}>
                  <cat.icon className="text-white" size={24} />
                </div>
                <h3 className="text-sm font-semibold text-gray-800 group-hover:text-rose-600 transition-colors text-center">
                  {cat.name}
                </h3>
                <p className="text-xs text-gray-400 mt-1 text-center">
                  {cat.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-gray-500">Handpicked favorites for your skincare routine</p>
          </div>

          {featured.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featured.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No featured products yet.</p>
              <Link to="/products" className="btn-primary mt-4 inline-block">Browse All Products</Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-rose-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
            Ready to Start Your Glow Journey?
          </h2>
          <p className="text-rose-100 text-lg mb-8">
            Join thousands of happy customers who found their perfect skincare routine.
          </p>
          <Link to="/register" className="inline-block bg-white text-rose-500 px-8 py-4 rounded-lg font-semibold hover:bg-rose-50 transition-colors">
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProductsByCategories } from '../store/productSlice';
import ProductCard from '../components/product/ProductCard';
import {
  FiDroplet, FiSun, FiEye, FiGlobe, FiPlus, FiGift,
  FiGrid, FiShield, FiCoffee, FiClipboard
} from 'react-icons/fi';

const categoryMeta = {
  cleanser:    { label: 'Cleansers',        icon: FiDroplet,   color: 'from-cyan-400 to-blue-500',   desc: 'Gentle & effective face washes' },
  moisturizer: { label: 'Moisturizers',     icon: FiShield,    color: 'from-emerald-400 to-teal-500', desc: 'Deep hydration for every skin type' },
  serum:       { label: 'Serums',           icon: FiPlus,      color: 'from-purple-400 to-violet-500', desc: 'Targeted treatments & actives' },
  toner:       { label: 'Toners',           icon: FiGrid,      color: 'from-pink-400 to-rose-500',    desc: 'Balance & prep your skin' },
  sunscreen:   { label: 'Sunscreens',       icon: FiSun,       color: 'from-amber-400 to-orange-500', desc: 'Daily UV protection' },
  mask:        { label: 'Masks',            icon: FiClipboard, color: 'from-indigo-400 to-blue-600',  desc: 'Deep treatments & pampering' },
  'eye-care':  { label: 'Eye Care',         icon: FiEye,       color: 'from-sky-400 to-cyan-500',    desc: 'Brighten & depuff' },
  'lip-care':  { label: 'Lip Care',         icon: FiCoffee,    color: 'from-rose-400 to-pink-500',    desc: 'Nourish & protect lips' },
  'body-care': { label: 'Body Care',        icon: FiGlobe,     color: 'from-lime-400 to-green-500',   desc: 'Full body skincare' },
  'face-care': { label: 'Face Care',        icon: FiShield,    color: 'from-fuchsia-400 to-purple-500', desc: 'Oils, mists & treatments' },
  set:         { label: 'Sets & Bundles',   icon: FiGift,      color: 'from-yellow-400 to-amber-500', desc: 'Curated routine bundles' },
};

const CategoryProductsPage = () => {
  const dispatch = useDispatch();
  const { categoryProducts, categoryLoading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductsByCategories());
  }, [dispatch]);

  const categoriesWithProducts = Object.entries(categoryMeta).filter(
    ([slug]) => categoryProducts[slug] && categoryProducts[slug].length > 0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
          Shop by Category
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Browse our complete collection organized by category. Find exactly what your skin needs
          — from cleansers and serums to masks and complete routine sets.
        </p>
      </div>

      {categoryLoading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
        </div>
      ) : categoriesWithProducts.length > 0 ? (
        <div className="space-y-16">
          {categoriesWithProducts.map(([slug, meta]) => (
            <section key={slug} id={slug} className="scroll-mt-24">
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${meta.color} flex items-center justify-center shadow-md flex-shrink-0`}>
                  <meta.icon className="text-white" size={22} />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-serif font-bold text-gray-900">
                    {meta.label}
                  </h2>
                  <p className="text-sm text-gray-500">{meta.desc}</p>
                </div>
                <Link
                  to={`/products?category=${slug}`}
                  className="text-sm text-rose-500 hover:text-rose-600 font-medium whitespace-nowrap transition-colors"
                >
                  View All →
                </Link>
              </div>

              {/* Products Grid for this category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categoryProducts[slug].slice(0, 4).map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {/* Show more link if more than 4 */}
              {categoryProducts[slug].length > 4 && (
                <div className="text-center mt-4">
                  <Link
                    to={`/products?category=${slug}`}
                    className="inline-block text-sm text-rose-500 hover:text-rose-600 font-medium border border-rose-200 hover:border-rose-400 rounded-full px-6 py-2 transition-colors"
                  >
                    + {categoryProducts[slug].length - 4} more in {meta.label}
                  </Link>
                </div>
              )}

              {/* Divider */}
              <hr className="mt-10 border-gray-100" />
            </section>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <span className="text-6xl block mb-4">🧴</span>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
          <p className="text-gray-500">Check back soon for new arrivals!</p>
        </div>
      )}

      {/* Quick Navigation Sidebar - Category Jump Links */}
      {categoriesWithProducts.length > 0 && (
        <div className="fixed right-4 bottom-20 z-40 hidden xl:block">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-3 space-y-1">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">
              Jump to
            </p>
            {categoriesWithProducts.map(([slug, meta]) => (
              <a
                key={slug}
                href={`#${slug}`}
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm text-gray-600 hover:bg-rose-50 hover:text-rose-600 transition-colors"
              >
                <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${meta.color} flex items-center justify-center`}>
                  <meta.icon className="text-white" size={10} />
                </div>
                <span>{meta.label}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryProductsPage;

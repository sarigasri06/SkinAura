import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts } from '../store/productSlice';
import ProductCard from '../components/product/ProductCard';
import { FiSearch, FiFilter } from 'react-icons/fi';

const categories = [
  'all', 'cleanser', 'moisturizer', 'serum', 'toner',
  'sunscreen', 'mask', 'eye-care', 'lip-care', 'body-care', 'face-care', 'set'
];

const brands = [
  'Cetaphil', 'CeraVe', 'The Ordinary', 'Minimalist', 'COSRX',
  'Pilgrim', 'Plum', 'Beauty of Joseon', 'The Derma Co', 'Foxtale',
  'Deconstruct', 'Suganda', 'Aqualogica', 'Bioderma', 'Neutrogena',
  'Simple', 'Faces Canada', 'SKIN1004', 'Some By Mi', 'Anua',
  'Isntree', 'Etude SoonJung', 'Round Lab'
];

const ProductCatalogPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, loading, page, pages, total } = useSelector((state) => state.products);

  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get('brand') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const params = {};
    if (searchParams.get('keyword')) params.keyword = searchParams.get('keyword');
    if (searchParams.get('category') && searchParams.get('category') !== 'all') params.category = searchParams.get('category');
    if (searchParams.get('brand')) params.brand = searchParams.get('brand');
    if (searchParams.get('sort')) params.sort = searchParams.get('sort');
    if (searchParams.get('page')) params.page = searchParams.get('page');

    dispatch(fetchProducts(params));
  }, [dispatch, searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword) params.set('keyword', keyword);
    if (category !== 'all') params.set('category', category);
    if (selectedBrand) params.set('brand', selectedBrand);
    if (sort !== 'newest') params.set('sort', sort);
    params.set('page', '1');
    setSearchParams(params);
  };

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    const params = new URLSearchParams(searchParams);
    if (cat === 'all') {
      params.delete('category');
    } else {
      params.set('category', cat);
    }
    params.set('page', '1');
    setSearchParams(params);
  };

  const handleBrandChange = (brand) => {
    const newBrand = brand === selectedBrand ? '' : brand;
    setSelectedBrand(newBrand);
    const params = new URLSearchParams(searchParams);
    if (newBrand) {
      params.set('brand', newBrand);
    } else {
      params.delete('brand');
    }
    params.set('page', '1');
    setSearchParams(params);
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
    const params = new URLSearchParams(searchParams);
    params.set('sort', newSort);
    params.set('page', '1');
    setSearchParams(params);
  };

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage);
    setSearchParams(params);
    window.scrollTo(0, 0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-gray-900">Shop Skincare</h1>
        <p className="text-gray-500 mt-2">
          {total > 0 ? `${total} products found` : 'Discover our collection'}
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative max-w-xl">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          />
        </div>
      </form>

      {/* Toolbar */}
      <div className="flex flex-col gap-4 mb-8">
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === cat
                  ? 'bg-rose-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Brand Filter */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Filter by Brand
            </span>
            {selectedBrand && (
              <button
                onClick={() => handleBrandChange(selectedBrand)}
                className="text-xs text-rose-500 hover:text-rose-600 underline"
              >
                Clear
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => handleBrandChange(brand)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                  selectedBrand === brand
                    ? 'bg-rose-500 text-white border-rose-500'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-rose-300 hover:text-rose-500'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Sort by:</span>
          <select
            value={sort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
        </div>
      ) : products.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {pages > 1 && (
            <div className="flex justify-center mt-12 gap-2">
              {[...Array(pages).keys()].map((x) => (
                <button
                  key={x + 1}
                  onClick={() => handlePageChange(x + 1)}
                  className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                    page === x + 1
                      ? 'bg-rose-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {x + 1}
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20">
          <span className="text-6xl block mb-4">🔍</span>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default ProductCatalogPage;

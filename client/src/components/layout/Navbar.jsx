import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiLogOut, FiPackage, FiHeart, FiChevronDown } from 'react-icons/fi';

const categories = [
  { name: 'Cleanser', slug: 'cleanser' },
  { name: 'Moisturizer', slug: 'moisturizer' },
  { name: 'Serum', slug: 'serum' },
  { name: 'Toner', slug: 'toner' },
  { name: 'Sunscreen', slug: 'sunscreen' },
  { name: 'Mask', slug: 'mask' },
  { name: 'Eye Care', slug: 'eye-care' },
  { name: 'Lip Care', slug: 'lip-care' },
  { name: 'Body Care', slug: 'body-care' },
  { name: 'Face Care', slug: 'face-care' },
  { name: 'Sets', slug: 'set' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [mobileShowCategories, setMobileShowCategories] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowCategories(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setIsOpen(false);
  };

  const handleCategoryClick = (slug) => {
    navigate(`/products?category=${slug}`);
    setShowCategories(false);
    setIsOpen(false);
    setMobileShowCategories(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-serif font-bold text-rose-500">Skin Aura</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-rose-500 transition-colors">Home</Link>

            {/* Categories Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowCategories(!showCategories)}
                className="flex items-center space-x-1 text-gray-600 hover:text-rose-500 transition-colors"
              >
                <span>Shop</span>
                <FiChevronDown size={16} className={`transition-transform ${showCategories ? 'rotate-180' : ''}`} />
              </button>

              {showCategories && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-fadeIn">
                  <Link
                    to="/categories"
                    onClick={() => setShowCategories(false)}
                    className="block px-4 py-2.5 text-sm text-rose-500 hover:bg-rose-50 hover:text-rose-600 font-semibold border-b border-gray-100"
                  >
                    🗂️ Shop by Category
                  </Link>
                  <Link
                    to="/products"
                    onClick={() => setShowCategories(false)}
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600 font-medium border-b border-gray-100"
                  >
                    All Products
                  </Link>
                  <div className="max-h-72 overflow-y-auto">
                    {categories.map((cat) => (
                      <button
                        key={cat.slug}
                        onClick={() => handleCategoryClick(cat.slug)}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-600 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {user && user.role === 'admin' && (
              <Link to="/admin" className="text-gray-600 hover:text-rose-500 transition-colors">Admin</Link>
            )}
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-rose-500 transition-colors">
              <FiShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/wishlist" className="text-gray-600 hover:text-rose-500 transition-colors">
                  <FiHeart size={20} />
                </Link>
                <Link to="/orders" className="text-gray-600 hover:text-rose-500 transition-colors">
                  <FiPackage size={20} />
                </Link>
                <Link to="/profile" className="text-gray-600 hover:text-rose-500 transition-colors">
                  <FiUser size={20} />
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-rose-500 transition-colors"
                  title="Logout"
                >
                  <FiLogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="btn-outline py-2 px-4 text-sm">Login</Link>
                <Link to="/register" className="btn-primary py-2 px-4 text-sm">Sign Up</Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <Link to="/cart" className="relative p-2 text-gray-600">
              <FiShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-600">
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t pt-4">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-600 hover:text-rose-500 py-2" onClick={() => setIsOpen(false)}>Home</Link>

              {/* Mobile Categories Accordion */}
              <div>
                <button
                  onClick={() => setMobileShowCategories(!mobileShowCategories)}
                  className="flex items-center justify-between w-full text-gray-600 hover:text-rose-500 py-2"
                >
                  <span>Shop by Category</span>
                  <FiChevronDown size={16} className={`transition-transform ${mobileShowCategories ? 'rotate-180' : ''}`} />
                </button>
                {mobileShowCategories && (
                  <div className="ml-4 border-l-2 border-rose-200 pl-4 space-y-1 mt-1">
                    <Link
                      to="/categories"
                      onClick={() => { setIsOpen(false); setMobileShowCategories(false); }}
                      className="block text-sm text-rose-500 font-semibold py-1"
                    >
                      🗂️ Shop by Category
                    </Link>
                    <Link
                      to="/products"
                      onClick={() => { setIsOpen(false); setMobileShowCategories(false); }}
                      className="block text-sm text-rose-500 font-medium py-1"
                    >
                      All Products
                    </Link>
                    {categories.map((cat) => (
                      <button
                        key={cat.slug}
                        onClick={() => handleCategoryClick(cat.slug)}
                        className="block w-full text-left text-sm text-gray-600 hover:text-rose-500 py-1"
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {user && user.role === 'admin' && (
                <Link to="/admin" className="text-gray-600 hover:text-rose-500 py-2" onClick={() => setIsOpen(false)}>Admin</Link>
              )}
              {user ? (
                <>
                  <Link to="/wishlist" className="text-gray-600 hover:text-rose-500 py-2" onClick={() => setIsOpen(false)}>Wishlist</Link>
                  <Link to="/orders" className="text-gray-600 hover:text-rose-500 py-2" onClick={() => setIsOpen(false)}>Orders</Link>
                  <Link to="/profile" className="text-gray-600 hover:text-rose-500 py-2" onClick={() => setIsOpen(false)}>Profile</Link>
                  <button onClick={handleLogout} className="text-left text-rose-500 py-2">Logout</button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 pt-2">
                  <Link to="/login" className="btn-outline text-center py-2 text-sm" onClick={() => setIsOpen(false)}>Login</Link>
                  <Link to="/register" className="btn-primary text-center py-2 text-sm" onClick={() => setIsOpen(false)}>Sign Up</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

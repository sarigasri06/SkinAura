import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-serif font-bold text-white mb-4">Skin Aura</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium skincare products crafted with love and science. Your journey to radiant skin starts here.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-rose-400 transition-colors"><FiInstagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-rose-400 transition-colors"><FiFacebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-rose-400 transition-colors"><FiTwitter size={20} /></a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white font-medium mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products?category=cleanser" className="hover:text-rose-400 transition-colors">Cleansers</Link></li>
              <li><Link to="/products?category=moisturizer" className="hover:text-rose-400 transition-colors">Moisturizers</Link></li>
              <li><Link to="/products?category=serum" className="hover:text-rose-400 transition-colors">Serums</Link></li>
              <li><Link to="/products?category=sunscreen" className="hover:text-rose-400 transition-colors">Sunscreens</Link></li>
              <li><Link to="/products?category=mask" className="hover:text-rose-400 transition-colors">Masks</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-white font-medium mb-4">Help</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-rose-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-medium mb-4">Stay Glowing</h4>
            <p className="text-sm text-gray-400 mb-3">Subscribe for skincare tips and exclusive offers.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 bg-gray-800 rounded-l-lg text-sm text-white placeholder-gray-500 focus:outline-none"
              />
              <button className="bg-rose-500 text-white px-4 py-2 rounded-r-lg text-sm hover:bg-rose-600 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Skin Aura. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

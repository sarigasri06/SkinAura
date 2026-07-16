import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FiInstagram, FiFacebook, FiTwitter, FiYoutube, FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal, FaShieldAlt, FaTruck, FaUndo, FaHeadset } from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-rose-900 text-rose-200">
      {/* Trust Strip */}
      <div className="border-b border-rose-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: FaTruck, label: 'Free Shipping', sub: 'Orders above ₹999' },
              { icon: FaShieldAlt, label: 'Secure Payment', sub: '100% Protected' },
              { icon: FaUndo, label: 'Easy Returns', sub: '7-Day Return Policy' },
              { icon: FaHeadset, label: '24/7 Support', sub: 'Dedicated Assistance' },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1.5">
                <item.icon size={22} className="text-rose-300" />
                <span className="text-xs font-semibold text-white">{item.label}</span>
                <span className="text-[10px] text-rose-400">{item.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & About */}
          <div className="lg:col-span-1">
            <Link to="/" className="text-2xl font-serif font-bold text-white">Skin Aura</Link>
            <p className="text-rose-300 text-sm leading-relaxed mt-3 mb-4">
              Premium skincare products crafted with natural ingredients and backed by science. Gentle, effective formulations for every skin type.
            </p>
            <div className="flex space-x-3">
              {[FiInstagram, FiFacebook, FiTwitter, FiYoutube].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-full bg-rose-800 flex items-center justify-center text-rose-300 hover:bg-rose-500 hover:text-white transition-colors">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Shop</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Cleansers', slug: 'cleanser' },
                { label: 'Moisturizers', slug: 'moisturizer' },
                { label: 'Serums', slug: 'serum' },
                { label: 'Toners', slug: 'toner' },
                { label: 'Sunscreens', slug: 'sunscreen' },
                { label: 'Masks', slug: 'mask' },
                { label: 'View All', slug: null, link: '/products' },
              ].map((item) => (
                <li key={item.label}>
                  {item.slug ? (
                    <Link to={`/products?category=${item.slug}`} className="text-rose-300 hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  ) : (
                    <Link to={item.link} className="text-rose-400 hover:text-white transition-colors font-medium">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Customer Service</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="#" className="text-rose-300 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="#" className="text-rose-300 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="#" className="text-rose-300 hover:text-white transition-colors">Shipping & Delivery</Link></li>
              <li><Link to="#" className="text-rose-300 hover:text-white transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="#" className="text-rose-300 hover:text-white transition-colors">Track Your Order</Link></li>
              <li><Link to="#" className="text-rose-300 hover:text-white transition-colors">Size Guide</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Policies</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="#" className="text-rose-300 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="text-rose-300 hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link to="#" className="text-rose-300 hover:text-white transition-colors">Refund Policy</Link></li>
              <li><Link to="#" className="text-rose-300 hover:text-white transition-colors">Cookie Policy</Link></li>
              <li><Link to="#" className="text-rose-300 hover:text-white transition-colors">Cancellation Policy</Link></li>
            </ul>
            <h4 className="text-white font-semibold mt-6 mb-3 text-sm uppercase tracking-wider">About</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="#" className="text-rose-300 hover:text-white transition-colors">Our Story</Link></li>
              <li><Link to="#" className="text-rose-300 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="#" className="text-rose-300 hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Newsletter + Contact */}
          <div className="lg:col-span-1">
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Stay Glowing</h4>
            <p className="text-rose-300 text-xs mb-3">Get skincare tips, new launches & exclusive offers.</p>
            {subscribed ? (
              <p className="text-rose-300 text-sm font-medium bg-rose-800 rounded-lg px-4 py-3 text-center">
                ✅ Subscribed! Thank you. 🎉
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="flex-1 px-3 py-2.5 bg-rose-800 rounded-l-lg text-sm text-white placeholder-rose-400 focus:outline-none border border-rose-700 border-r-0"
                />
                <button type="submit" className="bg-rose-500 text-white px-3 py-2.5 rounded-r-lg hover:bg-rose-600 transition-colors">
                  <FiSend size={16} />
                </button>
              </form>
            )}

            <div className="space-y-2 text-xs text-rose-300 mt-4">
              <div className="flex items-center gap-2"><FiPhone size={12} /> +91 98765 43210</div>
              <div className="flex items-center gap-2"><FiMail size={12} /> hello@skinaura.com</div>
              <div className="flex items-center gap-2"><FiMapPin size={12} /> Mumbai, India</div>
            </div>
          </div>
        </div>

        {/* Payment Icons */}
        <div className="border-t border-rose-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-2xl text-rose-400">
            <FaCcVisa />
            <FaCcMastercard />
            <FaCcAmex />
            <FaCcPaypal />
          </div>
          <div className="text-xs text-rose-400">
            <span className="mr-2">🔒 Secure SSL Encryption</span>
            <span>100% Payment Protection</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-rose-800 mt-4 pt-4 text-center text-xs text-rose-400">
          <p>&copy; {new Date().getFullYear()} Skin Aura. All rights reserved. Made with ❤️ in India.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

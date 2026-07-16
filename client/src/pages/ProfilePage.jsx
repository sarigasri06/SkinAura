import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../store/authSlice';
import { toast } from 'react-toastify';
import { FiAward, FiStar, FiGift, FiTrendingUp } from 'react-icons/fi';

const levelMeta = {
  Silver: { color: 'from-rose-400 to-rose-500', min: 0, next: 'Gold', nextAt: 5000, icon: FiAward },
  Gold: { color: 'from-amber-400 to-amber-500', min: 5000, next: 'Platinum', nextAt: 15000, icon: FiStar },
  Platinum: { color: 'from-purple-400 to-purple-600', min: 15000, next: null, nextAt: null, icon: FiGift },
};

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { name, email, phone };
    if (password) data.password = password;
    dispatch(updateProfile(data)).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        toast.success('Profile updated!');
        setPassword('');
      }
    });
  };

  const level = user?.loyaltyLevel || 'Silver';
  const points = user?.loyaltyPoints || 0;
  const spent = user?.totalSpent || 0;
  const meta = levelMeta[level];
  const progress = meta.nextAt ? Math.min(100, (spent / meta.nextAt) * 100) : 100;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-rose-50">
      <h1 className="text-3xl font-serif font-bold text-rose-800 mb-8">My Profile</h1>

      <div className="space-y-8">
        {/* Loyalty Card */}
        <div className={`rounded-2xl p-6 text-white bg-gradient-to-r ${meta.color} shadow-md`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider opacity-80">Loyalty Level</p>
              <h2 className="text-2xl font-bold flex items-center gap-2 mt-1">
                <meta.icon size={24} /> {level}
              </h2>
              <p className="text-sm mt-2 opacity-90">{points.toLocaleString()} Reward Points · ₹{spent.toLocaleString()} Total Spent</p>
            </div>
            <div className="text-4xl opacity-80">
              🎁
            </div>
          </div>
          {meta.next && (
            <>
              <div className="mt-4 bg-white/20 rounded-full h-2 overflow-hidden">
                <div className="bg-white h-full rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-xs mt-2 opacity-80">
                {progress >= 100 ? '🎉 Ready for upgrade!' : `₹${(meta.nextAt - spent).toLocaleString()} more to reach ${meta.next}`}
              </p>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Avatar & Links */}
          <div className="md:col-span-1 space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-rose-100 text-center">
              <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-rose-500">
                  {user?.name?.charAt(0)?.toUpperCase() || '?'}
                </span>
              </div>
              <h3 className="font-semibold text-rose-800">{user?.name}</h3>
              <p className="text-sm text-rose-500">{user?.email}</p>
              <span className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium bg-rose-100 text-rose-600">
                {user?.role === 'admin' ? 'Admin' : 'Customer'}
              </span>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-rose-100 space-y-2">
              <Link to="/orders" className="block text-sm text-rose-600 hover:text-rose-800 transition-colors">📦 My Orders</Link>
              <Link to="/wishlist" className="block text-sm text-rose-600 hover:text-rose-800 transition-colors">❤️ Wishlist</Link>
              <Link to="/journal" className="block text-sm text-rose-600 hover:text-rose-800 transition-colors">📖 Skin Journal</Link>
            </div>
          </div>

          {/* Edit Form */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm border border-rose-100 space-y-5">
              <h2 className="text-lg font-semibold text-rose-800">Edit Profile</h2>
              <div>
                <label className="block text-sm font-medium text-rose-700 mb-1">Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-rose-700 mb-1">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-rose-700 mb-1">Phone</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="input-field" placeholder="+91 XXXXXXXXXX" />
              </div>
              <div>
                <label className="block text-sm font-medium text-rose-700 mb-1">
                  New Password <span className="text-rose-400 font-normal">(leave blank to keep current)</span>
                </label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" placeholder="Min. 6 characters" />
              </div>
              <button type="submit" disabled={loading} className="btn-primary">
                {loading ? 'Saving...' : 'Update Profile'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

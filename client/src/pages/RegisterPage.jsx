import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGoogleLogin } from '@react-oauth/google';
import { register, googleLogin, clearError } from '../store/authSlice';
import { toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
    return () => dispatch(clearError());
  }, [user, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    dispatch(register({ name, email, password }));
  };

  const handleGoogleRegister = useGoogleLogin({
    flow: 'implicit',
    scope: 'openid profile email',
    onSuccess: (tokenResponse) => {
      dispatch(googleLogin(tokenResponse.access_token));
    },
    onError: () => {
      toast.error('Google sign-up failed. Please try again.');
    },
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-rose-900">Create Account</h1>
          <p className="text-rose-500 mt-2">Join Skin Aura and start your skincare journey</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border p-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-rose-700 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input-field"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-rose-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-rose-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
              placeholder="At least 6 characters"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-rose-700 mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="input-field"
              placeholder="Re-enter your password"
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-rose-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-rose-500">or</span>
            </div>
          </div>

          {/* Google Sign-Up */}
          <button
            type="button"
            onClick={handleGoogleRegister}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-rose-300 rounded-lg text-rose-700 bg-white hover:bg-rose-50 transition-colors font-medium"
          >
            <FcGoogle size={22} />
            Continue with Google
          </button>
        </form>

        <p className="text-center text-sm text-rose-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-rose-500 hover:text-rose-600 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

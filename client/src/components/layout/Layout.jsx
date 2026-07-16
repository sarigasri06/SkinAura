import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-rose-50">
      <Navbar />
      <main className="flex-1 bg-rose-50">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

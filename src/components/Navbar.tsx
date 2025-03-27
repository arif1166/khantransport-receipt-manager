
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Receipt, Plus, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 p-4 transition-all duration-300 animate-slide-up',
        scrolled ? 'glass-morphism mb-4 mx-4 rounded-full' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex justify-center items-center space-x-12">
        <Link
          to="/"
          className={cn(
            'flex flex-col items-center transition-all duration-200 transform',
            location.pathname === '/' ? 'text-contransport-600 scale-110' : 'text-gray-500',
            'hover:text-contransport-600 active:scale-95'
          )}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link
          to="/create"
          className="bg-contransport-600 text-white p-4 rounded-full shadow-lg transform transition-transform hover:bg-contransport-700 active:scale-95 -mt-8"
        >
          <Plus className="w-6 h-6" />
        </Link>
        <Link
          to="/"
          className={cn(
            'flex flex-col items-center transition-all duration-200 transform',
            location.pathname.includes('/view') ? 'text-contransport-600 scale-110' : 'text-gray-500',
            'hover:text-contransport-600 active:scale-95'
          )}
        >
          <Receipt className="w-6 h-6" />
          <span className="text-xs mt-1">Receipts</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

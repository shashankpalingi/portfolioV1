import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'about', path: '/about' },
    { name: 'Work', path: '/work' },
    { name: 'Connect', path: '/connect' },
  ];

  return (
    <header className="relative z-50">
      <div className="container mx-auto px-4 py-0">
        <div className="relative flex items-center justify-center">
          {/* Logo on the left */}
          <Link
            to="/"
            className="absolute left-0 text-[#F2E3CF] font-heading text-2xl font-bold hover:text-primary transition-colors duration-200"
          >
            :)
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex items-center gap-12">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-[#F2E3CF] hover:text-[#E35342] transition-colors duration-200 font-paragraph text-2xl font-medium ${location.pathname === item.path ? 'text-[#E35342]' : ''
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button - on the right */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden absolute right-0 text-[#F2E3CF] hover:text-[#E35342] transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-[#F2E3CF] hover:text-[#E35342] transition-colors duration-200 font-paragraph text-xl ${location.pathname === item.path ? 'text-[#E35342]' : ''
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

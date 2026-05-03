import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Quienes somos', path: '/quienes-somos' },
    { 
      name: 'Proyectos', 
      path: '/projects',
      subItems: [
        { name: "Te leo, te dibujo", path: "/projects#te-leo-te-dibujo" },
        { name: "Biblioteca comunitaria Insectaria", path: "/projects#insectaria" },
        { name: "Bibliomóvil", path: "/projects#bibliomovil" },
        { name: "Talleres Crea-Expresa", path: "/projects#talleres" },
        { name: "Colaboraciones", path: "/projects#colaboraciones" },
      ]
    },
    { name: 'Como colaborar', path: '/como-colaborar' },
    { name: 'Contacto', path: '/contact' },
  ];

  const handleSubmenuClick = (e, path) => {
    e.preventDefault();
    const [pathname, hash] = path.split('#');
    
    const scrollToSection = () => {
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    };

    if (location.pathname !== pathname) {
      navigate(pathname);
      scrollToSection();
    } else {
      scrollToSection();
    }
  };

  const navClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    scrolled || !isHomePage
      ? 'bg-brand-background/80 backdrop-blur-sm shadow-md'
      : 'bg-gradient-to-b from-black/40 to-transparent'
  }`;
  
  const linkColor = scrolled || !isHomePage ? 'text-brand-text' : 'text-white';
  const hoverColor = scrolled || !isHomePage ? 'hover:text-brand-pink' : 'hover:text-brand-pink';
  const activeColor = scrolled || !isHomePage ? 'text-brand-pink' : 'text-brand-pink';

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={navClasses}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex-shrink-0 flex items-center">
            <img src="/images/logo.png" alt="Ansiosxs Nuevas Lecturas Logo" className="h-8 sm:h-10" />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) =>
              item.subItems ? (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger asChild>
                    <Link
                      to={item.path}
                      className={`flex items-center font-medium transition-colors duration-200 ${hoverColor} ${
                        location.pathname.startsWith(item.path)
                          ? activeColor
                          : linkColor
                      }`}
                    >
                      {item.name}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </Link>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {item.subItems.map((subItem) => (
                      <DropdownMenuItem key={subItem.name} asChild>
                        <a href={subItem.path} onClick={(e) => handleSubmenuClick(e, subItem.path)} className="cursor-pointer">
                          {subItem.name}
                        </a>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-medium transition-colors duration-200 ${hoverColor} ${
                    location.pathname === item.path
                      ? activeColor
                      : linkColor
                  }`}
                >
                  {item.name}
                </Link>
              )
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className={`md:hidden ${linkColor} ${hoverColor}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-background/95 backdrop-blur-sm border-t border-brand-purple/20"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.path}
                    className={`block px-3 py-2 rounded-md font-medium transition-colors duration-200 ${
                      !item.subItems && location.pathname === item.path
                        ? 'text-brand-pink bg-brand-pink/10'
                        : 'text-brand-text hover:text-brand-pink hover:bg-brand-pink/10'
                    }`}
                    onClick={() => {if (!item.subItems) setIsOpen(false)}}
                  >
                    {item.name}
                  </Link>
                  {item.subItems && (
                    <div className="pl-4 mt-2 space-y-1 border-l-2 border-brand-purple/20">
                      {item.subItems.map((subItem) => (
                         <a href={subItem.path} onClick={(e) => {handleSubmenuClick(e, subItem.path); setIsOpen(false);}} key={subItem.name} className="block px-3 py-2 rounded-md font-medium text-sm text-brand-text/80 hover:text-brand-pink hover:bg-brand-pink/10">
                          {subItem.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
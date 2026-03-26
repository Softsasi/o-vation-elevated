import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Experiences", path: "/experiences" },
  { label: "Team", path: "/team" },
  { label: "Testimonials", path: "/testimonials" },
  { label: "Contact", path: "/contact" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isDark = isHome;

  return (
    <>
      {/* Floating menu button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed top-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${
          isDark
            ? "bg-ovation-offwhite/10 hover:bg-ovation-offwhite/20 text-ovation-offwhite"
            : "bg-primary/5 hover:bg-primary/10 text-foreground"
        } backdrop-blur-sm`}
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Logo */}
      <Link
        to="/"
        className={`fixed top-6 left-8 z-50 font-display text-xl tracking-wide transition-colors duration-300 ${
          isDark ? "text-ovation-offwhite" : "text-foreground"
        }`}
      >
        O-Vation
      </Link>

      {/* Full-screen overlay menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-primary flex items-center justify-center"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center text-primary-foreground hover:text-accent transition-colors"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>

            <nav className="flex flex-col items-center gap-2">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`font-display text-4xl md:text-6xl transition-colors duration-300 hover:text-accent ${
                      location.pathname === item.path
                        ? "text-accent"
                        : "text-primary-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end text-primary-foreground/50 text-label">
              <span>Montreal, Canada</span>
              <span>info@o-vation.com</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;

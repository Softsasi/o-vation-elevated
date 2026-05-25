import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LOCALES } from "@/i18n";

const Navigation = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isDark = isHome;

  const navItems = [
    { label: t("nav.home"), path: "/" },
    { label: t("nav.about"), path: "/about" },
    { label: t("nav.services"), path: "/services" },
    { label: t("nav.experiences"), path: "/experiences" },
    { label: t("nav.team"), path: "/team" },
    { label: t("nav.testimonials"), path: "/testimonials" },
    { label: t("nav.contact"), path: "/contact" },
  ];

  const localeLabels: Record<string, string> = { en: "EN", fr: "FR", bn: "বাংলা" };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed top-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${
          isDark
            ? "bg-ovation-offwhite/10 hover:bg-ovation-offwhite/20 text-ovation-offwhite"
            : "bg-primary/5 hover:bg-primary/10 text-foreground"
        } backdrop-blur-sm`}
        aria-label={t("nav.openMenu")}
      >
        <Menu size={20} />
      </button>

      <Link
        to="/"
        className={`fixed top-6 left-8 z-50 font-display text-xl tracking-wide transition-colors duration-300 ${
          isDark ? "text-ovation-offwhite" : "text-foreground"
        }`}
      >
        O-Vation
      </Link>

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
              aria-label={t("nav.closeMenu")}
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
                      location.pathname === item.path ? "text-accent" : "text-primary-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Language switcher */}
            <div className="absolute top-1/2 -translate-y-1/2 left-8 flex flex-col gap-3">
              {SUPPORTED_LOCALES.map((lng) => (
                <button
                  key={lng}
                  onClick={() => i18n.changeLanguage(lng)}
                  className={`text-label text-left transition-colors ${
                    i18n.resolvedLanguage === lng ? "text-accent" : "text-primary-foreground/40 hover:text-primary-foreground"
                  }`}
                >
                  {localeLabels[lng]}
                </button>
              ))}
            </div>

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

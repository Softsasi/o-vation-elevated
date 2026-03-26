import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <h3 className="font-display text-3xl mb-4">O-Vation</h3>
            <p className="text-primary-foreground/60 font-body text-sm leading-relaxed max-w-xs">
              Where vision meets experience. A boutique firm specializing in luxury concierge, business development, and curated experiences.
            </p>
          </div>

          <div>
            <h4 className="text-label text-primary-foreground/40 mb-6">Navigation</h4>
            <nav className="flex flex-col gap-3">
              {[
                { label: "About", path: "/about" },
                { label: "Services", path: "/services" },
                { label: "Experiences", path: "/experiences" },
                { label: "Team", path: "/team" },
                { label: "Contact", path: "/contact" },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="text-label text-primary-foreground/40 mb-6">Get in Touch</h4>
            <div className="flex flex-col gap-3 text-sm text-primary-foreground/70">
              <a href="mailto:info@o-vation.com" className="hover:text-accent transition-colors">
                info@o-vation.com
              </a>
              <a href="tel:+15141234567" className="hover:text-accent transition-colors">
                +1 (514) 123-4567
              </a>
              <p>Montreal, QC, Canada</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/40 text-xs">
            © {new Date().getFullYear()} O-Vation. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-primary-foreground/40">
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

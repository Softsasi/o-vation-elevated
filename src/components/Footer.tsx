import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const { error } = await supabase.functions.invoke("subscribe-newsletter", {
        body: { email, locale: i18n.resolvedLanguage || "en" },
      });
      if (error) throw error;
      toast({ title: t("newsletter.success"), description: t("newsletter.successDesc") });
      setEmail("");
    } catch (err: any) {
      toast({ title: t("newsletter.error"), description: t("newsletter.errorDesc"), variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <h3 className="font-display text-3xl mb-4">O-Vation</h3>
            <p className="text-primary-foreground/60 font-body text-sm leading-relaxed max-w-sm mb-8">
              {t("footer.tagline")}
            </p>
            <form onSubmit={subscribe} className="flex gap-2 max-w-sm">
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("footer.emailPlaceholder")}
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
              />
              <button
                type="submit"
                disabled={busy}
                className="bg-accent text-accent-foreground px-4 text-label whitespace-nowrap hover:bg-accent/90 disabled:opacity-50"
              >
                {t("footer.subscribe")}
              </button>
            </form>
          </div>

          <div>
            <h4 className="text-label text-primary-foreground/40 mb-6">{t("footer.navigation")}</h4>
            <nav className="flex flex-col gap-3">
              {[
                { label: t("nav.about"), path: "/about" },
                { label: t("nav.services"), path: "/services" },
                { label: t("nav.experiences"), path: "/experiences" },
                { label: t("nav.team"), path: "/team" },
                { label: t("nav.contact"), path: "/contact" },
              ].map((item) => (
                <Link key={item.path} to={item.path} className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="text-label text-primary-foreground/40 mb-6">{t("footer.getInTouch")}</h4>
            <div className="flex flex-col gap-3 text-sm text-primary-foreground/70">
              <a href="mailto:info@o-vation.com" className="hover:text-accent transition-colors">info@o-vation.com</a>
              <a href="tel:+15141234567" className="hover:text-accent transition-colors">+1 (514) 123-4567</a>
              <p>Montreal, QC, Canada</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/40 text-xs">
            © {new Date().getFullYear()} O-Vation. {t("footer.rights")}
          </p>
          <div className="flex gap-6 text-xs text-primary-foreground/40">
            <a href="#" className="hover:text-accent transition-colors">{t("footer.privacy")}</a>
            <a href="#" className="hover:text-accent transition-colors">{t("footer.terms")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { useState } from "react";
import { Send, MapPin, Mail, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import ScrollReveal from "@/components/ScrollReveal";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const { error } = await supabase.functions.invoke("submit-contact", {
        body: { ...form, locale: i18n.resolvedLanguage || "en" },
      });
      if (error) throw error;
      toast({ title: t("contact.success"), description: t("contact.successDesc") });
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err: any) {
      toast({ title: t("contact.error"), description: t("contact.errorDesc"), variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <SEO
        title="Contact O-Vation | Request a Consultation"
        description="Get in touch with O-Vation to discuss luxury concierge, curated experiences, business development, or high-end events."
        path="/contact"
      />
      <section className="bg-primary pt-32 pb-20 px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <p className="text-label text-accent mb-4">Contact</p>
            <h1 className="font-display text-5xl md:text-7xl text-primary-foreground leading-tight max-w-4xl">
              Let's Start a{" "}
              <em className="text-accent">Conversation</em>
            </h1>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-background py-28 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Form */}
          <ScrollReveal>
            <div>
              <h2 className="font-display text-3xl text-foreground mb-2">Request a Consultation</h2>
              <p className="text-muted-foreground font-body mb-10">
                Tell us about your vision. We'll respond within 24 hours.
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="contact-name" className="text-label text-muted-foreground mb-2 block">Full Name</label>
                  <Input
                    id="contact-name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="bg-secondary border-0 h-12 font-body"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="text-label text-muted-foreground mb-2 block">Email</label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="bg-secondary border-0 h-12 font-body"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="contact-phone" className="text-label text-muted-foreground mb-2 block">Phone (optional)</label>
                  <Input
                    id="contact-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="bg-secondary border-0 h-12 font-body"
                    placeholder="+1 (514) ..."
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="text-label text-muted-foreground mb-2 block">Your Vision</label>
                  <Textarea
                    id="contact-message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    rows={5}
                    className="bg-secondary border-0 font-body resize-none"
                    placeholder="Tell us about your project, event, or how we can help..."
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-3 bg-accent text-accent-foreground px-8 py-4 text-label hover:bg-accent/90 transition-colors w-full justify-center"
                >
                  Send Message <Send size={14} />
                </button>
              </form>
            </div>
          </ScrollReveal>

          {/* Contact Info */}
          <ScrollReveal delay={0.2}>
            <div className="lg:pt-16">
              <div className="space-y-10">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <MapPin size={18} className="text-accent" />
                    <h3 className="text-label text-foreground">Location</h3>
                  </div>
                  <p className="text-muted-foreground font-body ml-8">
                    Montreal, Quebec, Canada<br />
                    Available globally
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Mail size={18} className="text-accent" />
                    <h3 className="text-label text-foreground">Email</h3>
                  </div>
                  <a href="mailto:info@o-vation.com" className="text-muted-foreground font-body ml-8 hover:text-accent transition-colors">
                    info@o-vation.com
                  </a>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Phone size={18} className="text-accent" />
                    <h3 className="text-label text-foreground">Phone</h3>
                  </div>
                  <a href="tel:+15141234567" className="text-muted-foreground font-body ml-8 hover:text-accent transition-colors">
                    +1 (514) 123-4567
                  </a>
                </div>
              </div>

              <div className="mt-16 p-8 bg-primary text-primary-foreground">
                <h3 className="font-display text-2xl mb-3">Prefer a Direct Conversation?</h3>
                <p className="text-primary-foreground/60 font-body text-sm leading-relaxed">
                  For urgent inquiries or to schedule a call with Audrey directly, please email with "Priority" in the subject line. We aim to respond within 2 hours during business hours.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;

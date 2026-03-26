import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-primary pt-32 pb-20 px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <p className="text-label text-accent mb-4">About</p>
            <h1 className="font-display text-5xl md:text-7xl text-primary-foreground leading-tight max-w-4xl">
              Built on Relationships,{" "}
              <em className="text-accent">Driven by Excellence</em>
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Audrey — Founder */}
      <section className="bg-background py-28 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=800&fit=crop"
                alt="Audrey — Founder & President of O-Vation"
                className="w-full h-[500px] lg:h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div>
              <p className="text-label text-accent mb-4">Founder & President</p>
              <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">Audrey</h2>
              <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
                <p>
                  With over a decade of experience in luxury hospitality, business development, and event curation, Audrey founded O-Vation with a singular vision: to create a firm where every detail matters and every experience is a masterpiece.
                </p>
                <p>
                  Her extensive network spans the worlds of finance, fashion, arts, and entertainment — enabling O-Vation to open doors that others can't. Audrey's approach is deeply personal: she believes the best results come from genuine relationships and an intimate understanding of each client's aspirations.
                </p>
                <p>
                  Fluent in both French and English, Audrey brings a European sensibility to North American ambition — a combination that defines everything O-Vation does.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-secondary py-28 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-label text-accent mb-6">Our Philosophy</p>
            <h2 className="font-display text-3xl md:text-5xl text-foreground leading-tight mb-10">
              We believe that extraordinary results require extraordinary attention.
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
            {[
              { title: "Discretion", desc: "Your privacy is sacred. We operate with absolute confidentiality in every engagement." },
              { title: "Precision", desc: "Every detail is deliberate. From concept to execution, nothing is left to chance." },
              { title: "Connection", desc: "We build bridges between people, brands, and possibilities that create lasting value." },
            ].map((val, i) => (
              <ScrollReveal key={val.title} delay={i * 0.15}>
                <div className="text-left">
                  <h3 className="font-display text-2xl text-foreground mb-3">{val.title}</h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">{val.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-20 px-8 text-center">
        <ScrollReveal>
          <h2 className="font-display text-3xl md:text-4xl text-primary-foreground mb-6">
            Want to learn more?
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-accent text-accent-foreground px-8 py-4 text-label hover:bg-accent/90 transition-colors"
          >
            Get in Touch <ArrowRight size={14} />
          </Link>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
};

export default About;

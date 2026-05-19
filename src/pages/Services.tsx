import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";

const pillars = [
  {
    title: "Luxury Concierge",
    description: "From securing impossible reservations to arranging private jets and bespoke travel itineraries — we handle the details so you can savor the moment.",
    deliverables: ["Personal lifestyle management", "Travel curation & booking", "VIP access & reservations", "Relocation assistance"],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
  },
  {
    title: "Business Development",
    description: "We connect ambitious companies with the right partners, opportunities, and markets. Our network is your competitive advantage.",
    deliverables: ["Strategic partnerships", "Market entry strategy", "Network introductions", "Brand positioning"],
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop",
  },
  {
    title: "Curated Experiences",
    description: "We design immersive experiences that transcend expectations — from private art viewings to culinary journeys with world-renowned chefs.",
    deliverables: ["Private cultural experiences", "Culinary journeys", "Wellness retreats", "Adventure travel"],
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop",
  },
  {
    title: "High-End Events",
    description: "Whether it's a 20-person dinner or a 2,000-person gala, we bring the same level of obsessive attention to every detail.",
    deliverables: ["Corporate galas & conferences", "Private celebrations", "Product launches", "Venue sourcing & design"],
    image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600&h=400&fit=crop",
  },
];

const Services = () => {
  return (
    <div>
      <section className="bg-primary pt-32 pb-20 px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <p className="text-label text-accent mb-4">Services</p>
            <h1 className="font-display text-5xl md:text-7xl text-primary-foreground leading-tight max-w-4xl">
              Everything You Need,{" "}
              <em className="text-accent">Nothing You Don't</em>
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Service Pillars */}
      {pillars.map((pillar, i) => (
        <section
          key={pillar.title}
          className={`${i % 2 === 0 ? "bg-background" : "bg-secondary"} py-24 px-8`}
        >
          <div className={`max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${i % 2 !== 0 ? "lg:direction-rtl" : ""}`}>
            <ScrollReveal className={i % 2 !== 0 ? "lg:order-2" : ""}>
              <img
                src={pillar.image}
                alt={pillar.title}
                className="w-full h-[360px] object-cover"
                loading="lazy"
              />
            </ScrollReveal>
            <ScrollReveal delay={0.2} className={i % 2 !== 0 ? "lg:order-1" : ""}>
              <div>
                <p className="text-label text-accent mb-3">0{i + 1}</p>
                <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">{pillar.title}</h2>
                <p className="text-muted-foreground font-body leading-relaxed mb-6">{pillar.description}</p>
                <ul className="space-y-2">
                  {pillar.deliverables.map((d) => (
                    <li key={d} className="text-sm text-muted-foreground font-body flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-accent" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </section>
      ))}

      {/* Approach */}
      <section className="bg-primary py-28 px-8">
        <div className="max-w-5xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-label text-accent mb-4">Our Approach</p>
            <h2 className="font-display text-4xl md:text-5xl text-primary-foreground mb-16">
              Three Steps to Extraordinary
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { step: "01", title: "Discovery", desc: "We listen deeply. Understanding your vision, values, and aspirations is the foundation of everything we do." },
              { step: "02", title: "Design", desc: "We craft a tailored strategy — every element intentional, every detail considered, every outcome anticipated." },
              { step: "03", title: "Delivery", desc: "We execute with precision and passion. The result? An experience that exceeds even your highest expectations." },
            ].map((s, i) => (
              <ScrollReveal key={s.step} delay={i * 0.15}>
                <div>
                  <span className="text-accent font-display text-5xl block mb-4">{s.step}</span>
                  <h3 className="font-display text-2xl text-primary-foreground mb-3">{s.title}</h3>
                  <p className="text-primary-foreground/50 font-body text-sm leading-relaxed">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background py-20 px-8 text-center">
        <ScrollReveal>
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
            Let's discuss your vision.
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-accent text-accent-foreground px-8 py-4 text-label hover:bg-accent/90 transition-colors"
          >
            Start a Conversation <ArrowRight size={14} />
          </Link>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
};

export default Services;

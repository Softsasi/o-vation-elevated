import { motion } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight, Quote } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import Footer from "@/components/Footer";

const services = [
  {
    title: "Luxury Concierge",
    description: "Bespoke personal assistance for discerning individuals who demand nothing but the extraordinary.",
    icon: "✦",
  },
  {
    title: "Business Development",
    description: "Strategic partnerships, network expansion, and relationship-driven growth for ambitious brands.",
    icon: "◆",
  },
  {
    title: "Curated Experiences",
    description: "Immersive, one-of-a-kind moments designed to surprise, delight, and leave lasting impressions.",
    icon: "◇",
  },
  {
    title: "High-End Events",
    description: "From intimate gatherings to grand soirées — flawlessly executed, always unforgettable.",
    icon: "○",
  },
];

const experiences = [
  {
    title: "Private Vineyard Retreat",
    category: "Travel",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop",
  },
  {
    title: "Corporate Gala Evening",
    category: "Events",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&h=400&fit=crop",
  },
  {
    title: "Mediterranean Yacht Charter",
    category: "Travel",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop",
  },
  {
    title: "Executive Leadership Summit",
    category: "Business",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
  },
  {
    title: "Art Basel Private Tour",
    category: "Experiences",
    image: "https://images.unsplash.com/photo-1578301978693-85fa9fd0c546?w=600&h=400&fit=crop",
  },
  {
    title: "Exclusive Ski Lodge Weekend",
    category: "Travel",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop",
  },
];

const Index = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="overflow-x-hidden">
      {/* HERO — Full-screen dark */}
      <section className="relative h-screen flex flex-col items-center justify-center bg-primary overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center z-10 px-6"
        >
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-primary-foreground mb-6 leading-[0.9]">
            <span className="gold-shimmer">O-Vation</span>
            <span className="sr-only"> — Luxury Concierge & Business Development</span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-primary-foreground/60 text-label mb-4"
          >
            Where Vision Meets Experience
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-primary-foreground/40 font-body text-sm max-w-md mx-auto"
          >
            Luxury concierge · Business development · Curated experiences
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 flex flex-col items-center gap-2"
        >
          <span className="text-primary-foreground/30 text-label text-[10px]">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
          >
            <ArrowDown size={16} className="text-primary-foreground/30" />
          </motion.div>
        </motion.div>

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/50 pointer-events-none" />
      </section>

      {/* INTRODUCTION — Transition section */}
      <section className="bg-background py-32 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-label text-accent mb-8">Est. Montreal</p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-8">
              We don't just plan experiences —{" "}
              <em className="text-accent">we orchestrate the extraordinary.</em>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              O-Vation is a boutique firm built on the art of connection, precision, and an unwavering commitment to excellence. We serve individuals and organizations who refuse to settle for ordinary.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.5}>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-label text-accent hover:text-foreground transition-colors group"
            >
              Discover Our Story
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* SERVICES — 4 pillars */}
      <section className="bg-primary py-28 px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <p className="text-label text-accent mb-4">What We Do</p>
            <h2 className="font-display text-4xl md:text-5xl text-primary-foreground mb-16">
              Four Pillars of Excellence
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-primary-foreground/10">
            {services.map((service, i) => (
              <ScrollReveal key={service.title} delay={i * 0.1}>
                <div className="bg-primary p-10 md:p-14 group hover:bg-primary-foreground/5 transition-colors duration-500 h-full">
                  <span className="text-accent text-2xl mb-6 block">{service.icon}</span>
                  <h3 className="font-display text-2xl md:text-3xl text-primary-foreground mb-4">
                    {service.title}
                  </h3>
                  <p className="text-primary-foreground/50 font-body leading-relaxed">
                    {service.description}
                  </p>
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-2 mt-6 text-label text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    Explore Our Services <ArrowRight size={12} />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* HORIZONTAL PORTFOLIO SCROLLER */}
      <section className="bg-background py-28 px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex justify-between items-end mb-12">
              <div>
                <p className="text-label text-accent mb-4">Portfolio</p>
                <h2 className="font-display text-4xl md:text-5xl text-foreground">
                  Featured Experiences
                </h2>
              </div>
              <Link
                to="/experiences"
                className="hidden md:inline-flex items-center gap-2 text-label text-accent hover:text-foreground transition-colors group"
              >
                View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto hide-scrollbar px-8 pb-4 cursor-grab active:cursor-grabbing"
        >
          {experiences.map((exp, i) => (
            <ScrollReveal key={exp.title} delay={i * 0.1}>
              <div className="flex-shrink-0 w-[350px] md:w-[420px] group">
                <div className="relative overflow-hidden mb-4">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-[280px] md:h-[320px] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/0 transition-colors duration-500" />
                </div>
                <p className="text-label text-accent mb-2">{exp.category}</p>
                <h3 className="font-display text-xl text-foreground">{exp.title}</h3>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="md:hidden text-center mt-8">
          <Link
            to="/experiences"
            className="inline-flex items-center gap-2 text-label text-accent"
          >
            View All Experiences <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="bg-secondary py-28 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <Quote size={32} className="text-accent mx-auto mb-8" />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <blockquote className="font-display text-2xl md:text-4xl text-foreground leading-relaxed mb-8 italic">
              "Working with O-Vation transformed what we thought was possible. They didn't just meet our expectations — they redefined them entirely."
            </blockquote>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <div>
              <p className="text-foreground font-body font-medium">Marie-Claire Dubois</p>
              <p className="text-muted-foreground text-sm">CEO, Maison Laurent</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-32 px-8">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-label text-accent mb-6">Ready?</p>
            <h2 className="font-display text-4xl md:text-6xl text-primary-foreground mb-8 leading-tight">
              Let's Create Something{" "}
              <em className="gold-shimmer">Extraordinary</em>
            </h2>
            <p className="text-primary-foreground/50 font-body mb-10 max-w-lg mx-auto">
              Whether you're envisioning a private retreat, a landmark event, or a strategic partnership — we're here to make it happen.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-accent text-accent-foreground px-8 py-4 text-label hover:bg-accent/90 transition-colors"
            >
              Request a Consultation
              <ArrowRight size={14} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;

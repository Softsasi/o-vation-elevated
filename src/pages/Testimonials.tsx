import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";

const testimonials = [
  {
    quote: "Working with O-Vation transformed what we thought was possible. They didn't just meet our expectations — they redefined them entirely.",
    name: "Marie-Claire Dubois",
    title: "CEO, Maison Laurent",
  },
  {
    quote: "From the first meeting, it was clear that O-Vation operates on an entirely different level. The attention to detail, the creativity, the flawless execution — it was extraordinary.",
    name: "James Chen",
    title: "Partner, Atlas Capital",
  },
  {
    quote: "They curated an experience for our 25th anniversary that our guests are still talking about two years later. O-Vation doesn't just plan events — they create memories.",
    name: "Sophie & Laurent Beaumont",
    title: "Private Clients",
  },
  {
    quote: "Our product launch was the most talked-about event of the season, thanks to O-Vation's vision and execution. They understand what luxury brands need.",
    name: "Elena Vasquez",
    title: "CMO, Atelier Noir",
  },
  {
    quote: "O-Vation introduced us to partners that completely changed our growth trajectory. Their network and strategic thinking are unmatched.",
    name: "Thomas Berger",
    title: "Founder, NordHaus Group",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <div>
      <SEO
        title="Testimonials | What Clients Say About O-Vation"
        description="Hear from clients of O-Vation about curated experiences, flawless events, and transformative business partnerships."
        path="/testimonials"
      />
      <section className="bg-primary pt-32 pb-20 px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <p className="text-label text-accent mb-4">Testimonials</p>
            <h1 className="font-display text-5xl md:text-7xl text-primary-foreground leading-tight max-w-4xl">
              In Their{" "}
              <em className="text-accent">Own Words</em>
            </h1>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-background py-28 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Quote size={40} className="text-accent mx-auto mb-10" />

          <div className="relative min-h-[250px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <blockquote className="font-display text-2xl md:text-4xl text-foreground leading-relaxed mb-8 italic">
                  "{testimonials[current].quote}"
                </blockquote>
                <p className="text-foreground font-body font-medium">{testimonials[current].name}</p>
                <p className="text-muted-foreground text-sm">{testimonials[current].title}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={prev}
              className="w-12 h-12 flex items-center justify-center border border-border hover:bg-secondary transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-label text-muted-foreground">
              {current + 1} / {testimonials.length}
            </span>
            <button
              onClick={next}
              className="w-12 h-12 flex items-center justify-center border border-border hover:bg-secondary transition-colors"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Testimonials;

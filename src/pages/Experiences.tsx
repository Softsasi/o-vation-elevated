import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";

const categories = ["All", "Travel", "Events", "Business", "Experiences"];

const allExperiences = [
  { title: "Private Vineyard Retreat", category: "Travel", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop", description: "An exclusive weekend in Napa Valley with private tastings and chef-prepared dinners under the stars." },
  { title: "Corporate Gala Evening", category: "Events", image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&h=400&fit=crop", description: "A 500-guest black-tie gala featuring world-class entertainment and Michelin-starred dining." },
  { title: "Mediterranean Yacht Charter", category: "Travel", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop", description: "Seven days aboard a luxury yacht, exploring hidden coves and private islands across the Côte d'Azur." },
  { title: "Executive Leadership Summit", category: "Business", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop", description: "A curated two-day summit connecting C-suite leaders across industries for strategic dialogue." },
  { title: "Art Basel Private Tour", category: "Experiences", image: "https://images.unsplash.com/photo-1578301978693-85fa9fd0c546?w=600&h=400&fit=crop", description: "Exclusive behind-the-scenes access to premier galleries with private curator-led tours." },
  { title: "Exclusive Ski Lodge Weekend", category: "Travel", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop", description: "A private chalet in the Swiss Alps with personal chef, spa services, and helicopter skiing." },
  { title: "Product Launch Soirée", category: "Events", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop", description: "An immersive brand activation event with 300 influencers and press in a transformed warehouse space." },
  { title: "Strategic Partnership Retreat", category: "Business", image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&h=400&fit=crop", description: "A three-day retreat facilitating high-level partnerships between complementary luxury brands." },
  { title: "Private Chef Experience", category: "Experiences", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop", description: "An intimate evening with a Michelin-starred chef creating a bespoke 12-course tasting menu." },
];

const Experiences = () => {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? allExperiences : allExperiences.filter((e) => e.category === filter);

  return (
    <div>
      <SEO
        title="Experiences & Portfolio | O-Vation"
        description="A curated portfolio of luxury travel, events, business retreats, and bespoke experiences delivered by O-Vation."
        path="/experiences"
      />
      <section className="bg-primary pt-32 pb-20 px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <p className="text-label text-accent mb-4">Portfolio</p>
            <h1 className="font-display text-5xl md:text-7xl text-primary-foreground leading-tight max-w-4xl">
              Curated Moments,{" "}
              <em className="text-accent">Lasting Impressions</em>
            </h1>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-background py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="sr-only">Our Portfolio</h2>
          {/* Filters */}
          <ScrollReveal>
            <div className="flex flex-wrap gap-3 mb-16">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`text-label px-5 py-2 transition-all duration-300 ${
                    filter === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:bg-primary/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((exp, i) => (
              <ScrollReveal key={exp.title} delay={i * 0.08}>
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden mb-4">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className="w-full h-[280px] object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                      <p className="text-primary-foreground font-body text-sm leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                  <p className="text-label text-accent mb-1">{exp.category}</p>
                  <h3 className="font-display text-xl text-foreground">{exp.title}</h3>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Experiences;

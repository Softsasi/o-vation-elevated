import ScrollReveal from "@/components/ScrollReveal";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";

const team = [
  {
    name: "Audrey",
    role: "Founder & President",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop",
    bio: "Visionary leader with a decade of experience in luxury hospitality and strategic partnerships.",
  },
  {
    name: "Isabelle Moreau",
    role: "Director of Events",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop",
    bio: "Former Four Seasons event director, Isabelle brings impeccable taste and flawless execution to every occasion.",
  },
  {
    name: "Marc-Antoine Leclerc",
    role: "Head of Business Development",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    bio: "With deep roots in finance and tech, Marc-Antoine connects our clients to transformative opportunities.",
  },
  {
    name: "Sophie Chen",
    role: "Concierge Manager",
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=500&fit=crop",
    bio: "Sophie's resourcefulness and global network ensure that no request is ever too ambitious.",
  },
];

const Team = () => {
  return (
    <div>
      <SEO
        title="Team | The People Behind O-Vation"
        description="Meet Audrey and the team behind O-Vation — luxury concierge specialists, event directors, and business development experts."
        path="/team"
      />
      <section className="bg-primary pt-32 pb-20 px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <p className="text-label text-accent mb-4">Team</p>
            <h1 className="font-display text-5xl md:text-7xl text-primary-foreground leading-tight max-w-4xl">
              The People Behind{" "}
              <em className="text-accent">the Magic</em>
            </h1>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-background py-28 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="sr-only">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {team.map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 0.1}>
                <div className="group">
                  <div className="relative overflow-hidden mb-5">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-[340px] object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
                      <p className="text-primary-foreground font-body text-sm leading-relaxed">{member.bio}</p>
                    </div>
                  </div>
                  <h3 className="font-display text-xl text-foreground">{member.name}</h3>
                  <p className="text-muted-foreground text-sm font-body">{member.role}</p>
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

export default Team;

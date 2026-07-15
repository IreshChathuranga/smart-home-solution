"use client";

import { useState } from "react";

const PROJECTS = [
  {
    id: 1,
    title: "The Atherton Sanctuary",
    type: "estate",
    typeName: "Heritage Estate",
    size: "12,400 sq ft",
    desc: "A sprawling modern compound with comprehensive circadian lighting tracking, geothermal heating integration, hidden home theater, and full perimeter thermal security.",
    specs: ["240 Lighting Zones", "Invisible Audio", "Thermal Surveillance", "Local AuraCore Matrix"],
    emoji: "🏰"
  },
  {
    id: 2,
    title: "Malibu Ocean Crest",
    type: "villa",
    typeName: "Coastal Villa",
    size: "8,500 sq ft",
    desc: "A blufftop residence utilizing smart solar shades tracking solar pathing, marine-grade outdoor audio arrays, dynamic EV chargers, and emergency microgrid battery integration.",
    specs: ["Solar Blind Tracking", "Marine Audio System", "Dual EV Relay System", "Solar Battery Grid"],
    emoji: "🏡"
  },
  {
    id: 3,
    title: "Palo Alto Smart Loft",
    type: "penthouse",
    typeName: "Modern Penthouse",
    size: "3,800 sq ft",
    desc: "High-density urban luxury space featuring biometric access keypads, plaster-in invisible speakers, and real-time ventilation recycling with CO2 air purity sensors.",
    specs: ["Biometric Entry Gate", "Plaster-In Acoustics", "Linear Air Diffusers", "PM2.5 IAQ Filters"],
    emoji: "🏢"
  },
  {
    id: 4,
    title: "Aspen Alpine Hideaway",
    type: "estate",
    typeName: "Heritage Estate",
    size: "9,800 sq ft",
    desc: "A ski chalet with sub-slab snow melting relays, zoned radiant hydronic heating, voice command arrays, and automated vacation simulator lighting schedules.",
    specs: ["Sub-Slab Heat Relays", "Voice Sensor Arrays", "Hydronic Comfort Loop", "Intruder Simulation"],
    emoji: "🏔️"
  },
  {
    id: 5,
    title: "Bel Air Ridge Villa",
    type: "villa",
    typeName: "Luxury Villa",
    size: "7,200 sq ft",
    desc: "A hillside glass villa showcasing automated vertical blinds, high-lumen laser projectors, invisible acoustic zones, and local face recognition network cameras.",
    specs: ["Vertical Shading", "Laser Projector Hub", "Local AI Face Filters", "Invisible Subwoofers"],
    emoji: "🏖️"
  }
];

export default function Projects() {
  const [filter, setFilter] = useState("all");

  const filteredProjects = filter === "all"
    ? PROJECTS
    : PROJECTS.filter((p) => p.type === filter);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <section className="section" style={{
        padding: "4rem 0 2rem 0",
        textAlign: "center",
        borderBottom: "1px solid var(--border-card)"
      }}>
        <div className="container">
          <h1 className="gradient-text" style={{ fontSize: "3rem", marginBottom: "1rem" }}>
            Our Completed Projects
          </h1>
          <p style={{ maxWidth: "600px", margin: "0 auto" }}>
            Browse through our portfolio of custom residential integrations, showcasing the highest level of craftsmanship, design, and engineering stability.
          </p>
        </div>
      </section>

      {/* Gallery & Filter */}
      <section className="section" style={{ flex: 1, background: "rgba(219, 39, 119, 0.03)" }}>
        <div className="container">
          
          {/* Filter Bar */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginBottom: "3.5rem",
            flexWrap: "wrap"
          }}>
            {["all", "estate", "villa", "penthouse"].map((type) => {
              const isActive = filter === type;
              return (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className="btn"
                  style={{
                    padding: "0.5rem 1.2rem",
                    fontSize: "0.85rem",
                    background: isActive ? "var(--gradient-brand)" : "rgba(255, 255, 255, 0.03)",
                    color: "#fff",
                    border: isActive ? "none" : "1px solid var(--border-card)",
                    textTransform: "capitalize",
                    cursor: "pointer"
                  }}
                >
                  {type === "all" ? "All Projects" : `${type}s`}
                </button>
              );
            })}
          </div>

          {/* Grid list */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2.5rem"
          }}>
            {filteredProjects.map((p) => (
              <div key={p.id} className="glass-card" style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                position: "relative",
                overflow: "hidden"
              }}>
                <div>
                  {/* Category badge */}
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1.2rem"
                  }}>
                    <span style={{
                      fontSize: "0.75rem",
                      background: "rgba(6, 182, 212, 0.1)",
                      color: "var(--cyan)",
                      padding: "0.3rem 0.6rem",
                      borderRadius: "0.3rem",
                      fontWeight: "700",
                      textTransform: "uppercase"
                    }}>
                      {p.typeName}
                    </span>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{p.size}</span>
                  </div>

                  <h3 style={{
                    fontSize: "1.4rem",
                    color: "var(--text-primary)",
                    marginBottom: "1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                  }}>
                    <span style={{ fontSize: "1.6rem" }}>{p.emoji}</span> {p.title}
                  </h3>

                  <p style={{
                    fontSize: "0.9rem",
                    lineHeight: "1.6",
                    marginBottom: "1.8rem"
                  }}>
                    {p.desc}
                  </p>
                </div>

                {/* Specs tag list */}
                <div>
                  <div style={{
                    borderTop: "1px solid rgba(255,255,255,0.05)",
                    paddingTop: "1.2rem"
                  }}>
                    <h4 style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.6rem", textTransform: "uppercase" }}>System Highlights</h4>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                      {p.specs.map((spec, i) => (
                        <span key={i} style={{
                          fontSize: "0.7rem",
                          background: "rgba(255, 255, 255, 0.02)",
                          border: "1px solid var(--border-card)",
                          color: "var(--text-primary)",
                          padding: "0.2rem 0.5rem",
                          borderRadius: "0.2rem"
                        }}>
                          ✦ {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA Box */}
      <section className="section" style={{
        textAlign: "center",
        borderTop: "1px solid var(--border-card)",
        background: "rgba(219, 39, 119, 0.05)"
      }}>
        <div className="container">
          <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Have an Architectural Blueprint Ready?</h2>
          <p style={{ maxWidth: "600px", margin: "0 auto 2rem auto" }}>
            Submit your construction files or custom layout ideas to our engineers. Let's build your proposal together.
          </p>
          <a href="/contact" className="btn btn-primary">
            Submit Your Blueprint
          </a>
        </div>
      </section>
    </div>
  );
}

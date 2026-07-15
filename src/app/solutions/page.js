"use client";

import { useState } from "react";

const SOLUTIONS = [
  {
    id: "lighting",
    title: "Smart Lighting & Shades",
    subtitle: "Architectural Illumination & Natural Light Control",
    icon: "💡",
    benefits: ["Circadian Health Optimization", "Solar Heat Regulation", "Mood Customization"],
    features: [
      "Dynamic daylight harvesting adjusts interior lighting based on ambient exterior sunshine.",
      "Motorized architectural shades trace the solar path automatically to reduce heat gain and protect interior finishes.",
      "Engraved keypad scene selectors customized to your exact room configurations.",
      "Automated vacation cycles replay your household's actual light routines to deter intruders."
    ],
    summary: "Set the mood and harness natural light. Our custom-designed fixtures and automated drapery work in complete synergy to elevate aesthetics, improve comfort, and harvest solar energy."
  },
  {
    id: "climate",
    title: "Climate & Air Purification",
    subtitle: "Zoned Ecological Environmental Controls",
    icon: "🌡️",
    benefits: ["Extreme Zoned Precision", "Energy Footprint Mitigation", "Medical-Grade Filtration"],
    features: [
      "Discrete invisible linear diffusers provide quiet air distribution without disrupting ceiling designs.",
      "Zoned humidity and temperature regulation aligned with occupant sleep and occupancy sensors.",
      "Real-time indoor air quality (IAQ) sensors tracking volatile organic compounds, PM2.5, and CO2.",
      "Integrates smoothly with steam humidifiers, sub-slab floor heating, and geothermal pumps."
    ],
    summary: "Inhale pure comfort. We craft invisible climate zones that learn your daily patterns and optimize thermal comfort while actively cleansing the indoor air of pollutants."
  },
  {
    id: "cinema",
    title: "Audiophile Sound & Cinema",
    subtitle: "Custom-Engineered Architectural Acoustics",
    icon: "🔊",
    benefits: ["Flawless Spatial Acoustics", "Seamless Integration", "Ultra-High Definition Video"],
    features: [
      "Bespoke private cinemas calibrated according to strict Dolby Atmos and THX layout geometries.",
      "Invisible plaster-in-wall speakers deliver audiophile performance without visual clutter.",
      "Centralized media distribution hubs feed raw uncompressed 4K video to any display in the estate.",
      "Calibrated soundproof panel matrices and isolated acoustic flooring systems."
    ],
    summary: "Immerse yourself in high-fidelity. From structural soundproofing to hidden acoustic design, we construct audio-visual landscapes that disappear into your walls while filling the room."
  },
  {
    id: "security",
    title: "Surveillance & Perimeter Armor",
    subtitle: "Encrypted Localized Artificial Security Systems",
    icon: "🛡️",
    benefits: ["Local-First Data Privacy", "Zero False Alarms", "Robust Physical Integration"],
    features: [
      "Local neural processors identify cars, delivery couriers, and human profiles without cloud latency.",
      "Encrypted storage servers located in a secured structural rack room rather than shared public databases.",
      "Invisible laser tripwire arrays trigger notifications and floodlights before a boundary breach occurs.",
      "Fully integrated fire, water leakage, and gas valve safety shut-off systems."
    ],
    summary: "Fortify your legacy with local encryption. Our security platforms do not rely on standard cloud servers, assuring absolute privacy while defending your property with active AI perimeter armor."
  }
];

export default function Solutions() {
  const [activeTab, setActiveTab] = useState(SOLUTIONS[0]);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {/* Page Header */}
      <section className="section" style={{
        padding: "4rem 0 2rem 0",
        textAlign: "center",
        borderBottom: "1px solid var(--border-card)"
      }}>
        <div className="container">
          <h1 className="gradient-text" style={{ fontSize: "3rem", marginBottom: "1rem" }}>
            Tailored Automation Solutions
          </h1>
          <p style={{ maxWidth: "600px", margin: "0 auto" }}>
            Explore how we fuse luxury design with top-tier technology. Every solution is custom-engineered to match the unique architecture of your home.
          </p>
        </div>
      </section>

      {/* Main Tab System Section */}
      <section className="section" style={{ flex: 1, background: "rgba(219, 39, 119, 0.03)" }}>
        <div className="container">
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 2.5fr",
            gap: "3rem",
            alignItems: "start",
            // Responsive adjust
            "@media (max-width: 768px)": {
              gridTemplateColumns: "1fr"
            }
          }}>
            {/* Sidebar Tabs */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.8rem",
              background: "rgba(255, 255, 255, 0.02)",
              padding: "1rem",
              borderRadius: "1rem",
              border: "1px solid var(--border-card)"
            }}>
              {SOLUTIONS.map((sol) => {
                const isActive = activeTab.id === sol.id;
                return (
                  <button
                    key={sol.id}
                    onClick={() => setActiveTab(sol)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      padding: "1.2rem 1rem",
                      background: isActive ? "var(--bg-card-hover)" : "transparent",
                      border: "none",
                      borderLeft: isActive ? "3px solid var(--cyan)" : "3px solid transparent",
                      borderRadius: "0.5rem",
                      color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                      cursor: "pointer",
                      textAlign: "left",
                      fontSize: "1rem",
                      fontWeight: "600",
                      transition: "all 0.2s ease",
                      outline: "none"
                    }}
                  >
                    <span style={{ fontSize: "1.5rem" }}>{sol.icon}</span>
                    <span>{sol.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Content Pane */}
            <div className="glass-card" style={{
              padding: "3rem",
              borderColor: "var(--border-card)",
              position: "relative",
              overflow: "hidden"
            }}>
              {/* Background ambient light */}
              <div style={{
                position: "absolute",
                top: "-10%",
                right: "-10%",
                width: "250px",
                height: "250px",
                background: "var(--cyan-glow)",
                filter: "blur(80px)",
                borderRadius: "50%",
                zIndex: -1,
                pointerEvents: "none"
              }} />

              {/* Title & Header */}
              <div style={{
                display: "inline-block",
                padding: "0.3rem 0.8rem",
                borderRadius: "0.5rem",
                background: "rgba(6, 182, 212, 0.1)",
                color: "var(--cyan)",
                fontSize: "0.8rem",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "1rem"
              }}>
                {activeTab.icon} Technology Stack
              </div>

              <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem", color: "var(--text-primary)" }}>
                {activeTab.title}
              </h2>
              <p style={{ color: "var(--cyan)", fontWeight: "500", marginBottom: "1.5rem", fontSize: "1.1rem" }}>
                {activeTab.subtitle}
              </p>
              
              <p style={{ fontSize: "1.05rem", lineHeight: "1.7", marginBottom: "2rem", color: "var(--text-secondary)" }}>
                {activeTab.summary}
              </p>

              {/* Bullet Points */}
              <div style={{ marginBottom: "2rem" }}>
                <h3 style={{ fontSize: "1.2rem", color: "var(--text-primary)", marginBottom: "1rem" }}>
                  Engineering Features:
                </h3>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {activeTab.features.map((feat, index) => (
                    <li key={index} style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.8rem",
                      fontSize: "0.95rem"
                    }}>
                      <span style={{ color: "var(--cyan)", marginTop: "0.2rem" }}>✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Core Benefits Tags */}
              <div>
                <h3 style={{ fontSize: "1.2rem", color: "var(--text-primary)", marginBottom: "1rem" }}>
                  Primary Value Drivers:
                </h3>
                <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
                  {activeTab.benefits.map((ben, index) => (
                    <span key={index} style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid var(--border-card)",
                      padding: "0.5rem 1rem",
                      borderRadius: "2rem",
                      fontSize: "0.85rem",
                      color: "var(--text-primary)",
                      fontWeight: "500"
                    }}>
                      ✦ {ben}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Call to Action banner */}
      <section className="section" style={{
        textAlign: "center",
        borderTop: "1px solid var(--border-card)",
        background: "rgba(219, 39, 119, 0.05)"
      }}>
        <div className="container">
          <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Looking for a customized engineering layout?</h2>
          <p style={{ maxWidth: "600px", margin: "0 auto 2rem auto" }}>
            Provide details of your project to our wizard system. Get an automated component recommendation list in minutes.
          </p>
          <a href="/services" className="btn btn-primary">
            Launch Services Builder
          </a>
        </div>
      </section>
    </div>
  );
}

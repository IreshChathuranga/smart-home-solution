"use client";

const BRAND_CATEGORIES = [
  {
    title: "Core Automation & Control",
    desc: "Certified system hubs that handle lighting, climate processing, and physical device coordination with sub-millisecond local network latency.",
    brands: [
      { name: "Crestron Electronics", level: "Authorized Elite Dealer", icon: "⌨️", detail: "Specializing in commercial-grade wiring networks, architectural keypads, and enterprise-grade local processors." },
      { name: "Lutron Homeworks", level: "Platinum Integration Partner", icon: "💡", detail: "The standard for luxury home lighting and motorized shades. Supporting custom-engraved Palladiom controls." },
      { name: "Savant Systems", level: "Design Tier Partner", icon: "📱", detail: "High-end user interfaces, architectural remotes, and native luxury Apple-home integration schemes." }
    ]
  },
  {
    title: "Audiophile Sound & Cinema Displays",
    desc: "Uncompressed multi-room audio matrices, invisible plaster-in speakers, and high-lumen laser projectors calibrated for private home theaters.",
    brands: [
      { name: "Bowers & Wilkins", level: "Certified Sound Dealer", icon: "🔊", detail: "Reference-grade spatial acoustics and architectural custom-install invisible subwoofers." },
      { name: "Sony Premium Cinema", level: "Gold Integration Partner", icon: "🎬", detail: "Native 4K HDR laser projectors and custom micro-LED panels engineered for dedicated media rooms." },
      { name: "Sonos Matrix", level: "Core Audio Partner", icon: "🎵", detail: "Central multi-room sound streaming grids, syncing high-resolution audio across all internal zones." }
    ]
  }
];

export default function Partners() {
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
            Certified Partner Brands
          </h1>
          <p style={{ maxWidth: "600px", margin: "0 auto" }}>
            We collaborate exclusively with elite hardware manufacturers, delivering certified programming integrations that guarantee long-term stability and luxury performance.
          </p>
        </div>
      </section>

      {/* Brand grids */}
      <section className="section" style={{ background: "rgba(219, 39, 119, 0.03)" }}>
        <div className="container">
          
          {BRAND_CATEGORIES.map((cat, idx) => (
            <div key={idx} style={{ marginBottom: "5rem" }}>
              <div style={{ marginBottom: "2.5rem" }}>
                <h2 style={{ fontSize: "1.8rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                  {cat.title}
                </h2>
                <p style={{ maxWidth: "700px" }}>{cat.desc}</p>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "2rem"
              }}>
                {cat.brands.map((brand, bIdx) => (
                  <div key={bIdx} className="glass-card" style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%"
                  }}>
                    <div>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        marginBottom: "1.2rem"
                      }}>
                        <div style={{
                          width: "3rem",
                          height: "3rem",
                          borderRadius: "0.5rem",
                          background: "rgba(6, 182, 212, 0.08)",
                          border: "1px solid rgba(6, 182, 212, 0.15)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1.5rem"
                        }}>
                          {brand.icon}
                        </div>
                        <div>
                          <h3 style={{ fontSize: "1.15rem", color: "var(--text-primary)", fontWeight: "600" }}>{brand.name}</h3>
                          <span style={{ fontSize: "0.75rem", color: "var(--cyan)", fontWeight: "600" }}>{brand.level}</span>
                        </div>
                      </div>
                      <p style={{ fontSize: "0.88rem", lineHeight: "1.6" }}>
                        {brand.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Industry collaborations box */}
          <div className="glass-card" style={{
            background: "rgba(255,255,255,0.01)",
            padding: "3rem",
            textAlign: "center",
            maxWidth: "800px",
            margin: "0 auto",
            borderColor: "var(--border-card)"
          }}>
            <h2 style={{ fontSize: "1.8rem", color: "var(--text-primary)", marginBottom: "1rem" }}>
              Collaborating with Architects & Builders
            </h2>
            <p style={{ fontSize: "0.95rem", lineHeight: "1.7", marginBottom: "1.5rem" }}>
              We understand that luxury automation requires deep coordination during initial framing. Our engineering teams provide detailed CAD layouts, cable schedules, and wall-box dimensions directly to your architecture and construction teams, ensuring flawless alignment on opening day.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", fontSize: "0.8rem", color: "var(--cyan)", fontWeight: "600" }}>
              <span>✦ Architecture CAD Integration</span>
              <span>✦ Electrical Engineering Layouts</span>
              <span>✦ Project Site Inspections</span>
            </div>
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
          <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Are You an Architect or Designer?</h2>
          <p style={{ maxWidth: "600px", margin: "0 auto 2rem auto" }}>
            Contact our trade integration desk to request device specification sheets, DWG symbols, or to set up a private firm review session.
          </p>
          <a href="/contact" className="btn btn-primary">
            Contact Trade Integration Desk
          </a>
        </div>
      </section>
    </div>
  );
}

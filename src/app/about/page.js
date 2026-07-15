"use client";

const TEAM = [
  { name: "Marcus Vance", role: "Founder & Principal Systems Architect", bio: "Former aerospace hardware engineer. Over 15 years developing secure localized control networks.", avatar: "📡" },
  { name: "Sophia Sterling", role: "Director of Architectural Integration", bio: "Renowned residential spatial designer. Focuses on hidden tech integration and custom shading.", avatar: "📐" },
  { name: "Dr. Emily Chen", role: "Lead Security Systems Engineer", bio: "Ph.D. in Cryptography. Architect of Inovex's local-first offline firewall system.", avatar: "🔐" }
];

const TIMELINE = [
  { year: "2018", title: "Engineering Genesis", desc: "Inovex is founded in Palo Alto by aerospace and security engineers dissatisfied with commercial cloud systems." },
  { year: "2020", title: "AuraCore Hub Launch", desc: "Patented local-first automation server released, offering offline automation capabilities and local video analysis." },
  { year: "2022", title: "Showroom Expansions", desc: "Established private experience design centers in Malibu, California and Atherton for architects and clients." },
  { year: "2025", title: "Inovex Enterprise", desc: "Integration network exceeds 1,500 custom home deployments worldwide, maintaining zero data breaches." }
];

export default function About() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {/* Header Banner */}
      <section className="section" style={{
        padding: "4rem 0 2rem 0",
        textAlign: "center",
        borderBottom: "1px solid var(--border-card)"
      }}>
        <div className="container">
          <h1 className="gradient-text" style={{ fontSize: "3rem", marginBottom: "1rem" }}>
            The Architecture of Luxury
          </h1>
          <p style={{ maxWidth: "600px", margin: "0 auto" }}>
            Learn about Inovex's journey to craft the world's most secure, reliable, and invisible home automation systems.
          </p>
        </div>
      </section>

      {/* Main Philosophy Cards */}
      <section className="section" style={{ background: "rgba(219, 39, 119, 0.03)" }}>
        <div className="container">
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            alignItems: "center",
            marginBottom: "5rem"
          }}>
            <div>
              <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem", color: "var(--text-primary)" }}>
                Our Core Philosophy
              </h2>
              <p style={{ fontSize: "1.05rem", lineHeight: "1.7", marginBottom: "1.2rem" }}>
                At Inovex, we believe luxury technology should be felt, not seen. Every screen, keypad, and sensor is meticulously selected to complement your interior space without adding clutter.
              </p>
              <p style={{ fontSize: "1.05rem", lineHeight: "1.7" }}>
                Crucially, we reject the notion that convenience requires sacrificing privacy. By building our systems on local-first processing architectures, your home's footage and routines never leave your physical boundaries.
              </p>
            </div>
            
            <div className="glass-card" style={{ padding: "3rem", borderLeft: "4px solid var(--cyan)" }}>
              <h3 style={{ fontSize: "1.3rem", color: "var(--cyan)", marginBottom: "1rem" }}>
                Our 3 Engineering Principles
              </h3>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <li>
                  <strong style={{ color: "var(--text-primary)", display: "block", marginBottom: "0.2rem" }}>1. Local-First Processing</strong>
                  <span style={{ fontSize: "0.9rem" }}>No reliance on external cloud services. Lighting, climate, and security operate with sub-millisecond local latency.</span>
                </li>
                <li>
                  <strong style={{ color: "var(--text-primary)", display: "block", marginBottom: "0.2rem" }}>2. Architectural Blending</strong>
                  <span style={{ fontSize: "0.9rem" }}>Hardware is designed to vanish. Plaster-in speakers, hidden subwoofers, and customizable metal switches.</span>
                </li>
                <li>
                  <strong style={{ color: "var(--text-primary)", display: "block", marginBottom: "0.2rem" }}>3. Custom Tailored Coding</strong>
                  <span style={{ fontSize: "0.9rem" }}>No generic templates. Every script, integration path, and sensor routine is custom-programmed for your household.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Timeline Section */}
          <div style={{ marginBottom: "5rem" }}>
            <h2 className="gradient-text" style={{ fontSize: "2rem", textAlign: "center", marginBottom: "3rem" }}>
              Our Timeline
            </h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "2rem"
            }}>
              {TIMELINE.map((item, index) => (
                <div key={index} className="glass-card" style={{ position: "relative" }}>
                  <div style={{
                    fontSize: "2rem",
                    fontWeight: "800",
                    color: "var(--cyan)",
                    marginBottom: "0.5rem",
                    fontFamily: "var(--font-display)"
                  }}>
                    {item.year}
                  </div>
                  <h4 style={{ color: "var(--text-primary)", marginBottom: "0.5rem", fontSize: "1.05rem" }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: "0.85rem", lineHeight: "1.5" }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Team Members */}
          <div>
            <h2 className="gradient-text" style={{ fontSize: "2rem", textAlign: "center", marginBottom: "3rem" }}>
              Leadership Team
            </h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "2.5rem"
            }}>
              {TEAM.map((member, index) => (
                <div key={index} className="glass-card" style={{ textAlign: "center", padding: "2.5rem 1.5rem" }}>
                  <div style={{
                    width: "4rem",
                    height: "4rem",
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid var(--border-card)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2rem",
                    marginBottom: "1.2rem"
                  }}>
                    {member.avatar}
                  </div>
                  <h3 style={{ color: "var(--text-primary)", fontSize: "1.2rem", marginBottom: "0.3rem" }}>
                    {member.name}
                  </h3>
                  <div style={{ color: "var(--cyan)", fontSize: "0.8rem", fontWeight: "600", marginBottom: "1.2rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    {member.role}
                  </div>
                  <p style={{ fontSize: "0.85rem", lineHeight: "1.6" }}>
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Showroom CTA */}
      <section className="section" style={{
        textAlign: "center",
        borderTop: "1px solid var(--border-card)",
        background: "rgba(219, 39, 119, 0.05)"
      }}>
        <div className="container">
          <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Visit Our Physical Showrooms</h2>
          <p style={{ maxWidth: "600px", margin: "0 auto 2rem auto" }}>
            Experience architectural lighting, sound stages, and motorized shading integrations first-hand. Private appointments available daily.
          </p>
          <a href="/contact" className="btn btn-primary">
            Schedule Showroom Tour
          </a>
        </div>
      </section>
    </div>
  );
}

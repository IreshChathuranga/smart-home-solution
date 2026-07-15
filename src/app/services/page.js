"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const PROPERTY_TYPES = [
  { id: "apartment", name: "Premium Apartment", multiplier: 1.0, icon: "🏢", desc: "Single level modern loft or luxury condo." },
  { id: "villa", name: "Luxury Villa", multiplier: 1.5, icon: "🏡", desc: "Multi-level detached luxury residential home." },
  { id: "estate", name: "Heritage Estate", multiplier: 2.2, icon: "🏰", desc: "Large gated compound, high architectural complexity." }
];

const SIZE_RANGES = [
  { id: "small", name: "Up to 3,000 sq ft", cost: 1.0, label: "Compact Estate" },
  { id: "medium", name: "3,000 - 7,000 sq ft", cost: 1.6, label: "Medium Estate" },
  { id: "large", name: "7,000 - 15,000+ sq ft", cost: 2.5, label: "Grand Estate" }
];

const FEATURES = [
  { id: "lighting", name: "Smart Lighting & Shades", price: 6500, icon: "💡", desc: "Automated shades, circadian daylight harvesting, custom panel switches." },
  { id: "climate", name: "Climate & Air Purification", price: 4200, icon: "🌡️", desc: "Linear diffusers, IAQ sensors, smart zoned thermostat controls." },
  { id: "audio", name: "Audiophile Multi-Room A/V", price: 9500, icon: "🔊", desc: "Dolby Atmos ceiling setups, invisible speaker panels, central matrix." },
  { id: "security", name: "AI surveillance & Armored Locks", price: 7800, icon: "🛡️", desc: "Locally encrypted camera feeds, lidar borders, automated doors." },
  { id: "power", name: "Smart Grid & Solar Harvesting", price: 12000, icon: "⚡", desc: "Battery bank interface, auto power transfers, EV charging relays." }
];

export default function Services() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [property, setProperty] = useState(PROPERTY_TYPES[0]);
  const [size, setSize] = useState(SIZE_RANGES[0]);
  const [selectedFeatures, setSelectedFeatures] = useState([FEATURES[0], FEATURES[1]]);

  // Calculate pricing
  const baseCost = selectedFeatures.reduce((sum, f) => sum + f.price, 0);
  const calculatedLow = Math.round(baseCost * property.multiplier * size.cost);
  const calculatedHigh = Math.round(calculatedLow * 1.25);

  const toggleFeature = (feat) => {
    if (selectedFeatures.some((f) => f.id === feat.id)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f.id !== feat.id));
    } else {
      setSelectedFeatures([...selectedFeatures, feat]);
    }
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFinalSubmit = () => {
    const featureIds = selectedFeatures.map((f) => f.name).join(", ");
    const quoteQuery = `prop=${encodeURIComponent(property.name)}&size=${encodeURIComponent(size.name)}&feats=${encodeURIComponent(featureIds)}&price=${calculatedLow}-${calculatedHigh}`;
    router.push(`/contact?${quoteQuery}`);
  };

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
            Design Your Smart Home Services
          </h1>
          <p style={{ maxWidth: "600px", margin: "0 auto" }}>
            Specify your architectural layout, select systems of interest, and build your customized proposal in minutes.
          </p>
        </div>
      </section>

      {/* Main wizard interface */}
      <section className="section" style={{ flex: 1, background: "rgba(219, 39, 119, 0.03)" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          
          {/* Progress bar */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "3rem",
            position: "relative"
          }}>
            <div style={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              height: "2px",
              background: "rgba(255,255,255,0.05)",
              zIndex: 1
            }} />
            <div style={{
              position: "absolute",
              top: "50%",
              left: 0,
              width: `${((step - 1) / 3) * 100}%`,
              height: "2px",
              background: "var(--cyan)",
              transition: "width 0.3s ease",
              zIndex: 2
            }} />

            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className="flex-center"
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "50%",
                  background: step >= num ? "rgba(6, 182, 212, 0.15)" : "#0c1527",
                  border: step >= num ? "2px solid var(--cyan)" : "2px solid var(--border-card)",
                  zIndex: 3,
                  fontWeight: "700",
                  color: step >= num ? "var(--cyan)" : "var(--text-secondary)",
                  transition: "all 0.3s ease",
                  cursor: "pointer"
                }}
                onClick={() => setStep(num)}
              >
                {num}
              </div>
            ))}
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1.8fr 1fr",
            gap: "2.5rem",
            alignItems: "start",
            // Responsive break
            "@media (max-width: 768px)": {
              gridTemplateColumns: "1fr"
            }
          }}>
            
            {/* Left Hand: Interactive Step Panels */}
            <div className="glass-card" style={{ padding: "2.5rem", minHeight: "380px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              
              {/* STEP 1: Property Type */}
              {step === 1 && (
                <div>
                  <h2 style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                    Step 1: Property Architecture
                  </h2>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "2rem" }}>
                    Select the architectural footprint that match your estate structure.
                  </p>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {PROPERTY_TYPES.map((p) => {
                      const isSel = property.id === p.id;
                      return (
                        <div
                          key={p.id}
                          onClick={() => setProperty(p)}
                          style={{
                            padding: "1.2rem",
                            borderRadius: "0.8rem",
                            background: isSel ? "rgba(6, 182, 212, 0.05)" : "rgba(255,255,255,0.02)",
                            border: isSel ? "1px solid var(--cyan)" : "1px solid var(--border-card)",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                            transition: "all 0.2s"
                          }}
                        >
                          <span style={{ fontSize: "2rem" }}>{p.icon}</span>
                          <div>
                            <h4 style={{ color: isSel ? "var(--cyan)" : "var(--text-primary)", fontSize: "1rem", fontWeight: "600" }}>{p.name}</h4>
                            <p style={{ fontSize: "0.8rem" }}>{p.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2: Size Range */}
              {step === 2 && (
                <div>
                  <h2 style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                    Step 2: Property Size
                  </h2>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "2rem" }}>
                    Square footage influences layout cabling runs and localized processor counts.
                  </p>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {SIZE_RANGES.map((s) => {
                      const isSel = size.id === s.id;
                      return (
                        <div
                          key={s.id}
                          onClick={() => setSize(s)}
                          style={{
                            padding: "1.2rem",
                            borderRadius: "0.8rem",
                            background: isSel ? "rgba(6, 182, 212, 0.05)" : "rgba(255,255,255,0.02)",
                            border: isSel ? "1px solid var(--cyan)" : "1px solid var(--border-card)",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            transition: "all 0.2s"
                          }}
                        >
                          <div>
                            <h4 style={{ color: isSel ? "var(--cyan)" : "var(--text-primary)", fontSize: "1rem", fontWeight: "600" }}>{s.name}</h4>
                            <p style={{ fontSize: "0.8rem" }}>{s.label}</p>
                          </div>
                          {isSel && <span style={{ color: "var(--cyan)" }}>●</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 3: Features */}
              {step === 3 && (
                <div>
                  <h2 style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                    Step 3: Choose Automations
                  </h2>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
                    Select features you wish to integrate. You can customize details later during consultation.
                  </p>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                    {FEATURES.map((f) => {
                      const isSel = selectedFeatures.some((item) => item.id === f.id);
                      return (
                        <div
                          key={f.id}
                          onClick={() => toggleFeature(f)}
                          style={{
                            padding: "1rem",
                            borderRadius: "0.8rem",
                            background: isSel ? "rgba(6, 182, 212, 0.05)" : "rgba(255,255,255,0.02)",
                            border: isSel ? "1px solid var(--cyan)" : "1px solid var(--border-card)",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                            transition: "all 0.2s"
                          }}
                        >
                          <span style={{ fontSize: "1.5rem" }}>{f.icon}</span>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <h4 style={{ color: isSel ? "var(--cyan)" : "var(--text-primary)", fontSize: "0.95rem", fontWeight: "600" }}>{f.name}</h4>
                              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: "600" }}>+${f.price.toLocaleString()}</span>
                            </div>
                            <p style={{ fontSize: "0.78rem" }}>{f.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 4: Estimate Summary */}
              {step === 4 && (
                <div>
                  <h2 style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                    Step 4: Your Automation Proposal
                  </h2>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
                    Based on your requirements, we recommend the following bespoke configuration.
                  </p>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div style={{ background: "rgba(255,255,255,0.02)", padding: "1rem", borderRadius: "0.5rem", border: "1px solid var(--border-card)" }}>
                        <span style={{ color: "var(--text-muted)", fontSize: "0.75rem", display: "block" }}>Property Design</span>
                        <span style={{ fontWeight: "600", fontSize: "0.9rem" }}>{property.name}</span>
                      </div>
                      <div style={{ background: "rgba(255,255,255,0.02)", padding: "1rem", borderRadius: "0.5rem", border: "1px solid var(--border-card)" }}>
                        <span style={{ color: "var(--text-muted)", fontSize: "0.75rem", display: "block" }}>Footprint Size</span>
                        <span style={{ fontWeight: "600", fontSize: "0.9rem" }}>{size.name}</span>
                      </div>
                    </div>

                    <div style={{ background: "rgba(255,255,255,0.02)", padding: "1.2rem", borderRadius: "0.8rem", border: "1px solid var(--border-card)" }}>
                      <h4 style={{ fontSize: "0.85rem", color: "var(--text-primary)", marginBottom: "0.8rem" }}>Selected Systems ({selectedFeatures.length})</h4>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                        {selectedFeatures.map((f) => (
                          <span key={f.id} style={{
                            fontSize: "0.75rem",
                            background: "rgba(6, 182, 212, 0.1)",
                            color: "var(--cyan)",
                            padding: "0.3rem 0.6rem",
                            borderRadius: "0.3rem",
                            border: "1px solid rgba(6, 182, 212, 0.2)"
                          }}>
                            {f.icon} {f.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Back / Next Buttons */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "2.5rem",
                paddingTop: "1.5rem",
                borderTop: "1px solid rgba(255,255,255,0.05)"
              }}>
                <button
                  onClick={handleBack}
                  disabled={step === 1}
                  className="btn btn-secondary"
                  style={{
                    padding: "0.6rem 1.2rem",
                    fontSize: "0.85rem",
                    opacity: step === 1 ? 0.3 : 1,
                    cursor: step === 1 ? "not-allowed" : "pointer"
                  }}
                >
                  ← Back
                </button>
                {step < 4 ? (
                  <button
                    onClick={handleNext}
                    className="btn btn-primary"
                    style={{ padding: "0.6rem 1.2rem", fontSize: "0.85rem" }}
                  >
                    Continue →
                  </button>
                ) : (
                  <button
                    onClick={handleFinalSubmit}
                    className="btn btn-primary"
                    style={{ padding: "0.6rem 1.5rem", fontSize: "0.85rem", background: "var(--gradient-cyan-indigo)" }}
                  >
                    Confirm & Request Consultation
                  </button>
                )}
              </div>
            </div>

            {/* Right Hand: Estimate Calculator Display Panel */}
            <div className="glass-card" style={{
              position: "sticky",
              top: "6.5rem",
              background: "rgba(9, 13, 25, 0.8)",
              borderColor: "var(--border-card-active)",
              boxShadow: "var(--shadow-glow)"
            }}>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem", color: "var(--text-primary)" }}>
                Investment Summary
              </h3>
              
              <div style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "1rem", marginBottom: "1rem" }}>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>ESTIMATED PROJECT BUDGET</div>
                <div style={{ fontSize: "1.6rem", fontWeight: "700", color: "var(--cyan)", margin: "0.2rem 0" }}>
                  ${calculatedLow.toLocaleString()} - ${calculatedHigh.toLocaleString()}
                </div>
                <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Hardware & professional programming integration included.</div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", fontSize: "0.8rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Base Integration</span>
                  <span style={{ color: "var(--text-primary)", fontWeight: "600" }}>${baseCost.toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Property Factor ({property.name})</span>
                  <span style={{ color: "var(--text-primary)", fontWeight: "600" }}>x{property.multiplier.toFixed(1)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Scale Factor ({size.label})</span>
                  <span style={{ color: "var(--text-primary)", fontWeight: "600" }}>x{size.cost.toFixed(1)}</span>
                </div>
              </div>

              <div style={{
                marginTop: "1.5rem",
                padding: "0.8rem",
                background: "rgba(255, 255, 255, 0.02)",
                borderRadius: "0.5rem",
                fontSize: "0.72rem",
                lineHeight: "1.5",
                color: "var(--text-muted)"
              }}>
                ✦ Projections are estimates based on standard residential wiring and typical device numbers. Exact scopes depend on formal architectural audits.
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

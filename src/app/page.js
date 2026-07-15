"use client";

import { useState, useRef, useEffect } from "react";

// MODES array for Simulator
const MODES = [
  {
    id: "cinema",
    name: "Cinema Night",
    icon: "🎬",
    color: "#ec4899",
    bgGlow: "rgba(236, 72, 153, 0.25)",
    lights: "Warm Pink / Dim 10%",
    temperature: "68°F (20.0°C)",
    shades: "Fully Closed (Blackout)",
    security: "Perimeter Armed",
    audio: "Dolby Atmos 7.1 Active",
    description: "The home theater screen powers on, architectural blackouts descend, and ambient lighting shifts to a cinematic soft pink-indigo glow."
  },
  {
    id: "lounge",
    name: "Evening Lounge",
    icon: "🍷",
    color: "#f472b6",
    bgGlow: "rgba(244, 114, 182, 0.25)",
    lights: "Warm Rose 45%",
    temperature: "72°F (22.2°C)",
    shades: "Sheer 50% Open",
    security: "Disarmed",
    audio: "Chill Jazz Multi-Room Active",
    description: "Relax after hours with warm indirect lighting, customizable climatic zones, and soft ambient jazz flowing through invisible ceiling speakers."
  },
  {
    id: "away",
    name: "Away / Secure",
    icon: "🛡️",
    color: "#be185d",
    bgGlow: "rgba(190, 24, 93, 0.25)",
    lights: "Off (Vacation Simulation)",
    temperature: "Eco Guard (78°F / 25.5°C)",
    shades: "All Closed",
    security: "Full Arm (AI Vision Engaged)",
    audio: "Muted",
    description: "All lights shut down, internal climate scales to energy-saving presets, and our AI security system begins active scanning."
  },
  {
    id: "eco",
    name: "Eco-Harvest",
    icon: "🍃",
    color: "#fbcfe8",
    bgGlow: "rgba(251, 207, 232, 0.25)",
    lights: "Daylight Harvesting Active",
    temperature: "Optimized (70°F / 21.1°C)",
    shades: "Auto-tracked (Solar Gain)",
    security: "Perimeter Armed",
    audio: "Standby",
    description: "Automated rollers raise to harvest natural sunlight, while HVAC power cycles intelligently to reduce grid reliance."
  }
];

// SERVICES constants
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

// PROJECTS constants
const PROJECTS = [
  {
    id: 1,
    title: "The Atherton Sanctuary",
    type: "estate",
    typeName: "Heritage Estate",
    size: "12,400 sq ft",
    desc: "A sprawling modern compound with comprehensive circadian lighting tracking, geothermal heating integration, hidden home theater, and full perimeter thermal security.",
    specs: ["240 Lighting Zones", "Invisible Audio", "Thermal Surveillance", "Local AuraCore Matrix"],
    image: "/project_atherton.png",
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
    image: "/project_malibu.png",
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
    image: "/project_paloalto.png",
    emoji: "🏢"
  }
];

// PARTNERS constants
const PARTNERS = [
  { name: "Crestron Electronics", level: "Authorized Elite Dealer", icon: "⌨️", detail: "Specializing in commercial-grade wiring networks, architectural keypads, and enterprise local processors." },
  { name: "Lutron Homeworks", level: "Platinum Partner", icon: "💡", detail: "The standard for luxury home lighting and motorized shades. Supporting custom-engraved Palladiom controls." },
  { name: "Savant Systems", level: "Design Tier Partner", icon: "📱", detail: "High-end user interfaces, architectural remotes, and native luxury Apple-home integration schemes." },
  { name: "Bowers & Wilkins", level: "Certified Sound Dealer", icon: "🔊", detail: "Reference-grade spatial acoustics and architectural custom-install invisible subwoofers." }
];

// FAQS constants
const FAQS = [
  {
    q: "Can Inovex be retrofitted into my existing home?",
    a: "We design and install both wired and highly stable encrypted hybrid wireless solutions. During your initial consultation, our engineering team assesses your home's layout to determine the optimal integration path without disrupting your architecture."
  },
  {
    q: "What happens to my smart home if the internet goes offline?",
    a: "Inovex is engineered with a local-first architecture. All core functions—including lighting controls, climate schedules, security sensors, and localized voice processing—continue to run seamlessly offline via your home automation hub."
  },
  {
    q: "How does Inovex protect my household's privacy?",
    a: "Your luxury smart home does not send telemetry or audio recordings to commercial servers. Your local hub processes camera streams and automation commands locally. All network communication is end-to-end encrypted."
  }
];

const HERO_IMAGES = [
  "/aura_smart_network_bg.png",
  "/hero_slider_1.png",
  "/hero_slider_2.png",
  "/hero_slider_3.png",
  "/hero_slider_4.png"
];

export default function Home() {
  const contactFormRef = useRef(null);

  // States
  const [currentHeroBg, setCurrentHeroBg] = useState(0);
  const [activeMode, setActiveMode] = useState(MODES[0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroBg((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);
  const [openFaq, setOpenFaq] = useState(null);
  
  // Configurator States
  const [servicesStep, setServicesStep] = useState(1);
  const [property, setProperty] = useState(PROPERTY_TYPES[0]);
  const [size, setSize] = useState(SIZE_RANGES[0]);
  const [selectedFeatures, setSelectedFeatures] = useState([FEATURES[0], FEATURES[1]]);
  
  // Projects state
  const [projectFilter, setProjectFilter] = useState("all");

  // Contact Form States
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  // Configurator Budget Pricing
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

  const handleConfiguratorSubmit = () => {
    const featureNames = selectedFeatures.map((f) => f.name).join(", ");
    setFormData((prev) => ({
      ...prev,
      message: `Hello Inovex Team,\n\nI just configured my system parameters:\n- Property Type: ${property.name}\n- Project Footprint: ${size.name}\n- Selected Integrations: ${featureNames}\n- Estimated Investment: $${calculatedLow.toLocaleString()} - $${calculatedHigh.toLocaleString()}\n\nI'd like to schedule our consultation call.`
    }));
    
    // Smooth scroll down to contact form
    contactFormRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill out all required fields.");
      return;
    }
    setSubmitted(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const filteredProjects = projectFilter === "all"
    ? PROJECTS
    : PROJECTS.filter((p) => p.type === projectFilter);

  return (
    <div>
      {/* 1. HERO SECTION (Automatic Parallax Image Slideshow) */}
      <section className="section" style={{
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid var(--border-card)",
        marginTop: "-4.5rem",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "8.5rem 0 4rem 0"
      }}>
        {/* Background Slideshow Images */}
        {HERO_IMAGES.map((imgUrl, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.12)), url('${imgUrl}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
              opacity: currentHeroBg === index ? 1 : 0,
              transition: "opacity 1.5s ease-in-out",
              zIndex: 1,
              pointerEvents: "none"
            }}
          />
        ))}
        {/* Ambient background glow */}
        <div style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "300px",
          background: "var(--primary-glow)",
          filter: "blur(120px)",
          borderRadius: "50%",
          zIndex: 2,
          pointerEvents: "none"
        }} />

        <div className="container" style={{ textAlign: "center", position: "relative", zIndex: 10, maxWidth: "800px" }}>
          <div style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            borderRadius: "5rem",
            padding: "3rem 2rem",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.04), 0 0 40px rgba(99, 102, 241, 0.18)",
            position: "relative",
            overflow: "hidden"
          }}>
            {/* Ambient inner neon blue spotlights */}
            <div style={{
              position: "absolute",
              top: "-60px",
              right: "-60px",
              width: "180px",
              height: "180px",
              background: "rgba(14, 165, 233, 0.22)",
              filter: "blur(60px)",
              borderRadius: "50%",
              pointerEvents: "none"
            }} />
            <div style={{
              position: "absolute",
              bottom: "-60px",
              left: "-60px",
              width: "180px",
              height: "180px",
              background: "rgba(99, 102, 241, 0.22)",
              filter: "blur(60px)",
              borderRadius: "50%",
              pointerEvents: "none"
            }} />

            {/* Inner Content */}
            <div style={{ position: "relative", zIndex: 3 }}>
              {/* <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(255, 255, 255, 0.5)",
                border: "1px solid rgba(219, 39, 119, 0.15)",
                padding: "0.4rem 1rem",
                borderRadius: "2rem",
                fontSize: "0.85rem",
                color: "var(--cyan)",
                marginBottom: "2rem",
                fontWeight: "500"
              }}>
                <span>✦</span> Bespoke Automation Systems
              </div> */}

              <h1 style={{
                background: "linear-gradient(135deg, #ffffff 40%, #fbcfe8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontSize: "clamp(2.3rem, 4.5vw, 4rem)",
                fontWeight: "800",
                maxWidth: "750px",
                margin: "0 auto 1.5rem auto",
                lineHeight: "1.1"
              }}>
                Intelligent Spaces.<br />
                <span className="gradient-brand-text">Bespoke Engineering.</span>
              </h1>

              <p style={{
                fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
                maxWidth: "600px",
                margin: "0 auto 2.5rem auto",
                color: "#ffffff",
                lineHeight: "1.6"
              }}>
                Luxury home automation systems that understand your routines, elevate your comfort, and secure your legacy with local-first encryption.
              </p>

              <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
                <button 
                  onClick={() => {
                    document.getElementById("services-section")?.scrollIntoView({ behavior: "smooth" });
                  }} 
                  className="btn btn-primary"
                >
                  Explore Services
                </button>
                <button 
                  onClick={() => {
                    contactFormRef.current?.scrollIntoView({ behavior: "smooth" });
                  }} 
                  className="btn btn-secondary"
                >
                  Book Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE SIMULATOR */}
      <section className="section" style={{
        background: "rgba(219, 39, 119, 0.03)",
        borderBottom: "1px solid var(--border-card)"
      }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 className="gradient-text" style={{ fontSize: "2.2rem", marginBottom: "1rem" }}>
              Experience the Automation
            </h2>
            <p style={{ maxWidth: "600px", margin: "0 auto" }}>
              Select a scene mode below to witness how Inovex transforms lighting, shading, temperature, and security in real time.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "3rem",
            alignItems: "stretch"
          }}>
            {/* Control Panel */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "2rem" }}>
              <div>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", color: "var(--text-primary)" }}>
                  Select Mode Preset
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  {MODES.map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setActiveMode(mode)}
                      className="glass-card"
                      style={{
                        padding: "1.2rem",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "0.5rem",
                        textAlign: "center",
                        borderColor: activeMode.id === mode.id ? activeMode.color : "var(--border-card)",
                        background: activeMode.id === mode.id ? "rgba(219, 39, 119, 0.04)" : "var(--bg-card)",
                        transform: activeMode.id === mode.id ? "scale(1.02)" : "none",
                        boxShadow: activeMode.id === mode.id ? `0 0 15px ${mode.bgGlow}` : "none"
                      }}
                    >
                      <span style={{ fontSize: "1.8rem" }}>{mode.icon}</span>
                      <span style={{ fontWeight: "600", fontSize: "0.9rem", color: activeMode.id === mode.id ? "var(--primary)" : "var(--text-primary)" }}>
                        {mode.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Status details card */}
              <div className="glass-card" style={{
                borderLeft: `4px solid ${activeMode.color}`,
                background: "var(--bg-card)"
              }}>
                <h4 style={{ color: "var(--primary)", marginBottom: "0.8rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span>{activeMode.icon}</span> {activeMode.name} Active
                </h4>
                <p style={{ fontSize: "0.9rem", marginBottom: "1.2rem", color: "var(--text-primary)" }}>
                  {activeMode.description}
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem", fontSize: "0.85rem" }}>
                  <div>
                    <span style={{ color: "var(--text-muted)", display: "block" }}>Luminance</span>
                    <span style={{ color: "var(--text-primary)", fontWeight: "600" }}>{activeMode.lights}</span>
                  </div>
                  <div>
                    <span style={{ color: "var(--text-muted)", display: "block" }}>Thermostat</span>
                    <span style={{ color: "var(--text-primary)", fontWeight: "600" }}>{activeMode.temperature}</span>
                  </div>
                  <div>
                    <span style={{ color: "var(--text-muted)", display: "block" }}>Shades</span>
                    <span style={{ color: "var(--text-primary)", fontWeight: "600" }}>{activeMode.shades}</span>
                  </div>
                  <div>
                    <span style={{ color: "var(--text-muted)", display: "block" }}>Security status</span>
                    <span style={{ color: "var(--text-primary)", fontWeight: "600" }}>{activeMode.security}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Smart Room Graphic Display */}
            <div className="glass-card" style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
              padding: "2rem",
              background: "rgba(255, 255, 255, 0.8)",
              borderColor: "var(--border-card)"
            }}>
              {/* Dynamic room color tint overlay */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: activeMode.bgGlow,
                transition: "background 0.5s ease-in-out",
                pointerEvents: "none",
                zIndex: 1
              }} />

              {/* Home Blueprint SVG rendering */}
              <svg
                viewBox="0 0 400 300"
                width="100%"
                height="100%"
                style={{ zIndex: 2, filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.05))" }}
              >
                {/* House frame */}
                <rect x="20" y="30" width="360" height="240" rx="16" fill="none" stroke="rgba(74, 21, 64, 0.15)" strokeWidth="3" />
                <line x1="20" y1="160" x2="380" y2="160" stroke="rgba(74, 21, 64, 0.1)" strokeWidth="2" />
                <line x1="200" y1="30" x2="200" y2="270" stroke="rgba(74, 21, 64, 0.1)" strokeWidth="2" />

                {/* LIVING ROOM (Bottom Left) */}
                <text x="35" y="185" fill="var(--text-muted)" fontSize="10" fontWeight="600" letterSpacing="0.05em">LIVING SPACE</text>
                
                {/* Couch */}
                <path d="M 40 240 L 120 240 A 10 10 0 0 0 130 230 L 130 220 A 10 10 0 0 0 120 210 L 40 210 A 10 10 0 0 0 30 220 L 30 230 A 10 10 0 0 0 40 240 Z" fill="rgba(74, 21, 64, 0.03)" stroke="rgba(74, 21, 64, 0.15)" strokeWidth="1.5" />
                
                {/* Media Screen (Changes state based on cinema mode) */}
                <rect x="50" y="175" width="60" height="6" rx="2" fill={activeMode.id === "cinema" ? "rgba(219, 39, 119, 0.8)" : "rgba(74, 21, 64, 0.1)"} stroke="rgba(74, 21, 64, 0.15)" strokeWidth="1" style={{ transition: "all 0.5s ease" }} />
                {activeMode.id === "cinema" && (
                  <polygon points="50,181 20,225 140,225" fill="rgba(219, 39, 119, 0.12)" style={{ transition: "all 0.5s ease" }} />
                )}

                {/* MASTER SUITE (Top Left) */}
                <text x="35" y="55" fill="var(--text-muted)" fontSize="10" fontWeight="600" letterSpacing="0.05em">MASTER BEDROOM</text>
                {/* Bed */}
                <rect x="40" y="75" width="70" height="65" rx="4" fill="rgba(74, 21, 64, 0.03)" stroke="rgba(74, 21, 64, 0.15)" strokeWidth="1.5" />
                <rect x="45" y="80" width="60" height="20" rx="2" fill="rgba(74, 21, 64, 0.08)" />

                {/* AUDIO HUB (Top Right) */}
                <text x="215" y="55" fill="var(--text-muted)" fontSize="10" fontWeight="600" letterSpacing="0.05em">A/V ENTERTAINMENT</text>
                {/* Speaker system */}
                <circle cx="240" cy="90" r="12" fill="rgba(74, 21, 64, 0.03)" stroke={activeMode.id === "lounge" ? "var(--primary)" : "rgba(74, 21, 64, 0.15)"} strokeWidth="1.5" style={{ transition: "all 0.5s ease" }} />
                <circle cx="340" cy="90" r="12" fill="rgba(74, 21, 64, 0.03)" stroke={activeMode.id === "lounge" ? "var(--primary)" : "rgba(74, 21, 64, 0.15)"} strokeWidth="1.5" style={{ transition: "all 0.5s ease" }} />
                
                {/* Soundwaves */}
                {activeMode.id === "lounge" && (
                  <>
                    <path d="M 255 85 Q 262 90 255 95" fill="none" stroke="var(--primary)" strokeWidth="1.5" />
                    <path d="M 325 85 Q 318 90 325 95" fill="none" stroke="var(--primary)" strokeWidth="1.5" />
                  </>
                )}

                {/* HOME CLIMATE (Bottom Right) */}
                <text x="215" y="185" fill="var(--text-muted)" fontSize="10" fontWeight="600" letterSpacing="0.05em">CLIMATE & SPA</text>
                <rect x="270" y="205" width="40" height="40" rx="20" fill="rgba(74, 21, 64, 0.03)" stroke="rgba(74, 21, 64, 0.15)" strokeWidth="1.5" />
                <text x="290" y="230" fill={activeMode.color} fontSize="12" fontWeight="700" textAnchor="middle" style={{ transition: "all 0.5s ease" }}>
                  {activeMode.id === "away" ? "ECO" : activeMode.id === "cinema" ? "68°" : activeMode.id === "lounge" ? "72°" : "70°"}
                </text>

                {/* Ceiling lights */}
                <circle cx="95" cy="45" r="4" fill={activeMode.id === "away" ? "rgba(74, 21, 64, 0.1)" : activeMode.color} style={{ transition: "all 0.5s ease", filter: `drop-shadow(0 0 4px ${activeMode.color})` }} />
                <circle cx="280" cy="45" r="4" fill={activeMode.id === "away" ? "rgba(74, 21, 64, 0.1)" : activeMode.color} style={{ transition: "all 0.5s ease", filter: `drop-shadow(0 0 4px ${activeMode.color})` }} />
                <circle cx="95" cy="180" r="4" fill={activeMode.id === "away" ? "rgba(74, 21, 64, 0.1)" : activeMode.color} style={{ transition: "all 0.5s ease", filter: `drop-shadow(0 0 4px ${activeMode.color})` }} />
                <circle cx="280" cy="180" r="4" fill={activeMode.id === "away" ? "rgba(74, 21, 64, 0.1)" : activeMode.color} style={{ transition: "all 0.5s ease", filter: `drop-shadow(0 0 4px ${activeMode.color})` }} />

                {/* Lock Indicator */}
                <circle cx="200" cy="148" r="6" fill={activeMode.id === "away" ? "#be185d" : "#ec4899"} style={{ transition: "all 0.5s ease", filter: `drop-shadow(0 0 4px ${activeMode.id === "away" ? "#be185d" : "#ec4899"})` }} />
                <text x="200" y="135" fill="var(--text-primary)" fontSize="8" fontWeight="600" textAnchor="middle" letterSpacing="0.05em">
                  {activeMode.id === "away" ? "ARMED" : "LOCAL"}
                </text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* PARALLAX BANNER 1 (Separating Simulator and Services) */}
      <div style={{
        height: "320px",
        backgroundImage: "linear-gradient(rgba(18, 2, 14, 0.65), rgba(18, 2, 14, 0.8)), url('/project_atherton.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderBottom: "1px solid var(--border-card)"
      }}>
        <h3 style={{
          background: "linear-gradient(135deg, #ffffff 40%, #fbcfe8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          fontSize: "2rem",
          fontWeight: "800",
          marginBottom: "0.5rem"
        }}>
          Bespoke Services
        </h3>
        <p style={{ color: "#fce7f3", fontSize: "1.1rem" }}>
          Engineered for Wellness, Convenience, and Absolute Privacy.
        </p>
      </div>

      {/* 3. SERVICES CONFIGURATOR SECTION */}
      <section id="services-section" className="section" style={{
        background: "rgba(219, 39, 119, 0.03)",
        borderBottom: "1px solid var(--border-card)"
      }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 className="gradient-text" style={{ fontSize: "2.2rem", marginBottom: "1rem" }}>
              Tailor Your Automation Services
            </h2>
            <p style={{ maxWidth: "600px", margin: "0 auto" }}>
              Specify your estate size, select system components, and get an immediate engineering estimation.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1.8fr 1fr",
            gap: "2.5rem",
            alignItems: "start"
          }}>
            {/* Steps Container */}
            <div className="glass-card" style={{ padding: "2.5rem", minHeight: "380px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              
              {/* Steps Progress Header */}
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
                {[1, 2, 3, 4].map((num) => (
                  <button
                    key={num}
                    onClick={() => setServicesStep(num)}
                    style={{
                      flex: 1,
                      height: "4px",
                      background: servicesStep >= num ? "var(--primary)" : "rgba(219, 39, 119, 0.1)",
                      border: "none",
                      borderRadius: "2px",
                      cursor: "pointer",
                      transition: "all 0.3s ease"
                    }}
                  />
                ))}
              </div>

              {/* STEP 1: Property Type */}
              {servicesStep === 1 && (
                <div>
                  <h3 style={{ fontSize: "1.25rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>Step 1: Property Architecture</h3>
                  <p style={{ fontSize: "0.85rem", marginBottom: "1.5rem" }}>Select the structural footprint of your home.</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                    {PROPERTY_TYPES.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => setProperty(p)}
                        style={{
                          padding: "1rem",
                          borderRadius: "0.6rem",
                          background: property.id === p.id ? "rgba(219, 39, 119, 0.05)" : "var(--bg-card)",
                          border: property.id === p.id ? "1px solid var(--primary)" : "1px solid var(--border-card)",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                          transition: "all 0.2s"
                        }}
                      >
                        <span style={{ fontSize: "1.8rem" }}>{p.icon}</span>
                        <div>
                          <h4 style={{ fontSize: "0.95rem", fontWeight: "600", color: property.id === p.id ? "var(--primary)" : "var(--text-primary)" }}>{p.name}</h4>
                          <p style={{ fontSize: "0.78rem" }}>{p.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: Size */}
              {servicesStep === 2 && (
                <div>
                  <h3 style={{ fontSize: "1.25rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>Step 2: Property Scale</h3>
                  <p style={{ fontSize: "0.85rem", marginBottom: "1.5rem" }}>Estimated size dictates cable distances and processors needed.</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                    {SIZE_RANGES.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => setSize(s)}
                        style={{
                          padding: "1rem",
                          borderRadius: "0.6rem",
                          background: size.id === s.id ? "rgba(219, 39, 119, 0.05)" : "var(--bg-card)",
                          border: size.id === s.id ? "1px solid var(--primary)" : "1px solid var(--border-card)",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          transition: "all 0.2s"
                        }}
                      >
                        <div>
                          <h4 style={{ fontSize: "0.95rem", fontWeight: "600", color: size.id === s.id ? "var(--primary)" : "var(--text-primary)" }}>{s.name}</h4>
                          <p style={{ fontSize: "0.78rem" }}>{s.label}</p>
                        </div>
                        {size.id === s.id && <span style={{ color: "var(--primary)", fontWeight: "700" }}>✓</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: Features */}
              {servicesStep === 3 && (
                <div>
                  <h3 style={{ fontSize: "1.25rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>Step 3: Custom Integrations</h3>
                  <p style={{ fontSize: "0.85rem", marginBottom: "1.5rem" }}>Select systems you want to automate.</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    {FEATURES.map((f) => {
                      const isSel = selectedFeatures.some((item) => item.id === f.id);
                      return (
                        <div
                          key={f.id}
                          onClick={() => toggleFeature(f)}
                          style={{
                            padding: "0.8rem",
                            borderRadius: "0.6rem",
                            background: isSel ? "rgba(219, 39, 119, 0.05)" : "var(--bg-card)",
                            border: isSel ? "1px solid var(--primary)" : "1px solid var(--border-card)",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.8rem",
                            transition: "all 0.2s"
                          }}
                        >
                          <span style={{ fontSize: "1.3rem" }}>{f.icon}</span>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                              <strong style={{ color: isSel ? "var(--primary)" : "var(--text-primary)" }}>{f.name}</strong>
                              <span style={{ color: "var(--text-muted)", fontWeight: "600" }}>+${f.price.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 4: Summary */}
              {servicesStep === 4 && (
                <div>
                  <h3 style={{ fontSize: "1.25rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>Step 4: Your Proposal Proposal</h3>
                  <p style={{ fontSize: "0.85rem", marginBottom: "1.5rem" }}>Summarizing your custom hardware and programming setup.</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem", fontSize: "0.85rem" }}>
                      <div className="glass-card" style={{ padding: "0.8rem" }}>
                        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Property</span>
                        <strong>{property.name}</strong>
                      </div>
                      <div className="glass-card" style={{ padding: "0.8rem" }}>
                        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Footprint</span>
                        <strong>{size.name}</strong>
                      </div>
                    </div>
                    <div className="glass-card" style={{ padding: "1rem" }}>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block", marginBottom: "0.5rem" }}>Selected Systems ({selectedFeatures.length})</span>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                        {selectedFeatures.map((f) => (
                          <span key={f.id} style={{ fontSize: "0.72rem", background: "rgba(219, 39, 119, 0.08)", color: "var(--primary)", padding: "0.2rem 0.5rem", borderRadius: "0.2rem", fontWeight: "600" }}>
                            {f.icon} {f.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem", paddingTop: "1rem", borderTop: "1px solid rgba(219,39,119,0.06)" }}>
                <button
                  onClick={() => servicesStep > 1 && setServicesStep(servicesStep - 1)}
                  disabled={servicesStep === 1}
                  className="btn btn-secondary"
                  style={{ padding: "0.5rem 1rem", fontSize: "0.8rem", opacity: servicesStep === 1 ? 0.3 : 1 }}
                >
                  ← Back
                </button>
                {servicesStep < 4 ? (
                  <button
                    onClick={() => setServicesStep(servicesStep + 1)}
                    className="btn btn-primary"
                    style={{ padding: "0.5rem 1rem", fontSize: "0.8rem" }}
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    onClick={handleConfiguratorSubmit}
                    className="btn btn-primary"
                    style={{ padding: "0.5rem 1.2rem", fontSize: "0.8rem", background: "var(--gradient-cyan-indigo)" }}
                  >
                    Request consultation quote
                  </button>
                )}
              </div>
            </div>

            {/* Configurator Price Card */}
            <div className="glass-card" style={{ background: "var(--bg-card)", borderColor: "var(--border-card-active)", boxShadow: "var(--shadow-glow)" }}>
              <h3 style={{ fontSize: "1rem", marginBottom: "0.8rem", color: "var(--text-primary)" }}>Investment Projection</h3>
              <div style={{ borderBottom: "1px solid rgba(219,39,119,0.06)", paddingBottom: "1rem", marginBottom: "1rem" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>ESTIMATED PROJECT BUDGET</span>
                <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--primary)", margin: "0.2rem 0" }}>
                  ${calculatedLow.toLocaleString()} - ${calculatedHigh.toLocaleString()}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.8rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Base Integrations</span>
                  <strong>${baseCost.toLocaleString()}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Property Factor</span>
                  <strong>x{property.multiplier.toFixed(1)}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Scale Factor</span>
                  <strong>x{size.cost.toFixed(1)}</strong>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PARALLAX BANNER 2 (Separating Services and Projects) */}
      <div style={{
        height: "320px",
        backgroundImage: "linear-gradient(rgba(18, 2, 14, 0.65), rgba(18, 2, 14, 0.8)), url('/project_malibu.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderBottom: "1px solid var(--border-card)"
      }}>
        <h3 style={{
          background: "linear-gradient(135deg, #ffffff 40%, #fbcfe8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          fontSize: "2rem",
          fontWeight: "800",
          marginBottom: "0.5rem"
        }}>
          Luxury Portfolio
        </h3>
        <p style={{ color: "#fce7f3", fontSize: "1.1rem" }}>
          Uncompromising Details. Architecturally Integrated Tech.
        </p>
      </div>

      {/* 4. OUR PROJECTS GALLERY */}
      <section className="section" style={{
        background: "rgba(219, 39, 119, 0.03)",
        borderBottom: "1px solid var(--border-card)"
      }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 className="gradient-text" style={{ fontSize: "2.2rem", marginBottom: "1rem" }}>
              Our Completed Installations
            </h2>
            <p style={{ maxWidth: "600px", margin: "0 auto" }}>
              Take a look inside the modern residential compounds engineered by Inovex.
            </p>
          </div>

          {/* Filter Bar */}
          <div style={{ display: "flex", justifyContent: "center", gap: "0.8rem", marginBottom: "3rem" }}>
            {["all", "estate", "villa", "penthouse"].map((type) => (
              <button
                key={type}
                onClick={() => setProjectFilter(type)}
                className="btn"
                style={{
                  padding: "0.4rem 1.2rem",
                  fontSize: "0.82rem",
                  background: projectFilter === type ? "var(--gradient-brand)" : "var(--bg-card)",
                  color: projectFilter === type ? "#fff" : "var(--text-primary)",
                  border: projectFilter === type ? "none" : "1px solid var(--border-card)",
                  cursor: "pointer"
                }}
              >
                {type === "all" ? "All projects" : `${type}s`}
              </button>
            ))}
          </div>

          {/* Grid Layout (Includes generated AI images!) */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2.5rem"
          }}>
            {filteredProjects.map((p) => (
              <div key={p.id} className="glass-card" style={{
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                padding: 0,
                height: "100%"
              }}>
                {/* AI Generated Project Image */}
                <div style={{
                  width: "100%",
                  height: "220px",
                  position: "relative",
                  backgroundImage: `url('${p.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderBottom: "1px solid var(--border-card)"
                }}>
                  {/* Floating Category Badge */}
                  <span style={{
                    position: "absolute",
                    top: "1rem",
                    left: "1rem",
                    fontSize: "0.72rem",
                    background: "rgba(255, 255, 255, 0.9)",
                    color: "var(--primary)",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "0.3rem",
                    fontWeight: "700",
                    boxShadow: "var(--shadow-subtle)"
                  }}>
                    {p.typeName}
                  </span>
                </div>

                {/* Card Content Details */}
                <div style={{ padding: "2rem", display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
                  <div>
                    <h3 style={{ fontSize: "1.25rem", color: "var(--text-primary)", marginBottom: "0.8rem" }}>
                      {p.title}
                    </h3>
                    <p style={{ fontSize: "0.85rem", lineHeight: "1.5", marginBottom: "1.5rem" }}>
                      {p.desc}
                    </p>
                  </div>
                  <div>
                    <div style={{ borderTop: "1px solid rgba(219,39,119,0.06)", paddingTop: "1rem" }}>
                      <h4 style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>Highlights</h4>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                        {p.specs.map((spec, index) => (
                          <span key={index} style={{ fontSize: "0.68rem", background: "rgba(219, 39, 119, 0.04)", color: "var(--text-primary)", padding: "0.15rem 0.4rem", borderRadius: "0.2rem" }}>
                            ✦ {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* PARALLAX BANNER 3 (Separating Projects and Partners) */}
      <div style={{
        height: "320px",
        backgroundImage: "linear-gradient(rgba(18, 2, 14, 0.65), rgba(18, 2, 14, 0.8)), url('/project_paloalto.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderBottom: "1px solid var(--border-card)"
      }}>
        <h3 style={{
          background: "linear-gradient(135deg, #ffffff 40%, #fbcfe8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          fontSize: "2rem",
          fontWeight: "800",
          marginBottom: "0.5rem"
        }}>
          Industry Partners
        </h3>
        <p style={{ color: "#fce7f3", fontSize: "1.1rem" }}>
          Authorized Engineering Dealers for Crestron, Lutron, and Savant.
        </p>
      </div>

      {/* 5. PARTNERS & BRANDS */}
      <section className="section" style={{
        background: "rgba(219, 39, 119, 0.03)",
        borderBottom: "1px solid var(--border-card)"
      }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 className="gradient-text" style={{ fontSize: "2.2rem", marginBottom: "1rem" }}>
              Certified Hardware Partners
            </h2>
            <p style={{ maxWidth: "600px", margin: "0 auto" }}>
              We collaborate with premier automated hardware providers to guarantee enterprise stability.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "2rem"
          }}>
            {PARTNERS.map((brand, idx) => (
              <div key={idx} className="glass-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", background: "var(--bg-card)" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1rem" }}>
                    <span style={{ fontSize: "1.5rem" }}>{brand.icon}</span>
                    <div>
                      <h4 style={{ fontSize: "1rem", color: "var(--text-primary)", fontWeight: "600" }}>{brand.name}</h4>
                      <span style={{ fontSize: "0.7rem", color: "var(--primary)", fontWeight: "700" }}>{brand.level}</span>
                    </div>
                  </div>
                  <p style={{ fontSize: "0.8rem", lineHeight: "1.5" }}>{brand.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ABOUT US & TIMELINE */}
      <section className="section" style={{
        background: "rgba(219, 39, 119, 0.03)",
        borderBottom: "1px solid var(--border-card)"
      }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 className="gradient-text" style={{ fontSize: "2.2rem", marginBottom: "1rem" }}>
              Bespoke Engineering Heritage
            </h2>
            <p style={{ maxWidth: "600px", margin: "0 auto" }}>
              Our history is rooted in aerospace control systems and localized cybersecurity.
            </p>
          </div>

          <div className="glass-card" style={{ background: "var(--bg-card)", padding: "3rem", borderLeft: "4px solid var(--primary)", marginBottom: "4rem" }}>
            <h3 style={{ fontSize: "1.3rem", color: "var(--primary)", marginBottom: "1.2rem" }}>Offline-First Privacy Architecture</h3>
            <p style={{ fontSize: "0.92rem", lineHeight: "1.7", marginBottom: "1rem" }}>
              Unlike consumer-grade smart devices, Inovex operates locally inside your home. Telemetry data, camera streams, and voice triggers never leave your local physical hub.
            </p>
            <p style={{ fontSize: "0.92rem", lineHeight: "1.7" }}>
              Our engineers program bespoke integration scripts tailored specifically to your floor layout, guaranteeing instant responsiveness even if the public internet connection drops.
            </p>
          </div>
        </div>
      </section>

      {/* 7. CONTACT & CONSULTATION BOOKING FORM */}
      <section ref={contactFormRef} id="contact-form" className="section" style={{
        background: "rgba(219, 39, 119, 0.03)"
      }}>
        <div className="container" style={{ maxWidth: "700px" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 className="gradient-text" style={{ fontSize: "2.2rem", marginBottom: "1rem" }}>
              Schedule Your Site Audit
            </h2>
            <p>
              Submit your property details and one of our principal system architects will contact you.
            </p>
          </div>

          <div className="glass-card" style={{ background: "var(--bg-card)", borderColor: "var(--border-card-active)", boxShadow: "var(--shadow-glow)" }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                <span style={{ fontSize: "3rem", display: "block", marginBottom: "1rem" }}>✦</span>
                <h3 style={{ fontSize: "1.5rem", color: "var(--primary)", marginBottom: "1rem" }}>
                  Consultation Booked
                </h3>
                <p style={{ fontSize: "0.95rem", lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "2rem" }}>
                  Thank you, <strong>{formData.name}</strong>. Our systems engineer will contact you at <strong>{formData.email}</strong> to schedule your architectural audit.
                </p>
                <button className="btn btn-secondary" onClick={() => setSubmitted(false)}>
                  Submit Another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <label style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: "500" }}>Name <span style={{ color: "var(--primary)" }}>*</span></label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-card-active)", padding: "0.75rem", borderRadius: "0.4rem", color: "var(--text-primary)", outline: "none" }}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <label style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: "500" }}>Phone <span style={{ color: "var(--primary)" }}>*</span></label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      required
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-card-active)", padding: "0.75rem", borderRadius: "0.4rem", color: "var(--text-primary)", outline: "none" }}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  <label style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: "500" }}>Email <span style={{ color: "var(--primary)" }}>*</span></label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-card-active)", padding: "0.75rem", borderRadius: "0.4rem", color: "var(--text-primary)", outline: "none" }}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  <label style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: "500" }}>Preferred Audit Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleFormChange}
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-card-active)", padding: "0.75rem", borderRadius: "0.4rem", color: "var(--text-primary)", outline: "none" }}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  <label style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: "500" }}>Project specifications</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    rows="6"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-card-active)", padding: "0.75rem", borderRadius: "0.4rem", color: "var(--text-primary)", outline: "none", resize: "vertical", lineHeight: "1.5" }}
                    placeholder="Provide details about your property size, requested integrations, or custom specifications..."
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
                  Book Site Audit Consultation
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 8. ACCORDION FAQ */}
      <section className="section" style={{
        background: "rgba(219, 39, 119, 0.03)",
        borderTop: "1px solid var(--border-card)"
      }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 className="gradient-text" style={{ fontSize: "2.2rem", marginBottom: "1rem" }}>
              Frequently Answered Questions
            </h2>
            <p>Answers to common questions about architectural automation systems.</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="glass-card"
                  style={{
                    padding: "1.2rem 1.8rem",
                    cursor: "pointer",
                    background: isOpen ? "rgba(219, 39, 119, 0.02)" : "var(--bg-card)",
                    borderColor: isOpen ? "var(--border-card-active)" : "var(--border-card)",
                    transition: "all 0.25s ease"
                  }}
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
                    <h3 style={{ fontSize: "1.05rem", fontWeight: "600", color: isOpen ? "var(--primary)" : "var(--text-primary)" }}>{faq.q}</h3>
                    <span style={{ color: "var(--text-muted)", fontSize: "1.2rem", transform: isOpen ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>＋</span>
                  </div>
                  {isOpen && (
                    <div style={{ marginTop: "1rem", paddingTop: "0.8rem", borderTop: "1px solid rgba(219,39,119,0.06)", fontSize: "0.92rem", color: "var(--text-secondary)" }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

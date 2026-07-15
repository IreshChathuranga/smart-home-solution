"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ContactFormContent() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [quoteDetails, setQuoteDetails] = useState(null);

  // Read query params from System Configurator
  useEffect(() => {
    const prop = searchParams.get("prop");
    const size = searchParams.get("size");
    const feats = searchParams.get("feats");
    const price = searchParams.get("price");

    if (prop && size && price) {
      setQuoteDetails({ prop, size, feats, price });
      setFormData((prev) => ({
        ...prev,
        message: `Hello Inovex Team, \n\nI just designed a system on your builder:\n- Property: ${prop}\n- Size: ${size}\n- Integrations: ${feats || "None specified"}\n- Estimated Budget: $${price}\n\nI would like to schedule an engineering walkthrough to refine this configuration.`
      }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill out all required fields.");
      return;
    }
    // Simulate API request
    setSubmitted(true);
  };

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1.5fr",
      gap: "3rem",
      alignItems: "start",
      // Responsive layout handled at page container level
    }}>
      {/* Left Info Column */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div>
          <h2 style={{ fontSize: "1.8rem", color: "var(--text-primary)", marginBottom: "1rem" }}>
            Get in Touch
          </h2>
          <p style={{ fontSize: "0.95rem", lineHeight: "1.7", marginBottom: "1.5rem" }}>
            Whether you are building a new estate, renovating a historic home, or looking to schedule a private walkthrough at our showroom, our principal design engineers are here to advise you.
          </p>
        </div>

        {/* Brand details / White-Glove service info */}
        <div className="glass-card" style={{ background: "rgba(6, 182, 212, 0.02)", borderColor: "var(--border-card)" }}>
          <h3 style={{ fontSize: "1.1rem", color: "var(--cyan)", marginBottom: "0.8rem" }}>
            The Inovex Standard
          </h3>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.8rem", fontSize: "0.85rem" }}>
            <li style={{ display: "flex", gap: "0.5rem" }}>
              <span>✦</span> <strong>White-Glove Integration:</strong> Structured cabling, acoustic calibrations, and clean hardware setups.
            </li>
            <li style={{ display: "flex", gap: "0.5rem" }}>
              <span>✦</span> <strong>5-Year Onsite Warranty:</strong> Guaranteed hardware replacement and structural wiring certification.
            </li>
            <li style={{ display: "flex", gap: "0.5rem" }}>
              <span>✦</span> <strong>24/7 Care Hotline:</strong> Access to dedicated technical assistance for premium homeowners.
            </li>
          </ul>
        </div>

        {/* Contact info list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", fontSize: "0.9rem" }}>
          <div>
            <span style={{ color: "var(--text-muted)", display: "block" }}>Phone Support</span>
            <span style={{ color: "var(--text-primary)", fontWeight: "600" }}>+1 (800) 555-AURA</span>
          </div>
          <div>
            <span style={{ color: "var(--text-muted)", display: "block" }}>Engineering Inquiries</span>
            <span style={{ color: "var(--text-primary)", fontWeight: "600" }}>hello@inovex.com</span>
          </div>
          <div>
            <span style={{ color: "var(--text-muted)", display: "block" }}>Experience Showroom</span>
            <span style={{ color: "var(--text-primary)", fontWeight: "600" }}>Silicon Valley, California</span>
          </div>
        </div>
      </div>

      {/* Right Form Column */}
      <div className="glass-card" style={{
        borderColor: quoteDetails ? "var(--border-card-active)" : "var(--border-card)",
        position: "relative"
      }}>
        {quoteDetails && (
          <div style={{
            background: "rgba(6, 182, 212, 0.08)",
            border: "1px solid var(--border-card-active)",
            borderRadius: "0.5rem",
            padding: "1rem",
            marginBottom: "1.5rem",
            fontSize: "0.85rem"
          }}>
            <h4 style={{ color: "var(--cyan)", fontWeight: "700", marginBottom: "0.4rem" }}>
              ✓ Configuration Captured
            </h4>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.8rem", lineHeight: "1.5" }}>
              We have attached your estimate of <strong>${quoteDetails.price}</strong> for your <strong>{quoteDetails.prop}</strong> to this consultation request.
            </p>
          </div>
        )}

        {submitted ? (
          <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
            <span style={{ fontSize: "3rem", display: "block", marginBottom: "1rem" }}>✦</span>
            <h3 style={{ fontSize: "1.5rem", color: "var(--cyan)", marginBottom: "1rem" }}>
              Consultation Scheduled
            </h3>
            <p style={{ fontSize: "0.95rem", lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "2rem" }}>
              Thank you, <strong>{formData.name}</strong>. One of our lead design engineers will review your request and contact you at <strong>{formData.email}</strong> within 24 hours to confirm your onsite property assessment.
            </p>
            <button className="btn btn-secondary" onClick={() => setSubmitted(false)}>
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <h3 style={{ fontSize: "1.3rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              Schedule Onsite Walkthrough
            </h3>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <label style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: "500" }}>
                  Full Name <span style={{ color: "var(--cyan)" }}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid var(--border-card)",
                    padding: "0.75rem",
                    borderRadius: "0.4rem",
                    color: "#fff",
                    fontSize: "0.9rem",
                    outline: "none"
                  }}
                  placeholder="e.g. John Doe"
                />
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <label style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: "500" }}>
                  Phone Number <span style={{ color: "var(--cyan)" }}>*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid var(--border-card)",
                    padding: "0.75rem",
                    borderRadius: "0.4rem",
                    color: "#fff",
                    fontSize: "0.9rem",
                    outline: "none"
                  }}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <label style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: "500" }}>
                Email Address <span style={{ color: "var(--cyan)" }}>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid var(--border-card)",
                  padding: "0.75rem",
                  borderRadius: "0.4rem",
                  color: "#fff",
                  fontSize: "0.9rem",
                  outline: "none"
                }}
                placeholder="john@example.com"
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <label style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: "500" }}>
                Preferred Consultation Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid var(--border-card)",
                  padding: "0.75rem",
                  borderRadius: "0.4rem",
                  color: "#fff",
                  fontSize: "0.9rem",
                  outline: "none"
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <label style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: "500" }}>
                Project Description & Details
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid var(--border-card)",
                  padding: "0.75rem",
                  borderRadius: "0.4rem",
                  color: "#fff",
                  fontSize: "0.9rem",
                  outline: "none",
                  resize: "vertical",
                  lineHeight: "1.5"
                }}
                placeholder="Tell us about your property features, architectural build, or timeline..."
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "1rem" }}>
              Book Onsite Consult
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {/* Header banner */}
      <section className="section" style={{
        padding: "4rem 0 2rem 0",
        textAlign: "center",
        borderBottom: "1px solid var(--border-card)"
      }}>
        <div className="container">
          <h1 className="gradient-text" style={{ fontSize: "3rem", marginBottom: "1rem" }}>
            Schedule an Architectural Audit
          </h1>
          <p style={{ maxWidth: "600px", margin: "0 auto" }}>
            Begin your integration project. Fill out the audit request below and our senior systems architect will prepare your physical building review.
          </p>
        </div>
      </section>

      {/* Booking Form Layout */}
      <section className="section" style={{ flex: 1, background: "rgba(219, 39, 119, 0.03)" }}>
        <div className="container">
          <Suspense fallback={
            <div className="flex-center" style={{ minHeight: "400px" }}>
              <div style={{ color: "var(--cyan)", fontSize: "1.2rem", fontWeight: "600" }}>
                Parsing configured quote...
              </div>
            </div>
          }>
            <ContactFormContent />
          </Suspense>
        </div>
      </section>
    </div>
  );
}

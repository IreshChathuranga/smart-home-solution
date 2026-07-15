import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata = {
  title: "Inovex | Premium Smart Home Solutions",
  description: "Experience luxury living with custom, state-of-the-art smart home automation systems for lighting, climate, security, and home theater.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {/* Navigation Header */}
        <header className="navbar">
          <div className="container nav-container">
            <a href="/" className="nav-logo">
              <span style={{ color: "var(--cyan)", fontSize: "1.7rem" }}>✦</span>
              Inovex
            </a>
            <nav>
              <ul className="nav-links">
                <li><a href="/" className="nav-link">Home</a></li>
                <li><a href="/services" className="nav-link">Services</a></li>
                <li><a href="/projects" className="nav-link">Our Projects</a></li>
                <li><a href="/partners" className="nav-link">Partners</a></li>
                <li><a href="/about" className="nav-link">About Us</a></li>
                <li><a href="/contact" className="nav-link">Contact Us</a></li>
              </ul>
            </nav>
            <div className="nav-cta">
              <a href="/contact" className="btn btn-primary" style={{ padding: "0.5rem 1.2rem", fontSize: "0.85rem" }}>
                Get Started
              </a>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main style={{ marginTop: "4.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
          {children}
        </main>

        {/* Footer */}
        <footer style={{
          background: "rgba(255, 240, 245, 0.85)",
          borderTop: "1px solid var(--border-card)",
          padding: "4rem 0 2rem 0",
          fontSize: "0.9rem",
          color: "var(--text-secondary)"
        }}>
          <div className="container" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2.5rem",
            marginBottom: "3rem"
          }}>
            <div>
              <h3 style={{ color: "var(--text-primary)", marginBottom: "1.2rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ color: "var(--cyan)" }}>✦</span> Inovex
              </h3>
              <p style={{ fontSize: "0.85rem", lineHeight: "1.6" }}>
                Crafting bespoke automation systems for high-end residential homes and modern estates.
              </p>
            </div>
            <div>
              <h4 style={{ color: "var(--text-primary)", marginBottom: "1.2rem" }}>Solutions</h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                <li><a href="/solutions" style={{ transition: "color 0.2s" }}>Smart Lighting</a></li>
                <li><a href="/solutions" style={{ transition: "color 0.2s" }}>Climate Control</a></li>
                <li><a href="/solutions" style={{ transition: "color 0.2s" }}>Home Theater</a></li>
                <li><a href="/solutions" style={{ transition: "color 0.2s" }}>Advanced Security</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: "var(--text-primary)", marginBottom: "1.2rem" }}>Company</h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                <li><a href="/about" style={{ transition: "color 0.2s" }}>About Us</a></li>
                <li><a href="/projects" style={{ transition: "color 0.2s" }}>Our Projects</a></li>
                <li><a href="/partners" style={{ transition: "color 0.2s" }}>Partners</a></li>
                <li><a href="/contact" style={{ transition: "color 0.2s" }}>Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: "var(--text-primary)", marginBottom: "1.2rem" }}>Contact</h4>
              <p style={{ fontSize: "0.85rem", marginBottom: "0.5rem" }}>hello@inovex.com</p>
              <p style={{ fontSize: "0.85rem", marginBottom: "0.5rem" }}>+1 (800) 555-AURA</p>
              <p style={{ fontSize: "0.85rem" }}>Silicon Valley, California</p>
            </div>
          </div>
          <div className="container" style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem"
          }}>
            <p style={{ fontSize: "0.8rem" }}>&copy; {new Date().getFullYear()} Inovex. All rights reserved.</p>
            <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.8rem" }}>
              <a href="#" style={{ transition: "color 0.2s" }}>Privacy Policy</a>
              <a href="#" style={{ transition: "color 0.2s" }}>Terms of Service</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

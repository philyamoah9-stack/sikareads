export default function Footer() {
  return (
    <footer style={{ background: "var(--navy)", color: "var(--cream)", padding: "60px 48px 32px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Top */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "40px", marginBottom: "48px" }} className="full-mobile">
          <div>
            <div style={{ fontFamily: "Playfair Display, serif", fontSize: "28px", fontWeight: 700, marginBottom: "12px" }}>
              sikareads
            </div>
            <p style={{ fontSize: "14px", color: "rgba(250,245,238,0.7)", lineHeight: 1.7, maxWidth: "280px", marginBottom: "20px" }}>
              Ghana's curated bookstore for people who believe books can change everything. Delivered to your door.
            </p>
            <div style={{ fontSize: "13px", color: "var(--gold)" }}>
              books that grow you.
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "Playfair Display, serif", fontSize: "16px", fontWeight: 600, marginBottom: "16px" }}>Browse</div>
            {["All books", "Faith", "Finance", "Children", "Growth", "New arrivals"].map(l => (
              <a key={l} href={`/books?genre=${l.toLowerCase().replace(" ", "-")}`} style={{ display: "block", fontSize: "13px", color: "rgba(250,245,238,0.65)", marginBottom: "10px" }}>{l}</a>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: "Playfair Display, serif", fontSize: "16px", fontWeight: 600, marginBottom: "16px" }}>Support</div>
            {[
              { label: "Contact us", href: "/contact" },
              { label: "Delivery info", href: "/delivery" },
              { label: "Returns", href: "/returns" },
              { label: "FAQs", href: "/faqs" },
            ].map(l => (
              <a key={l.label} href={l.href} style={{ display: "block", fontSize: "13px", color: "rgba(250,245,238,0.65)", marginBottom: "10px" }}>{l.label}</a>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: "Playfair Display, serif", fontSize: "16px", fontWeight: 600, marginBottom: "16px" }}>Track growth</div>
            <p style={{ fontSize: "13px", color: "rgba(250,245,238,0.65)", lineHeight: 1.6, marginBottom: "16px" }}>
              Track your reading and personal growth in How Far? — our free companion app.
            </p>
            <a href="https://yourhowfar.com" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "10px 20px", background: "var(--gold)", color: "var(--brown)", borderRadius: "100px", fontSize: "12px", fontWeight: 700 }}>
              Try How Far? free →
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: "1px solid rgba(250,245,238,0.15)", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ fontSize: "12px", color: "rgba(250,245,238,0.45)" }}>
            © 2026 sikareads · a Deo Volente product · All rights reserved
          </div>
          <div style={{ display: "flex", gap: "24px" }}>
            {[
              { label: "Privacy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
              { label: "Contact", href: "/contact" },
            ].map(l => (
              <a key={l.label} href={l.href} style={{ fontSize: "12px", color: "rgba(250,245,238,0.45)" }}>{l.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
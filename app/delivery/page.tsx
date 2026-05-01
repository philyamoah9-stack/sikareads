import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DeliveryPage() {
  return (
    <div style={{ background: "var(--white)", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "120px 48px 80px" }}>
        <div style={{ marginBottom: "48px" }}>
          <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--navy)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "12px" }}>Shipping</div>
          <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "48px", fontWeight: 700, color: "var(--brown)", lineHeight: 1.1 }}>
            Delivery <em style={{ fontStyle: "italic", color: "var(--navy)" }}>information</em>.
          </h1>
        </div>

        {[
          {
            title: "Where we deliver",
            content: "We deliver to all 16 regions of Ghana. Whether you are in Accra, Kumasi, Tamale, Takoradi, Cape Coast, or anywhere else in the country — your books will reach you.",
          },
          {
            title: "Delivery timelines",
            content: "",
            table: [
              ["Greater Accra", "2-3 business days"],
              ["Ashanti, Western, Central, Eastern", "3-4 business days"],
              ["All other regions", "4-5 business days"],
            ],
          },
          {
            title: "Delivery cost",
            content: "A flat delivery fee of GHS 30 applies to all orders across Ghana, regardless of size or region. We believe good books should reach everyone.",
          },
          {
            title: "Order processing",
            content: "All orders are processed within 1-2 business days. You will receive a phone call to confirm your delivery address before your order is dispatched. Please ensure your phone number is correct at checkout.",
          },
          {
            title: "Packaging",
            content: "Every book is carefully wrapped in protective packaging to ensure it arrives in perfect condition. We take pride in the presentation — your books deserve to arrive looking their best.",
          },
          {
            title: "Order tracking",
            content: "Once your order is dispatched, we will send you an SMS update. You can also contact us at support@sikareads.com or call us to get an update on your order.",
          },
          {
            title: "Failed deliveries",
            content: "If a delivery attempt fails, we will contact you to arrange redelivery. After two failed attempts, you may be required to pick up your order from a designated point in your city.",
          },
        ].map(section => (
          <div key={section.title} style={{ marginBottom: "40px", paddingBottom: "40px", borderBottom: "1px solid var(--border)" }}>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "24px", fontWeight: 600, color: "var(--brown)", marginBottom: "12px" }}>{section.title}</h2>
            {section.content && <p style={{ fontSize: "15px", color: "var(--text)", lineHeight: 1.8 }}>{section.content}</p>}
            {section.table && (
              <div style={{ border: "1px solid var(--border)", borderRadius: "12px", overflow: "hidden" }}>
                {section.table.map(([zone, time], i) => (
                  <div key={zone} style={{ display: "flex", justifyContent: "space-between", padding: "14px 20px", background: i % 2 === 0 ? "var(--cream)" : "var(--white)", fontSize: "14px" }}>
                    <span style={{ color: "var(--text)" }}>{zone}</span>
                    <span style={{ color: "var(--navy)", fontWeight: 600 }}>{time}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <div style={{ background: "var(--navy)", borderRadius: "20px", padding: "32px", textAlign: "center" }}>
          <div style={{ fontFamily: "Playfair Display, serif", fontSize: "22px", fontWeight: 700, color: "var(--cream)", marginBottom: "8px" }}>Questions about your delivery?</div>
          <p style={{ fontSize: "14px", color: "rgba(250,245,238,0.7)", marginBottom: "20px" }}>Our team responds within 24 hours.</p>
          <a href="/contact" style={{ display: "inline-block", padding: "12px 28px", background: "var(--gold)", color: "var(--brown)", borderRadius: "100px", fontSize: "13px", fontWeight: 700 }}>Contact us</a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
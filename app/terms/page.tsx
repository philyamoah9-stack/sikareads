// app/terms/page.tsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TermsPage() {
  return (
    <div style={{ background: "var(--white)", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "120px 48px 80px" }}>
        <div style={{ marginBottom: "48px" }}>
          <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "48px", fontWeight: 700, color: "var(--brown)", marginBottom: "8px" }}>
            Terms of <em style={{ fontStyle: "italic", color: "var(--navy)" }}>service</em>.
          </h1>
          <div style={{ fontSize: "13px", color: "var(--muted)" }}>Last updated: May 2026</div>
        </div>
        {[
          { title: "Acceptance", body: "By using sikareads.com and placing an order, you agree to these terms. If you do not agree, please do not use the site." },
          { title: "Orders", body: "All orders are subject to availability. We reserve the right to cancel an order if a book is out of stock. In such cases, you will receive a full refund." },
          { title: "Prices", body: "All prices are listed in Ghana Cedis (GHS) and include any applicable taxes. Delivery fees are shown at checkout before payment." },
          { title: "Payment", body: "Payment is processed securely by Paystack. We accept card, Mobile Money, and bank transfer. Orders are confirmed once payment is successful." },
          { title: "Delivery", body: "We deliver across Ghana. Delivery timelines are estimates and may vary. We are not responsible for delays caused by events outside our control." },
          { title: "Returns", body: "If a book arrives damaged or is incorrect, contact us within 7 days at support@sikareads.com. We will arrange a return or replacement at no extra cost to you." },
          { title: "Intellectual property", body: "All content on sikareads.com including design, text, and images is owned by sikareads. You may not reproduce any part of it without written permission." },
          { title: "Contact", body: "Questions about these terms? Email us at support@sikareads.com." },
        ].map(s => (
          <div key={s.title} style={{ marginBottom: "36px" }}>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "22px", fontWeight: 600, color: "var(--brown)", marginBottom: "10px" }}>{s.title}</h2>
            <p style={{ fontSize: "15px", color: "var(--text)", lineHeight: 1.8 }}>{s.body}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
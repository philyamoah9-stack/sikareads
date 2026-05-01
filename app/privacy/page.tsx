// app/privacy/page.tsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PrivacyPage() {
  return (
    <div style={{ background: "var(--white)", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "120px 48px 80px" }}>
        <div style={{ marginBottom: "48px" }}>
          <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "48px", fontWeight: 700, color: "var(--brown)", marginBottom: "8px" }}>
            Privacy <em style={{ fontStyle: "italic", color: "var(--navy)" }}>policy</em>.
          </h1>
          <div style={{ fontSize: "13px", color: "var(--muted)" }}>Last updated: May 2026</div>
        </div>
        {[
          { title: "Information we collect", body: "We collect the information you provide when placing an order — your name, email address, phone number, and delivery address. We also collect payment information, which is processed securely by Paystack and never stored on our servers." },
          { title: "How we use your information", body: "We use your information to process and deliver your orders, contact you about your order status, and send you occasional updates about new books and offers. We never sell your data to third parties." },
          { title: "Payment security", body: "All payments are processed by Paystack, a PCI-DSS compliant payment processor. We never have access to your card details. Your payment information is encrypted and secure." },
          { title: "Cookies", body: "We use essential cookies to maintain your shopping cart between sessions. We do not use tracking or advertising cookies." },
          { title: "Your rights", body: "You can request a copy of the data we hold about you, or ask us to delete it, by emailing support@sikareads.com. We will respond within 48 hours." },
          { title: "Contact", body: "Questions about this policy? Email us at support@sikareads.com." },
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
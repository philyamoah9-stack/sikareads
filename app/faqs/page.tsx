"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const FAQS = [
  { q: "How do I place an order?", a: "Browse our catalogue at sikareads.com/books, add books to your cart, and proceed to checkout. Fill in your delivery details and pay securely with Paystack using your card, MoMo, or bank transfer." },
  { q: "Where do you deliver?", a: "We deliver across all 16 regions of Ghana. A flat delivery fee of GHS 30 applies to all orders." },
  { q: "How long does delivery take?", a: "Orders within Greater Accra take 2-3 business days. Other regions take 3-5 business days. All orders are processed within 1-2 business days before dispatch." },
  { q: "Will someone call me before delivery?", a: "Yes — we call every customer to confirm their delivery address before dispatching. Please make sure your phone number is correct at checkout." },
  { q: "What payment methods do you accept?", a: "We accept card payments, Mobile Money (MoMo), and bank transfers — all processed securely through Paystack." },
  { q: "Can I return a book?", a: "Yes. If your book arrives damaged or is not what you ordered, contact us within 7 days of delivery at support@sikareads.com and we will arrange a return or replacement." },
  { q: "Do you sell eBooks?", a: "Not yet — we currently sell physical books only. eBooks are coming in a future update." },
  { q: "How do I track my order?", a: "We will send you an SMS update when your order is dispatched. You can also contact us at support@sikareads.com or via the contact form for an update." },
  { q: "Can I order in bulk for a school or church?", a: "Absolutely. Contact us at support@sikareads.com with the titles and quantities you need. We offer bulk pricing for orders of 10 books or more." },
  { q: "What is How Far? and how does it connect to sikareads?", a: "How Far? is our free personal growth app at yourhowfar.com. You can track the books you buy from sikareads in How Far?, monitor your reading progress, and let your reading contribute to your How Far? score." },
  { q: "Are the prices in GHS?", a: "Yes — all prices on sikareads are in Ghana Cedis (GHS)." },
  { q: "How do I contact you?", a: "Email us at support@sikareads.com or use the contact form at sikareads.com/contact. We respond within 24 hours." },
];

export default function FAQsPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ background: "var(--white)", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "120px 48px 80px" }}>
        <div style={{ marginBottom: "56px" }}>
          <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--navy)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "12px" }}>Help</div>
          <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "48px", fontWeight: 700, color: "var(--brown)", lineHeight: 1.1, marginBottom: "16px" }}>
            Frequently asked <em style={{ fontStyle: "italic", color: "var(--navy)" }}>questions</em>.
          </h1>
          <p style={{ fontSize: "15px", color: "var(--muted)" }}>
            Can't find what you're looking for? <a href="/contact" style={{ color: "var(--navy)", fontWeight: 600 }}>Contact us →</a>
          </p>
        </div>

        <div>
          {FAQS.map((faq, i) => (
            <div key={i} style={{ borderBottom: "1px solid var(--border)" }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0", background: "transparent", border: "none", cursor: "pointer", textAlign: "left", gap: "16px" }}>
                <span style={{ fontFamily: "Playfair Display, serif", fontSize: "17px", fontWeight: 600, color: "var(--brown)", lineHeight: 1.3 }}>{faq.q}</span>
                <span style={{ fontSize: "20px", color: "var(--navy)", flexShrink: 0, transition: "transform 0.2s", transform: open === i ? "rotate(45deg)" : "rotate(0)" }}>+</span>
              </button>
              {open === i && (
                <div style={{ paddingBottom: "20px" }}>
                  <p style={{ fontSize: "15px", color: "var(--text)", lineHeight: 1.8 }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: "60px", padding: "32px", background: "var(--cream)", borderRadius: "20px", textAlign: "center" }}>
          <div style={{ fontFamily: "Playfair Display, serif", fontSize: "22px", fontWeight: 700, color: "var(--brown)", marginBottom: "8px" }}>Still have questions?</div>
          <p style={{ fontSize: "14px", color: "var(--muted)", marginBottom: "20px" }}>We are happy to help. Reach out and we will respond within 24 hours.</p>
          <a href="/contact" style={{ display: "inline-block", padding: "12px 28px", background: "var(--navy)", color: "var(--cream)", borderRadius: "100px", fontSize: "13px", fontWeight: 600 }}>Contact us</a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
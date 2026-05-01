"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function OrderSuccessContent() {
  const params = useSearchParams();
  const ref = params.get("ref");

  return (
    <div style={{ background: "var(--white)", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "140px 48px 80px", textAlign: "center" }}>
        <div style={{ width: "80px", height: "80px", background: "rgba(43,62,140,0.1)", border: "2px solid var(--navy)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: "36px" }}>
          ✓
        </div>
        <div style={{ fontFamily: "Playfair Display, serif", fontSize: "40px", fontWeight: 700, color: "var(--brown)", marginBottom: "12px", lineHeight: 1.2 }}>
          Order confirmed!
        </div>
        <p style={{ fontSize: "16px", color: "var(--muted)", lineHeight: 1.7, marginBottom: "8px" }}>
          Thank you for your order. We will call you to confirm delivery details before dispatching your books.
        </p>
        {ref && (
          <div style={{ fontSize: "12px", color: "var(--muted)", marginBottom: "32px", fontFamily: "Inter, monospace" }}>
            Reference: {ref}
          </div>
        )}
        <div style={{ padding: "24px", background: "var(--cream)", borderRadius: "16px", marginBottom: "32px", textAlign: "left" }}>
          <div style={{ fontFamily: "Playfair Display, serif", fontSize: "16px", fontWeight: 600, color: "var(--brown)", marginBottom: "12px" }}>What happens next?</div>
          {[
            ["📞", "We call you within 24 hours to confirm your delivery address"],
            ["📦", "Your books are carefully packaged and dispatched"],
            ["🚚", "Delivery within 2-5 business days depending on your region"],
          ].map(([icon, text]) => (
            <div key={text} style={{ display: "flex", gap: "12px", marginBottom: "10px", fontSize: "14px", color: "var(--text)" }}>
              <span>{icon}</span><span>{text}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/books" style={{ padding: "14px 32px", background: "var(--navy)", color: "var(--cream)", borderRadius: "100px", fontSize: "14px", fontWeight: 600 }}>
            Continue shopping
          </a>
          <a href="https://yourhowfar.com" target="_blank" rel="noopener noreferrer" style={{ padding: "14px 32px", background: "transparent", border: "1px solid var(--border)", color: "var(--brown)", borderRadius: "100px", fontSize: "14px", fontWeight: 500 }}>
            Track reading in How Far?
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense>
      <OrderSuccessContent />
    </Suspense>
  );
}
"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill in your name, email, and message.");
      return;
    }
    setSending(true);
    setError("");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "94e4d5e7-7df3-4aaa-b309-934d071ca13d",
          name, email,
          subject: subject || "sikareads contact form",
          message,
          from_name: "sikareads Contact Form",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
        setName(""); setEmail(""); setSubject(""); setMessage("");
      } else {
        setError("Something went wrong. Email us at support@sikareads.com");
      }
    } catch {
      setError("Could not send. Email us at support@sikareads.com");
    }
    setSending(false);
  };

  const inputStyle = {
    width: "100%", padding: "13px 16px", border: "1px solid var(--border)",
    borderRadius: "10px", fontSize: "14px", color: "var(--text)",
    background: "var(--white)", outline: "none", fontFamily: "Inter, sans-serif",
    boxSizing: "border-box" as const,
  };

  return (
    <div style={{ background: "var(--white)", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "120px 48px 80px" }}>
        <div style={{ marginBottom: "56px" }}>
          <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--navy)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "12px" }}>Support</div>
          <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "48px", fontWeight: 700, color: "var(--brown)", marginBottom: "16px", lineHeight: 1.1 }}>
            How can we <em style={{ fontStyle: "italic", color: "var(--navy)" }}>help?</em>
          </h1>
          <p style={{ fontSize: "16px", color: "var(--muted)", maxWidth: "500px", lineHeight: 1.7 }}>
            We read every message. Whether it is an order question, a delivery update, or a book recommendation — we want to hear from you.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "48px" }} className="full-mobile">
          {/* Left */}
          <div>
            <div style={{ background: "var(--cream)", borderRadius: "20px", padding: "28px", marginBottom: "16px" }}>
              <div style={{ fontFamily: "Playfair Display, serif", fontSize: "16px", fontWeight: 600, color: "var(--brown)", marginBottom: "16px" }}>Contact us</div>
              <div style={{ marginBottom: "16px" }}>
                <div style={{ fontSize: "11px", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>Email</div>
                <a href="mailto:support@sikareads.com" style={{ fontFamily: "Playfair Display, serif", fontSize: "16px", color: "var(--navy)", fontStyle: "italic" }}>
                  support@sikareads.com
                </a>
                <div style={{ fontSize: "12px", color: "var(--muted)", marginTop: "4px" }}>We respond within 24 hours</div>
              </div>
              <div style={{ paddingTop: "16px", borderTop: "1px solid var(--border)" }}>
                <div style={{ fontSize: "11px", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>Website</div>
                <a href="https://sikareads.com" style={{ fontFamily: "Playfair Display, serif", fontSize: "16px", color: "var(--navy)", fontStyle: "italic" }}>
                  sikareads.com
                </a>
              </div>
            </div>

            <div style={{ background: "var(--cream)", borderRadius: "20px", padding: "28px" }}>
              <div style={{ fontFamily: "Playfair Display, serif", fontSize: "16px", fontWeight: 600, color: "var(--brown)", marginBottom: "16px" }}>Common questions</div>
              {[
                { q: "Where do you deliver?", a: "We deliver across all 16 regions of Ghana." },
                { q: "How long does delivery take?", a: "2-3 days in Accra, 3-5 days for other regions." },
                { q: "Can I track my order?", a: "We will call you to confirm and give you updates." },
                { q: "What payment methods?", a: "Card, MoMo, and bank transfer via Paystack." },
                { q: "Can I return a book?", a: "Yes — contact us within 7 days of delivery." },
              ].map(item => (
                <div key={item.q} style={{ paddingBottom: "12px", marginBottom: "12px", borderBottom: "1px solid var(--border)" }}>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--brown)", marginBottom: "3px" }}>{item.q}</div>
                  <div style={{ fontSize: "12px", color: "var(--muted)" }}>{item.a}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: "20px", padding: "32px" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "48px 20px" }}>
                <div style={{ fontSize: "56px", marginBottom: "16px" }}>📚</div>
                <div style={{ fontFamily: "Playfair Display, serif", fontSize: "28px", fontWeight: 700, color: "var(--brown)", marginBottom: "10px" }}>
                  Message <em style={{ color: "var(--navy)", fontStyle: "italic" }}>received</em>.
                </div>
                <p style={{ fontSize: "14px", color: "var(--muted)", marginBottom: "24px" }}>
                  We will get back to you within 24 hours.
                </p>
                <button onClick={() => setSent(false)} style={{ padding: "10px 24px", background: "transparent", border: "1px solid var(--border)", color: "var(--brown)", borderRadius: "100px", fontSize: "13px", cursor: "pointer" }}>
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--navy)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "20px" }}>Send a message</div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>Your name</label>
                    <input type="text" placeholder="Kwesi" value={name} onChange={e => setName(e.target.value)} style={inputStyle} onFocus={e => e.currentTarget.style.borderColor = "var(--navy)"} onBlur={e => e.currentTarget.style.borderColor = "var(--border)"} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>Your email</label>
                    <input type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} onFocus={e => e.currentTarget.style.borderColor = "var(--navy)"} onBlur={e => e.currentTarget.style.borderColor = "var(--border)"} />
                  </div>
                </div>

                <div style={{ marginBottom: "12px" }}>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>Subject</label>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "8px" }}>
                    {["Order query", "Delivery update", "Book recommendation", "Return", "Other"].map(s => (
                      <button key={s} onClick={() => setSubject(s)} style={{ padding: "6px 14px", background: subject === s ? "var(--navy)" : "transparent", border: `1px solid ${subject === s ? "var(--navy)" : "var(--border)"}`, borderRadius: "100px", color: subject === s ? "var(--cream)" : "var(--muted)", fontSize: "12px", cursor: "pointer" }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>Message</label>
                  <textarea placeholder="Tell us what's on your mind..." value={message} onChange={e => setMessage(e.target.value)} style={{ ...inputStyle, minHeight: "120px", resize: "vertical", lineHeight: 1.6 }} onFocus={e => e.currentTarget.style.borderColor = "var(--navy)"} onBlur={e => e.currentTarget.style.borderColor = "var(--border)"} />
                </div>

                {error && (
                  <div style={{ padding: "10px 14px", background: "rgba(200,90,90,0.08)", border: "1px solid rgba(200,90,90,0.3)", borderRadius: "8px", color: "#c85a5a", fontSize: "13px", marginBottom: "16px" }}>
                    {error}
                  </div>
                )}

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: "12px", color: "var(--muted)" }}>We respond within 24 hours</div>
                  <button onClick={handleSubmit} disabled={sending} style={{ padding: "12px 28px", background: sending ? "#8a9a6a" : "var(--navy)", color: "var(--cream)", border: "none", borderRadius: "100px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
                    {sending ? "Sending..." : "Send message"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
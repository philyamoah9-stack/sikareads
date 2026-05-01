"use client";

import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(253,252,249,0.96)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border)",
        height: "68px", display: "flex", alignItems: "center",
        padding: "0 48px", justifyContent: "space-between",
      }}>
        {/* Brand */}
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "36px", height: "36px", background: "var(--navy)",
            borderRadius: "6px", display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: "18px", fontWeight: 700,
            color: "var(--cream)", fontFamily: "Playfair Display, serif",
          }}>s</div>
          <span style={{ fontFamily: "Playfair Display, serif", fontSize: "22px", fontWeight: 700, color: "var(--brown)" }}>
            sikareads
          </span>
        </a>

        {/* Desktop links */}
        <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <a href="/books" style={{ fontSize: "14px", color: "var(--muted)", fontWeight: 500 }}>All books</a>
          <a href="/books?genre=faith" style={{ fontSize: "14px", color: "var(--muted)", fontWeight: 500 }}>Faith</a>
          <a href="/books?genre=finance" style={{ fontSize: "14px", color: "var(--muted)", fontWeight: 500 }}>Finance</a>
          <a href="/books?genre=children" style={{ fontSize: "14px", color: "var(--muted)", fontWeight: 500 }}>Children</a>
          <a href="/books?genre=growth" style={{ fontSize: "14px", color: "var(--muted)", fontWeight: 500 }}>Growth</a>
        </div>

        {/* Right actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <a href="/cart" style={{ position: "relative", fontSize: "20px" }}>🛒</a>
          <a href="/books" className="hide-mobile" style={{
            padding: "10px 24px", background: "var(--navy)", color: "var(--cream)",
            borderRadius: "100px", fontSize: "13px", fontWeight: 600,
          }}>Shop now</a>
          <button onClick={() => setMenuOpen(true)} style={{
            display: "none", background: "transparent", border: "1px solid var(--border)",
            borderRadius: "8px", padding: "8px 10px", fontSize: "16px",
          }} className="show-mobile">☰</button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 200 }} onClick={() => setMenuOpen(false)}>
          <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "280px", background: "var(--white)", padding: "28px 24px" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
              <span style={{ fontFamily: "Playfair Display, serif", fontSize: "20px", fontWeight: 700, color: "var(--brown)" }}>sikareads</span>
              <button onClick={() => setMenuOpen(false)} style={{ background: "transparent", border: "none", fontSize: "24px", color: "var(--muted)" }}>×</button>
            </div>
            {[
              { label: "All books", href: "/books" },
              { label: "Faith", href: "/books?genre=faith" },
              { label: "Finance", href: "/books?genre=finance" },
              { label: "Children", href: "/books?genre=children" },
              { label: "Growth", href: "/books?genre=growth" },
            ].map(link => (
              <a key={link.label} href={link.href} style={{ display: "block", padding: "14px 0", fontSize: "16px", color: "var(--brown)", borderBottom: "1px solid var(--border)", fontWeight: 500 }}>
                {link.label}
              </a>
            ))}
            <a href="/books" style={{ display: "block", marginTop: "24px", padding: "14px", background: "var(--navy)", color: "var(--cream)", borderRadius: "12px", textAlign: "center", fontSize: "15px", fontWeight: 600 }}>
              Shop now
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 767px) {
          .show-mobile { display: block !important; }
          .hide-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ALL_BOOKS = [
  { id: "1", title: "The Richest Man in Babylon", author: "George S. Clason", price: 85, genre: "Finance", color: "#1B3A6B" },
  { id: "2", title: "Atomic Habits", author: "James Clear", price: 95, genre: "Growth", color: "#2D5016" },
  { id: "3", title: "The Purpose Driven Life", author: "Rick Warren", price: 80, genre: "Faith", color: "#4A1942" },
  { id: "4", title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", price: 90, genre: "Finance", color: "#1B3A6B" },
  { id: "5", title: "Boundaries", author: "Dr. Henry Cloud", price: 85, genre: "Faith", color: "#4A1942" },
  { id: "6", title: "Deep Work", author: "Cal Newport", price: 88, genre: "Growth", color: "#2D5016" },
  { id: "7", title: "The Alchemist", author: "Paulo Coelho", price: 75, genre: "Growth", color: "#6B3D16" },
  { id: "8", title: "Think and Grow Rich", author: "Napoleon Hill", price: 82, genre: "Finance", color: "#1B3A6B" },
  { id: "9", title: "The Bible", author: "Various Authors", price: 120, genre: "Faith", color: "#4A1942" },
  { id: "10", title: "Mere Christianity", author: "C.S. Lewis", price: 78, genre: "Faith", color: "#3D1F5C" },
  { id: "11", title: "The Total Money Makeover", author: "Dave Ramsey", price: 88, genre: "Finance", color: "#1B3A6B" },
  { id: "12", title: "Mindset", author: "Carol S. Dweck", price: 85, genre: "Growth", color: "#2D5016" },
  { id: "13", title: "The Very Hungry Caterpillar", author: "Eric Carle", price: 45, genre: "Children", color: "#1B5E20" },
  { id: "14", title: "Goodnight Moon", author: "Margaret Wise Brown", price: 42, genre: "Children", color: "#1B5E20" },
  { id: "15", title: "The Lion, the Witch and the Wardrobe", author: "C.S. Lewis", price: 65, genre: "Children", color: "#1A3A5C" },
  { id: "16", title: "Who Moved My Cheese?", author: "Spencer Johnson", price: 70, genre: "Growth", color: "#6B3D16" },
  { id: "17", title: "The 7 Habits of Highly Effective People", author: "Stephen R. Covey", price: 92, genre: "Growth", color: "#2D5016" },
  { id: "18", title: "Experiencing God", author: "Henry Blackaby", price: 82, genre: "Faith", color: "#4A1942" },
  { id: "19", title: "I Will Teach You to Be Rich", author: "Ramit Sethi", price: 88, genre: "Finance", color: "#1B3A6B" },
  { id: "20", title: "Charlotte's Web", author: "E.B. White", price: 55, genre: "Children", color: "#1B5E20" },
];

type CartItem = { book: typeof ALL_BOOKS[0]; qty: number };

export default function CartPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("sikareads-cart") || "[]") as string[];
    const counts: Record<string, number> = {};
    stored.forEach(id => { counts[id] = (counts[id] || 0) + 1; });
    const cartItems = Object.entries(counts).map(([id, qty]) => {
      const book = ALL_BOOKS.find(b => b.id === id);
      return book ? { book, qty } : null;
    }).filter(Boolean) as CartItem[];
    setItems(cartItems);
    setLoaded(true);
  }, []);

  const updateQty = (id: string, delta: number) => {
    setItems(prev => {
      const updated = prev.map(item => item.book.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item).filter(item => item.qty > 0);
      const flat = updated.flatMap(item => Array(item.qty).fill(item.book.id));
      localStorage.setItem("sikareads-cart", JSON.stringify(flat));
      return updated;
    });
  };

  const removeItem = (id: string) => {
    setItems(prev => {
      const updated = prev.filter(item => item.book.id !== id);
      const flat = updated.flatMap(item => Array(item.qty).fill(item.book.id));
      localStorage.setItem("sikareads-cart", JSON.stringify(flat));
      return updated;
    });
  };

  const subtotal = items.reduce((s, item) => s + item.book.price * item.qty, 0);
  const delivery = subtotal > 0 ? 30 : 0;
  const total = subtotal + delivery;

  if (!loaded) return null;

  return (
    <div style={{ background: "var(--white)", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ paddingTop: "88px", maxWidth: "1200px", margin: "0 auto", padding: "100px 48px 80px" }}>
        <div style={{ fontFamily: "Playfair Display, serif", fontSize: "40px", fontWeight: 700, color: "var(--brown)", marginBottom: "8px" }}>
          Your cart
        </div>
        <div style={{ fontSize: "14px", color: "var(--muted)", marginBottom: "40px" }}>
          {items.length === 0 ? "Your cart is empty" : `${items.reduce((s, i) => s + i.qty, 0)} item${items.reduce((s, i) => s + i.qty, 0) !== 1 ? "s" : ""}`}
        </div>

        {items.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <div style={{ fontSize: "64px", marginBottom: "20px" }}>📚</div>
            <div style={{ fontFamily: "Playfair Display, serif", fontSize: "28px", color: "var(--brown)", marginBottom: "12px" }}>Your cart is empty</div>
            <p style={{ color: "var(--muted)", fontSize: "15px", marginBottom: "28px" }}>Find a book that grows you.</p>
            <a href="/books" style={{ display: "inline-block", padding: "14px 36px", background: "var(--navy)", color: "var(--cream)", borderRadius: "100px", fontSize: "14px", fontWeight: 600 }}>
              Browse books
            </a>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "40px", alignItems: "start" }} className="full-mobile">
            {/* Cart items */}
            <div>
              {items.map(item => (
                <div key={item.book.id} style={{ display: "flex", gap: "20px", padding: "20px 0", borderBottom: "1px solid var(--border)", alignItems: "flex-start" }}>
                  {/* Mini cover */}
                  <a href={`/books/${item.book.id}`}>
                    <div style={{ width: "72px", height: "96px", background: item.book.color, borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", padding: "8px", flexShrink: 0 }}>
                      <div style={{ fontFamily: "Playfair Display, serif", fontSize: "9px", color: "rgba(255,255,255,0.9)", textAlign: "center", lineHeight: 1.2 }}>{item.book.title}</div>
                    </div>
                  </a>

                  {/* Info */}
                  <div style={{ flex: 1 }}>
                    <a href={`/books/${item.book.id}`}>
                      <div style={{ fontFamily: "Playfair Display, serif", fontSize: "17px", fontWeight: 600, color: "var(--brown)", marginBottom: "4px", lineHeight: 1.3 }}>{item.book.title}</div>
                    </a>
                    <div style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "12px" }}>by {item.book.author}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                      {/* Qty */}
                      <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--border)", borderRadius: "8px", overflow: "hidden" }}>
                        <button onClick={() => updateQty(item.book.id, -1)} style={{ padding: "6px 12px", background: "transparent", border: "none", fontSize: "16px", color: "var(--brown)", cursor: "pointer" }}>−</button>
                        <span style={{ padding: "6px 12px", fontSize: "14px", fontWeight: 600, color: "var(--brown)", borderLeft: "1px solid var(--border)", borderRight: "1px solid var(--border)" }}>{item.qty}</span>
                        <button onClick={() => updateQty(item.book.id, 1)} style={{ padding: "6px 12px", background: "transparent", border: "none", fontSize: "16px", color: "var(--brown)", cursor: "pointer" }}>+</button>
                      </div>
                      <button onClick={() => removeItem(item.book.id)} style={{ background: "transparent", border: "none", fontSize: "12px", color: "#c85a5a", cursor: "pointer", fontWeight: 500 }}>Remove</button>
                    </div>
                  </div>

                  {/* Price */}
                  <div style={{ fontFamily: "Playfair Display, serif", fontSize: "18px", fontWeight: 700, color: "var(--navy)", flexShrink: 0 }}>
                    GHS {item.book.price * item.qty}
                  </div>
                </div>
              ))}

              <div style={{ paddingTop: "20px" }}>
                <a href="/books" style={{ fontSize: "13px", color: "var(--navy)", fontWeight: 600 }}>← Continue shopping</a>
              </div>
            </div>

            {/* Order summary */}
            <div style={{ background: "var(--cream)", borderRadius: "20px", padding: "28px", position: "sticky" as const, top: "100px" }}>
              <div style={{ fontFamily: "Playfair Display, serif", fontSize: "22px", fontWeight: 700, color: "var(--brown)", marginBottom: "20px" }}>
                Order summary
              </div>

              {[
                ["Subtotal", `GHS ${subtotal}`],
                ["Delivery (Ghana)", `GHS ${delivery}`],
              ].map(([label, value]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--border)", fontSize: "14px" }}>
                  <span style={{ color: "var(--muted)" }}>{label}</span>
                  <span style={{ color: "var(--brown)", fontWeight: 500 }}>{value}</span>
                </div>
              ))}

              <div style={{ display: "flex", justifyContent: "space-between", padding: "16px 0", fontSize: "18px", fontWeight: 700 }}>
                <span style={{ fontFamily: "Playfair Display, serif", color: "var(--brown)" }}>Total</span>
                <span style={{ fontFamily: "Playfair Display, serif", color: "var(--navy)" }}>GHS {total}</span>
              </div>

              <button onClick={() => router.push("/checkout")} style={{ width: "100%", padding: "16px", background: "var(--navy)", color: "var(--cream)", border: "none", borderRadius: "100px", fontSize: "15px", fontWeight: 700, cursor: "pointer", marginBottom: "12px" }}>
                Proceed to checkout
              </button>

              <div style={{ textAlign: "center", fontSize: "12px", color: "var(--muted)", marginBottom: "16px" }}>
                Secure checkout powered by Paystack 🔒
              </div>

              <div style={{ padding: "14px", background: "rgba(43,62,140,0.06)", border: "1px solid rgba(43,62,140,0.15)", borderRadius: "10px", fontSize: "12px", color: "var(--muted)", lineHeight: 1.6 }}>
                🚚 Delivery across Ghana · 1-2 business days processing · 2-5 days delivery
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
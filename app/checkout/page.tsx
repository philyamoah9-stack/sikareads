"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ALL_BOOKS = [
  { id: "1", title: "The Richest Man in Babylon", author: "George S. Clason", price: 85, color: "#1B3A6B", genre: "Finance" },
{ id: "2", title: "Atomic Habits", author: "James Clear", price: 95, color: "#2D5016", genre: "Growth" },
{ id: "3", title: "The Purpose Driven Life", author: "Rick Warren", price: 80, color: "#4A1942", genre: "Faith" },
{ id: "4", title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", price: 90, color: "#1B3A6B", genre: "Finance" },
{ id: "5", title: "Boundaries", author: "Dr. Henry Cloud", price: 85, color: "#4A1942", genre: "Faith" },
{ id: "6", title: "Deep Work", author: "Cal Newport", price: 88, color: "#2D5016", genre: "Growth" },
{ id: "7", title: "The Alchemist", author: "Paulo Coelho", price: 75, color: "#6B3D16", genre: "Growth" },
{ id: "8", title: "Think and Grow Rich", author: "Napoleon Hill", price: 82, color: "#1B3A6B", genre: "Finance" },
{ id: "9", title: "The Bible", author: "Various Authors", price: 120, color: "#4A1942", genre: "Faith" },
{ id: "10", title: "Mere Christianity", author: "C.S. Lewis", price: 78, color: "#3D1F5C", genre: "Faith" },
{ id: "11", title: "The Total Money Makeover", author: "Dave Ramsey", price: 88, color: "#1B3A6B", genre: "Finance" },
{ id: "12", title: "Mindset", author: "Carol S. Dweck", price: 85, color: "#2D5016", genre: "Growth" },
{ id: "13", title: "The Very Hungry Caterpillar", author: "Eric Carle", price: 45, color: "#1B5E20", genre: "Children" },
{ id: "14", title: "Goodnight Moon", author: "Margaret Wise Brown", price: 42, color: "#1B5E20", genre: "Children" },
{ id: "15", title: "The Lion, the Witch and the Wardrobe", author: "C.S. Lewis", price: 65, color: "#1A3A5C", genre: "Children" },
{ id: "16", title: "Who Moved My Cheese?", author: "Spencer Johnson", price: 70, color: "#6B3D16", genre: "Growth" },
{ id: "17", title: "The 7 Habits of Highly Effective People", author: "Stephen R. Covey", price: 92, color: "#2D5016", genre: "Growth" },
{ id: "18", title: "Experiencing God", author: "Henry Blackaby", price: 82, color: "#4A1942", genre: "Faith" },
{ id: "19", title: "I Will Teach You to Be Rich", author: "Ramit Sethi", price: 88, color: "#1B3A6B", genre: "Finance" },
{ id: "20", title: "Charlotte's Web", author: "E.B. White", price: 55, color: "#1B5E20", genre: "Children" },];

type CartItem = { book: typeof ALL_BOOKS[0]; qty: number };

export default function CheckoutPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [paying, setPaying] = useState(false);

  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [error, setError] = useState("");

  const REGIONS = ["Greater Accra", "Ashanti", "Western", "Central", "Eastern", "Northern", "Upper East", "Upper West", "Volta", "Brong-Ahafo", "Oti", "Savannah", "North East", "Western North", "Ahafo", "Bono East"];

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

  const subtotal = items.reduce((s, item) => s + item.book.price * item.qty, 0);
  const delivery = 30;
  const total = subtotal + delivery;

  const handlePaystack = () => {
    if (!firstName || !lastName || !email || !phone || !address || !city || !region) {
      setError("Please fill in all fields before proceeding.");
      return;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setPaying(true);

    // Load Paystack inline
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.onload = () => {
      const handler = (window as any).PaystackPop.setup({
        key: "pk_live_3449441574162effe0040657589af5da1fec7b11", // Replace with your Paystack public key
        email,
        amount: total * 100, // Paystack uses pesewas
        currency: "GHS",
        ref: `sikareads-${Date.now()}`,
        metadata: {
          custom_fields: [
            { display_name: "Customer name", variable_name: "name", value: `${firstName} ${lastName}` },
            { display_name: "Phone", variable_name: "phone", value: phone },
            { display_name: "Delivery address", variable_name: "address", value: `${address}, ${city}, ${region}` },
            { display_name: "Order", variable_name: "order", value: items.map(i => `${i.book.title} x${i.qty}`).join(", ") },
          ],
        },
        callback: async (response: any) => {
  // Save purchases to Supabase
  try {
    const { createClient } = await import("../lib/supabase");
    const supabase = createClient();
    
    const purchaseRows = items.flatMap(item =>
      Array(item.qty).fill(null).map(() => ({
        email: email.toLowerCase().trim(),
        book_id: item.book.id,
        book_title: item.book.title,
        book_author: item.book.author,
        book_genre: (item.book as any).genre || "General",
        order_ref: response.reference,
      }))
    );

    await supabase.from("purchases").insert(purchaseRows);
  } catch (e) {
    console.error("Failed to save purchases:", e);
  }

  // Clear cart and redirect
  localStorage.setItem("sikareads-cart", "[]");
  router.push(`/order-success?ref=${response.reference}`);
},
        onClose: () => {
          setPaying(false);
        },
      });
      handler.openIframe();
    };
    document.body.appendChild(script);
  };

  const inputStyle = {
    width: "100%", padding: "12px 16px", border: "1px solid var(--border)",
    borderRadius: "10px", fontSize: "14px", color: "var(--text)",
    background: "var(--white)", outline: "none", fontFamily: "Inter, sans-serif",
    boxSizing: "border-box" as const,
  };

  if (!loaded) return null;

  if (items.length === 0) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--white)" }}>
        <Navbar />
        <div style={{ paddingTop: "120px", textAlign: "center", padding: "160px 48px" }}>
          <div style={{ fontFamily: "Playfair Display, serif", fontSize: "28px", color: "var(--brown)", marginBottom: "12px" }}>Nothing to checkout</div>
          <a href="/books" style={{ color: "var(--navy)", fontWeight: 600 }}>Browse books →</a>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ background: "var(--white)", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "100px 48px 80px" }}>
        <div style={{ fontFamily: "Playfair Display, serif", fontSize: "40px", fontWeight: 700, color: "var(--brown)", marginBottom: "40px" }}>
          Checkout
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "48px", alignItems: "start" }} className="full-mobile">
          {/* Left — delivery details */}
          <div>
            <div style={{ fontFamily: "Playfair Display, serif", fontSize: "22px", fontWeight: 700, color: "var(--brown)", marginBottom: "20px" }}>
              Delivery details
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>First name</label>
                <input type="text" placeholder="Kwesi" value={firstName} onChange={e => setFirstName(e.target.value)} style={inputStyle} onFocus={e => e.currentTarget.style.borderColor = "var(--navy)"} onBlur={e => e.currentTarget.style.borderColor = "var(--border)"} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>Last name</label>
                <input type="text" placeholder="Amoah" value={lastName} onChange={e => setLastName(e.target.value)} style={inputStyle} onFocus={e => e.currentTarget.style.borderColor = "var(--navy)"} onBlur={e => e.currentTarget.style.borderColor = "var(--border)"} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>Email</label>
                <input type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} onFocus={e => e.currentTarget.style.borderColor = "var(--navy)"} onBlur={e => e.currentTarget.style.borderColor = "var(--border)"} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>Phone (MoMo or call)</label>
                <input type="tel" placeholder="024 XXX XXXX" value={phone} onChange={e => setPhone(e.target.value)} style={inputStyle} onFocus={e => e.currentTarget.style.borderColor = "var(--navy)"} onBlur={e => e.currentTarget.style.borderColor = "var(--border)"} />
              </div>
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>Delivery address</label>
              <input type="text" placeholder="House number, street name, area" value={address} onChange={e => setAddress(e.target.value)} style={inputStyle} onFocus={e => e.currentTarget.style.borderColor = "var(--navy)"} onBlur={e => e.currentTarget.style.borderColor = "var(--border)"} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px" }}>
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>City / Town</label>
                <input type="text" placeholder="Accra" value={city} onChange={e => setCity(e.target.value)} style={inputStyle} onFocus={e => e.currentTarget.style.borderColor = "var(--navy)"} onBlur={e => e.currentTarget.style.borderColor = "var(--border)"} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>Region</label>
                <select value={region} onChange={e => setRegion(e.target.value)} style={{ ...inputStyle, appearance: "none" as const, cursor: "pointer" }} onFocus={e => e.currentTarget.style.borderColor = "var(--navy)"} onBlur={e => e.currentTarget.style.borderColor = "var(--border)"}>
                  <option value="">Select region</option>
                  {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
            </div>

            {/* Delivery info */}
            <div style={{ padding: "16px 20px", background: "rgba(43,62,140,0.06)", border: "1px solid rgba(43,62,140,0.15)", borderRadius: "12px", marginBottom: "24px" }}>
              <div style={{ fontWeight: 600, fontSize: "13px", color: "var(--navy)", marginBottom: "6px" }}>🚚 Delivery information</div>
              <div style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.6 }}>
                Orders are processed within 1-2 business days. Delivery within Accra takes 2-3 business days. Other regions take 3-5 business days. You will receive a call to confirm your order before dispatch.
              </div>
            </div>

            {error && (
              <div style={{ padding: "12px 16px", background: "rgba(200,90,90,0.08)", border: "1px solid rgba(200,90,90,0.3)", borderRadius: "10px", color: "#c85a5a", fontSize: "13px", marginBottom: "16px" }}>
                {error}
              </div>
            )}
          </div>

          {/* Right — order summary */}
          <div style={{ position: "sticky" as const, top: "100px" }}>
            <div style={{ background: "var(--cream)", borderRadius: "20px", padding: "24px", marginBottom: "16px" }}>
              <div style={{ fontFamily: "Playfair Display, serif", fontSize: "18px", fontWeight: 700, color: "var(--brown)", marginBottom: "16px" }}>
                Order summary
              </div>

              {items.map(item => (
                <div key={item.book.id} style={{ display: "flex", gap: "12px", marginBottom: "12px", alignItems: "center" }}>
                  <div style={{ width: "40px", height: "52px", background: item.book.color, borderRadius: "4px", flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--brown)", lineHeight: 1.2 }}>{item.book.title}</div>
                    <div style={{ fontSize: "11px", color: "var(--muted)", marginTop: "2px" }}>Qty: {item.qty}</div>
                  </div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--navy)" }}>GHS {item.book.price * item.qty}</div>
                </div>
              ))}

              <div style={{ borderTop: "1px solid var(--border)", marginTop: "16px", paddingTop: "16px" }}>
                {[
                  ["Subtotal", `GHS ${subtotal}`],
                  ["Delivery", `GHS ${delivery}`],
                ].map(([label, value]) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "8px" }}>
                    <span style={{ color: "var(--muted)" }}>{label}</span>
                    <span style={{ color: "var(--brown)" }}>{value}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Playfair Display, serif", fontSize: "20px", fontWeight: 700, marginTop: "12px", paddingTop: "12px", borderTop: "1px solid var(--border)" }}>
                  <span style={{ color: "var(--brown)" }}>Total</span>
                  <span style={{ color: "var(--navy)" }}>GHS {total}</span>
                </div>
              </div>
            </div>

            <button onClick={handlePaystack} disabled={paying} style={{ width: "100%", padding: "18px", background: paying ? "#8a9a6a" : "var(--navy)", color: "var(--cream)", border: "none", borderRadius: "100px", fontSize: "16px", fontWeight: 700, cursor: paying ? "not-allowed" : "pointer", marginBottom: "12px", transition: "background 0.2s" }}>
              {paying ? "Opening payment..." : `Pay GHS ${total} with Paystack`}
            </button>

            <div style={{ textAlign: "center", fontSize: "12px", color: "var(--muted)" }}>
              🔒 Secured by Paystack · Pay with card, MoMo, or bank transfer
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
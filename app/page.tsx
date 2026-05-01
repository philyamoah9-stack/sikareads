"use client";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BookCover from "./components/BookCover";

// ... rest of the file stays exactly the same

const FEATURED_BOOKS = [
  { id: "1", title: "The Richest Man in Babylon", author: "George S. Clason", price: 85, genre: "Finance", color: "#1B3A6B" },
  { id: "2", title: "Atomic Habits", author: "James Clear", price: 95, genre: "Growth", color: "#2D5016" },
  { id: "3", title: "The Purpose Driven Life", author: "Rick Warren", price: 80, genre: "Faith", color: "#4A1942" },
  { id: "4", title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", price: 90, genre: "Finance", color: "#1B3A6B" },
  { id: "5", title: "Boundaries", author: "Dr. Henry Cloud", price: 85, genre: "Faith", color: "#4A1942" },
  { id: "6", title: "Deep Work", author: "Cal Newport", price: 88, genre: "Growth", color: "#2D5016" },
  { id: "7", title: "The Alchemist", author: "Paulo Coelho", price: 75, genre: "Growth", color: "#6B3D16" },
  { id: "8", title: "Think and Grow Rich", author: "Napoleon Hill", price: 82, genre: "Finance", color: "#1B3A6B" },
];

const GENRES = [
  { name: "Faith", icon: "✝", desc: "Books that deepen your walk", color: "#4A1942", href: "/books?genre=faith" },
  { name: "Finance", icon: "₵", desc: "Build wealth intentionally", color: "#1B3A6B", href: "/books?genre=finance" },
  { name: "Children", icon: "★", desc: "Books that shape young minds", color: "#1B5E20", href: "/books?genre=children" },
  { name: "Growth", icon: "↑", desc: "Become who you are meant to be", color: "#4A2800", href: "/books?genre=growth" },
];

export default function Home() {
  return (
    <div style={{ background: "var(--white)" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ paddingTop: "120px", paddingBottom: "80px", background: "linear-gradient(135deg, var(--navy) 0%, #1E2D6B 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "100%", background: "radial-gradient(circle at 80% 50%, rgba(201,150,59,0.15) 0%, transparent 60%)" }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }} className="full-mobile">
          <div>
            <div style={{ display: "inline-block", padding: "6px 16px", background: "rgba(201,150,59,0.2)", border: "1px solid var(--gold)", borderRadius: "100px", fontSize: "12px", color: "var(--gold)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "24px" }}>
              Ghana's curated bookstore
            </div>
            <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "56px", fontWeight: 700, color: "var(--cream)", lineHeight: 1.1, marginBottom: "20px" }}>
              Books that <em style={{ fontStyle: "italic", color: "var(--gold)" }}>grow</em> you.
            </h1>
            <p style={{ fontSize: "17px", color: "rgba(250,245,238,0.75)", lineHeight: 1.7, marginBottom: "36px", maxWidth: "440px" }}>
              Faith. Finance. Children. Personal development. Curated for Ghanaians building intentional lives. Delivered to your door.
            </p>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <a href="/books" style={{ padding: "16px 36px", background: "var(--gold)", color: "var(--brown)", borderRadius: "100px", fontSize: "15px", fontWeight: 700, display: "inline-block" }}>
                Browse books
              </a>
              <a href="/books?genre=new" style={{ padding: "16px 36px", background: "transparent", border: "1px solid rgba(250,245,238,0.3)", color: "var(--cream)", borderRadius: "100px", fontSize: "15px", fontWeight: 500, display: "inline-block" }}>
                New arrivals
              </a>
            </div>
            <div style={{ marginTop: "40px", display: "flex", gap: "32px" }}>
              {[["500+", "Books"], ["4", "Genres"], ["GHS", "Currency"], ["🇬🇭", "Ghana delivery"]].map(([val, label]) => (
                <div key={label}>
                  <div style={{ fontFamily: "Playfair Display, serif", fontSize: "22px", fontWeight: 700, color: "var(--gold)" }}>{val}</div>
                  <div style={{ fontSize: "11px", color: "rgba(250,245,238,0.5)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Book stack visual */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative", height: "400px" }}>
            {FEATURED_BOOKS.slice(0, 4).map((book, i) => (
              <div key={book.id} style={{
                position: "absolute",
                width: "160px", height: "220px",
                borderRadius: "4px 8px 8px 4px",
                overflow: "hidden",
                transform: `rotate(${[-8, -3, 3, 8][i]}deg) translateX(${[-80, -25, 30, 85][i]}px)`,
                boxShadow: "4px 8px 24px rgba(0,0,0,0.4)",
                zIndex: i,
              }}>
                <BookCover bookId={book.id} title={book.title} author={book.author} genre={book.genre} height="220px" fontSize={11} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Genre sections */}
      <section style={{ padding: "80px 48px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ fontFamily: "Playfair Display, serif", fontSize: "36px", fontWeight: 700, color: "var(--brown)", marginBottom: "12px" }}>
            Browse by genre
          </div>
          <p style={{ fontSize: "15px", color: "var(--muted)", maxWidth: "440px", margin: "0 auto" }}>
            Every book is chosen because it moves the needle on something that matters.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }} className="full-mobile">
          {GENRES.map(genre => (
            <a key={genre.name} href={genre.href} style={{
              background: genre.color, borderRadius: "16px", padding: "32px 24px",
              display: "block", transition: "transform 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-4px)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}>
              <div style={{ fontSize: "32px", marginBottom: "12px" }}>{genre.icon}</div>
              <div style={{ fontFamily: "Playfair Display, serif", fontSize: "20px", fontWeight: 700, color: "var(--cream)", marginBottom: "6px" }}>{genre.name}</div>
              <div style={{ fontSize: "13px", color: "rgba(250,245,238,0.7)", lineHeight: 1.5 }}>{genre.desc}</div>
            </a>
          ))}
        </div>
      </section>

      {/* Featured books */}
      <section style={{ padding: "0 48px 80px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <div style={{ fontFamily: "Playfair Display, serif", fontSize: "32px", fontWeight: 700, color: "var(--brown)" }}>
            Featured books
          </div>
          <a href="/books" style={{ fontSize: "14px", color: "var(--navy)", fontWeight: 600 }}>View all →</a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }} className="full-mobile">
          {FEATURED_BOOKS.map(book => (
   <a key={book.id} href={"/books/" + book.id} style={{ display: "block", background: "var(--white)", border: "1px solid var(--border)", borderRadius: "16px", overflow: "hidden", transition: "box-shadow 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.1)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}>
              {/* Cover */}
              <BookCover bookId={book.id} title={book.title} author={book.author} genre={book.genre} height="200px" />
              {/* Info */}
              <div style={{ padding: "16px" }}>
                <div style={{ fontFamily: "Playfair Display, serif", fontSize: "15px", fontWeight: 600, color: "var(--brown)", marginBottom: "4px", lineHeight: 1.3 }}>{book.title}</div>
                <div style={{ fontSize: "12px", color: "var(--muted)", marginBottom: "12px" }}>{book.author}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontFamily: "Playfair Display, serif", fontSize: "18px", fontWeight: 700, color: "var(--navy)" }}>GHS {book.price}</div>
                  <div style={{ fontSize: "11px", color: "var(--gold)", padding: "3px 10px", border: "1px solid var(--gold)", borderRadius: "100px" }}>{book.genre}</div>
                </div>
                <button style={{ marginTop: "12px", width: "100%", padding: "10px", background: "var(--navy)", color: "var(--cream)", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: 600 }}>
                  Add to cart
                </button>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* How Far? crosslink */}
      <section style={{ background: "var(--cream-dark)", padding: "80px 48px", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ fontFamily: "Playfair Display, serif", fontSize: "36px", fontWeight: 700, color: "var(--brown)", marginBottom: "16px", lineHeight: 1.2 }}>
            Track your reading in <em style={{ fontStyle: "italic", color: "var(--navy)" }}>How Far?</em>
          </div>
          <p style={{ fontSize: "15px", color: "var(--muted)", lineHeight: 1.7, marginBottom: "28px" }}>
            Every book you buy on sikareads can be tracked in How Far? — our free personal growth app. Set reading goals, track your progress, and let your reading feed your How Far? score.
          </p>
          <a href="https://yourhowfar.com" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "14px 36px", background: "var(--navy)", color: "var(--cream)", borderRadius: "100px", fontSize: "14px", fontWeight: 600 }}>
            Try How Far? for free →
          </a>
        </div>
      </section>

      {/* Delivery banner */}
      <section style={{ background: "var(--navy)", padding: "40px 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "24px" }}>
          {[
            { icon: "🚚", title: "Ghana delivery", desc: "Delivered to your door across Ghana" },
            { icon: "📦", title: "Careful packaging", desc: "Every book wrapped and protected" },
            { icon: "💳", title: "Pay with Paystack", desc: "Secure checkout in GHS" },
            { icon: "📖", title: "Curated catalogue", desc: "Every book chosen with purpose" },
          ].map(item => (
            <div key={item.title} style={{ textAlign: "center", minWidth: "160px" }}>
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>{item.icon}</div>
              <div style={{ fontFamily: "Playfair Display, serif", fontSize: "15px", fontWeight: 600, color: "var(--cream)", marginBottom: "4px" }}>{item.title}</div>
              <div style={{ fontSize: "12px", color: "rgba(250,245,238,0.55)" }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ALL_BOOKS = [
  { id: "1", title: "The Richest Man in Babylon", author: "George S. Clason", price: 85, genre: "Finance", color: "#1B3A6B", description: "The classic guide to financial wisdom through ancient Babylonian parables. Timeless principles for building wealth." },
  { id: "2", title: "Atomic Habits", author: "James Clear", price: 95, genre: "Growth", color: "#2D5016", description: "An easy and proven way to build good habits and break bad ones. The definitive guide to habit formation." },
  { id: "3", title: "The Purpose Driven Life", author: "Rick Warren", price: 80, genre: "Faith", color: "#4A1942", description: "A groundbreaking manifesto on the meaning of life. What on earth am I here for?" },
  { id: "4", title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", price: 90, genre: "Finance", color: "#1B3A6B", description: "What the rich teach their kids about money that the poor and middle class do not." },
  { id: "5", title: "Boundaries", author: "Dr. Henry Cloud", price: 85, genre: "Faith", color: "#4A1942", description: "When to say yes, how to say no to take control of your life. A guide to healthy relationships." },
  { id: "6", title: "Deep Work", author: "Cal Newport", price: 88, genre: "Growth", color: "#2D5016", description: "Rules for focused success in a distracted world. How to cultivate deep focus in your professional life." },
  { id: "7", title: "The Alchemist", author: "Paulo Coelho", price: 75, genre: "Growth", color: "#6B3D16", description: "A magical story about following your dreams and listening to your heart." },
  { id: "8", title: "Think and Grow Rich", author: "Napoleon Hill", price: 82, genre: "Finance", color: "#1B3A6B", description: "The landmark bestseller on achieving success through mindset and persistence." },
  { id: "9", title: "The Bible", author: "Various Authors", price: 120, genre: "Faith", color: "#4A1942", description: "The foundational text of the Christian faith. The most widely read book in human history." },
  { id: "10", title: "Mere Christianity", author: "C.S. Lewis", price: 78, genre: "Faith", color: "#3D1F5C", description: "A compelling case for the Christian faith by one of the greatest writers of the 20th century." },
  { id: "11", title: "The Total Money Makeover", author: "Dave Ramsey", price: 88, genre: "Finance", color: "#1B3A6B", description: "A proven plan for financial fitness. Take control of your money with this step-by-step guide." },
  { id: "12", title: "Mindset", author: "Carol S. Dweck", price: 85, genre: "Growth", color: "#2D5016", description: "The new psychology of success. How we can learn to fulfil our potential." },
  { id: "13", title: "The Very Hungry Caterpillar", author: "Eric Carle", price: 45, genre: "Children", color: "#1B5E20", description: "A beloved classic for young readers. Follow the caterpillar on his eating adventure." },
  { id: "14", title: "Goodnight Moon", author: "Margaret Wise Brown", price: 42, genre: "Children", color: "#1B5E20", description: "A bedtime classic that has been soothing children to sleep for generations." },
  { id: "15", title: "The Lion, the Witch and the Wardrobe", author: "C.S. Lewis", price: 65, genre: "Children", color: "#1A3A5C", description: "Four children step through a wardrobe into the magical land of Narnia." },
  { id: "16", title: "Who Moved My Cheese?", author: "Spencer Johnson", price: 70, genre: "Growth", color: "#6B3D16", description: "An amazing way to deal with change in your work and in your life." },
  { id: "17", title: "The 7 Habits of Highly Effective People", author: "Stephen R. Covey", price: 92, genre: "Growth", color: "#2D5016", description: "Powerful lessons in personal change that have transformed millions of lives." },
  { id: "18", title: "Experiencing God", author: "Henry Blackaby", price: 82, genre: "Faith", color: "#4A1942", description: "Knowing and doing the will of God. A classic guide to a deeper relationship with God." },
  { id: "19", title: "I Will Teach You to Be Rich", author: "Ramit Sethi", price: 88, genre: "Finance", color: "#1B3A6B", description: "No guilt, no excuses — just a 6-week programme that works. Practical personal finance for young adults." },
  { id: "20", title: "Charlotte's Web", author: "E.B. White", price: 55, genre: "Children", color: "#1B5E20", description: "The beloved story of a pig named Wilbur and his friendship with a spider named Charlotte." },
];

const GENRES = ["All", "Faith", "Finance", "Children", "Growth"];

export default function BooksPage() {
  const [activeGenre, setActiveGenre] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [cart, setCart] = useState<string[]>([]);
  const [added, setAdded] = useState<string | null>(null);

  const filtered = ALL_BOOKS
    .filter(b => activeGenre === "All" || b.genre === activeGenre)
    .filter(b => b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "title") return a.title.localeCompare(b.title);
      return 0;
    });

  const addToCart = (id: string) => {
    setCart(prev => [...prev, id]);
    setAdded(id);
    setTimeout(() => setAdded(null), 1500);
    const existing = JSON.parse(localStorage.getItem("sikareads-cart") || "[]");
    localStorage.setItem("sikareads-cart", JSON.stringify([...existing, id]));
  };

  return (
    <div style={{ background: "var(--white)", minHeight: "100vh" }}>
      <Navbar />

      {/* Header */}
      <div style={{ background: "var(--navy)", paddingTop: "100px", paddingBottom: "48px", padding: "100px 48px 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ fontFamily: "Playfair Display, serif", fontSize: "42px", fontWeight: 700, color: "var(--cream)", marginBottom: "12px" }}>
            All books
          </div>
          <p style={{ fontSize: "15px", color: "rgba(250,245,238,0.65)", marginBottom: "28px" }}>
            {ALL_BOOKS.length} books curated for people building intentional lives.
          </p>

          {/* Search */}
          <div style={{ position: "relative", maxWidth: "480px" }}>
            <input
              type="text"
              placeholder="Search by title or author..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: "100%", padding: "14px 20px 14px 44px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "100px", color: "var(--cream)", fontSize: "14px", outline: "none", fontFamily: "Inter, sans-serif", boxSizing: "border-box" }}
            />
            <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", fontSize: "16px", opacity: 0.6 }}>🔍</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 48px 80px" }}>
        {/* Filters */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
          {/* Genre pills */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {GENRES.map(genre => (
              <button key={genre} onClick={() => setActiveGenre(genre)} style={{ padding: "8px 20px", background: activeGenre === genre ? "var(--navy)" : "transparent", border: `1px solid ${activeGenre === genre ? "var(--navy)" : "var(--border)"}`, borderRadius: "100px", color: activeGenre === genre ? "var(--cream)" : "var(--muted)", fontSize: "13px", fontWeight: activeGenre === genre ? 600 : 400, cursor: "pointer", transition: "all 0.2s" }}>
                {genre}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select value={sort} onChange={e => setSort(e.target.value)} style={{ padding: "8px 16px", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "13px", color: "var(--text)", background: "var(--white)", outline: "none", cursor: "pointer" }}>
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to high</option>
            <option value="price-desc">Price: High to low</option>
            <option value="title">Title A-Z</option>
          </select>
        </div>

        {/* Results count */}
        <div style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "24px" }}>
          {filtered.length} {filtered.length === 1 ? "book" : "books"} {activeGenre !== "All" ? `in ${activeGenre}` : ""}{search ? ` matching "${search}"` : ""}
        </div>

        {/* Books grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <div style={{ fontFamily: "Playfair Display, serif", fontSize: "24px", color: "var(--brown)", marginBottom: "12px" }}>No books found</div>
            <p style={{ color: "var(--muted)", fontSize: "14px" }}>Try a different search or genre filter.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }} className="full-mobile">
            {filtered.map(book => (
              <div key={book.id} style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: "16px", overflow: "hidden", transition: "box-shadow 0.2s, transform 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.1)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
                {/* Cover */}
                <a href={`/books/${book.id}`}>
                  <div style={{ height: "200px", background: book.color, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", cursor: "pointer" }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontFamily: "Playfair Display, serif", fontSize: "14px", color: "rgba(255,255,255,0.9)", fontWeight: 600, lineHeight: 1.3 }}>{book.title}</div>
                      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.55)", marginTop: "6px" }}>{book.author}</div>
                    </div>
                  </div>
                </a>

                {/* Info */}
                <div style={{ padding: "16px" }}>
                  <a href={`/books/${book.id}`} style={{ display: "block" }}>
                    <div style={{ fontFamily: "Playfair Display, serif", fontSize: "15px", fontWeight: 600, color: "var(--brown)", marginBottom: "4px", lineHeight: 1.3 }}>{book.title}</div>
                    <div style={{ fontSize: "12px", color: "var(--muted)", marginBottom: "8px" }}>{book.author}</div>
                  </a>
                  <div style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.5, marginBottom: "12px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {book.description}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <div style={{ fontFamily: "Playfair Display, serif", fontSize: "18px", fontWeight: 700, color: "var(--navy)" }}>GHS {book.price}</div>
                    <div style={{ fontSize: "11px", color: "var(--gold)", padding: "3px 10px", border: "1px solid var(--gold)", borderRadius: "100px" }}>{book.genre}</div>
                  </div>
                  <button
                    onClick={() => addToCart(book.id)}
                    style={{ width: "100%", padding: "10px", background: added === book.id ? "#2D5016" : "var(--navy)", color: "var(--cream)", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer", transition: "background 0.2s" }}>
                    {added === book.id ? "✓ Added to cart" : "Add to cart"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
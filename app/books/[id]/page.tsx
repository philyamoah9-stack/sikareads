"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BookCover from "../../components/BookCover";

const ALL_BOOKS = [
  { id: "1", title: "The Richest Man in Babylon", author: "George S. Clason", price: 85, genre: "Finance", color: "#1B3A6B", description: "The classic guide to financial wisdom through ancient Babylonian parables. Timeless principles for building wealth that have stood the test of time. Through the story of Arkad, the richest man in Babylon, you will learn the fundamental laws of money — how to attract it, keep it, and make it grow.", pages: 144, publisher: "Signet", year: 1926, isbn: "978-0451205360" },
  { id: "2", title: "Atomic Habits", author: "James Clear", price: 95, genre: "Growth", color: "#2D5016", description: "An easy and proven way to build good habits and break bad ones. James Clear presents a proven framework for improving every day. Learn how tiny changes lead to remarkable results and how your habits shape your identity.", pages: 320, publisher: "Avery", year: 2018, isbn: "978-0735211292" },
  { id: "3", title: "The Purpose Driven Life", author: "Rick Warren", price: 80, genre: "Faith", color: "#4A1942", description: "A groundbreaking manifesto on the meaning of life. What on earth am I here for? This book will help you understand God's incredible plan for your life — your purpose for being here.", pages: 368, publisher: "Zondervan", year: 2002, isbn: "978-0310330023" },
  { id: "4", title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", price: 90, genre: "Finance", color: "#1B3A6B", description: "What the rich teach their kids about money that the poor and middle class do not. Robert Kiyosaki shares the story of his two dads and the financial lessons he learned from each.", pages: 336, publisher: "Plata Publishing", year: 1997, isbn: "978-1612680194" },
  { id: "5", title: "Boundaries", author: "Dr. Henry Cloud", price: 85, genre: "Faith", color: "#4A1942", description: "When to say yes, how to say no to take control of your life. Drs. Cloud and Townsend show you how to set healthy limits on your relationships while taking responsibility for your own life.", pages: 304, publisher: "Zondervan", year: 1992, isbn: "978-0310247456" },
  { id: "6", title: "Deep Work", author: "Cal Newport", price: 88, genre: "Growth", color: "#2D5016", description: "Rules for focused success in a distracted world. The ability to perform deep work is becoming increasingly rare at exactly the same time it is becoming increasingly valuable.", pages: 304, publisher: "Grand Central Publishing", year: 2016, isbn: "978-1455586691" },
  { id: "7", title: "The Alchemist", author: "Paulo Coelho", price: 75, genre: "Growth", color: "#6B3D16", description: "A magical story about following your dreams and listening to your heart. Santiago, a young shepherd boy, travels from Spain to Egypt in search of treasure and discovers the meaning of life.", pages: 208, publisher: "HarperOne", year: 1988, isbn: "978-0062315007" },
  { id: "8", title: "Think and Grow Rich", author: "Napoleon Hill", price: 82, genre: "Finance", color: "#1B3A6B", description: "The landmark bestseller now revised and updated for the 21st century. Napoleon Hill studied the most successful people of his era and distilled their secrets into 13 principles.", pages: 320, publisher: "Tarcher Perigee", year: 1937, isbn: "978-1585424337" },
  { id: "9", title: "The Bible", author: "Various Authors", price: 120, genre: "Faith", color: "#4A1942", description: "The foundational text of the Christian faith. The most widely read book in human history, containing wisdom, poetry, history, prophecy, and the story of God's love for humanity.", pages: 1200, publisher: "Various", year: 0, isbn: "Various editions" },
  { id: "10", title: "Mere Christianity", author: "C.S. Lewis", price: 78, genre: "Faith", color: "#3D1F5C", description: "A compelling case for the Christian faith. Originally broadcast as radio talks during World War II, this remains one of the most influential works of Christian apologetics ever written.", pages: 256, publisher: "HarperOne", year: 1952, isbn: "978-0060652920" },
  { id: "11", title: "The Total Money Makeover", author: "Dave Ramsey", price: 88, genre: "Finance", color: "#1B3A6B", description: "A proven plan for financial fitness. Dave Ramsey debunks the financial myths that keep people from achieving financial freedom and presents a clear path to financial health.", pages: 272, publisher: "Thomas Nelson", year: 2003, isbn: "978-1595555274" },
  { id: "12", title: "Mindset", author: "Carol S. Dweck", price: 85, genre: "Growth", color: "#2D5016", description: "The new psychology of success. World-renowned Stanford University psychologist Carol Dweck has discovered a simple but groundbreaking idea: the power of mindset.", pages: 320, publisher: "Ballantine Books", year: 2006, isbn: "978-0345472328" },
  { id: "13", title: "The Very Hungry Caterpillar", author: "Eric Carle", price: 45, genre: "Children", color: "#1B5E20", description: "A beloved classic for young readers about a caterpillar who eats his way through a variety of foods before emerging as a beautiful butterfly.", pages: 32, publisher: "Philomel Books", year: 1969, isbn: "978-0399226908" },
  { id: "14", title: "Goodnight Moon", author: "Margaret Wise Brown", price: 42, genre: "Children", color: "#1B5E20", description: "A bedtime classic that has been soothing children to sleep for generations. In a great green room, a bunny says goodnight to everything around him.", pages: 32, publisher: "Harper & Row", year: 1947, isbn: "978-0064430173" },
  { id: "15", title: "The Lion, the Witch and the Wardrobe", author: "C.S. Lewis", price: 65, genre: "Children", color: "#1A3A5C", description: "Four children step through a wardrobe into the magical land of Narnia, where an evil witch has made it always winter but never Christmas.", pages: 208, publisher: "Geoffrey Bles", year: 1950, isbn: "978-0064404990" },
  { id: "16", title: "Who Moved My Cheese?", author: "Spencer Johnson", price: 70, genre: "Growth", color: "#6B3D16", description: "An amazing way to deal with change in your work and in your life. A simple parable that reveals profound truths about change.", pages: 96, publisher: "Putnam", year: 1998, isbn: "978-0399144462" },
  { id: "17", title: "The 7 Habits of Highly Effective People", author: "Stephen R. Covey", price: 92, genre: "Growth", color: "#2D5016", description: "Powerful lessons in personal change. Stephen Covey's principle-centred approach for solving personal and professional problems gives a step-by-step pathway for living with fairness, integrity, and dignity.", pages: 432, publisher: "Free Press", year: 1989, isbn: "978-0743269513" },
  { id: "18", title: "Experiencing God", author: "Henry Blackaby", price: 82, genre: "Faith", color: "#4A1942", description: "Knowing and doing the will of God. A classic guide to a deeper relationship with God through prayer, scripture, and obedience.", pages: 320, publisher: "B&H Books", year: 1990, isbn: "978-0805465396" },
  { id: "19", title: "I Will Teach You to Be Rich", author: "Ramit Sethi", price: 88, genre: "Finance", color: "#1B3A6B", description: "No guilt, no excuses — just a 6-week programme that works. Ramit Sethi breaks down the financial system and shows you how to set up your accounts, automate your finances, and invest.", pages: 352, publisher: "Workman Publishing", year: 2009, isbn: "978-0761147480" },
  { id: "20", title: "Charlotte's Web", author: "E.B. White", price: 55, genre: "Children", color: "#1B5E20", description: "The beloved story of a pig named Wilbur and his friendship with a spider named Charlotte, who saves his life by writing words in her web.", pages: 192, publisher: "Harper & Brothers", year: 1952, isbn: "978-0064400558" },
];

export default function BookPage() {
  const params = useParams();
  const router = useRouter();
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);

  const book = ALL_BOOKS.find(b => b.id === params.id);

  if (!book) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--white)" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "Playfair Display, serif", fontSize: "32px", color: "var(--brown)", marginBottom: "12px" }}>Book not found</div>
          <a href="/books" style={{ color: "var(--navy)", fontWeight: 600 }}>← Back to all books</a>
        </div>
      </div>
    );
  }

  const related = ALL_BOOKS.filter(b => b.genre === book.genre && b.id !== book.id).slice(0, 4);

  const handleAddToCart = () => {
    const existing = JSON.parse(localStorage.getItem("sikareads-cart") || "[]");
    const items = Array(qty).fill(book.id);
    localStorage.setItem("sikareads-cart", JSON.stringify([...existing, ...items]));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/cart");
  };

  return (
    <div style={{ background: "var(--white)", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ paddingTop: "88px" }}>
        {/* Breadcrumb */}
        <div style={{ padding: "16px 48px", borderBottom: "1px solid var(--border)", display: "flex", gap: "8px", fontSize: "13px", color: "var(--muted)" }}>
          <a href="/" style={{ color: "var(--muted)" }}>Home</a>
          <span>›</span>
          <a href="/books" style={{ color: "var(--muted)" }}>Books</a>
          <span>›</span>
          <a href={`/books?genre=${book.genre.toLowerCase()}`} style={{ color: "var(--muted)" }}>{book.genre}</a>
          <span>›</span>
          <span style={{ color: "var(--brown)" }}>{book.title}</span>
        </div>

        {/* Main content */}
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 48px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "64px", marginBottom: "80px" }} className="full-mobile">
            {/* Book cover */}
            <div>
              <div style={{ background: book.color, borderRadius: "12px", aspectRatio: "3/4", display: "flex", alignItems: "center", justifyContent: "center", padding: "32px", boxShadow: "0 20px 60px rgba(0,0,0,0.2)", maxWidth: "320px", margin: "0 auto" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "Playfair Display, serif", fontSize: "20px", color: "rgba(255,255,255,0.95)", fontWeight: 600, lineHeight: 1.3, marginBottom: "12px" }}>{book.title}</div>
                  <div style={{ width: "40px", height: "1px", background: "rgba(255,255,255,0.4)", margin: "0 auto 12px" }} />
                  <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)" }}>{book.author}</div>
                </div>
              </div>

              {/* Book details table */}
              <div style={{ marginTop: "32px", background: "var(--cream)", borderRadius: "12px", padding: "20px", maxWidth: "320px", margin: "32px auto 0" }}>
                <div style={{ fontFamily: "Playfair Display, serif", fontSize: "14px", fontWeight: 600, color: "var(--brown)", marginBottom: "12px" }}>Book details</div>
                {[
                  ["Genre", book.genre],
                  ["Pages", book.pages.toString()],
                  ["Publisher", book.publisher],
                  ...(book.year > 0 ? [["Year", book.year.toString()]] : []),
                  ["ISBN", book.isbn],
                ].map(([label, value]) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border)", fontSize: "12px" }}>
                    <span style={{ color: "var(--muted)" }}>{label}</span>
                    <span style={{ color: "var(--brown)", fontWeight: 500, textAlign: "right", maxWidth: "180px" }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Book info */}
            <div>
              <div style={{ display: "inline-block", padding: "4px 14px", background: "rgba(43,62,140,0.1)", border: "1px solid var(--navy)", borderRadius: "100px", fontSize: "11px", color: "var(--navy)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "16px" }}>
                {book.genre}
              </div>

              <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "40px", fontWeight: 700, color: "var(--brown)", lineHeight: 1.2, marginBottom: "8px" }}>
                {book.title}
              </h1>
              <div style={{ fontSize: "16px", color: "var(--muted)", marginBottom: "24px" }}>by {book.author}</div>

              <div style={{ fontFamily: "Playfair Display, serif", fontSize: "36px", fontWeight: 700, color: "var(--navy)", marginBottom: "24px" }}>
                GHS {book.price}
              </div>

              <p style={{ fontSize: "15px", color: "var(--text)", lineHeight: 1.8, marginBottom: "32px" }}>
                {book.description}
              </p>

              {/* Delivery note */}
              <div style={{ padding: "16px 20px", background: "rgba(43,62,140,0.06)", border: "1px solid rgba(43,62,140,0.15)", borderRadius: "12px", marginBottom: "28px", display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <span style={{ fontSize: "20px" }}>🚚</span>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--navy)", marginBottom: "2px" }}>Delivered across Ghana</div>
                  <div style={{ fontSize: "12px", color: "var(--muted)" }}>Orders are processed within 1-2 business days. Delivery takes 2-5 business days depending on your location.</div>
                </div>
              </div>

              {/* Qty + Add to cart */}
              <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "16px", flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--border)", borderRadius: "8px", overflow: "hidden" }}>
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ padding: "10px 16px", background: "transparent", border: "none", fontSize: "18px", color: "var(--brown)", cursor: "pointer" }}>−</button>
                  <span style={{ padding: "10px 16px", fontSize: "15px", fontWeight: 600, color: "var(--brown)", borderLeft: "1px solid var(--border)", borderRight: "1px solid var(--border)" }}>{qty}</span>
                  <button onClick={() => setQty(q => q + 1)} style={{ padding: "10px 16px", background: "transparent", border: "none", fontSize: "18px", color: "var(--brown)", cursor: "pointer" }}>+</button>
                </div>

                <button onClick={handleAddToCart} style={{ flex: 1, padding: "14px 24px", background: added ? "#2D5016" : "var(--navy)", color: "var(--cream)", border: "none", borderRadius: "100px", fontSize: "14px", fontWeight: 600, cursor: "pointer", transition: "background 0.2s", minWidth: "160px" }}>
                  {added ? "✓ Added to cart" : "Add to cart"}
                </button>
              </div>

              <button onClick={handleBuyNow} style={{ width: "100%", padding: "14px", background: "var(--gold)", color: "var(--brown)", border: "none", borderRadius: "100px", fontSize: "14px", fontWeight: 700, cursor: "pointer" }}>
                Buy now — GHS {book.price * qty}
              </button>

              {/* Track in How Far? */}
              <div style={{ marginTop: "24px", padding: "16px 20px", background: "var(--cream)", borderRadius: "12px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                <div style={{ fontSize: "13px", color: "var(--muted)" }}>Track your reading progress in <strong style={{ color: "var(--navy)" }}>How Far?</strong> — free</div>
                <a href="https://yourhowfar.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: "12px", color: "var(--navy)", fontWeight: 600 }}>Try it free →</a>
              </div>
            </div>
          </div>

          {/* Related books */}
          {related.length > 0 && (
            <div>
              <div style={{ fontFamily: "Playfair Display, serif", fontSize: "28px", fontWeight: 700, color: "var(--brown)", marginBottom: "24px" }}>
                More in {book.genre}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }} className="full-mobile">
                {related.map(r => (
                  <a key={r.id} href={`/books/${r.id}`} style={{ display: "block", border: "1px solid var(--border)", borderRadius: "12px", overflow: "hidden" }}>
                    <div style={{ height: "140px", background: r.color, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
                      <div style={{ textAlign: "center", fontFamily: "Playfair Display, serif", fontSize: "12px", color: "rgba(255,255,255,0.9)", fontWeight: 600, lineHeight: 1.3 }}>{r.title}</div>
                    </div>
                    <div style={{ padding: "12px" }}>
                      <div style={{ fontFamily: "Playfair Display, serif", fontSize: "14px", fontWeight: 600, color: "var(--brown)", marginBottom: "2px" }}>{r.title}</div>
                      <div style={{ fontSize: "11px", color: "var(--muted)", marginBottom: "8px" }}>{r.author}</div>
                      <div style={{ fontFamily: "Playfair Display, serif", fontSize: "16px", fontWeight: 700, color: "var(--navy)" }}>GHS {r.price}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
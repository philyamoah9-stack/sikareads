"use client";

import { useState } from "react";
import { getCoverUrl } from "../lib/covers";

const COVER_COLORS: Record<string, string> = {
  Finance: "#1B3A6B",
  Faith: "#4A1942",
  Growth: "#2D5016",
  Children: "#1B5E20",
  General: "#3D2314",
};

type Props = {
  bookId: string;
  title: string;
  author: string;
  genre?: string;
  height?: string | number;
  fontSize?: string | number;
};

export default function BookCover({ bookId, title, author, genre, height = "200px", fontSize = 14 }: Props) {
  const [error, setError] = useState(false);
  const coverUrl = getCoverUrl(bookId);
  const bgColor = COVER_COLORS[genre || ""] || "#1B3A6B";

  if (coverUrl && !error) {
    return (
      <div style={{ height, width: "100%", overflow: "hidden", background: bgColor }}>
        <img
          src={coverUrl}
          alt={title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          onError={() => setError(true)}
        />
      </div>
    );
  }

  return (
    <div style={{ height, width: "100%", background: bgColor, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "Playfair Display, serif", fontSize, color: "rgba(255,255,255,0.9)", fontWeight: 600, lineHeight: 1.3, marginBottom: "8px" }}>
          {title}
        </div>
        <div style={{ fontSize: Number(fontSize) * 0.78, color: "rgba(255,255,255,0.55)" }}>{author}</div>
      </div>
    </div>
  );
}
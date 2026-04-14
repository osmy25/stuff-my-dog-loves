import { notFound } from "next/navigation";
import db from "../../../lib/db";

function getDogLikeById(id) {
  const row = db
    .prepare(
      `
      SELECT id, name, image, thoughts, hearts
      FROM my_dog_likes
      WHERE id = ?
      `
    )
    .get(id);

  if (!row) return null;

  return {
    ...row,
    thoughts: row.thoughts ? JSON.parse(row.thoughts) : null,
  };
}

function getAllDogLikes() {
  const rows = db
    .prepare(
      `
      SELECT id
      FROM my_dog_likes
      ORDER BY id ASC
      `
    )
    .all();

  return rows;
}

export async function generateStaticParams() {
  const items = getAllDogLikes();

  return items.map((item) => ({
    id: String(item.id),
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const item = getDogLikeById(Number(id));

  if (!item) {
    return {
      title: "Card not found | Stuff My Dog Loves",
    };
  }

  const imageUrl = `https://stuffmydogloves.com${item.image}`;

  return {
    title: `${item.name} | Stuff My Dog Loves`,
    description: `${item.name} — one of Viggo's favorite things.`,
    openGraph: {
      title: `${item.name} | Stuff My Dog Loves`,
      description: `${item.name} — one of Viggo's favorite things.`,
      url: `https://stuffmydogloves.com/card/${item.id}`,
      siteName: "Stuff My Dog Loves",
      images: [
        {
          url: imageUrl,
          alt: item.name,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${item.name} | Stuff My Dog Loves`,
      description: `${item.name} — one of Viggo's favorite things.`,
      images: [imageUrl],
    },
  };
}

export default async function CardPage({ params }) {
  const { id } = await params;
  const item = getDogLikeById(Number(id));

  if (!item) {
    notFound();
  }

  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        padding: "2rem 1rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "28rem",
          padding: "1.5rem",
          borderRadius: "2rem",
          border: "3px solid var(--pink)",
          background: "var(--white)",
          boxShadow: "0 12px 32px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "0.7rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: "var(--text-light)",
            marginBottom: "0.3rem",
          }}
        >
          Stuff my dog loves
        </p>

        <h1
          style={{
            fontSize: "1.75rem",
            fontWeight: 700,
            color: "var(--text-dark)",
            marginBottom: "1rem",
          }}
        >
          {item.name}
        </h1>

        <img
          src={item.image}
          alt={item.name}
          style={{
            width: "min(20rem, 100%)",
            height: "auto",
            imageRendering: "pixelated",
            margin: "0 auto 1rem",
            display: "block",
          }}
        />

        <a
          href={`/?id=${item.id}`}
          style={{
            display: "inline-block",
            padding: "0.7rem 1rem",
            borderRadius: "999px",
            border: "2px solid var(--pink)",
            color: "var(--text-dark)",
            textDecoration: "none",
            fontWeight: 700,
          }}
        >
          Open interactive version
        </a>
      </div>
    </main>
  );
}
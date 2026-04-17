import { notFound } from "next/navigation";
import db from "../../../lib/db";
import List from "../../../components/List/List";

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
  return db
    .prepare(
      `
      SELECT id
      FROM my_dog_likes
      ORDER BY id ASC
      `
    )
    .all();
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

  const imageUrl = `https://stuffmydogloves.com/images/og/${item.id}.png`;

  return {
    title: `${item.name} | Stuff My Dog Loves`,
    description: `${item.name} — one of Viggo's favorite things.`,
    alternates: {
      canonical: `/card/${item.id}`,
    },
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

  return <List />;
}
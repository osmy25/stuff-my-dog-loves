import { redirect } from "next/navigation";
import db from "../../../lib/db";

export async function generateMetadata({ params }) {
  const { id } = await params;

  const item = db
    .prepare(
      `SELECT id, name, image FROM my_dog_likes WHERE id = ?`
    )
    .get(Number(id));

  if (!item) {
    return {
      title: "Not found",
    };
  }

  const imageUrl = `https://stuffmydogloves.com${item.image}`;

  return {
    title: `${item.name} | Stuff My Dog Loves`,
    openGraph: {
      images: [imageUrl],
    },
  };
}

export default async function Page({ params }) {
  const { id } = await params;

  // 🔥 redirect immediately
  redirect(`/?id=${id}`);
}
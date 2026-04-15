import { notFound } from "next/navigation";
import db from "../../../lib/db";
import Card from "../../../components/Card/Card";

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
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "clamp(1.5rem, 5vh, 3rem)",
        paddingLeft: "1rem",
        paddingRight: "1rem",
      }}
    >
      <div>
        <Card
          item={item}
          isHearted={false}
          onHeart={() => {}}
          reaction={null}
        />

        <div
          style={{
            textAlign: "center",
            marginTop: "0.75rem",
          }}
        >
          <a
            href={`/?id=${item.id}`}
            style={{
              fontSize: "0.8rem",
              color: "var(--text-light)",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            See more like this →
          </a>
        </div>
      </div>
    </main>
  );
}
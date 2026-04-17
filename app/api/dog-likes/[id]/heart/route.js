export const runtime = "nodejs";

import db from "../../../../../lib/db";



// för heartbutton +1 POST
export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const numericId = Number(id);

    if (Number.isNaN(numericId)) {
      return Response.json({ error: "Invalid id" }, { status: 400 });
    }

    const result = db
      .prepare(`
        UPDATE my_dog_likes
        SET hearts = hearts + 1
        WHERE id = ?
      `)
      .run(numericId);

    if (result.changes === 0) {
      return Response.json({ error: "Item not found" }, { status: 404 });
    }

    const item = db
      .prepare("SELECT * FROM my_dog_likes WHERE id = ?")
      .get(numericId);

    return Response.json({
      item: {
        ...item,
        thoughts: item.thoughts ? JSON.parse(item.thoughts) : [],
      },
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
export const runtime = "nodejs";

import db from "../../../lib/db";

export async function GET() {
  try {
    const rows = db.prepare("SELECT * FROM my_dog_likes").all();

    const items = rows.map((item) => ({
      ...item,
      thoughts: item.thoughts ? JSON.parse(item.thoughts) : [],
    }));

    return Response.json({ items });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
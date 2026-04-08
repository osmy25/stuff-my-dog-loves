export const runtime = "nodejs";

import db from "../../../lib/db";

export async function GET() {
  try {
    const items = db.prepare("SELECT * FROM my_dog_likes").all();
    return Response.json({ items });
  } catch {
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
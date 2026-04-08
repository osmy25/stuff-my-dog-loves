export const runtime = "nodejs";

import db from "../../../lib/db";

export async function GET() {
  try {
    const likes = db.prepare("SELECT * FROM my_dog_likes").all();
    return Response.json({ likes });
  } catch {
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
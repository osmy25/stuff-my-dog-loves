export const runtime = "nodejs";

import db from "../../../lib/db";

function normalizeThoughts(rawThoughts) {
  if (!rawThoughts) {
    return { normal: [], rare: [], legendary: [] };
  }

  const parsed = JSON.parse(rawThoughts);

  if (Array.isArray(parsed)) {
    return {
      normal: parsed,
      rare: [],
      legendary: [],
    };
  }

  return {
    normal: parsed.normal || [],
    rare: parsed.rare || [],
    legendary: parsed.legendary || [],
  };
}

export async function GET() {
  try {
    const rows = db
      .prepare("SELECT * FROM my_dog_likes ORDER BY sort_order ASC, id ASC")
      .all();

    const items = rows.map((item) => ({
      ...item,
      thoughts: normalizeThoughts(item.thoughts),
    }));

    return Response.json({ items });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
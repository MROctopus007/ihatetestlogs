import { neon } from "@neondatabase/serverless";

export async function handler() {
  const db = neon(process.env.NETLIFY_DATABASE_URL);
  const rows = await db`SELECT * FROM testimonials ORDER BY id DESC`;
  return {
    statusCode: 200,
    body: JSON.stringify(rows),
  };
}

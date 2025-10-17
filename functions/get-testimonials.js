import { neon } from '@netlify/neon'

export async function handler() {
  try {
    const sql = neon();
    const rows = await sql`SELECT * FROM testimonials ORDER BY created_at DESC;`
    return {
      statusCode: 200,
      body: JSON.stringify(rows),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}

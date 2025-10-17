import { neon } from '@netlify/neon'

export async function handler(event) {
  try {
    const sql = neon();
    const { name, email, message } = JSON.parse(event.body);

    await sql`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name TEXT,
        email TEXT,
        message TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;

    await sql`
      INSERT INTO contacts (name, email, message)
      VALUES (${name}, ${email}, ${message});
    `;

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}

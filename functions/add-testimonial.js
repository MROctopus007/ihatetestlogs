import { neon } from '@netlify/neon'

export async function handler(event) {
  try {
    const sql = neon(); // automatically uses NETLIFY_DATABASE_URL
    const { name, message } = JSON.parse(event.body);

    await sql`
      CREATE TABLE IF NOT EXISTS testimonials (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;

    await sql`
      INSERT INTO testimonials (name, message)
      VALUES (${name}, ${message});
    `;

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Testimonial added!' }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}

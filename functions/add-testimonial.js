import { neon } from "@neondatabase/serverless";

export async function handler(event) {
  const db = neon(process.env.NETLIFY_DATABASE_URL);
  const { author, message } = JSON.parse(event.body);

  await db`
    CREATE TABLE IF NOT EXISTS testimonials (
      id SERIAL PRIMARY KEY,
      author TEXT,
      message TEXT
    )
  `;

  await db`INSERT INTO testimonials (author, message) VALUES (${author}, ${message})`;

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true }),
  };
}

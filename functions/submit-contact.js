export async function handler(event) {
  const { name, email, message } = JSON.parse(event.body);
  return {
    statusCode: 200,
    body: JSON.stringify({ received: true, name, email, message }),
  };
}

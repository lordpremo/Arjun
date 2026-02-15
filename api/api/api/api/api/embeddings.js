import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

function getBody(req) {
  if (!req.body) return {};
  if (typeof req.body === "string") {
    try { return JSON.parse(req.body); } catch { return {}; }
  }
  return req.body;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { text } = getBody(req);

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    const embed = await client.embeddings.create({
      model: "text-embedding-3-small",
      input: text
    });

    res.status(200).json({
      brand: "BROKEN LORD",
      type: "embeddings",
      vector: embed.data[0].embedding
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

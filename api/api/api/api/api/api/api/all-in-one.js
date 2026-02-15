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

  const { mode, prompt, text, message } = getBody(req);

  if (!mode) {
    return res.status(400).json({ error: "Mode is required" });
  }

  try {
    if (mode === "chat") {
      const reply = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: message || prompt }]
      });
      return res.status(200).json({
        type: "chat",
        reply: reply.choices[0].message.content
      });
    }

    if (mode === "image") {
      const image = await client.images.generate({
        model: "gpt-image-1",
        prompt
      });
      return res.status(200).json({
        type: "image",
        result: image
      });
    }

    if (mode === "audio") {
      const audio = await client.audio.speech.create({
        model: "gpt-4o-mini-tts",
        voice: "alloy",
        input: text || prompt
      });
      return res.status(200).json({
        type: "audio",
        result: audio
      });
    }

    if (mode === "video") {
      const video = await client.videos.generate({
        model: "gpt-4o-mini-tts",
        prompt
      });
      return res.status(200).json({
        type: "video",
        result: video
      });
    }

    return res.status(400).json({ error: "Invalid mode" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

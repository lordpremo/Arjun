export default function handler(req, res) {
  res.status(200).json({
    brand: "BROKEN LORD MEGA AI API 👑",
    message: "Karibu kwenye BROKEN LORD MEGA AI API — Powered by OpenAI",
    endpoints: {
      chat: "/api/chat",
      image: "/api/generate-image",
      audio_tts: "/api/generate-audio",
      video: "/api/generate-video",
      embeddings: "/api/embeddings",
      moderation: "/api/moderation",
      all_in_one: "/api/all-in-one"
    },
    example_requests: {
      chat: { message: "Habari yako Broken AI?" },
      image: { prompt: "Simba mwenye taji ya dhahabu" },
      audio_tts: { text: "Hii ni sauti ya Broken Lord" },
      video: { prompt: "Robot anacheza muziki" },
      all_in_one: { mode: "chat", message: "Niambie kuhusu BROKEN LORD" }
    }
  });
}

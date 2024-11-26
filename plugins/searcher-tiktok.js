import axios from 'axios';
const {
  generateWAMessageContent,
  generateWAMessageFromContent,
  proto
} = (await import("@whiskeysockets/baileys"))["default"];

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, "⚠️ Ingresa el texto de lo que quieres buscar en TikTok", m);
  }

  try {
    const { data } = await axios.get(`https://deliriussapi-oficial.vercel.app/search/tiktoksearch?query=${text}`);
    const videos = data.meta.slice(0, 6); // Obtén solo los primeros 6 resultados.

    const results = [];
    for (const video of videos) {
      const videoMessage = await generateWAMessageContent(
        { video: { url: video.hd } },
        { upload: conn.waUploadToServer }
      );

      const content = proto.Message.fromObject({
        interactiveMessage: {
          header: {
            text: video.title,
          },
          body: {
            text: `Autor: ${video.author.nickname}\nReproducciones: ${video.play}`
          },
          footer: {
            text: "TikTok - Search"
          },
          buttons: [
            {
              buttonId: video.url,
              buttonText: { displayText: "Ver en TikTok" },
              type: 1
            }
          ]
        }
      });

      results.push(content);
    }

    for (const result of results) {
      await conn.relayMessage(m.chat, result, { messageId: m.key.id });
    }
  } catch (e) {
    console.error(e);
    conn.reply(m.chat, "⚠️ Ocurrió un error al buscar los videos de TikTok.", m);
  }
};

handler.command = ["tiktoksearch", "tts", "tiktoks"];

export default handler;

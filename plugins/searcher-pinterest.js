import axios from 'axios';

const {
  generateWAMessageContent,
  generateWAMessageFromContent,
  proto
} = (await import("@whiskeysockets/baileys"))["default"];

let handler = async (message, { conn, text }) => {
  if (!text) {
    return message.reply("_*[ ⚠️ ] Ingresa el texto de lo que quieres buscar en Pinterest*_");
  }

  async function createImageMessage(url) {
    try {
      const { imageMessage } = await generateWAMessageContent(
        { image: { url: url } },
        { upload: conn.waUploadToServer }
      );
      return imageMessage;
    } catch (error) {
      console.error("Error creando ImageMessage:", error);
      return null;
    }
  }

  try {
    // Llamada a la API
    let { data } = await axios.get(`https://api.dorratz.com/v2/pinterest?query=${encodeURIComponent(text)}`);
    console.log("Respuesta de la API:", data);

    if (data.status && data.results.length > 0) {
      let imageUrls = data.results.map(result => result.image);
      if (imageUrls.length === 0) throw new Error("No se encontraron URLs de imágenes.");

      let imageMessages = [];
      for (let imageUrl of imageUrls.slice(0, 10)) {
        let imageMessage = await createImageMessage(imageUrl);
        if (imageMessage) {
          imageMessages.push({
            header: proto.Message.InteractiveMessage.Header.fromObject({
              hasMediaAttachment: true,
              imageMessage: imageMessage
            })
          });
        }
      }

      if (imageMessages.length === 0) throw new Error("No se pudieron crear mensajes de imagen.");

      const finalMessage = generateWAMessageFromContent(
        message.chat,
        {
          viewOnceMessage: {
            message: {
              messageContextInfo: {},
              interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                body: proto.Message.InteractiveMessage.Body.create({
                  text: `*Resultado de:* ${text}`
                }),
                carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                  cards: [...imageMessages]
                })
              })
            }
          }
        },
        { quoted: message }
      );

      console.log("Mensaje final:", finalMessage);
      await conn.relayMessage(message.chat, finalMessage.message, { messageId: finalMessage.key.id });
    } else {
      message.reply("_*[ ⚠️ ] No se encontraron imágenes para esta búsqueda*_");
    }
  } catch (error) {
    console.error("Error en el handler:", error);
    message.reply("_*[ ⚠️ ] Error al buscar imágenes. Inténtalo de nuevo más tarde*_");
  }
};

handler.command = ['pinterest', 'pinimages'];

export default handler;
      

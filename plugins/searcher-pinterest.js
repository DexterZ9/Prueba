import axios from 'axios';

const {
  generateWAMessageContent,
  generateWAMessageFromContent,
  proto
} = (await import("@whiskeysockets/baileys"))["default"];

let handler = async (message, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return message.reply("_*[ ⚠️ ] Ingresa el texto de lo que quieres buscar en Pinterest*_");
  }

  async function createImageMessage(url) {
    const { imageMessage } = await generateWAMessageContent({
      image: { url: url }
    }, { upload: conn.waUploadToServer });
    return imageMessage;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  let imageMessages = [];
  try {
    let { data } = await axios.get(`https://deliriussapi-oficial.vercel.app/search/pinterest?text=${encodeURIComponent(text)}`);

    if (data.status && data.result.length > 0) {
      let imageUrls = data.result;
      shuffleArray(imageUrls);
      let selectedImages = imageUrls.splice(0, 10);

      for (let imageUrl of selectedImages) {
        imageMessages.push({
          header: proto.Message.InteractiveMessage.Header.fromObject({
            hasMediaAttachment: true,
            imageMessage: await createImageMessage(imageUrl)
          })
        });
      }

      const finalMessage = generateWAMessageFromContent(message.chat, {
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
      }, { quoted: message });

      await conn.relayMessage(message.chat, finalMessage.message, { messageId: finalMessage.key.id });
    } else {
      message.reply("_*[ ⚠️ ] No se encontraron imágenes para esta búsqueda*_");
    }
  } catch (error) {
    message.reply("_*[ ⚠️ ] Error al buscar imágenes. Inténtalo de nuevo más tarde*_");
    console.error(error);
  }
};

handler.command = ['pinterest', 'pinimages'];

export default handler;
        

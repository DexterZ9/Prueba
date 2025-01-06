

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
    const { imageMessage } = await generateWAMessageContent(
      { image: { url } },
      { upload: conn.waUploadToServer }
    );
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
    // Reemplazamos axios con fetch
    const response = await fetch(`https://api.dorratz.com/v2/pinterest?query=${encodeURIComponent(text)}`);
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.status && data.results.length > 0) {
      let imageUrls = data.results.map(result => result.image);
      shuffleArray(imageUrls);
      let selectedImages = imageUrls.splice(0, 10);

      for (let imageUrl of selectedImages) {
        imageMessages.push({
          body: proto.Message.InteractiveMessage.Body.fromObject({ text: "" }),
          footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: "" }),
          header: proto.Message.InteractiveMessage.Header.fromObject({
            title: "",
            hasMediaAttachment: true,
            imageMessage: await createImageMessage(imageUrl)
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({})
        });
      }

      const finalMessage = generateWAMessageFromContent(message.chat, {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2
            },
            interactiveMessage: proto.Message.InteractiveMessage.fromObject({
              body: proto.Message.InteractiveMessage.Body.create({
                text: "*Resultado de:* " + text
              }),
              footer: proto.Message.InteractiveMessage.Footer.create({
                text: ""
              }),
              header: proto.Message.InteractiveMessage.Header.create({
                hasMediaAttachment: false
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
    console.error(error.message);
  }
};

handler.command = ['pinterest', 'pinimages'];

export default handler;
                                            


/*
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
      'image': { 'url': url }
    }, { 'upload': conn.waUploadToServer });
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
    //let { data } = await axios.get(`https://api.dorratz.com/v2/pinterest?query=${encodeURIComponent(text)}`);
    let { data } = await axios.get(`https://api.dorratz.com/v2/pinterest?query=${encodeURIComponent(text)}`, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (compatible; Bot/1.0)'
  }
});
    
    
      if (data.status && data.results.length > 0) {
      let imageUrls = data.results.map(result => result.image);
      shuffleArray(imageUrls);
      let selectedImages = imageUrls.splice(0, 10);
      let count = 1;

      for (let imageUrl of selectedImages) {
        imageMessages.push({
          'body': proto.Message.InteractiveMessage.Body.fromObject({
            'text': ""
          }),
          'footer': proto.Message.InteractiveMessage.Footer.fromObject({
            'text': ""
          }),
          'header': proto.Message.InteractiveMessage.Header.fromObject({
            'title': '',
            'hasMediaAttachment': true,
            'imageMessage': await createImageMessage(imageUrl)
          }),
          'nativeFlowMessage': proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
            
          })
        });
      }

      const finalMessage = generateWAMessageFromContent(message.chat, {
        'viewOnceMessage': {
          'message': {
            'messageContextInfo': {
              'deviceListMetadata': {},
              'deviceListMetadataVersion': 2
            },
            'interactiveMessage': proto.Message.InteractiveMessage.fromObject({
              'body': proto.Message.InteractiveMessage.Body.create({
                'text': "*Resultado de:* " + text
              }),
              'footer': proto.Message.InteractiveMessage.Footer.create({
                'text': ""
              }),
              'header': proto.Message.InteractiveMessage.Header.create({
                'hasMediaAttachment': false
              }),
              'carouselMessage': proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                'cards': [...imageMessages]
              })
            })
          }
        }
      }, { 'quoted': message });

      await conn.relayMessage(message.chat, finalMessage.message, { 'messageId': finalMessage.key.id });
    } else {
      message.reply("_*[ ⚠️ ] No se encontraron imágenes para esta búsqueda*_");
    }
  } catch (error) {
    message.reply("_*[ ⚠️ ] Error al buscar imágenes. Inténtalo de nuevo más tarde*_");
    message.reply(error.message);
    console.error(error);
  }
};

handler.command = ['pinterest', 'pinimages'];

export default handler;
*/

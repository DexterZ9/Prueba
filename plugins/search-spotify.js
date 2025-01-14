
import { apis } from '../exports.js';
import axios from 'axios';

const {
  generateWAMessageContent,
  generateWAMessageFromContent,
  proto
} = (await import("@whiskeysockets/baileys"))["default"];

let searchResults = {}; // Almacenar resultados globalmente

let handler = async (message, { conn, text }) => {
  if (!text) {
    return message.reply("_*[ ⚠️ ] Ingresa lo que quieres buscar en Spotify*_");
  }

  async function createImageMessage(url) {
    const { imageMessage } = await generateWAMessageContent(
      { image: { url: url } },
      { upload: conn.waUploadToServer }
    );
    return imageMessage;
  }

  try {
    let imageMessages = [];
    let { data } = await axios.get(`${apis.delirius}search/spotify?q=${encodeURIComponent(text)}&limit=15`);
    
    if (!data.data) {
      return message.reply("⚠️ No se encontraron resultados para la búsqueda");
    }

    searchResults[message.chat] = data.data; // Guardar resultados en memoria para este chat

    let selectedResults = data.data.splice(0, 15);

    for (let i = 0; i < selectedResults.length; i++) {
      let result = selectedResults[i];
      imageMessages.push({
        'body': proto.Message.InteractiveMessage.Body.fromObject({
          'text': `*${i + 1}.* 🎵 *${result.title}* - ${result.artist}\n📅 Publicado: ${result.publish}\n⏱️ Duración: ${result.duration}\n⭐ Popularidad: ${result.popularity}\n🔗 [Enlace](${result.url})`
        }),
        'footer': proto.Message.InteractiveMessage.Footer.fromObject({ 'text': "" }),
        'header': proto.Message.InteractiveMessage.Header.fromObject({
          'title': "", 
          'hasMediaAttachment': true,
          'imageMessage': await createImageMessage(result.image)
        }),
      });
    }

    const finalMessage = generateWAMessageFromContent(message.chat, {
      'viewOnceMessage': {
        'message': {
          'interactiveMessage': proto.Message.InteractiveMessage.fromObject({
            'body': proto.Message.InteractiveMessage.Body.create({
              'text': "*Resultados de:* " + text
            }),
            'carouselMessage': proto.Message.InteractiveMessage.CarouselMessage.fromObject({
              'cards': [...imageMessages]
            })
          })
        }
      }
    }, { 'quoted': message });

    await conn.relayMessage(message.chat, finalMessage.message, { 'messageId': finalMessage.key.id });

  } catch (error) {
    console.error(error);
    message.reply("_*[ ❌ ] Hubo un error al buscar. Inténtalo de nuevo más tarde.*_");
  }
};

// Manejar la respuesta del usuario
handler.onResponse = async (message, { conn }) => {
  let number = parseInt(message.body.trim());
  if (!number || isNaN(number)) {
    return message.reply("_*[ ⚠️ ] Por favor, responde con un número válido para descargar el audio correspondiente._*");
  }

  let results = searchResults[message.chat];
  if (!results || number < 1 || number > results.length) {
    return message.reply("_*[ ⚠️ ] Número fuera de rango o sin resultados válidos._*");
  }

  let selectedResult = results[number - 1];
  try {
    let { data } = await axios.get(`${apis.delirius}download/spotify?url=${encodeURIComponent(selectedResult.url)}`);
    if (data && data.downloadUrl) {
      await conn.sendMessage(message.chat, {
        text: `*Descargando:* ${selectedResult.title}\n📥 [Haz clic aquí para descargar](${data.downloadUrl})`
      });
    } else {
      throw new Error("URL de descarga no válida");
    }
  } catch (error) {
    console.error(error);
    message.reply("_*[ ❌ ] No se pudo descargar el audio. Inténtalo nuevamente más tarde._*");
  }
};

handler.command = ['spotifysearch', 'spotifys'];
handler.onResponseCommand = 'spotifys'; // Para capturar respuestas

export default handler;
            

/*
import { apis } from '../exports.js';
import axios from 'axios';

const {
  generateWAMessageContent,
  generateWAMessageFromContent,
  proto
} = (await import("@whiskeysockets/baileys"))["default"];

let handler = async (message, { conn, text }) => {
  if (!text) {
    return message.reply("_*[ ⚠️ ] Ingresa lo que quieres buscar en Spotify*_");
  }

  async function createImageMessage(url) {
    const { imageMessage } = await generateWAMessageContent({
      'image': { 'url': url }
    }, { 'upload': conn.waUploadToServer });
    return imageMessage;
  }
/*
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
*/
  try {
    let imageMessages = [];
    let { data } = await axios.get(`${apis.delirius}search/spotify?q=${encodeURIComponent(text)}&limit=15`);
    

    if (!data.data) {
      return message.reply("⚠️ No se encontraron resultados para la búsqueda");
    }

    //shuffleArray(data.data);
    let selectedResults = data.data.splice(0, 15);

    for (let result of selectedResults) {
      

      imageMessages.push({
        'body': proto.Message.InteractiveMessage.Body.fromObject({
          'text': `╭─${em}──✦\n│⥤📝 *Titulo:* ${result.title}\n│⥤👤 *Artista:* ${result.artist}\n│⥤⏱️ *Duración:* ${result.duration}\n│⥤🌐 *Publicado:* ${result.publish}\n│⥤⭐ *Popularidad:* ${result.popularity}\n│⥤🔗 *Link:* ${result.url}\n╰─${em}──✦`
        }),
        'footer': proto.Message.InteractiveMessage.Footer.fromObject({
          'text': ""
        }),
        'header': proto.Message.InteractiveMessage.Header.fromObject({
          'title': "", 
          'hasMediaAttachment': true,
          'imageMessage': await createImageMessage(result.image)
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
              'text': "*Resultados de:* " + text
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

  } catch (error) {
    console.error(error);
    message.reply("_*[ ❌ ] Hubo un error al buscar. Inténtalo de nuevo más tarde.*_");
  }
};

handler.command = ['spotifysearch', 'spotifys'];

export default handler;
*/

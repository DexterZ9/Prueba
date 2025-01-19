import { apis } from '../exports.js';
import axios from 'axios';

let handler = async (message, { conn, text }) => {
  if (!text) {
    return message.reply("_*[ ⚠️ ] Ingresa lo que quieres buscar en Spotify*_");
  }

  try {
    // Obtener los resultados de la API
    const { data } = await axios.get(`${apis.delirius}search/spotify?q=${encodeURIComponent(text)}&limit=15`);

    if (!data.data) {
      return message.reply("⚠️ No se encontraron resultados para la búsqueda.");
    }

    // Crear un mensaje con los resultados numerados
    let response = `🎵 *Resultados para:* ${text}\n\n`;
    const links = data.data.map((result, index) => {
      response += `${index + 1}. *${result.title}* - ${result.artist}\n`;
      response += `   ⏱️ ${result.duration} | 🌐 Publicado: ${result.publish}\n`;
      response += `   🔗 ${result.url}\n\n`;
      return result.url;
    });

    response += "\n_Responde con el número del resultado para seleccionarlo._";

    // Enviar el mensaje con los resultados
    await conn.reply(message.chat, response, message);

    // Guardar los enlaces en memoria temporal
    conn.tempLinks = conn.tempLinks || {};
    conn.tempLinks[message.chat] = links;

  } catch (error) {
    console.error(error);
    message.reply("_*[ ❌ ] Hubo un error al buscar. Inténtalo de nuevo más tarde.*_");
  }
};

// Manejo de respuestas al mensaje
handler.handleResponse = async (message, { conn, text }) => {
  // Verificar si hay enlaces temporales para el chat
  if (conn.tempLinks && conn.tempLinks[message.chat]) {
    const links = conn.tempLinks[message.chat];

    // Validar que el texto sea un número
    if (/^\d+$/.test(text)) {
      const selectedIndex = Number(text) - 1;

      // Validar que el índice sea válido
      if (selectedIndex < 0 || selectedIndex >= links.length) {
        return message.reply("⚠️ El número ingresado no corresponde a ningún resultado.");
      }

      // Responder con el enlace seleccionado
      const selectedLink = links[selectedIndex];
      return conn.reply(message.chat, `✅ Aquí tienes el enlace:\n${selectedLink}`, message);
    } else {
      return message.reply("⚠️ Por favor, ingresa solo un número válido.");
    }
  } else {
    return message.reply("⚠️ No hay resultados disponibles para seleccionar. Realiza una búsqueda primero.");
  }
};

// Asociar los comandos
handler.command = ['spotifysearch', 'sp888'];

export default handler;
                                

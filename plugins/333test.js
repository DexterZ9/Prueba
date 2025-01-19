import { apis } from '../exports.js';
import axios from 'axios';

let searchResults = {}; // Variable global para almacenar los resultados temporalmente

let handler = async (m, { conn, text }) => {
  if (!text) {
    return m.reply("_*[ ⚠️ ] Ingresa lo que quieres buscar en Spotify*_");
  }

  try {
    // Obtener los resultados de la API
    const { data } = await axios.get(`${apis.delirius}search/spotify?q=${encodeURIComponent(text)}&limit=15`);

    if (!data.data) {
      return m.reply("⚠️ No se encontraron resultados para la búsqueda.");
    }

    // Crear un mensaje con los resultados numerados
    let response = `🎵 *Resultados para:* ${text}\n\n`;
    const links = data.data.map((result, index) => {
      response += `${index + 1}. *${result.title}* - ${result.artist}\n`;
      response += `   ⏱️ ${result.duration} | 🌐 Publicado: ${result.publish}\n`;
      return result.url;
    });

    response += "\n_Responde con el número del resultado para seleccionarlo._";

    // Guardar los enlaces temporalmente usando el ID del chat
    searchResults[m.chat] = links;

    // Enviar el mensaje con los resultados
    await conn.reply(m.chat, response, m);

  } catch (error) {
    console.error(error);
    m.reply("_*[ ❌ ] Hubo un error al buscar. Inténtalo de nuevo más tarde.*_");
  }
};

// Manejo de mensajes con números
conn.on("chat-update", async (update) => {
  if (!update.messages) return;

  const m = update.messages[0];
  const chatId = m.key.remoteJid;
  const text = m.message?.conversation || "";

  // Verificar si hay resultados guardados para este chat
  if (searchResults[chatId] && /^\d+$/.test(text)) {
    const links = searchResults[chatId];
    const index = parseInt(text, 10) - 1;

    // Validar el índice ingresado
    if (index < 0 || index >= links.length) {
      return conn.reply(chatId, "⚠️ El número ingresado no corresponde a ningún resultado.", m);
    }

    // Enviar el enlace correspondiente
    const selectedLink = links[index];
    await conn.reply(chatId, `✅ Aquí tienes el enlace:\n${selectedLink}`, m);

    // Opcional: Limpiar los resultados después de usarlos
    delete searchResults[chatId];
  }
});

handler.command = ['spotifysearch', 'sp888'];

export default handler;
        

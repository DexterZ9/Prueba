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
    data.data.forEach((result, index) => {
      response += `${index + 1}. *${result.title}* - ${result.artist}\n`;
      response += `   ⏱️ ${result.duration} | 🌐 Publicado: ${result.publish}\n`;
    });

    response += "\n_Responde con el número del resultado para seleccionarlo._";

    // Enviar los resultados y guardar los enlaces en el mensaje citado
    const quotedMessage = await conn.reply(message.chat, response, message);
    quotedMessage.links = data.data.map(result => result.url); // Guardar los enlaces en el mensaje citado

  } catch (error) {
    console.error(error);
    message.reply("_*[ ❌ ] Hubo un error al buscar. Inténtalo de nuevo más tarde.*_");
  }
};

// Manejo de selección del usuario
handler.handleSelection = async (message, { conn, text }) => {
  if (
    message.quoted && 
    message.quoted.sender === conn.user.jid &&
    message.quoted.body.includes("Resultados para")
  ) {
    // Validar si el mensaje contiene solo un número
    if (/^\d+$/.test(text)) {
      const selectedIndex = Number(text) - 1; // Convertir a índice
      const links = message.quoted.links; // Obtener los enlaces guardados

      // Validaciones
      if (!links || selectedIndex < 0 || selectedIndex >= links.length) {
        return message.reply("⚠️ El número ingresado no corresponde a ningún resultado.");
      }

      // Enviar el enlace correspondiente
      const selectedLink = links[selectedIndex];
      await conn.reply(message.chat, `✅ Aquí tienes el enlace:\n${selectedLink}`, message);
    } else {
      return message.reply("⚠️ Por favor, ingresa solo un número válido.");
    }
  }
};

// Asociar los comandos
handler.command = ['spotifysearch', 'spotifys'];
handler.selectionCommand = handler.handleSelection;

export default handler;

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
      return result.url;
    });

    response += "\n_Responde con el número del resultado para seleccionarlo._";

    // Enviar los resultados y guardar los enlaces en el mensaje citado
    await conn.reply(message.chat, response, message, { contextInfo: { links } });

  } catch (error) {
    console.error(error);
    message.reply("_*[ ❌ ] Hubo un error al buscar. Inténtalo de nuevo más tarde.*_");
  }
};

handler.command = ['spotifysearch', 'test123'];

// Manejo de selección del usuario
handler.handleQuotedResponse = async (message, { conn, text }) => {
  // Verificar si el mensaje es una respuesta válida a un mensaje citado
  if (
    message.quoted && 
    message.quoted.contextInfo && 
    message.quoted.contextInfo.links
  ) {
    // Validar si el texto es un número
    if (/^\d+$/.test(text)) {
      const selectedIndex = Number(text) - 1; // Convertir el número a índice
      const links = message.quoted.contextInfo.links; // Obtener los enlaces guardados

      // Validar si el índice está dentro del rango
      if (selectedIndex < 0 || selectedIndex >= links.length) {
        return message.reply("⚠️ El número ingresado no corresponde a ningún resultado.");
      }

      // Enviar el enlace seleccionado
      const selectedLink = links[selectedIndex];
      return conn.reply(message.chat, `✅ Aquí tienes el enlace:\n${selectedLink}`, message);
    } else {
      return message.reply("⚠️ Por favor, ingresa solo un número válido.");
    }
  }
};

// Asociar los comandos
export default handler;
    

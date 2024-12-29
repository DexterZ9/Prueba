
import * as Pinterest from "pinterest.js";

const pinterest = new Pinterest();

let handler = async (m, { conn, text }) => {
    if (!text) {
        return m.reply("Por favor, proporciona un término de búsqueda. Ejemplo: .hola gatos");
    }

    try {
        m.reply(`Buscando pines sobre: "${text}"...`);

        // Realiza la búsqueda con Pinterest.js
        const results = await pinterest.searchPins(text, { limit: 15 });

        if (!results.response || results.response.length === 0) {
            return m.reply("No se encontraron resultados para tu búsqueda.");
        }

        // Formatea los resultados para enviarlos
        const pins = results.response.map((pin, index) => 
            `${index + 1}. Título: ${pin.title || "Sin título"}\n` +
            `Enlace: ${pin.link || "No disponible"}\n` +
            `Imagen: ${pin.image_url || "No disponible"}`
        ).join("\n\n");

        // Envía los resultados al chat
        conn.sendMessage(m.chat, { text: `Resultados:\n\n${pins}` }, { quoted: m });

    } catch (error) {
        console.error("Error al buscar pines:", error);
        m.reply("Ocurrió un error al realizar la búsqueda. Inténtalo nuevamente más tarde.");
    }
};

handler.command = ['pintest', 'pin56'];
export default handler;

import fs from 'fs';

let acertijos = JSON.parse(fs.readFileSync('../storage/acertijos.json', 'utf-8'));
let currentRiddle = {};  // Para almacenar el acertijo actual y verificar la respuesta

let handler = async (m, { conn }) => {
    // Selecciona un acertijo aleatorio
    let acertijo = acertijos[Math.floor(Math.random() * acertijos.length)];
    currentRiddle[m.chat] = acertijo;  // Guarda el acertijo en el contexto del chat

    // Envía el acertijo al usuario
    await m.reply(`A ver si puedes resolver este acertijo:\n\n${acertijo.question}`);
};

handler.command = ['acertijo2'];

// Comprobación de la respuesta
conn.on('chat-update', async (chatUpdate) => {
    if (!chatUpdate.messages) return;
    let m = chatUpdate.messages[0];
    if (!m.message || !m.message.conversation) return;

    // Verifica si hay un acertijo activo en el chat
    let acertijo = currentRiddle[m.chat];
    if (!acertijo) return;

    let respuestaUsuario = m.message.conversation.trim().toLowerCase();
    if (respuestaUsuario === acertijo.response.toLowerCase()) {
        await conn.sendMessage(m.chat, { text: '¡Correcto! 🎉' });
        delete currentRiddle[m.chat];  // Elimina el acertijo una vez resuelto
    } else {
        await conn.sendMessage(m.chat, { text: 'Respuesta incorrecta, inténtalo de nuevo.' });
    }
});

export default handler;

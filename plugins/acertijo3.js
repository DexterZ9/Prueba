
import fs from 'fs';
import similarity from 'similarity';
const threshold = 0.72;

let acertijos = JSON.parse(fs.readFileSync('./acertijos.json', 'utf-8'));
let tekateki = {}; // Almacena los acertijos activos por chat

// Comando para enviar un acertijo
let handler = async (m, { conn }) => {
    let acertijo = acertijos[Math.floor(Math.random() * acertijos.length)];
    tekateki[m.chat] = {
        id: m.id,
        question: acertijo.question,
        response: acertijo.response,
        points: 10, // Cambia los puntos si prefieres
        timer: setTimeout(() => delete tekateki[m.chat], 60000) // Tiempo límite de 1 min
    };
    await m.reply(`Aquí tienes un acertijo:\n\n${acertijo.question}`);
};

handler.command = ['acertijo3'];

// Verificación de respuesta
handler.before = async function(m) {
    const id = m.chat;
    
    // Verifica si el mensaje es de un usuario, y no del bot
    if (m.fromMe) return;

    // Verifica que haya un acertijo activo en el chat y que el mensaje esté citado
    if (tekateki[id] && m.quoted && m.quoted.id === tekateki[id].id) {
        const respuestaUsuario = m.text.toLowerCase().trim();
        const respuestaCorrecta = tekateki[id].response.toLowerCase().trim();

        // Verifica si la respuesta es exacta
        if (respuestaUsuario === respuestaCorrecta) {
            global.db.data.users[m.sender].estrellas += tekateki[id].points;
            m.reply(`🌟 *Respuesta correcta!*\n+${tekateki[id].points} puntos`);
            clearTimeout(tekateki[id].timer);
            delete tekateki[id];
        } 
        // Verifica si la respuesta es casi correcta usando la similitud
        else if (similarity(respuestaUsuario, respuestaCorrecta) >= threshold) {
            m.reply('Casi lo logras!');
        } else {
            m.reply('Respuesta incorrecta!');
        }
    } else if (tekateki[id] && !m.quoted) {
        // Si hay un acertijo activo pero no es respuesta a un mensaje citado, ignora
        return true;
    }
};

export default handler;


import fs from 'fs';
import similarity from 'similarity';
const threshold = 0.72;

let acertijos = JSON.parse(fs.readFileSync('../storage/acertijo.json', 'utf-8'));
let tekateki = {}; // Almacena los acertijos activos por chat

// Comando para enviar un acertijo
let handler = async (m, { conn }) => {
    let acertijo = acertijos[Math.floor(Math.random() * acertijos.length)];
    tekateki[m.chat] = {
        id: m.id,
        question: acertijo.question,
        response: acertijo.response,
        points: 10, // Puedes cambiar el puntaje a tu preferencia
        timer: setTimeout(() => delete tekateki[m.chat], 60000) // Tiempo límite de 1 min
    };
    await m.reply(`Aquí tienes un acertijo:\n\n${acertijo.question}`);
};

handler.command = ['acertijo2'];

// Verificación de respuesta
handler.before = async function(m) {
    const id = m.chat;
    
    // Verifica que haya un acertijo activo en el chat
    if (!tekateki[id]) return m.reply('✨️ Ese acertijo ya ha terminado!');
    
    // Verifica que la respuesta sea a un mensaje del bot y que coincida con el acertijo
    if (m.quoted && m.quoted.id === tekateki[id].id) {
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
    }
};

export default handler;

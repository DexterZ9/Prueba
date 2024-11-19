import { spawn } from 'child_process';

let handler = async (m, { conn, isROwner }) => {
  if (!process.send) throw 'Usa: node index.js, no node main.js';
  if (conn.user.jid === conn.user.jid) {
    await m.reply('❇️ Reiniciando Bot...');
    process.send('reset'); // Envía la señal de reinicio
  } else {
    throw 'No tienes permiso para usar este comando.';
  }
};

handler.help = ['reiniciar'];
handler.tags = ['owner'];
handler.command = ['restart', 'reiniciar'];

handler.rowner = true;

export default handler;

let handler = async (m) => {
  await m.reply('⚙️ Reiniciando el bot...');
  process.exit(0);  // Finaliza el proceso actual
};

handler.help = ['reiniciar'];
handler.tags = ['owner'];
handler.command = ['restart', 'reiniciar'];
handler.rowner = true;

export default handler;

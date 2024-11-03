let handler = async (m, { conn }) => {
        conn.reply(m.chat, `Hola 🐼`);
}
handler.command = ['a']
export default handler

let handler = async (m, { conn }) => {
        conn.reply(`Hola 🐼`);
}
handler.command = ['a']
export default handler

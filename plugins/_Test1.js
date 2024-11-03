let handler = async (m, { conn }) => {
        conn.reply(m.chat, `Hola 🐼`, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: '✿ 𝐀𝐢𝐫𝐢 ✿', body: '𝙴𝚕 𝚖𝚎𝚓𝚘𝚛 𝚋𝚘𝚝 𝚍𝚎 𝚆𝚑𝚊𝚝𝚜𝙰𝚙𝚙 ✅', previewType: 0, "renderLargerThumbnail": true, thumbnail: icons.getRandom(), sourceUrl: 'https://github.com/Rudyrex/Airi-Bot'}}});
}
handler.command = ['a']
export default handler

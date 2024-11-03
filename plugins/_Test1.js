let handler = async (m, { conn }) => {
    let name = await conn.getName(m.sender)
    let menu = `
Hola *${name}* en que puedo ayudarte hoy 😀
    `.trim()
        conn.reply(m.chat, menu, m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: '✿ 𝐀𝐢𝐫𝐢 ✿', body: '𝙴𝚕 𝚖𝚎𝚓𝚘𝚛 𝚋𝚘𝚝 𝚍𝚎 𝚆𝚑𝚊𝚝𝚜𝙰𝚙𝚙 ✅', previewType: 0, "renderLargerThumbnail": true, thumbnail: icons.getRandom(), sourceUrl: 'https://github.com/Rudyrex/Airi-Bot'}}});
}
handler.command = ['menu3', 'help3', 'info3']
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

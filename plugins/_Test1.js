
let handler = async (m, { conn }) => {
    try {
    let name = await conn.getName(m.sender)
    let thum = 'https://qu.ax/MPeCD.jpg'
    let text = `Hola 🐼`.trim()
    //await conn.sendAiri(m.chat, 'Título Ejemplo', 'Cuerpo Ejemplo', 'Texto Ejemplo', 'https://f.uguu.se/bZEQKzcr.jpg', 'https://ejemplo.com', m);
        
    conn.reply(m.chat, menu, m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: '✿ 𝐀𝐢𝐫𝐢 ✿', body: '𝙴𝚕 𝚖𝚎𝚓𝚘𝚛 𝚋𝚘𝚝 𝚍𝚎 𝚆𝚑𝚊𝚝𝚜𝙰𝚙𝚙 ✅', previewType: 0, "renderLargerThumbnail": true, thumbnail: thumb, sourceurl: thumb}}});
    } catch (e) {
        m.reply(e.message)
    }
 }
handler.command = ['menu', 'help']
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
    

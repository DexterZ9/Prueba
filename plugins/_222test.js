
import { iconRandom } from '../exports.js'

let handler = async (m, { conn }) => {
    let icn = iconRandom;
    try {
let text = `Hola 🐼`.trim()
function generateRandomCode(length = 6) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

const randomTitle = `✿ 𝐀𝐢𝐫𝐢 ✿ - ${generateRandomCode()}`;

conn.reply(m.chat, text, m, {
    contextInfo: {
        externalAdReply: {
            mediaUrl: null,
            mediaType: 1,
            description: null,
            title: randomTitle,
            body: '𝙴𝚕 𝚖𝚎𝚓𝚘𝚛 𝚋𝚘𝚝 𝚍𝚎 𝚆𝚑𝚊𝚝𝚜𝙰𝚙𝚙 ✅',
            previewType: 0,
            renderLargerThumbnail: true,
            thumbnail: icn,
            sourceUrl: 'https://raw.githubusercontent.com/DexterZ9/Prueba/refs/heads/main/media/img/icon2.jpg'
        }
    }
});
        

        
        /*
    let name = await conn.getName(m.sender)
    let thum = 'https://f.uguu.se/bZEQKzcr.jpg'
    let text = `Hola 🐼`.trim()
    await conn.sendAiri(m.chat, 'Título Ejemplo', 'Cuerpo Ejemplo', text, icn, 'https://ejemplo.com', m);
        m.reply('🐼');
    //conn.reply(m.chat, text, m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: '✿ 𝐀𝐢𝐫𝐢 ✿', body: '𝙴𝚕 𝚖𝚎𝚓𝚘𝚛 𝚋𝚘𝚝 𝚍𝚎 𝚆𝚑𝚊𝚝𝚜𝙰𝚙𝚙 ✅', previewType: 0, "renderLargerThumbnail": true, thumbnail: icn, sourceUrl: 'https://github.com/Rudyrex/Airi-Bot'}}});
   */
    } catch (e) {
        m.reply(e.message)
    }
 }
 
handler.command = ['test8'];
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

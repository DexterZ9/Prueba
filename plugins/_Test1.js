let handler = async (m, { conn }) => {
    let name = await conn.getName(m.sender)
    let menu = `
༺═──────────────═༻

Hola *${name}* en que puedo ayudarte hoy 😀


【 𝘔𝘌𝘕𝘜 𝘋𝘌 𝘊𝘖𝘔𝘈𝘕𝘋𝘖𝘚 】
${readMore}

╭─❮ 🪻 *─ INFORMACIÓN ─* 🪻 ❯
├ ▢ *.owner*
├ ⓘ _Propietario del bot_
├ ▢ *.ping*
├ ⓘ _Tiempo de respuesta del servidor_
├ ▢ *.runtime*
├ ⓘ _Tiempo encendido_
├ ▢ *.totalplugins*
├ ⓘ _La cantidad de plugins del bot_
├ ▢ *.info*
├ ⓘ _Toda la información completa_
╰─❮ 🪻 ❯

╭─❮ 🪻 *─ BUSCADORES ─* 🪻 ❯
├ ▢ *.ytsearch* | *.yts*
├ ⓘ _Buscar videos en YouTube_
├ ▢ *.spotifys*
├ ⓘ _Buscar música en Spotify_
├ ▢ *.pinterest*
├ ⓘ _Buscar imágenes en Pinterest_
├ ▢ *.googleimg* | *.goimg*
├ ⓘ _Buscar imágenes en Google_
├ ▢ *.tiktoksearch* | *.tts*
├ ⓘ _Buscar videos en TikTok_
╰─❮ 🪻 ❯

╭─❮ 🪻 *─ DESCARGAS ─* 🪻 ❯
├ ▢ *.ytmp4* | *.ytv* | *.ytmp4doc*
├ ⓘ _Descargar videos de YouTube_
├ ▢ *.ytmp3* | *.yta* | *.ytmp3doc*
├ ⓘ _Descargar audios de YouTube_
├ ▢ *.spotifydl*
├ ⓘ _Descargar música de Spotify_
├ ▢ *.tiktok* | *.ttdl*
├ ⓘ _Descargar videos de TikTok_
├ ▢ *.facebook* | *.fb*
├ ⓘ _Descargar videos de Facebook_
├ ▢ *.instagram* | *.ig*
├ ⓘ _Descargar videos/fotos de Instagram_
├ ▢ *.gitclone*
├ ⓘ _Descargar repositorios de GitHub_
├ ▢ *.mediafire*
├ ⓘ _Descargar archivos de Mediafire_
╰─❮ 🪻 ❯
    `.trim()
    conn.sendAiri(m.chat, 'title 🐼', 'body 🐢', menu, icon1, 'www.google.com', m );
    //conn.reply(m.chat, menu, m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: '✿ 𝐀𝐢𝐫𝐢 ✿', body: '𝙴𝚕 𝚖𝚎𝚓𝚘𝚛 𝚋𝚘𝚝 𝚍𝚎 𝚆𝚑𝚊𝚝𝚜𝙰𝚙𝚙 ✅', previewType: 0, "renderLargerThumbnail": true, thumbnail: icons.getRandom(), sourceUrl: 'https://github.com/Rudyrex/Airi-Bot'}}});
}
handler.command = ['menu', 'help']
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
    

import Scraper from "@SumiFX/Scraper"

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) return m.reply('⚠️ Ingresa el enlace del vídeo de YouTube junto al comando.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* https://youtu.be/QSvaCSt8ixs`)
    if (!args[0].match(/youtu/gi)) return conn.reply(m.chat, `Verifica que el enlace sea de YouTube.`, m)

    try {
    let { title, size, quality, thumbnail, dl_url } = await Scraper.ytmp4(args[0])
    if (size.includes('GB') || size.replace(' MB', '') > 250) { return await m.reply('El archivo pesa mas de 250 MB, se canceló la Descarga.')}
    
    await conn.sendMessage(m.chat, {document: {url: dl_url}, caption: null, mimetype: 'video/mp4', fileName: `${title}.mp4`}, {quoted: m});
    } catch {
        
    }
}

handler.command = ['ytmp4doc', 'ytvdoc']

export default handler

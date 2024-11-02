
import fetch from 'node-fetch';

const handler = async (m, { conn, args, command, usedPrefix }) => {
    if (!args[0]) {
        return conn.reply(m.chat, `_*[ ⚠️ ] Agrega un enlace de Spotify*_`, m);
    }

    try {

        await conn.reply(m.chat, `_*[ ⏳ ] Descargando mp3...*_`, m);
        
        if (command==='dlspotify') {
            const apiUrl = `https://deliriusapi-official.vercel.app/download/spotifydl?url=${encodeURIComponent(args[0])}`;
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.data && data.data.url) {
                const downloadUrl = data.data.url;
                const filename = `${data.data.title || 'audio'}.mp3`;
                const thumb = data.data.image;
                await conn.sendMessage(m.chat, { audio: { url: downloadUrl }, fileName: filename, mimetype: 'audio/mpeg', caption: `╭━❰  *SPOTIFY*  ❱━⬣\n${filename}\n╰━❰ *${wm}* ❱━⬣`, quoted: m })
                //await conn.sendFile(m.chat, downloadUrl, filename, `Titulo: ${filename}`, m);
            } else {
                throw new Error('_*[ ❌ ] Ocurrió un error al descargar el  archivo mp3_');
            }
        }
        
        if (command==='dlspotifydoc'){
            const apiUrl = `https://deliriusapi-official.vercel.app/download/spotifydl?url=${encodeURIComponent(args[0])}`;
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.data && data.data.url) {
                const downloadUrl = data.data.url;
                const filename = `${data.data.title || 'audio'}.mp3`;
                const thumb = data.data.image;
                await conn.sendMessage(m.chat, { document: { url: downloadUrl }, fileName: filename, mimetype: 'audio/mpeg', caption: `╭━❰  *SPOTIFY*  ❱━⬣\n${filename}\n╰━❰ *${wm}* ❱━⬣`, quoted: m })
                //await conn.sendFile(m.chat, downloadUrl, filename, `Titulo: ${filename}`, m);
            } else {
                throw new Error('_*[ ❌ ] Ocurrió un error al descargar el  archivo mp3_');
            }
        }
    } catch (err) {
        console.error(err);
        await conn.reply(m.chat, `_*[ ❌ ] Ocurrió un error al descargar el archivo mp3, inténtalo más tarde*_`, m);
    }
};

handler.command = ['dlspotify', 'dlspotifydoc'];
export default handler;
        


/*
import Scraper from "@SumiFX/Scraper"

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return m.reply('🍭 Ingresa el nombre de algún Track de Spotify.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* Gemini Aaliyah - If Only`)

let user = global.db.data.users[m.sender]
try {
let { title, artist, album, published, thumbnail, dl_url } = await Scraper.spotify(text)
let txt = `╭─⬣「 *Spotify Download* 」⬣\n`
    txt += `│  ≡◦ *🍭 Nombre ∙* ${title}\n`
    txt += `│  ≡◦ *🪴 Artista ∙* ${artist}\n`
    txt += `│  ≡◦ *📚 Album ∙* ${album}\n`
    txt += `│  ≡◦ *📅 Publicado ∙* ${published}\n`
    txt += `╰─⬣`
await conn.sendFile(m.chat, thumbnail, 'thumbnail.jpg', txt, m)
await conn.sendFile(m.chat, dl_url, title + '.mp3', `*🍭 Titulo ∙* ${title}\n*🪴 Artista ∙* ${artist}`, m, false, { mimetype: 'audio/mpeg', asDocument: user.useDocument })
} catch {
}}
handler.help = ['spotify <búsqueda>']
handler.tags = ['downloader']
handler.command = ['spotify']
handler.register = true 
export default handler
*/

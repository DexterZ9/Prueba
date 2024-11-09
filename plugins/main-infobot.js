

let handler = async (m, { conn, isRowner }) => {
    let _muptime
    let totalreg = Object.keys(global.db.data.users).length
    let totalchats = Object.keys(global.db.data.chats).length
    let pp = 'https://tinyurl.com/26joweab'

    // Asegúrate de que global.icons contenga un array de imágenes
    const iconsArray = icons || []; // Si global.icons está vacío, no hace nada
    
    // Si el array tiene imágenes, seleccionamos una aleatoria
    const randomIcon = iconsArray.length > 0 ? iconsArray[Math.floor(Math.random() * iconsArray.length)] : pp;

    if (process.send) {
        process.send('uptime')
        _muptime = await new Promise(resolve => {
            process.once('message', resolve)
            setTimeout(resolve, 1000)
        }) * 1000
    }

    let muptime = clockString(_muptime)
    const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats)
    const groupsIn = chats.filter(([id]) => id.endsWith('@g.us')) 

    // Calcular el ping
    const start = performance.now()
    await conn.sendPresenceUpdate('composing', m.chat) // Enviar presencia para medir el tiempo de respuesta
    const ping = (performance.now() - start).toFixed(0)

    let txt = `╭─✦──✦
│⥤ *Nombre:* Airi
│⥤ *Versión:* 1.0.0
│⥤ *Creador:* Rudy
│⥤ *GitHub:* https://github.com/DexterZ9/Prueba
│⥤ *Ping:* ${ping} ms
│⥤ *Tiempo Activo:* ${muptime}
│⥤ *Chats Privados:* ${chats.length - groupsIn.length} 
│⥤ *Grupos:* ${groupsIn.length}
│⥤ *Chats Totales:* ${chats.length}
│⥤ *Usuarios Registrados:* ${totalreg}
╰─✦──✦`.trim()

    // Usamos la imagen aleatoria de global.icons
    await conn.reply(m.chat, txt, m, {
        contextInfo: {
            externalAdReply: {
                mediaUrl: null,
                mediaType: 1,
                description: null,
                title: '✿ 𝐀𝐢𝐫𝐢 ✿',
                body: '𝙴𝚕 𝚖𝚎𝚓𝚘𝚛 𝚋𝚘𝚝 𝚍𝚎 𝚆𝚑𝚊𝚝𝚜𝙰𝚙𝚙 ✅',
                previewType: 0,
                "renderLargerThumbnail": true,
                thumbnail: randomIcon, // Usamos la imagen aleatoria seleccionada
                sourceUrl: 'https://github.com/Rudyrex/Airi-Bot'
            }
        }
    })
}

handler.command = ['info']
export default handler

function clockString(ms) {
    let h = Math.floor(ms / 3600000)
    let m = Math.floor(ms / 60000) % 60
    let s = Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
                     }
        


/*
import { performance } from 'perf_hooks'

let handler = async (m, { conn, isRowner }) => {
    let _muptime
    let totalreg = Object.keys(global.db.data.users).length
    let totalchats = Object.keys(global.db.data.chats).length
    let pp = 'https://tinyurl.com/26joweab'
    
    if (process.send) {
        process.send('uptime')
        _muptime = await new Promise(resolve => {
            process.once('message', resolve)
            setTimeout(resolve, 1000)
        }) * 1000
    }
    
    let muptime = clockString(_muptime)
    const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats)
    const groupsIn = chats.filter(([id]) => id.endsWith('@g.us')) 

    // Calcular el ping
    const start = performance.now()
    await conn.sendPresenceUpdate('composing', m.chat) // Enviar presencia para medir el tiempo de respuesta
    const ping = (performance.now() - start).toFixed(0)

    let txt = `╭─${em}──✦
│⥤ *Nombre:* Airi
│⥤ *Versión:* 1.0.0
│⥤ *Creador:* Rudy
│⥤ *GitHub:* https://github.com/DexterZ9/Prueba
│⥤ *Ping:* ${ping} ms
│⥤ *Tiempo Activo:* ${muptime}
│⥤ *Chats Privados:* ${chats.length - groupsIn.length} 
│⥤ *Grupos:* ${groupsIn.length}
│⥤ *Chats Totales:* ${chats.length}
│⥤ *Usuarios Registrados:* ${totalreg}
╰─${em}──✦`.trim()

    await conn.reply(m.chat, txt, m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: '✿ 𝐀𝐢𝐫𝐢 ✿', body: '𝙴𝚕 𝚖𝚎𝚓𝚘𝚛 𝚋𝚘𝚝 𝚍𝚎 𝚆𝚑𝚊𝚝𝚜𝙰𝚙𝚙 ✅', previewType: 0, "renderLargerThumbnail": true, thumbnail: icons.getRandom(), sourceUrl: 'https://github.com/Rudyrex/Airi-Bot'}}});
    //await conn.sendFile(m.chat, pp, 'thumbnail.jpg', txt, m)
}

handler.command = ['info']
export default handler

function clockString(ms) {
    let h = Math.floor(ms / 3600000)
    let m = Math.floor(ms / 60000) % 60
    let s = Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
*/

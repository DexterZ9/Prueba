
import os from 'os'
import { performance } from 'perf_hooks'
import fs from 'fs'

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

    // RAM usada y total
    const usedMemory = process.memoryUsage().rss / (1024 * 1024) // RAM usada en MB
    const totalMemory = os.totalmem() / (1024 * 1024) // RAM total en MB

    // CPU (promedio de la carga en 1 minuto)
    const cpuLoad = os.loadavg()[0].toFixed(2)

    // Almacenamiento total y usado
    const { size: totalStorage, free: freeStorage } = fs.statSync('/')
    const usedStorage = (totalStorage - freeStorage) / (1024 * 1024) // Usado en MB
    const totalStorageMB = totalStorage / (1024 * 1024) // Total en MB

    // Convertir RAM y almacenamiento a MB/GB según corresponda
    const formattedRAM = formatSize(usedMemory) + ' / ' + formatSize(totalMemory)
    const formattedStorage = formatSize(usedStorage) + ' / ' + formatSize(totalStorageMB)

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
│⥤ *CPU:* ${cpuLoad}%
│⥤ *RAM:* ${formattedRAM}
│⥤ *Almacenamiento:* ${formattedStorage}
│⥤ *Tiempo Activo:* ${muptime}
│⥤ *Chats Privados:* ${chats.length - groupsIn.length} 
│⥤ *Grupos:* ${groupsIn.length}
│⥤ *Chats Totales:* ${chats.length}
│⥤ *Usuarios Registrados:* ${totalreg}
╰─✦──✦`.trim()
    
    await conn.sendFile(m.chat, pp, 'thumbnail.jpg', txt, m)
}

handler.command = ['info']
export default handler

function clockString(ms) {
    let h = Math.floor(ms / 3600000)
    let m = Math.floor(ms / 60000) % 60
    let s = Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function formatSize(size) {
    // Convierte de MB a GB si es mayor a 1024 MB
    if (size >= 1024) {
        return (size / 1024).toFixed(2) + ' GB'
    } else {
        return size.toFixed(2) + ' MB'
    }
}

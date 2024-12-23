

import fetch from 'node-fetch';


let handler = async (m, { text, conn, args, usedPrefix, command }) => {
    
    if (!args[0]) return await conn.reply(m.chat, `⚠️ Agrega un enlace de *YouTube*`, m);
    let yturl = args[0]
    m.react('⏳')
    conn.reply(m.chat, '⏳ Descargando el video...', m);
    
    try {
        let api1 = await fetch(`https://deliriussapi-oficial.vercel.app/download/ytmp4?url=${yturl}`)    
        let result1 = await api1.json()
        let title1 = result1.data.title;
        let downloadUrl1 = result1.data.download.url;
        
        await m.react('✅')
        await conn.sendMessage(m.chat, {document: {url: downloadUrl1}, caption: null, mimetype: 'video/mp4', fileName: `${title1}.mp4`}, {quoted: m});
        
    } catch (e1) {
        await conn.reply(m.chat, e1.message, m);
    }
};

handler.command = ['ytvdoc', 'ytmp4doc',];
export default handler;

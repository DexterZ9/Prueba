
import fetch from 'node-fetch';

let handler = async (m, { text, conn, args, usedPrefix, command }) => {
    if (!args[0]) {
        return await conn.reply(m.chat, `⚠️ Agrega un enlace de *YouTube*`, m);
    }

    let yturl = args[0];
    m.react('⏳');
    conn.reply(m.chat, '⏳ Descargando el video...', m);

    try {
        let api1 = await fetch(`https://deliriussapi-oficial.vercel.app/download/ytmp4?url=${yturl}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        if (!api1.ok) {
            throw new Error(`HTTP Error: ${api1.status} - ${api1.statusText}`);
        }

        let result1 = await api1.json();
        let title1 = result1.data.title;
        let downloadUrl1 = result1.data.download.url;

        await m.react('✅');
        await conn.sendMessage(
            m.chat,
            {
                document: { url: downloadUrl1 },
                caption: null,
                mimetype: 'video/mp4',
                fileName: `${title1}.mp4`
            },
            { quoted: m }
        );

    } catch (e1) {
        console.error(e1);
        await conn.reply(m.chat, `❌ Error: ${e1.message}`, m);
    }
};

handler.command = ['ytvdoc', 'ytmp4doc'];
export default handler;
    



/*
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
*/

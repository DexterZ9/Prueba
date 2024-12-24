
import fetch from 'node-fetch';

let handler = async (m, { text, conn, args, usedPrefix, command }) => {
    if (!args[0]) {
        return await conn.reply(m.chat, `⚠️ Agrega un enlace de *YouTube*`, m);
    }

    let yturl = args[0];
    m.react('⏳');
    conn.reply(m.chat, '⏳ Descargando el video...', m);

    try {
        // Solicita la información de la API
        let apiResponse = await fetch(`https://deliriussapi-oficial.vercel.app/download/ytmp4?url=${yturl}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Mobile Safari/537.36'
            }
        });

        if (!apiResponse.ok) {
            throw new Error(`API Error: ${apiResponse.status} - ${apiResponse.statusText}`);
        }

        let result = await apiResponse.json();
        let title = result.data.title;
        let downloadUrl = result.data.download.url;

        // Verifica si el enlace de descarga funciona con simulación móvil
        let downloadResponse = await fetch(downloadUrl, {
            method: 'HEAD', // Verifica si el archivo es accesible
            headers: {
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Mobile Safari/537.36',
                'Referer': 'https://www.youtube.com/', // Simula el origen desde YouTube
                'Accept-Language': 'en-US,en;q=0.9',
            }
        });

        if (!downloadResponse.ok) {
            throw new Error(`Download Error: ${downloadResponse.status} - ${downloadResponse.statusText}`);
        }

        // Envía el archivo al chat
        await m.react('✅');
        await conn.sendMessage(
            m.chat,
            {
                document: { url: downloadUrl },
                caption: null,
                mimetype: 'video/mp4',
                fileName: `${title}.mp4`
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

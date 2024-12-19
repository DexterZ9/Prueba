import fetch from 'node-fetch';
import { format } from 'util';

const handler = async (m, { text }) => {
  // Validar que la URL sea válida
  if (!/^https?:\/\//.test(text)) throw 'La URL debe ser http o https';

  let _url;
  try {
    _url = new URL(text);
  } catch (e) {
    throw 'URL mal formada: ' + e.message;
  }

  const res = await fetch(_url.toString());

  if (!res.ok) throw `Error en la solicitud: ${res.status} ${res.statusText}`;

  const contentLength = res.headers.get('content-length');
  if (contentLength && contentLength > 100 * 1024 * 1024) {
    throw `Content-Length: ${contentLength}`;
  }

  const contentType = res.headers.get('content-type');
  if (!/text|json/.test(contentType)) {
    // Si no es texto o JSON, envía el archivo como está
    return conn.sendFile(m.chat, _url.toString(), 'file', text, m);
  }

  let txt;
  try {
    const buffer = await res.buffer();
    txt = format(JSON.parse(buffer.toString()));
  } catch (e) {
    txt = `Error procesando la respuesta: ${e.message}`;
  } finally {
    m.reply(txt.slice(0, 65536));
  }
};

handler.command = /^(fetch|get)$/i;

export default handler;
    

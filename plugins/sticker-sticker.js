
import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let stiker = false
  let username = conn.getName(m.sender)
  console.log('Usuario:', username)

  try {
    let q = m.quoted ? m.quoted : m
    console.log('Mensaje citado:', q)
    
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    console.log('Tipo MIME:', mime)

    if (/webp|image|video/g.test(mime)) {
      let img = await q.download?.()
      console.log('Imagen descargada:', img ? 'Sí' : 'No')

      if (!img) {
        console.log('Imagen no descargada. Enviando mensaje de error.')
        return await conn.sendAi(m.chat, botname, textbot, `⚠️ Responde a una *Imagen* o *Vídeo.*`, catalogo, catalogo, canal)
      }
      
      let out
      try {
        stiker = await sticker(img, false, global.packname, global.author)
        console.log('Sticker generado:', stiker ? 'Sí' : 'No')
      } catch (e) {
        console.error('Error al generar el sticker:', e)
      } finally {
        if (!stiker) {
          console.log('Intentando subir la imagen y generar sticker alternativo...')
          if (/webp/g.test(mime)) out = await webp2png(img)
          else if (/image/g.test(mime)) out = await uploadImage(img)
          else if (/video/g.test(mime)) out = await uploadFile(img)

          if (typeof out !== 'string') {
            console.log('Upload fallido o tipo desconocido. Intentando subir imagen nuevamente.')
            out = await uploadImage(img)
          }

          stiker = await sticker(false, out, global.packname, global.author)
          console.log('Sticker alternativo generado:', stiker ? 'Sí' : 'No')
        }
      }
    } else if (args[0]) {
      if (isUrl(args[0])) {
        console.log('URL válida proporcionada:', args[0])
        stiker = await sticker(false, args[0], global.packname, global.author)
      } else {
        console.log('URL no válida proporcionada:', args[0])
        return m.reply('La *Url* no es valida')
      }
    }
  } catch (e) {
    console.log('Error en el try principal:', e)
    if (!stiker) stiker = e
  } finally {
    if (stiker) {
      console.log('Enviando sticker...')
      conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
    } else {
      console.log('No se pudo generar el sticker. Enviando mensaje de error.')
      return m.reply('🤖 Responde a una *Imagen* o *Vídeo.*')
    }
  }
}

handler.help = ['sticker']
handler.tags = ['sticker']
handler.command = ['s', 'sticker', 'stiker']

export default handler

const isUrl = (text) => {
  return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
}

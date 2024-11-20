let handler = async (m, { conn, usedPrefix, isOwner }) => {
let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:Rudy:;;\nFN:Rudy:)\nTITLE:\nitem1.TEL;waid=50375961083:50375961083\nitem1.X-ABLabel:Rudy:)\nEND:VCARD`
await conn.sendMessage(m.chat, { contacts: { displayName: 'Rudy:)', contacts: [{ vcard }] }}, {quoted: m})
}

handler.command = ['owner', 'creator', 'creador', 'dueño'] 

export default handler

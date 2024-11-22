import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 



global.owner = [
  ['50375961083', 'Rudy', true],
  ['584123989549']
]



global.mods = []
global.prems = []
   


global.packname = `Creado por`
global.author = '✿ 𝐀𝐢𝐫𝐢 ✿'
global.wait = '✿ 𝐀𝐢𝐫𝐢 ✿'
global.botname = '✿ 𝐀𝐢𝐫𝐢 ✿'
global.textbot = `𝙴𝚕 𝚖𝚎𝚓𝚘𝚛 𝚋𝚘𝚝 𝚍𝚎 𝚆𝚑𝚊𝚝𝚜𝙰𝚙𝚙 ✅`
global.botdesc = `𝙴𝚕 𝚖𝚎𝚓𝚘𝚛 𝚋𝚘𝚝 𝚍𝚎 𝚆𝚑𝚊𝚝𝚜𝙰𝚙𝚙 ✅`
global.listo = 'Completado ✯'
global.namechannel = '✿ 𝐀𝐢𝐫𝐢 ✿'
global.baileys = '@whiskeysockets/baileys'



global.catalogo = fs.readFileSync('./storage/img/catalogo.png')
global.miniurl = fs.readFileSync('./media/img/icon2.jpg')

global.icon1 = fs.readFileSync('./media/img/icon1.jpg')
global.icon2 = fs.readFileSync('./media/img/icon2.jpg')
global.icon3 = fs.readFileSync('./media/img/icon3.jpg')

global.icons = [ icon1, icon2, icon3 ]

global.em = '🍁'

global.group = 'https://chat.whatsapp.com/CTaspTXla9T1zA83m6ZKPe'
global.canal = 'https://whatsapp.com/channel/0029Vak6H9l3GJP4FJH5063R'



global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: botname, orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}



global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment	



global.multiplier = 69 
global.maxwarn = '2' // máxima advertencias



let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})

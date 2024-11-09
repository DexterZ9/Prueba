
import { readFile } from 'fs/promises';

export const botnam = '✿ 𝐀𝐢𝐫𝐢 ✿';


async function loadRandomIcon(){
    const icons = [
        './media/img/icon1.jpg',
        './media/img/icon2.jpg',
        './media/img/icon3.jpg',
        './media/img/icon4.jpg',
        './media/img/icon5.jpg'
    ];
    
    const iconsRandom = icons[Math.floor(Math.random() * icons.length)];
    
    return await readFile(iconsRandom);
}

export const iconRandom = await loadRandomIcon();

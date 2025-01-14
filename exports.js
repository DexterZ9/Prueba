
export const apis = {
  delirius: 'https://delirius-apiofc.vercel.app/',
  cloudseek: 'https://cloudseek-api.vercel.app/',
  dorratz: 'https://api.dorratz.com/',
};

const iconUrls = [
    "https://raw.githubusercontent.com/DexterZ9/Prueba/refs/heads/main/src/img/icon1.jpg",
    "https://raw.githubusercontent.com/DexterZ9/Prueba/refs/heads/main/src/img/icon2.jpg",
    "https://raw.githubusercontent.com/DexterZ9/Prueba/refs/heads/main/src/img/icon3.jpg",
    "https://raw.githubusercontent.com/DexterZ9/Prueba/refs/heads/main/media/img/icon4.jpg",
    "https://raw.githubusercontent.com/DexterZ9/Prueba/refs/heads/main/media/img/icon5.jpg"
];
console.log('exports load √');
export const getRandomIcon = () => {
    const randomIcon = Math.floor(Math.random() * iconUrls.length);
    return iconUrls[randomIcon];
};

const thumbUrls = [
    "https://raw.githubusercontent.com/DexterZ9/Prueba/refs/heads/main/src/img/thumbnail1.jpg",
    "https://raw.githubusercontent.com/DexterZ9/Prueba/refs/heads/main/src/img/thumbnail2.jpg",
    "https://raw.githubusercontent.com/DexterZ9/Prueba/refs/heads/main/src/img/thumbnail3.jpg",
    "https://raw.githubusercontent.com/DexterZ9/Prueba/refs/heads/main/src/img/thumbnail4.jpg",
    "https://raw.githubusercontent.com/DexterZ9/Prueba/refs/heads/main/src/img/thumbnail5.jpg"
];

export const getRandomThumb = () => {
    const randomThumb = Math.floor(Math.random() * thumbUrls.length);
    return thumbUrls[randomThumb];
};

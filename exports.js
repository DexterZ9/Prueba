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

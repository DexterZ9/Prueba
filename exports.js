const iconUrls = [
    "https://qu.ax/MPeCD.jpg",
    "https://raw.githubusercontent.com/DexterZ9/Prueba/refs/heads/main/media/img/icon4.jpg",
    "https://raw.githubusercontent.com/DexterZ9/Prueba/refs/heads/main/media/img/icon5.jpg"
];

export const getRandomIcon = () => {
    const randomIcon = Math.floor(Math.random() * iconUrls.length);
    return iconUrls[randomIcon];
};

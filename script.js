// =====================
// CANAIS
// =====================

const canais = [
    {
        nome: "Animeflix",
        imagem: "imagens/animeflix.png",
        url: "https://gabrielandrade.dev.br/"
    },
    {
        nome: "Projeto Globo",
        imagem: "imagens/globo.png",
        url: "https://andradegab.github.io/Projeto-Globo/"
    },
    {
        nome: "Animeflix",
        imagem: "imagens/animeflix.png",
        url: "https://gabrielandrade.dev.br/"
    },
    {
        nome: "Projeto Globo",
        imagem: "imagens/globo.png",
        url: "https://andradegab.github.io/Projeto-Globo/"
    },
    {
        nome: "Animeflix",
        imagem: "imagens/animeflix.png",
        url: "https://gabrielandrade.dev.br/"
    },
    {
        nome: "Projeto Globo",
        imagem: "imagens/globo.png",
        url: "https://andradegab.github.io/Projeto-Globo/"
    },
    {
        nome: "Animeflix",
        imagem: "imagens/animeflix.png",
        url: "https://gabrielandrade.dev.br/"
    },
    {
        nome: "Projeto Globo",
        imagem: "imagens/globo.png",
        url: "https://andradegab.github.io/Projeto-Globo/"
    },
    {
        nome: "Animeflix",
        imagem: "imagens/animeflix.png",
        url: "https://gabrielandrade.dev.br/"
    },
    {
        nome: "Projeto Globo",
        imagem: "imagens/globo.png",
        url: "https://andradegab.github.io/Projeto-Globo/"
    },
    {
        nome: "Animeflix",
        imagem: "imagens/animeflix.png",
        url: "https://gabrielandrade.dev.br/"
    },
    {
        nome: "Projeto Globo",
        imagem: "imagens/globo.png",
        url: "https://andradegab.github.io/Projeto-Globo/"
    },
];

// =====================
// SONS
// =====================

const clickSound = new Audio("audio/click.mp3");
const hoverSound = new Audio("audio/hover.mp3");
const tooltip =
    document.getElementById("channel-tooltip");

hoverSound.volume = 0.7;

// =====================
// ELEMENTOS
// =====================

const tela = document.getElementById("channels");
const cursor = document.getElementById("cursor");
const transicao = document.getElementById("transicao");

// =====================
// CRIAR CARDS
// =====================

canais.forEach(canal => {

    const card = document.createElement("div");
    card.classList.add("canal");

    const img = document.createElement("img");
    img.src = canal.imagem;
    img.alt = canal.nome;


    card.appendChild(img);

    // Hover
    card.addEventListener("mouseenter", () => {

        tooltip.textContent = canal.nome;

        const rect = card.getBoundingClientRect();
        const telaRect = wiiscreen.getBoundingClientRect();

        tooltip.style.left =
            rect.left - telaRect.left + rect.width / 2 + "px";

        tooltip.style.top =
            rect.bottom - telaRect.top + 10 + "px";

        tooltip.style.opacity = "1";

        hoverSound.currentTime = 0;
        hoverSound.play();

        cursor.classList.add("hover");
    });

    card.addEventListener("mouseleave", () => {

        tooltip.style.opacity = "0";

        cursor.classList.remove("hover");
    });

    // Clique
    card.addEventListener("click", () => {

        clickSound.currentTime = 0;
        clickSound.play();

        card.classList.add("abrindo");

        setTimeout(() => {
            transicao.classList.add("ativo");
        }, 450);

        setTimeout(() => {
            window.open(canal.url, "_blank");
        }, 1000);

        setTimeout(() => {
            card.classList.remove("abrindo");
            transicao.classList.remove("ativo");
        }, 1800);

    });

    tela.appendChild(card);

});

// =====================
// CURSOR WII
// =====================

document.addEventListener("mousemove", (e) => {

    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

});

// =====================
// RELÓGIO
// =====================

const hora = document.getElementById("hora");
const data = document.getElementById("data");

function atualizarRelogio() {

    const agora = new Date();

    const horas = String(agora.getHours()).padStart(2, "0");
    const minutos = String(agora.getMinutes()).padStart(2, "0");

    const dia = String(agora.getDate()).padStart(2, "0");
    const mes = String(agora.getMonth() + 1).padStart(2, "0");

    const diasSemana = [
        "Dom.",
        "Seg.",
        "Ter.",
        "Qua.",
        "Qui.",
        "Sex.",
        "Sáb."
    ];

    const semana = diasSemana[agora.getDay()];

    hora.textContent = `${horas}:${minutos}`;
    data.textContent = `${semana} ${dia}/${mes}`;
}

atualizarRelogio();
setInterval(atualizarRelogio, 1000);

// =====================
// MÚSICA DE FUNDO
// =====================

const bgm = document.getElementById("bgm");

bgm.volume = 0.15;

const startScreen = document.getElementById("start-screen");

startScreen.addEventListener("click", () => {

    bgm.play();

    startScreen.classList.add("esconder");

});

bgm.volume = 0.15;
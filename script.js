const ligaSound = new Audio("audio/liga.mp3");
const desligaSound = new Audio("audio/desliga.mp3");

ligaSound.volume = 0.4;
desligaSound.volume = 0.4;

// =====================
// CANAIS
// =====================
window.addEventListener("DOMContentLoaded", () => {
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
            nome: "Lista de Compras",
            imagem: "imagens/lista.png",
            url: "https://andradegab.github.io/Lista-de-Compras/"
        },
        {
            nome: "Em Breve!",
            imagem: "imagens/wii.jpg",
            url: "https://www.linkedin.com/in/gabriel-andrade-a26025319/"
        },
        {
            nome: "Em Breve!",
            imagem: "imagens/wii.jpg",
            url: "https://www.linkedin.com/in/gabriel-andrade-a26025319/"
        },
        {
            nome: "Em Breve!",
            imagem: "imagens/wii.jpg",
            url: "https://www.linkedin.com/in/gabriel-andrade-a26025319/"
        },
        {
            nome: "Em Breve!",
            imagem: "imagens/wii.jpg",
            url: "https://www.linkedin.com/in/gabriel-andrade-a26025319/"
        },
        {
            nome: "Em Breve!",
            imagem: "imagens/wii.jpg",
            url: "https://www.linkedin.com/in/gabriel-andrade-a26025319/"
        },
        {
            nome: "Em Breve!",
            imagem: "imagens/wii.jpg",
            url: "https://www.linkedin.com/in/gabriel-andrade-a26025319/"
        },
        {
            nome: "Em Breve!",
            imagem: "imagens/wii.jpg",
            url: "https://www.linkedin.com/in/gabriel-andrade-a26025319/"
        },
        {
            nome: "Em Breve!",
            imagem: "imagens/wii.jpg",
            url: "https://www.linkedin.com/in/gabriel-andrade-a26025319/"
        },
        {
            nome: "Em Breve!",
            imagem: "imagens/wii.jpg",
            url: "https://www.linkedin.com/in/gabriel-andrade-a26025319/"
        },
    ];

    const tela = document.getElementById("channels");
    const cursor = document.getElementById("cursor");
    const transicao = document.getElementById("transicao");
    const wiiscreen = document.getElementById("wiiscreen");

    const hora = document.getElementById("hora");
    const data = document.getElementById("data");

    const bgm = document.getElementById("bgm");
    const startScreen = document.getElementById("start-screen");

    const volumeSlider = document.getElementById("volume-slider");
    const themeToggle = document.getElementById("theme-toggle");

    const tooltip = document.getElementById("channel-tooltip");
    const paw = document.getElementById("paw-hit");
    const flash = document.getElementById("screen-flash");

    // =====================
    // SONS
    // =====================
    const clickSound = new Audio("audio/click.mp3");
    const hoverSound = new Audio("audio/hover.mp3");
    const ligaSound = new Audio("audio/liga.mp3");
    const desligaSound = new Audio("audio/desliga.mp3");

    // =====================
    // START SCREEN
    // =====================
    bgm.volume = 0.15;

    startScreen?.addEventListener("click", () => {
        bgm.play();
        startScreen.classList.add("esconder");
    });

    // =====================
    // CANAIS
    // =====================
    canais.forEach(canal => {
        const card = document.createElement("div");
        card.classList.add("canal");

        const img = document.createElement("img");
        img.src = canal.imagem;
        img.alt = canal.nome;

        card.appendChild(img);

        // CLICK (ZOOM + SOM + ABA NOVA)
        card.addEventListener("click", () => {

            clickSound.currentTime = 0;
            clickSound.play().catch(() => { });

            card.classList.add("abrindo");

            // começa transição branca
            transicao.classList.add("ativo");

            // abre depois do zoom + flash
            setTimeout(() => {
                window.open(canal.url, "_blank");
            }, 600);

            // 👇 IMPORTANTE: limpa a tela depois
            setTimeout(() => {
                transicao.classList.remove("ativo");
            }, 1200);
        });

        // HOVER
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
            hoverSound.play().catch(() => { });

            cursor.classList.add("hover");
        });

        card.addEventListener("mouseleave", () => {
            tooltip.style.opacity = "0";
            cursor.classList.remove("hover");
        });

        tela.appendChild(card);
    });

    // =====================
    // CURSOR
    // =====================
    document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    });

    // =====================
    // RELÓGIO
    // =====================
    function atualizarRelogio() {
        const agora = new Date();

        const horas = String(agora.getHours()).padStart(2, "0");
        const minutos = String(agora.getMinutes()).padStart(2, "0");

        const diasSemana = ["Dom.", "Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sáb."];

        hora.textContent = `${horas}:${minutos}`;
        data.textContent = `${diasSemana[agora.getDay()]} ${agora.getDate()}/${agora.getMonth() + 1}`;
    }

    atualizarRelogio();
    setInterval(atualizarRelogio, 1000);

    // =====================
    // VOLUME
    // =====================
    volumeSlider.value = bgm.volume;

    volumeSlider.addEventListener("input", (e) => {
        const v = parseFloat(e.target.value);

        bgm.volume = v;
        clickSound.volume = v;
        hoverSound.volume = v;
    });

    // =====================
    // THEME TOGGLE
    // =====================
    themeToggle.addEventListener("click", () => {

        const isDark = document.body.classList.contains("dark");

        paw.classList.remove("active");
        flash.classList.remove("active");

        void paw.offsetWidth;
        void flash.offsetWidth;

        paw.classList.add("active");

        setTimeout(() => {

            // troca tema
            if (isDark) {
                document.body.classList.remove("dark");

                ligaSound.currentTime = 0;
                ligaSound.play().catch(() => { });
            } else {
                document.body.classList.add("dark");

                desligaSound.currentTime = 0;
                desligaSound.play().catch(() => { });
            }

            flash.classList.add("active");

        }, 300);

        setTimeout(() => {
            paw.classList.remove("active");
            flash.classList.remove("active");
        }, 900);
    });
});

window.addEventListener("focus", () => {
    document.querySelectorAll(".canal.abrindo")
        .forEach(el => el.classList.remove("abrindo"));

    transicao.classList.remove("ativo");
});
window.addEventListener("DOMContentLoaded", () => {
    const tela = document.getElementById("channels");
    const wiiscreen = document.getElementById("wiiscreen");
    const cursor = document.getElementById("cursor");
    const tooltip = document.getElementById("channel-tooltip");
    const transicao = document.getElementById("transicao");

    const clickSound = new Audio("audio/click.mp3");
    const hoverSound = new Audio("audio/hover.mp3");

    const canais = [
        {
            nome: "Animeflix",
            imagem: "imagens/animeflix.png",
            url: "https://gabrielandrade.dev.br/"
        },

        {
            nome: "Le Chef A la Dev",
            imagem: "imagens/restaurante.png",
            url: "https://andradegab.github.io/Le-Chef-a-La-Dev/"
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
        ...Array(8).fill({
            nome: "Em Breve!",
            imagem: "imagens/wii.jpg",
            url: "https://www.linkedin.com/in/gabriel-andrade-a26025319/"
        })
    ];

    canais.forEach(canal => {
        const card = document.createElement("div");
        card.classList.add("canal");

        const img = document.createElement("img");
        img.src = canal.imagem;
        img.alt = canal.nome;

        card.appendChild(img);

        card.addEventListener("click", () => {
            AudioManager.playClick();

            const overlay = document.getElementById("zoom-overlay");

            // pega posição real do card na tela
            const rect = card.getBoundingClientRect();

            // cria clone visual
            const clone = card.cloneNode(true);

            clone.style.position = "fixed";
            clone.style.left = rect.left + "px";
            clone.style.top = rect.top + "px";
            clone.style.width = rect.width + "px";
            clone.style.height = rect.height + "px";
            clone.style.margin = "0";
            clone.style.zIndex = "1000000";
            clone.style.transition = "all .6s ease";

            overlay.innerHTML = "";
            overlay.appendChild(clone);
            overlay.classList.add("active");

            // força reflow pra animação pegar
            requestAnimationFrame(() => {
                clone.style.left = "0px";
                clone.style.top = "0px";
                clone.style.width = "100vw";
                clone.style.height = "100vh";
                clone.style.borderRadius = "0";
                clone.style.transform = "scale(1.05)";
            });

            // flash branco no meio
            setTimeout(() => {
                transicao.classList.add("ativo");
            }, 400);

            // abre site no pico do efeito
            setTimeout(() => {
                window.open(canal.url, "_blank");

                overlay.classList.remove("active");
                overlay.innerHTML = "";
                transicao.classList.remove("ativo");
            }, 900);
        });

        card.addEventListener("mouseenter", () => {
            tooltip.textContent = canal.nome;

            const rect = card.getBoundingClientRect();
            const screenRect = wiiscreen.getBoundingClientRect();

            tooltip.style.left =
                rect.left - screenRect.left + rect.width / 2 + "px";

            tooltip.style.top =
                rect.bottom - screenRect.top + 10 + "px";

            tooltip.style.opacity = "1";

            AudioManager.playHover();
            cursor.classList.add("hover");
        });

        card.addEventListener("mouseleave", () => {
            tooltip.style.opacity = "0";
            cursor.classList.remove("hover");
        });

        tela.appendChild(card);
    });
});
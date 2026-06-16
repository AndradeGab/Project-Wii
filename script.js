const canais = [
    {
        nome: "Animeflix",
        imagem: "animeflix.png",
        url: "https://gabrielandrade.dev.br/"
    },
    {
        nome: "Projeto Globo",
        imagem: "globo.png",
        url: "https://andradegab.github.io/Projeto-Globo/"
    }
];

const tela = document.getElementById("wiiscreen");

canais.forEach(canal => {

    const card = document.createElement("div");
    card.classList.add("canal");

    const img = document.createElement("img");
    img.src = canal.imagem;
    img.alt = canal.nome;

    const titulo = document.createElement("p");
    titulo.textContent = canal.nome;

    card.appendChild(img);
    card.appendChild(titulo);

    const transicao = document.getElementById("transicao");

    card.addEventListener("click", () => {

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

    card.addEventListener("mouseenter", () => {
        cursor.classList.add("hover");
    });

    card.addEventListener("mouseleave", () => {
        cursor.classList.remove("hover");
    });


    tela.appendChild(card);

});



const cursor = document.getElementById("cursor");

document.addEventListener("mousemove", (e) => {

    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

});

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
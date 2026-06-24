document.addEventListener("DOMContentLoaded", () => {

const paw = document.getElementById("paw-hit");
const themeToggle = document.getElementById("theme-toggle");
const startScreen = document.getElementById("start-screen");
const wave = document.getElementById("color-wave");

const volumeSlider = document.getElementById("volume-slider");

// volume inicial (20%)
const initialVolume = 0.2;

// aplica em tudo assim que inicia
AudioManager.setVolume(initialVolume);
volumeSlider.value = initialVolume;

// quando o usuário mexe no slider
volumeSlider.addEventListener("input", (e) => {
    const value = parseFloat(e.target.value);
    AudioManager.setVolume(value);
});

const horaEl = document.getElementById("hora");
const dataEl = document.getElementById("data");

function atualizarRelogio() {
    const now = new Date();

    const horas = now.getHours().toString().padStart(2, "0");
    const minutos = now.getMinutes().toString().padStart(2, "0");

    horaEl.textContent = `${horas}:${minutos}`;

    const opcoes = {
        weekday: "long",
        day: "2-digit",
        month: "2-digit"
    };

    dataEl.textContent = now.toLocaleDateString("pt-BR", opcoes);
}

// atualiza imediatamente
atualizarRelogio();

// atualiza a cada segundo
setInterval(atualizarRelogio, 1000);

function createRipple(x, y) {
    wave.style.left = x + "px";
    wave.style.top = y + "px";

    wave.classList.remove("active");
    void wave.offsetWidth;
    wave.classList.add("active");
}

// 🐾 PATA
paw.addEventListener("click", () => {
    const rect = paw.getBoundingClientRect();

    createRipple(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2
    );

    // DEBUG (remove depois)
    document.body.classList.toggle("dark");
});

// 💡 LÂMPADA
themeToggle.addEventListener("click", (e) => {
    const isDark = document.body.classList.contains("dark");

    createRipple(e.clientX, e.clientY);

    if (isDark) {
        AudioManager.playDesliga();
    } else {
        AudioManager.playLiga();
    }

    document.body.classList.toggle("dark");

    paw.classList.remove("active");
    void paw.offsetWidth;
    paw.classList.add("active");
});

// START SCREEN
if (startScreen) {
    startScreen.addEventListener("click", iniciarApp);
}

function iniciarApp() {
    startScreen.classList.add("esconder");

    AudioManager.init();
    AudioManager.bgm.play().catch(() => {});

    resetIdleTimer();
}

});
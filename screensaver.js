// ================= SCREENSAVER MODULE =================

const cores = [
    "#ff4d4d", // vermelho
    "#4dff88", // verde
    "#4db8ff", // azul
    "#ffd24d", // amarelo
    "#ff4df2", // rosa
    "#9d4dff", // roxo
    "#ffffff", // branco
    "#63d7ff"  // azul Wii
];

const screensaver = document.getElementById("screensaver");
const dvdLogo = document.getElementById("dvd-logo");

let x = 200;
let y = 200;
let dx = 3;
let dy = 3;
let scale = 1;

let screensaverAtivo = false;
let animacaoDVD = null;
let idleTimer = null;

let lastHitTime = 0;
const HIT_COOLDOWN = 120;

let ultimoLado = "top";

let baseW = 0;
let baseH = 0;

window.addEventListener("load", () => {
    baseW = dvdLogo.offsetWidth;
    baseH = dvdLogo.offsetHeight;
});

function getBounds() {
    const rect = dvdLogo.getBoundingClientRect();

    return {
        w: rect.width,
        h: rect.height
    };
}


const MAX_SCALE = 8;
const MAX_SPEED = 10;

// ================= IDLE =================
function resetIdleTimer() {
    clearTimeout(idleTimer);

    if (screensaverAtivo) pararScreensaver();
    // 30 segundos
    idleTimer = setTimeout(iniciarScreensaver, 30000);
}

document.addEventListener("mousemove", resetIdleTimer);
document.addEventListener("click", resetIdleTimer);
document.addEventListener("keydown", resetIdleTimer);

// ================= START =================
function iniciarScreensaver() {
    screensaver.classList.add("active");
    screensaverAtivo = true;

    x = Math.random() * (window.innerWidth - 200);
    y = Math.random() * (window.innerHeight - 200);

    dx = 3;
    dy = 3;
    scale = 1;

    dvdLogo.style.left = x + "px";
    dvdLogo.style.top = y + "px";

    moverLogo();
}

function pararScreensaver() {
    screensaver.classList.remove("active");
    screensaverAtivo = false;

    cancelAnimationFrame(animacaoDVD);
}

// ================= MOVIMENTO =================
function moverLogo() {
    if (!screensaverAtivo) return;

    const now = performance.now();

    const { w, h } = getBounds();

    const maxX = window.innerWidth - w;
    const maxY = window.innerHeight - h;

    let hit = false;
    let side = null;

    x += dx;
    if (x <= 0) {
        x = 0;
        dx = Math.abs(dx);
        hit = true;
        side = "left";
    } else if (x >= maxX) {
        x = maxX;
        dx = -Math.abs(dx);
        hit = true;
        side = "right";
    }

    y += dy;
    if (y <= 0) {
        y = 0;
        dy = Math.abs(dy);
        hit = true;
        side = "top";
    } else if (y >= maxY) {
        y = maxY;
        dy = -Math.abs(dy);
        hit = true;
        side = "bottom";
    }

    if (hit && now - lastHitTime > HIT_COOLDOWN) {
        lastHitTime = now;
        ultimoLado = side;
        triggerHitEffect();
    }

    const bounds = getBounds();

    x = Math.max(0, Math.min(x, window.innerWidth - bounds.w));
    y = Math.max(0, Math.min(y, window.innerHeight - bounds.h));

    dvdLogo.style.left = x + "px";
    dvdLogo.style.top = y + "px";
    dvdLogo.style.transform = `scale(${scale})`;

    animacaoDVD = requestAnimationFrame(moverLogo);
}

// ================= EFEITO =================
function triggerHitEffect() {

    dvdLogo.classList.remove("hit");
    void dvdLogo.offsetWidth;
    dvdLogo.classList.add("hit");

    // cresce
    scale = Math.min(scale + 0.08, MAX_SCALE);

    // acelera
    dx *= 1.03;
    dy *= 1.03;

    // limita velocidade
    dx = Math.sign(dx) * Math.min(Math.abs(dx), MAX_SPEED);
    dy = Math.sign(dy) * Math.min(Math.abs(dy), MAX_SPEED);

    // cor aleatória
    const cor = cores[Math.floor(Math.random() * cores.length)];

    dvdLogo.style.color = cor;
    dvdLogo.style.textShadow = `
        0 0 25px ${cor},
        0 0 50px ${cor}
    `;
}

window.resetIdleTimer = resetIdleTimer;
window.iniciarScreensaver = iniciarScreensaver;
window.pararScreensaver = pararScreensaver;
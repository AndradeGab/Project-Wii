// ================= SCREENSAVER MODULE =================

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
    return {
        w: baseW * scale,
        h: baseH * scale
    };
}


const MAX_SCALE = 8;
const MAX_SPEED = 10;

// ================= IDLE =================
function resetIdleTimer() {
    clearTimeout(idleTimer);

    if (screensaverAtivo) pararScreensaver();

    idleTimer = setTimeout(iniciarScreensaver, 10000);
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

    scale = Math.min(scale + 0.03, MAX_SCALE);
    dx *= 1.03;
    dy *= 1.03;
}

window.resetIdleTimer = resetIdleTimer;
window.iniciarScreensaver = iniciarScreensaver;
window.pararScreensaver = pararScreensaver;
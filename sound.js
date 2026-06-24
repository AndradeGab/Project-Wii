// ================= AUDIO MANAGER =================

const AudioManager = {
    click: new Audio("audio/click.mp3"),
    hover: new Audio("audio/hover.mp3"),
    liga: new Audio("audio/liga.mp3"),
    desliga: new Audio("audio/desliga.mp3"),
    bgm: document.getElementById("bgm"),

    init() {
        this.bgm.loop = true;
    },

    setVolume(v) {
        this.click.volume = v;
        this.hover.volume = v;
        this.liga.volume = v;
        this.desliga.volume = v;
        this.bgm.volume = v;
    },

    playClick() {
        this.click.currentTime = 0;
        this.click.play().catch(() => { });
    },

    playHover() {
        this.hover.currentTime = 0;
        this.hover.play().catch(() => { });
    },

    playLiga() {
        this.liga.currentTime = 0;
        this.liga.play();
    },

    playDesliga() {
        this.desliga.currentTime = 0;
        this.desliga.play();
    }
};

AudioManager.init();
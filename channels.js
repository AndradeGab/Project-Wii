window.addEventListener("DOMContentLoaded", () => {

    const tela = document.getElementById("channels");
    const wiiscreen = document.getElementById("wiiscreen");
    const cursor = document.getElementById("cursor");
    const tooltip = document.getElementById("channel-tooltip");
    const transicao = document.getElementById("transicao");

    const bgm = document.getElementById("bgm");
    const miiBgm = document.getElementById("mii-bgm");
    const volumeSlider = document.getElementById("volume-slider");
    const clockSound = document.getElementById("clock-sound");
    const glassSound =
        document.getElementById("glass-sound");


    /*
    =========================================
    CANAIS
    =========================================
    */

    const canais = [

        {
            nome: "G-Channel",
            imagem: "imagens/gchannel.png",
            tipo: "gchannel"
        },

        {
            nome: "Animeflix",
            imagem: "imagens/animeflix.png",
            url: "https://gabrielandrade.dev.br/"
        },

        {
            nome: "Clube Atlético Vale do Cedro",
            imagem: "imagens/vale-do-cedro.png",
            url: "https://andradegab.github.io/Projeto-Clube-de-Futebol/"
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

        ...Array(6).fill({
            nome: "Em Breve!",
            imagem: "imagens/wii.jpg",
            url: "https://www.linkedin.com/in/gabriel-andrade-a26025319/"
        })

    ];


    /*
    =========================================
    CRIAÇÃO DOS CANAIS
    =========================================
    */

    canais.forEach(canal => {

        const card = document.createElement("div");
        card.classList.add("canal");

        const img = document.createElement("img");

        img.src = canal.imagem;
        img.alt = canal.nome;

        card.appendChild(img);


        /*
        =====================================
        CLIQUE NO CANAL
        =====================================
        */

        card.addEventListener("click", () => {

            AudioManager.playClick();


            /*
            =====================================
            G-CHANNEL
            =====================================
            */

            if (canal.tipo === "gchannel") {

                const gChannel =
                    document.getElementById("g-channel");

                const overlay =
                    document.getElementById("zoom-overlay");


                if (!gChannel || !overlay) {

                    console.error(
                        "G-Channel ou zoom-overlay não encontrado."
                    );

                    return;
                }


                /*
                ---------------------------------
                PARA MÚSICA DO WII
                ---------------------------------
                */

                if (bgm) {
                    bgm.pause();
                }


                /*
                ---------------------------------
                PREPARA MÚSICA DO G-CHANNEL
                ---------------------------------
                */

                if (miiBgm) {

                    miiBgm.pause();
                    miiBgm.currentTime = 0;

                }


                /*
                ---------------------------------
                CLONE DO CARD
                ---------------------------------
                */

                const rect =
                    card.getBoundingClientRect();

                const clone =
                    card.cloneNode(true);


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


                /*
                ---------------------------------
                ZOOM
                ---------------------------------
                */

                requestAnimationFrame(() => {

                    clone.style.left = "0px";
                    clone.style.top = "0px";
                    clone.style.width = "100vw";
                    clone.style.height = "100vh";

                    clone.style.borderRadius = "0";

                    clone.style.transform =
                        "scale(1.05)";

                });


                /*
                ---------------------------------
                FLASH
                ---------------------------------
                */

                setTimeout(() => {

                    if (transicao) {
                        transicao.classList.add("ativo");
                    }

                }, 400);


                /*
                ---------------------------------
                ABRE G-CHANNEL
                ---------------------------------
                */

                setTimeout(() => {

                    overlay.classList.remove("active");
                    overlay.innerHTML = "";

                    if (transicao) {
                        transicao.classList.remove("ativo");
                    }

                    gChannel.classList.add("active");


                    /*
                    -----------------------------
                    TOCA MÚSICA DO G-CHANNEL
                    -----------------------------
                    */

                    if (miiBgm) {

                        if (volumeSlider) {
                            miiBgm.volume =
                                parseFloat(volumeSlider.value);
                        }

                        miiBgm.currentTime = 0;

                        miiBgm.play().catch(() => { });

                    }

                }, 900);


                return;

            }


            /*
            =====================================
            OUTROS CANAIS
            =====================================
            */

            const overlay =
                document.getElementById("zoom-overlay");

            if (!overlay) {
                console.error("zoom-overlay não encontrado.");
                return;
            }


            const rect =
                card.getBoundingClientRect();

            const clone =
                card.cloneNode(true);


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


            requestAnimationFrame(() => {

                clone.style.left = "0px";
                clone.style.top = "0px";
                clone.style.width = "100vw";
                clone.style.height = "100vh";

                clone.style.borderRadius = "0";

                clone.style.transform =
                    "scale(1.05)";

            });


            setTimeout(() => {

                if (transicao) {
                    transicao.classList.add("ativo");
                }

            }, 400);


            setTimeout(() => {

                if (canal.url) {

                    window.open(
                        canal.url,
                        "_blank"
                    );

                }

                overlay.classList.remove("active");
                overlay.innerHTML = "";

                if (transicao) {
                    transicao.classList.remove("ativo");
                }

            }, 900);

        });


        /*
        =====================================
        MOUSE ENTER
        =====================================
        */

        card.addEventListener("mouseenter", () => {

            if (!tooltip || !wiiscreen) return;

            tooltip.textContent = canal.nome;

            const rect =
                card.getBoundingClientRect();

            const screenRect =
                wiiscreen.getBoundingClientRect();


            tooltip.style.left =
                rect.left -
                screenRect.left +
                rect.width / 2 +
                "px";


            tooltip.style.top =
                rect.bottom -
                screenRect.top +
                10 +
                "px";


            tooltip.style.opacity = "1";

            AudioManager.playHover();

            if (cursor) {
                cursor.classList.add("hover");
            }

        });


        /*
        =====================================
        MOUSE LEAVE
        =====================================
        */

        card.addEventListener("mouseleave", () => {

            if (tooltip) {
                tooltip.style.opacity = "0";
            }

            if (cursor) {
                cursor.classList.remove("hover");
            }

        });


        /*
        =====================================
        ADICIONA NA TELA
        =====================================
        */

        tela.appendChild(card);

    });


    /*
    =========================================
    BOTÃO VOLTAR DO G-CHANNEL
    =========================================
    */

    const gChannelBack =
        document.getElementById("g-channel-back");

    const gChannel =
        document.getElementById("g-channel");


    if (gChannelBack && gChannel) {

        gChannelBack.addEventListener("click", () => {

            AudioManager.playClick();


            /*
            ---------------------------------
            PARA MÚSICA DO G-CHANNEL
            ---------------------------------
            */

            if (miiBgm) {

                miiBgm.pause();
                miiBgm.currentTime = 0;

            }


            /*
            ---------------------------------
            VOLTA MÚSICA DO WII
            ---------------------------------
            */

            if (bgm) {

                if (volumeSlider) {
                    bgm.volume =
                        parseFloat(volumeSlider.value);
                }

                bgm.play().catch(() => { });

            }


            /*
            ---------------------------------
            FECHA G-CHANNEL
            ---------------------------------
            */

            gChannel.classList.remove("active");

        });

    }


    /*
    =========================================
    NAVEGAÇÃO DO G-CHANNEL
    =========================================
    */

    const gOptions =
        document.querySelectorAll(".g-option");

    const gPages =
        document.querySelectorAll(".g-page");

    const gBackButtons =
        document.querySelectorAll(".g-back-button");

    const gHome =
        document.getElementById("g-home");


    /*
    =========================================
    OPÇÕES DO G-CHANNEL
    =========================================
    */

    gOptions.forEach(option => {

        option.addEventListener("click", () => {

            AudioManager.playClick();

            const pageName =
                option.dataset.page;


            gPages.forEach(page => {

                page.classList.remove("active");

            });


            const targetPage =
                document.getElementById(
                    `g-${pageName}`
                );


            if (targetPage) {

                targetPage.classList.add("active");

            }

        });

    });


    /*
    =========================================
    BOTÕES VOLTAR
    =========================================
    */

    gBackButtons.forEach(button => {

        button.addEventListener("click", () => {

            AudioManager.playClick();


            gPages.forEach(page => {

                page.classList.remove("active");

            });


            if (gHome) {
                gHome.classList.add("active");
            }

        });

    });


    /*
    =========================================
    GITHUB — PROJETOS
    =========================================
    */

    const gGithub =
        document.getElementById("g-open-github");


    if (gGithub) {

        gGithub.addEventListener("click", () => {

            AudioManager.playClick();

            window.open(
                "https://github.com/AndradeGab",
                "_blank"
            );

        });

    }


    /*
    =========================================
    CONTATOS — G-CHANNEL
    =========================================
    */

    const contactGithub =
        document.getElementById("g-contact-github");

    const contactLinkedin =
        document.getElementById("g-contact-linkedin");

    const contactInstagram =
        document.getElementById("g-contact-instagram");

    const contactEmail =
        document.getElementById("g-contact-email");


    /*
    -----------------------------------------
    GITHUB
    -----------------------------------------
    */

    if (contactGithub) {

        contactGithub.addEventListener("click", () => {

            AudioManager.playClick();

            window.open(
                "https://github.com/AndradeGab",
                "_blank"
            );

        });

    }


    /*
    -----------------------------------------
    LINKEDIN
    -----------------------------------------
    */

    if (contactLinkedin) {

        contactLinkedin.addEventListener("click", () => {

            AudioManager.playClick();

            window.open(
                "https://www.linkedin.com/in/gabriel-andrade-a26025319/",
                "_blank"
            );

        });

    }


    /*
    -----------------------------------------
    INSTAGRAM
    -----------------------------------------
    */

    if (contactInstagram) {

        contactInstagram.addEventListener("click", () => {

            AudioManager.playClick();

            window.open(
                "https://www.instagram.com/andradegab7/",
                "_blank"
            );

        });

    }


    /*
    -----------------------------------------
    E-MAIL
    -----------------------------------------
    */

    if (contactEmail) {

        contactEmail.addEventListener("click", () => {

            AudioManager.playClick();

            window.location.href =
                "mailto:gabrielg.andrade77@gmail.com?subject=Contato%20pelo%20G-Channel";

        });

    }


    /*
    =========================================
    CONTROLE DE VOLUME
    =========================================
    */

    if (volumeSlider) {

        const atualizarVolume = () => {

            const volume =
                parseFloat(volumeSlider.value);

            if (bgm) {
                bgm.volume = volume;
            }

            if (miiBgm) {
                miiBgm.volume = volume;
            }

        };


        volumeSlider.addEventListener(
            "input",
            atualizarVolume
        );


        atualizarVolume();

    }


    /*
   =========================================
   WII NEWS
   =========================================
   */

    const wiiNews =
        document.getElementById("wii-news");

    const newsContent =
        document.getElementById("news-content");


    /*
    =========================================
    NOTÍCIAS NORMAIS
    =========================================
    */

    const noticiasNormais = [

        "🐱 GATO DOMÉSTICO CONFIRMA QUE NÃO TEM IDEIA DO QUE ESTÁ FAZENDO.",

        "🥤 PESQUISA REVELA: ÁGUA FICA MAIS GOSTOSA QUANDO BEBIDA EM GARRAFA DOS OUTROS.",

        "🐟 PEIXE É VISTO NADANDO E NÃO COMENTA NADA.",

        "🧦 CIENTISTAS CONFIRMAM: SEGUNDA-FEIRA EXISTE.",

        "🎮 WII PORTFOLIO SEGUE FUNCIONANDO NORMALMENTE, SEGUNDO FONTES NÃO OFICIAIS.",

        "🥔 CURIOSIDADE: BATATAS NÃO POSSUEM CONHECIMENTO SOBRE PROGRAMAÇÃO.",

        "🐧 ESTUDO REVELA QUE PINGUINS CONTINUAM SEM DEMONSTRAR INTERESSE EM JAVASCRIPT.",

        "🐈 GATOS CONSEGUEM IGNORAR VOCÊ MESMO QUANDO VOCÊ CHAMA PELO NOME.",

        "🥄 URGENTE: COLHER CONTINUA SENDO UMA COLHER.",

        "🪑 PESQUISA REVELA: CADEIRAS PERMANECEM IMÓVEIS POR LONGOS PERÍODOS.",

        "🦆 PATOS SEGUEM ANDANDO DE MANEIRA SUSPEITAMENTE ENGRAÇADA.",

        "🌎 A TERRA CONTINUA GIRANDO SEM PEDIR AUTORIZAÇÃO.",

        "💻 DESLIGAR E LIGAR NOVAMENTE CONTINUA SENDO UMA ESTRATÉGIA VÁLIDA.",

        "🧠 USUÁRIO ABRE UMA ABA E ESQUECE IMEDIATAMENTE POR QUE ABRIU.",

        "📱 CELULAR PERMANECE COM 3% DE BATERIA POR APROXIMADAMENTE 47 MINUTOS QUANDO NECESSÁRIO.",

        "🍞 INVESTIGAÇÃO CONCLUÍDA: PÃO CONTINUA SENDO PÃO.",

        "🐌 CARACOL NÃO DEMONSTROU INTERESSE EM COMPETIR.",

        "☕ CAFÉ CONTINUA DESAPARECENDO MISTERIOSAMENTE DURANTE O EXPEDIENTE.",

        "🎨 DESIGNER ALTERA UMA COISA NO SITE E ACABA ALTERANDO OUTRAS CINCO.",

        "💾 ARQUIVO FOI SALVO COM SUCESSO. USUÁRIO NÃO LEMBRA ONDE.",

        "🔌 COMPUTADOR FOI DESLIGADO E LIGADO NOVAMENTE. PROBLEMA CONSIDERADO RESOLVIDO.",

        "⌨️ TECLA CTRL FOI PRESSIONADA JUNTO COM UMA TECLA ALEATÓRIA. NINGUÉM SABE O RESULTADO.",

        "🌙 USUÁRIO AFIRMA QUE VAI DORMIR CEDO. FONTES NÃO CONFIRMAM.",

        "🎧 FONE DE OUVIDO CONTINUA EMBARAÇANDO SOZINHO MESMO QUANDO GUARDADO CORRETAMENTE.",

        "💡 IDEIA SURGE ÀS 3 DA MANHÃ. DESENVOLVEDOR DECIDE IMPLEMENTÁ-LA.",

        "📂 NOVA PASTA 'FINAL_FINAL_AGORA_VAI' É CRIADA.",

        "🐾 DESENVOLVEDOR AFIRMA: 'AGORA FUNCIONA'. SISTEMA PERMANECE EM SILÊNCIO.",

        "💻 MAIS UMA ANIMAÇÃO FOI ADICIONADA AO PORTFÓLIO. NINGUÉM SABE POR QUÊ."

    ];


    /*
    =========================================
    NOTÍCIAS DO PATAGATO
    =========================================
    */

    const noticiasPatagato = [

        "⚠️ COMPORTAMENTO INCOMUM DETECTADO NO WII LOGO.",

        "⚠️ ATENÇÃO: O WII LOGO FOI CLICADO NOVAMENTE.",

        "🚨 PLANTÃO Wii News • GATO NÃO AUTORIZADO DETECTADO NO SISTEMA.",

        "🚨 FALHA CRÍTICA • PATAGATO EMERGÊNCIA.",

        "🐾 PATAGATO FOI VISTO DENTRO DO SISTEMA.",

        "⚠️ SISTEMA INSTÁVEL • NÃO DESLIGUE O CONSOLE.",

        "🐱 GATO EM OPERAÇÃO • PROCEDIMENTOS NORMAIS SUSPENSOS.",

        "💥 IMPACTO DETECTADO • RESPONSÁVEL: PATAGATO.",

        "🚨 TODAS AS UNIDADES DEVEM IGNORAR O GATO.",

        "🐾 SITUAÇÃO SOB CONTROLE • GATO DISCORDA."

    ];

    /*
    =========================================
    FUNÇÃO — NOTÍCIA ALEATÓRIA
    =========================================
    */

    function escolherNoticia(lista) {

        return lista[
            Math.floor(
                Math.random() * lista.length
            )
        ];

    }


    /*
    =========================================
    FUNÇÃO — MOSTRAR NOTÍCIA
    =========================================
    */

    function mostrarNoticia(
        texto,
        tipo = "normal"
    ) {

        if (!newsContent || !wiiNews) {
            return;
        }


        /*
        -----------------------------------------
        REINICIA ANIMAÇÃO
        -----------------------------------------
        */

        newsContent.style.animation = "none";

        void newsContent.offsetWidth;


        /*
        -----------------------------------------
        ALTERA TEXTO
        -----------------------------------------
        */

        newsContent.textContent = texto;


        /*
        -----------------------------------------
        LIMPA ESTADOS
        -----------------------------------------
        */

        wiiNews.classList.remove(
            "alert",
            "patagato"
        );


        /*
        -----------------------------------------
        ALERTA
        -----------------------------------------
        */

        if (tipo === "alert") {

            wiiNews.classList.add(
                "alert"
            );

        }


        /*
        -----------------------------------------
        PATAGATO
        -----------------------------------------
        */

        if (tipo === "patagato") {

            wiiNews.classList.add(
                "patagato"
            );

        }


        /*
        -----------------------------------------
        INICIA ANIMAÇÃO
        -----------------------------------------
        */

        newsContent.style.animation =
            "newsScroll 15s linear infinite";

    }


    /*
    =========================================
    ESTADO DO WII NEWS
    =========================================
    */

    let newsInterval = null;

    let patagatoNewsInterval = null;


    /*
    =========================================
    PARA TODAS AS NOTÍCIAS
    =========================================
    */

    function pararTodasNoticias() {

        if (newsInterval !== null) {

            clearInterval(newsInterval);

            newsInterval = null;

        }


        if (patagatoNewsInterval !== null) {

            clearInterval(
                patagatoNewsInterval
            );

            patagatoNewsInterval = null;

        }

    }


    /*
    =========================================
    NOTÍCIAS NORMAIS
    =========================================
    */

    function iniciarNoticiasNormais() {

        /*
        -----------------------------------------
        PARA QUALQUER MODO ANTERIOR
        -----------------------------------------
        */

        pararTodasNoticias();


        /*
        -----------------------------------------
        MOSTRA PRIMEIRA NOTÍCIA
        -----------------------------------------
        */

        mostrarNoticia(
            escolherNoticia(
                noticiasNormais
            )
        );


        /*
        -----------------------------------------
        INICIA CICLO NORMAL
        -----------------------------------------
        */

        newsInterval = setInterval(() => {

            mostrarNoticia(
                escolherNoticia(
                    noticiasNormais
                )
            );

        }, 15000);

    }


    /*
    =========================================
    NOTÍCIAS DO PATAGATO
    =========================================
    */

    function iniciarNoticiasPatagato() {

        /*
        -----------------------------------------
        PARA TUDO ANTES
        -----------------------------------------
        */

        pararTodasNoticias();


        /*
        -----------------------------------------
        PRIMEIRA NOTÍCIA
        -----------------------------------------
        */

        mostrarNoticia(
            escolherNoticia(
                noticiasPatagato
            ),
            "patagato"
        );


        /*
        -----------------------------------------
        CICLO DO PATAGATO
        -----------------------------------------
        */

        patagatoNewsInterval = setInterval(() => {

            mostrarNoticia(
                escolherNoticia(
                    noticiasPatagato
                ),
                "patagato"
            );

        }, 6000);

    }


    /*
    =========================================
    NOTÍCIA ÚNICA — SISTEMA RESTAURADO
    =========================================
    */

    function mostrarSistemaRestaurado() {

        /*
        -----------------------------------------
        PARA ABSOLUTAMENTE TODOS OS CICLOS
        -----------------------------------------
        */

        pararTodasNoticias();


        /*
        -----------------------------------------
        MOSTRA UMA ÚNICA VEZ
        -----------------------------------------
        */

        mostrarNoticia(
            "✅ SISTEMA RESTAURADO • OPERAÇÕES NORMAIS RETOMADAS.",
            "normal"
        );


        /*
        -----------------------------------------
        APÓS 15 SEGUNDOS
        VOLTA AO NORMAL
        -----------------------------------------
        */

        setTimeout(() => {

            iniciarNoticiasNormais();

        }, 15000);

    }


    /*
    =========================================
    COMEÇA NORMALMENTE
    =========================================
    */

    iniciarNoticiasNormais();

    /*
/*
=========================================
EASTER EGG — PATAGATO SYSTEM ERROR
=========================================
*/

    const wiiLogo =
        document.getElementById("wii-logo");

    const pawHit =
        document.getElementById("paw-hit");

    const screenFlash =
        document.getElementById("screen-flash");

    const systemRestored =
        document.getElementById("system-restored");

    const catSound =
        document.getElementById("cat-sound");

    const glitchSound =
        document.getElementById("glitch-sound");

    const logoSound =
        document.getElementById("logo-sound");

    let wiiClicks = 0;
    let wiiClickTimer = null;

    let easterEggRunning = false;

    /*
    -----------------------------------------
    CANAL QUE SERÁ DERRUBADO
    -----------------------------------------
    */

    let canalCaido = null;


    if (wiiLogo) {

        wiiLogo.addEventListener("click", () => {

            /*
            -----------------------------------------
            NÃO PERMITE ATIVAR DURANTE O EASTER EGG
            -----------------------------------------
            */

            if (easterEggRunning) {
                return;
            }


            wiiClicks++;


            /*
            -----------------------------------------
            REINICIA CONTADOR
            -----------------------------------------
            */

            clearTimeout(wiiClickTimer);

            wiiClickTimer = setTimeout(() => {

                wiiClicks = 0;

            }, 1000);


            /*
            =========================================
            CLIQUES 1 E 2
            =========================================
            */

            if (wiiClicks < 3) {

                wiiLogo.classList.add("wii-click");

                setTimeout(() => {

                    wiiLogo.classList.remove("wii-click");

                }, 150);

                return;

            }


            /*
            =========================================
            3 CLIQUES!
            =========================================
            */

            wiiClicks = 0;

            clearTimeout(wiiClickTimer);

            easterEggRunning = true;


            /*
/*
-----------------------------------------
PARA TODAS AS NOTÍCIAS
-----------------------------------------
*/

            pararTodasNoticias();


            /*
            -----------------------------------------
            WII NEWS — PATAGATO
            -----------------------------------------
            */

            console.log(
                "🐾 PATAGATO SYSTEM ERROR"
            );


            /*
            =========================================
            SOM NORMAL DO CLIQUE
            =========================================
            */

            if (
                typeof AudioManager !== "undefined"
            ) {

                AudioManager.playClick();

            }


            /*
            =========================================
            FASE 1 — LOGO
            =========================================
            */

            wiiLogo.classList.add(
                "wii-easter"
            );


            /*
            =========================================
            FASE 2 — PATAGATO
            =========================================
            */

            setTimeout(() => {

                /*
            -----------------------------------------
            WII NEWS ENTRA EM MODO EMERGÊNCIA
            -----------------------------------------
                */

                iniciarNoticiasPatagato();

                /*


                /*
                -----------------------------------------
                PATAGATO APARECE PRIMEIRO
                -----------------------------------------
                */

                if (pawHit) {

                    pawHit.classList.remove("active");

                    void pawHit.offsetWidth;

                    pawHit.classList.add("active");

                }


                /*
                -----------------------------------------
                SOM DO GATO
                -----------------------------------------
                */

                if (catSound) {

                    catSound.currentTime = 0;

                    catSound.volume =
                        volumeSlider
                            ? parseFloat(volumeSlider.value)
                            : 1;

                    catSound.play().catch(() => { });

                }

            }, 350);


            /*
            =========================================
            FASE 3 — PATADA / IMPACTO
            =========================================
            */

            setTimeout(() => {

                /*
                -----------------------------------------
                IMPACTO
                -----------------------------------------
                */

                document.body.classList.add("hit");


                /*
 =========================================
 ESCOLHE UM CANAL ALEATÓRIO
 =========================================
 */

                setTimeout(() => {

                    const canaisNaTela =
                        Array.from(
                            document.querySelectorAll(".canal")
                        );


                    if (canaisNaTela.length > 0) {

                        /*
                        -----------------------------------------
                        ESCOLHE UM CANAL ALEATÓRIO
                        -----------------------------------------
                        */

                        canalCaido =
                            canaisNaTela[
                            Math.floor(
                                Math.random() *
                                canaisNaTela.length
                            )
                            ];


                        /*
                        -----------------------------------------
                        GARANTE QUE NÃO EXISTE ANIMAÇÃO ANTIGA
                        -----------------------------------------
                        */

                        canalCaido.classList.remove("caindo");

                        void canalCaido.offsetWidth;


                        /*
                        -----------------------------------------
                        COMEÇA A QUEDA
                        -----------------------------------------
                        */

                        canalCaido.classList.add("caindo");


                        /*
                        -----------------------------------------
                        SOM DE VIDRO QUEBRANDO
                        -----------------------------------------
                        */

                        if (glassSound) {

                            glassSound.currentTime = 0;

                            glassSound.volume =
                                volumeSlider
                                    ? parseFloat(
                                        volumeSlider.value
                                    )
                                    : 1;

                            glassSound.play().catch(() => { });

                        }

                    }


                    /*
                    -----------------------------------------
                    REMOVE IMPACTO
                    -----------------------------------------
                    */

                    document.body.classList.remove("hit");

                }, 300);


                /*
                =========================================
                FLASH
                =========================================
                */

                if (screenFlash) {

                    screenFlash.classList.remove("active");

                    void screenFlash.offsetWidth;

                    screenFlash.classList.add("active");

                }


                /*
                =========================================
                ONDA DE CHOQUE
                =========================================
                */

                const wave =
                    document.getElementById("color-wave");


                if (wave) {

                    const rect =
                        wiiLogo.getBoundingClientRect();


                    wave.style.left =
                        rect.left +
                        rect.width / 2 +
                        "px";


                    wave.style.top =
                        rect.top +
                        rect.height / 2 +
                        "px";


                    wave.classList.remove("active");

                    void wave.offsetWidth;

                    wave.classList.add("active");

                }


                /*
                =========================================
                COMEÇA O GLITCH
                =========================================
                */

                document.body.classList.add(
                    "patacrash"
                );


                /*
                -----------------------------------------
                SOM DO GLITCH
                -----------------------------------------
                */

                if (glitchSound) {

                    glitchSound.currentTime = 0;

                    glitchSound.volume =
                        volumeSlider
                            ? parseFloat(volumeSlider.value)
                            : 1;

                    glitchSound.play().catch(() => { });

                }


                /*
                -----------------------------------------
                SOM DO LOGO SPIN
                -----------------------------------------
                */

                if (logoSound) {

                    logoSound.currentTime = 0;

                    logoSound.volume =
                        volumeSlider
                            ? parseFloat(volumeSlider.value)
                            : 1;

                    logoSound.play().catch(() => { });

                }

            }, 950);

            /*
 =========================================
 FASE 4 — SISTEMA SE RECUPERA
 =========================================
 */

            setTimeout(() => {

                /*
                =========================================
                REMOVE GLITCH
                =========================================
                */

                document.body.classList.remove(
                    "patacrash"
                );


                /*
                -----------------------------------------
                REMOVE PATAGATO
                -----------------------------------------
                */

                if (pawHit) {

                    pawHit.classList.remove(
                        "active"
                    );

                }


                /*
                -----------------------------------------
                REMOVE EFEITO DO LOGO
                -----------------------------------------
                */

                wiiLogo.classList.remove(
                    "wii-easter"
                );


                /*
                -----------------------------------------
                RESTAURA O CANAL
                -----------------------------------------
                */

                if (canalCaido) {

                    canalCaido.classList.remove(
                        "caindo"
                    );

                    canalCaido.style.opacity = "";
                    canalCaido.style.transform = "";
                    canalCaido.style.pointerEvents = "";

                    canalCaido = null;

                }


                /*
                =========================================
                SYSTEM RESTORED
                =========================================
                */

                if (systemRestored) {

                    systemRestored.classList.add(
                        "active"
                    );


                    setTimeout(() => {

                        systemRestored.classList.remove(
                            "active"
                        );

                    }, 1200);

                }


                /*
                =========================================
                WII NEWS — SISTEMA RESTAURADO
                =========================================
                */

                mostrarSistemaRestaurado();


            }, 4300);

        });

    }

    /*
    =========================================
    BOTÃO DE E-MAIL DO WII
    =========================================
    */

    const emailButton =
        document.getElementById("email-button");


    if (emailButton) {

        emailButton.addEventListener("click", () => {

            AudioManager.playClick();

            window.location.href =
                "mailto:gabrielg.andrade77@gmail.com?subject=Contato%20pelo%20Wii%20Portfolio";

        });

    }

    const relogio = document.getElementById("hora");

    if (relogio) {

        relogio.addEventListener("click", () => {

            if (clockSound) {

                clockSound.currentTime = 0;

                if (volumeSlider) {
                    clockSound.volume =
                        parseFloat(volumeSlider.value);
                }

                clockSound.play().catch(() => { });

            }

        });

    }

});
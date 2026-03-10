// Lista de vídeos do YouTube (IDs extraídos das URLs)
const channels = [
    { id: 'WqxHlt1nwNQ', name: 'Como tocar teclado - Aula 01' },
    { id: 's-wTPKSdqp0', name: 'Como tocar teclado - Aula 02' },
    { id: 'oMxUo4BS56c', name: 'Como tocar teclado - Aula 03' },
    { id: 'y7STbF6YiQw', name: 'Como tocar teclado - Aula 04' },
    { id: '0aHyYEJ9ALU', name: 'Como tocar teclado - Aula 05' },
    { id: 'WATJUAMAcf4', name: 'Como tocar teclado - Aula 06' },
    { id: '4gW-WVdx0Ew', name: 'Como tocar teclado - Aula 07' },
    { id: 'J6WfVR-KG1g', name: 'Escala de Dó maior no Teclado' },
    { id: 'M9iQQk7Nn-o', name: 'Escala de Sol maior no Teclado' },
    { id: 'T9S3l3JrOJc', name: 'Escala de Fá maior no Teclado' },
    { id: 'R_0kuH0iqnk', name: 'Escala de Ré maior no Teclado' },
    { id: 'xCF2yPBgadA', name: 'Escala de Sib maior no Teclado' },
    { id: 'yUwbsjPjwAc', name: 'Escala de Lá maior no Teclado' },
    { id: 'obKIGeVM1lY', name: 'Escala de Mi bemol maior no Teclado4' },
    { id: '2w8vnVx7VVI', name: 'Escala de Mi maior no Teclado' },
    { id: '2ezPhlaRNCU', name: 'Escala de Lá bemol maior no Teclado' },
    { id: 'oYmOVs_Znsk', name: 'Escala de Si maior no Teclado' },
    { id: 'HTZzv0PuITQ', name: 'Escala de Dó# maior no Teclado' },
    { id: 'Jl0bNLddV6Q', name: 'Escala de Fá# maior no Teclado' },
    { id: 'HJsi3tcBbrQ', name: 'Primeira Música no teclado/piano' },
    { id: 'zW0JQmUcL6g', name: 'Campo Harmônico' },
    { id: 'qD3GoaSmi1k', name: 'Exercícios de Piano e Teclado Iniciante - Exercício 01' },
    { id: 'PGXYvmPvvXU', name: 'Exercícios de Piano e Teclado Iniciante - Exercício 02' },
    { id: 'c1qR5QnC6Xo', name: 'Como tocar piano e teclado em 7 passos' },
    { id: 'r4Sk5mHcbPU', name: '7 segredos incríveis que Todo tecladista Precisa Saber' },
    { id: '3WZ0rrt61Uc', name: 'Dedilhados incríveis' },
    { id: 'PNjbD1HWkVI', name: 'Como tocar lindos acordes no teclado' },
    { id: '7D8Fpw7001w', name: 'Segredo para Solar e Improvisar no Teclado' },
    { id: 'yTd3Xc0tpi4', name: '5 terminações incríveis que todo músico precisa saber + 1 Dica Surpresa' },
    { id: 'ghQCDYP1aQY', name: '5 Arpejos incríveis! Muito fácil! passo a passo' },
    { id: '2BPWjMQB3NU', name: '5 Arpejos Incríveis para usar em qualquer música' },
    { id: 'TfbxbvG5edI', name: '3 truques de mestre para tocar qualquer música no teclado' },
    { id: 'dLRFhyTWelM', name: 'Qual o melhor teclado para iniciantes' },
    { id: 'vwcG7M8SmL4', name: 'Esse Truque fácil me fez 100X melhor no Teclado' },
];

// Estado atual
let currentChannel = 0;
let currentVolume = 100;
let isMuted = false;
let isPlaying = true;

// Elementos DOM
const iframe = document.getElementById('youtubePlayer');
const channelNumberDisplay = document.getElementById('channelNumber');
const channelListContainer = document.getElementById('channelListContainer');

// Botões de controle
const channelUpBtn = document.getElementById('channelUp');
const channelDownBtn = document.getElementById('channelDown');
const volumeUpBtn = document.getElementById('volumeUp');
const volumeDownBtn = document.getElementById('volumeDown');
const playPauseBtn = document.getElementById('playPause');
const stopBtn = document.getElementById('stop');
const muteBtn = document.getElementById('mute');

// Variável para player do YouTube API
let player;

// Carregar API do YouTube
function loadYouTubeAPI() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// Callback quando a API do YouTube está pronta
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtubePlayer', {
        videoId: channels[currentChannel].id,
        playerVars: {
            'playsinline': 1,
            'enablejsapi': 1,
            'controls': 1,
            'modestbranding': 1,
            'rel': 0
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// Quando o player está pronto
function onPlayerReady(event) {
    updateChannelDisplay();
    createChannelList();
    player.setVolume(currentVolume);
}

// Quando o estado do player muda
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        isPlaying = true;
    } else if (event.data === YT.PlayerState.PAUSED) {
        isPlaying = false;
    }
}

// Atualizar display do canal
function updateChannelDisplay() {
    const channelNum = (currentChannel + 1).toString().padStart(2, '0');
    channelNumberDisplay.textContent = channelNum;
    
    // Atualizar lista de canais
    updateChannelListActive();
}

// Criar lista de canais
function createChannelList() {
    channelListContainer.innerHTML = '';
    
    channels.forEach((channel, index) => {
        const channelItem = document.createElement('div');
        channelItem.className = 'channel-item';
        if (index === currentChannel) {
            channelItem.classList.add('active');
        }
        
        const channelNum = document.createElement('span');
        channelNum.className = 'channel-num';
        channelNum.textContent = `Aula ${(index + 1).toString().padStart(2, '0')}`;
        
        const channelName = document.createElement('span');
        channelName.textContent = channel.name;
        
        channelItem.appendChild(channelNum);
        channelItem.appendChild(channelName);
        
        channelItem.addEventListener('click', () => {
            changeChannel(index);
        });
        
        channelListContainer.appendChild(channelItem);
    });
}

// Atualizar item ativo na lista de canais
function updateChannelListActive() {
    const items = document.querySelectorAll('.channel-item');
    items.forEach((item, index) => {
        if (index === currentChannel) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Mudar canal
function changeChannel(newChannel) {
    if (newChannel >= 0 && newChannel < channels.length) {
        currentChannel = newChannel;
        if (player && player.loadVideoById) {
            player.loadVideoById(channels[currentChannel].id);
        }
        updateChannelDisplay();
        
        // Efeito visual de mudança de canal
        addChannelChangeEffect();
    }
}

// Efeito visual de mudança de canal
function addChannelChangeEffect() {
    const screenGlass = document.querySelector('.screen-glass');
    screenGlass.style.opacity = '0.3';
    setTimeout(() => {
        screenGlass.style.opacity = '1';
    }, 200);
}

// Canal anterior
function channelUp() {
    const newChannel = currentChannel - 1;
    if (newChannel < 0) {
        changeChannel(channels.length - 1);
    } else {
        changeChannel(newChannel);
    }
}

// Próximo canal
function channelDown() {
    const newChannel = currentChannel + 1;
    if (newChannel >= channels.length) {
        changeChannel(0);
    } else {
        changeChannel(newChannel);
    }
}

// Aumentar volume
function volumeUp() {
    if (currentVolume < 100) {
        currentVolume = Math.min(100, currentVolume + 10);
        if (player && player.setVolume) {
            player.setVolume(currentVolume);
            if (isMuted) {
                player.unMute();
                isMuted = false;
                updateMuteButton();
            }
        }
        showVolumeNotification(currentVolume);
    }
}

// Diminuir volume
function volumeDown() {
    if (currentVolume > 0) {
        currentVolume = Math.max(0, currentVolume - 10);
        if (player && player.setVolume) {
            player.setVolume(currentVolume);
        }
        showVolumeNotification(currentVolume);
    }
}

// Toggle Play/Pause
function togglePlayPause() {
    if (player && player.getPlayerState) {
        const state = player.getPlayerState();
        if (state === YT.PlayerState.PLAYING) {
            player.pauseVideo();
            isPlaying = false;
        } else {
            player.playVideo();
            isPlaying = true;
        }
    }
}

// Parar vídeo
function stopVideo() {
    if (player && player.stopVideo) {
        player.stopVideo();
        isPlaying = false;
    }
}

// Toggle Mute
function toggleMute() {
    if (player) {
        if (isMuted) {
            player.unMute();
            isMuted = false;
        } else {
            player.mute();
            isMuted = true;
        }
        updateMuteButton();
    }
}

// Atualizar botão de mute
function updateMuteButton() {
    if (isMuted) {
        muteBtn.innerHTML = '🔇';
    } else {
        muteBtn.innerHTML = '🔊';
    }
}

// Mostrar notificação de volume
function showVolumeNotification(volume) {
    // Remove notificação existente
    const existingNotification = document.querySelector('.volume-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Criar nova notificação
    const notification = document.createElement('div');
    notification.className = 'volume-notification';
    notification.textContent = `Volume: ${volume}%`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.8);
        color: #00ff00;
        padding: 15px 25px;
        border-radius: 10px;
        font-size: 12px;
        z-index: 1000;
        animation: fadeInOut 2s ease-in-out;
        border: 2px solid #00ff00;
        box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Event Listeners
channelUpBtn.addEventListener('click', channelUp);
channelDownBtn.addEventListener('click', channelDown);
volumeUpBtn.addEventListener('click', volumeUp);
volumeDownBtn.addEventListener('click', volumeDown);
playPauseBtn.addEventListener('click', togglePlayPause);
stopBtn.addEventListener('click', stopVideo);
muteBtn.addEventListener('click', toggleMute);

// Atalhos de teclado
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowUp':
            e.preventDefault();
            channelUp();
            break;
        case 'ArrowDown':
            e.preventDefault();
            channelDown();
            break;
        case 'ArrowRight':
            e.preventDefault();
            volumeUp();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            volumeDown();
            break;
        case ' ':
            e.preventDefault();
            togglePlayPause();
            break;
        case 'm':
        case 'M':
            e.preventDefault();
            toggleMute();
            break;
        case 's':
        case 'S':
            e.preventDefault();
            stopVideo();
            break;
    }
});

// Adicionar CSS para animação de notificação
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% {
            opacity: 0;
            transform: translateY(-20px);
        }
        20% {
            opacity: 1;
            transform: translateY(0);
        }
        80% {
            opacity: 1;
            transform: translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
`;
document.head.appendChild(style);

// Inicializar quando a página carregar
window.addEventListener('load', () => {
    loadYouTubeAPI();
});

// Tornar a função disponível globalmente para a API do YouTube
window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

document.addEventListener('DOMContentLoaded', () => {
    if (window.MediaSource && window.File && window.FileReader) {
        const inputFile = document.getElementById('inputFile');
        const loading = document.getElementById('loading');
        const videoContainer = document.getElementById('videoContainer');
        const videoPlayer = document.getElementById('videoPlayer');
        const controls = document.getElementById('controls');
        const play = document.getElementById('play');
        const pause = document.getElementById('pause');
        const volumeUp = document.getElementById('volumeUp');
        const volumeDown = document.getElementById('volumeDown');
        const volumeMute = document.getElementById('volumeMute');
        const volumeNoMute = document.getElementById('volumeNoMute')

        inputFile.addEventListener('change', () => {
            // Si el fichero input es un video, se muestra
            const file = inputFile.files[0];
            if (file.type.startsWith('video/')) {
                // Se muestra el mensaje "cargando"
                loading.classList.remove('hidden');
                // Se espera 3 segundos, y se muestra el reproductor y los botones
                setTimeout(() => {
                    const url = URL.createObjectURL(file);
                    videoPlayer.src = url;
                    videoContainer.classList.remove('hidden');
                    controls.classList.remove('hidden');
                    play.classList.remove('hidden');
                    volumeUp.classList.remove('hidden');
                    volumeDown.classList.remove('hidden');
                    volumeMute.classList.remove('hidden');
                    loading.classList.add('hidden');
                }, 3000);
            } else {
                // Si el fichero input no es de tipo video
                alert('El archivo seleccionado no tiene un formato válido.');
            }
        }); 
    } else {
        alert('Lo sentimos, pero su navegador no es compatible. Pruebe con otro navegador.');
    }

    // Al accionar el botón play, el video se reproduce
    play.addEventListener('click', () => {
        videoPlayer.play();
    });

    // Al accionar el botón pausa, el video se para
    pause.addEventListener('click', () => {
        videoPlayer.pause();
    });

    // Al accionar el botón subir volumen, aumenta 0'1
    volumeUp.addEventListener('click', () => {
        videoPlayer.volume = Math.min(videoPlayer.volume + 0.1, 1);
        if (videoPlayer.volume > 0) {
            videoPlayer.muted = false;
        }
    });

    // Al accionar el botón bajar volumen, disminuye 0'1
    volumeDown.addEventListener('click', () => {
        videoPlayer.volume = Math.max(videoPlayer.volume - 0.1, 0);
        if (videoPlayer.volume > 0) {
            videoPlayer.muted = false;
        }
    });

    // Al accionar el botón quitar sonido, el reproductor se mutea
    volumeMute.addEventListener('click', () => {
        videoPlayer.muted = !videoPlayer.muted;
        volumeNoMute.classList.remove('hidden');
        volumeMute.classList.add('hidden');
    });

    // Al accionar el botón poner sonido, el reproductor se desmutea
    volumeNoMute.addEventListener('click', () => {
        videoPlayer.muted = !videoPlayer.muted;
        volumeMute.classList.remove('hidden');
        volumeNoMute.classList.add('hidden');
    });

    // Si se acciona el play desde el reproductor, el botón se muestra como pausa
    videoPlayer.addEventListener('play', () => {
        play.classList.add('hidden');
        pause.classList.remove('hidden');
    });

    // Si se acciona el pause desde el reproductor, el botón se muestra como play
    videoPlayer.addEventListener('pause', () => {
        pause.classList.add('hidden');
        play.classList.remove('hidden');
    });

});
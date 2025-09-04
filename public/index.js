
    particlesJS("particles-js", {
        "particles": {
        "number": {
        "value": 80,
    "density": {"enable": true, "value_area": 800 }
            },
    "color": {"value": "#ffffff" },
    "shape": {
        "type": "circle",
    "stroke": {"width": 0, "color": "#000000" },
    "polygon": {"nb_sides": 5 }
            },
    "opacity": {
        "value": 0.5,
    "random": false
            },
    "size": {
        "value": 3,
    "random": true
            },
    "move": {
        "enable": true,
    "speed": 2,
    "direction": "none",
    "random": false,
    "straight": false,
    "out_mode": "out"
            }
          },
    "interactivity": {
        "events": {
        "onhover": {"enable": true, "mode": "repulse" },
    "onclick": {"enable": true, "mode": "push" }
            },
    "modes": {
        "repulse": {"distance": 100 },
    "push": {"particles_nb": 4 }
            }
          },
    "retina_detect": true
        });
    const audioPlayer = document.getElementById('audio-player');
    const cardPlayBtns = document.querySelectorAll('.play-btn');
    const mainPlayBtn = document.getElementById('main-play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const songInfo = document.getElementById('song-info');
    const currentTimeSpan = document.getElementById('current-time');
    const durationSpan = document.getElementById('duration');
    const seekbar = document.getElementById('seekbar');

    const playlist = [
  { title: 'KAM DHAM 25', src: 'songs/kam dham 25.mp3' },
  { title: 'BOM DIGGI DIGGI', src: 'songs/bom diggi.mp3' },
  { title: 'MILLIONAIRE', src: 'songs/millionaire.mp3' },
  { title: 'SULTAN', src: 'songs/sultan.mp3' },
  { title: 'MAKNA', src: 'songs/makna.mp3' },
  { title: 'LAAL PARI', src: 'songs/laal pari.mp3' },
  { title: 'TOOFAN', src: 'songs/toffan.mp3' },
  { title: 'KALA CHASHMA', src: 'songs/kala chashma.mp3' },
  { title: 'COMPANY', src: 'songs/company.mp3' },
  { title: 'RX 100', src: 'songs/rx100.mp3' },
  { title: 'SHAKY SHAKY', src: 'songs/shaky shaky.mp3' },
  { title: 'PUSHPA PUSHPA', src: 'songs/pushpa pushpa.mp3' },
  { title: 'TAUBA TAUBA', src: 'songs/tauba tauba.mp3' },
  { title: 'ONE BOTTLE DOWN', src: 'songs/One Bottle Down.mp3' },
  { title: 'AAJ KE RAAT', src: 'songs/Aaj Ki Raat -Full Song Stree 2Tamannaah BhatiaRajkummar RaoSachin-JigarMadhubantiDivyaAmitabh.mp3' },
  { title: 'AAYI NAHI', src: 'songs/Aayi Nai  Stree 2  Shraddha Kapoor  Rajkummar Rao  Sachin-Jigar  Pawan  Simran  DivyaAmitabh.mp3' },
  { title: 'MANIAC', src: 'songs/MANIAC (Official Video)_ YO YO HONEY SINGH  ESHA GUPTA  GLORY  BHUSHAN KUMAR.mp3' },
  { title: 'RRR', src: 'songs/Naacho Naacho.mp3' },
  { title: 'NASHA', src: 'songs/RAID 2_ NASHA (Song)  Tamannaah B, Ajay Devgn, Riteish D  Jasmine S, Sachet T, Jaani  Bhushan K.mp3' },
  { title: 'fire', src: 'songs/Fire Song (Hindi) - Lyrical  Kanguva  Suriya  B Praak  Devi Sri Prasad  Siva  Raqueeb Alam.mp3' },
  { title: 'deva deva', src: 'songs/Deva Deva - Extended Film VersionBrahmāstraAmitabh BRanbir @aliabhatt@pritam7415 ArijitJonita.mp3' },
  { title: 'deva', src: 'songs/Bhasad Macha - Deva Shahid Kapoor & Pooja Hegde Vishal Mishra,Mika Singh,Jyotica,Raj Shekhar,Bosco.mp3' },

];


    let currentSongIndex = 0;

    function loadSong(index) {
          const song = playlist[index];
    if (song) {
        audioPlayer.src = song.src;
    audioPlayer.load();
    songInfo.textContent = song.title;
          }
        }

    function updatePlayIcon(button, state) {
          const icon = button.querySelector('img');
    icon.src = state === 'pause' ? "images/pause.svg" : "images/button.svg";
        }

    function updateAllPlayIcons() {
        cardPlayBtns.forEach(btn => updatePlayIcon(btn, 'play'));
    updatePlayIcon(mainPlayBtn, audioPlayer.paused ? 'play' : 'pause');
        }

    function playPauseSong() {
          if (audioPlayer.paused) {
        audioPlayer.play();
          } else {
        audioPlayer.pause();
          }
    updateAllPlayIcons();
        }

    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    updateAllPlayIcons();
        }

    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    updateAllPlayIcons();
        }

        // Event listeners for card buttons
        cardPlayBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const index = parseInt(this.dataset.index);

            if (index === currentSongIndex && !audioPlayer.paused) {
                audioPlayer.pause();
            } else {
                currentSongIndex = index;
                loadSong(currentSongIndex);
                audioPlayer.play();
            }
            updateAllPlayIcons();
            updatePlayIcon(this, audioPlayer.paused ? 'play' : 'pause');
        });
        });

    // Main playbar button
    mainPlayBtn.addEventListener('click', playPauseSong);
    nextBtn.addEventListener('click', nextSong);
    prevBtn.addEventListener('click', prevSong);

        // Update seekbar while playing
        audioPlayer.addEventListener('timeupdate', () => {
          const currentTime = formatTime(audioPlayer.currentTime);
    const duration = formatTime(audioPlayer.duration || 0);
    currentTimeSpan.textContent = currentTime;
    durationSpan.textContent = duration;

    const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    seekbar.max = Math.floor(audioPlayer.duration || 0);
    seekbar.value = Math.floor(audioPlayer.currentTime);
    seekbar.style.background = `linear-gradient(to right, #1db954 ${percent}%, #191414 ${percent}%)`;
        });


        // Seeking functionality
        seekbar.addEventListener('input', () => {
        audioPlayer.currentTime = seekbar.value;
        });

    // On song end
    audioPlayer.addEventListener('ended', nextSong);

    function formatTime(seconds) {
          const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        }
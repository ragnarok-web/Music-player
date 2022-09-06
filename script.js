const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// music
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Redbone',
        artist: 'Childish Gambino',
    },
    {
        name: 'jacinto-2',
        displayName: 'Sam Smith',
        artist: 'Omen',
    },
    {
        name: 'jacinto-3',
        displayName: 'out of Time',
        artist: 'The weekend',
    },
    {
        name: 'jacinto-4',
        displayName: 'Dancing in the moonlight',
        artist: 'toploader',
    },
];

// check if playing
let isplaying = false;

// Play
function PlaySong() {
    isplaying=true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','Pause');
    music.play();

}

// pause
function pauseSong() {
    isplaying=false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','Play');
    music.pause();
}

// Play or pause listener
playBtn.addEventListener('click', () => (isplaying ? pauseSong() : PlaySong()));

//  update DOM
function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Current song
let songIndex = 0;

// previous song 
function prevSong(){
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    PlaySong();
}

// Next song 
function nextSong(){
    songIndex++;
    if (songIndex > songs.length - 1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    PlaySong();
}

// On load - Select first song
loadSong(songs[songIndex]);

// Update progress bar and time
function updateProgressBar(e) {
    if (isplaying) {
        const {duration, currentTime} = e.srcElement;
        // update progress bar width
        const progressPercent = (currentTime/ duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds=`0${durationSeconds}`;
        }
         // Delay switching the duration element to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // Calculate display for current
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds=`0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// set progress bar
function setProgressBar(e){
    const width=this.clientWidth; /* this refers to the element that received the event*/
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX / width) * duration;
}


// event listeners
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('ended',nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);




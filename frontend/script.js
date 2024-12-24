let currentSongIndex = 0;
let songs = [];

const API_URL = process.env.API_URL || 'http://localhost:5001';

// Fetch songs from the backend
async function fetchSongs() {
    try {
        const response = await fetch(`${API_URL}/api/songs`);
        songs = await response.json();
        if (songs.length > 0) {
            loadSong(currentSongIndex);
        }
    } catch (error) {
        console.error('Error fetching songs:', error);
    }
}

// Load a song by index
function loadSong(index) {
    const song = songs[index];
    const audio = document.getElementById('audio');
    const title = document.getElementById('track-title');
    const artist = document.getElementById('track-artist');
    const image = document.getElementById('track-image');
    const video = document.getElementById('video-background');

    title.textContent = song.title;
    artist.textContent = song.artist;
    image.src = `${API_URL}/${song.image}`;
    audio.src = `${API_URL}/${song.audio}`;

    if (song.video) {
        video.src = `${API_URL}/${song.video}`;
        video.style.display = 'block';
        video.muted = true;
        video.play();
    } else {
        video.style.display = 'none';
    }

    // Synchronize video with audio
    audio.addEventListener('play', () => {
        console.log("Audio playing, playing video...");
        video.play(); // Play the video when audio plays
    });

    audio.addEventListener('pause', () => {
        console.log("Audio paused, pausing video...");
        video.pause(); // Pause the video when audio pauses
    });

    audio.addEventListener('ended', () => {
        console.log("Audio ended, pausing video...");
        video.pause(); // Pause video when audio ends
    });
}

// Play current song
function playSong() {
    const audio = document.getElementById('audio');
    const playBtn = document.getElementById('play-btn');
    const pauseBtn = document.getElementById('pause-btn');

    console.log("Playing song...");
    audio.play(); // Play the audio
    playBtn.style.display = 'none'; // Hide play button
    pauseBtn.style.display = 'block'; // Show pause button
}

// Pause current song
function pauseSong() {
    const audio = document.getElementById('audio');
    const playBtn = document.getElementById('play-btn');
    const pauseBtn = document.getElementById('pause-btn');

    console.log("Pausing song...");
    audio.pause(); // Pause the audio
    playBtn.style.display = 'block'; // Show play button
    pauseBtn.style.display = 'none'; // Hide pause button
}

// Play next song
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    playSong();
}

// Play previous song
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    playSong();
}

// Event Listeners for Controls
document.getElementById('play-btn').addEventListener('click', playSong);
document.getElementById('pause-btn').addEventListener('click', pauseSong);
document.getElementById('next-btn').addEventListener('click', nextSong);
document.getElementById('prev-btn').addEventListener('click', prevSong);

// Initialize songs and load the first one
fetchSongs();

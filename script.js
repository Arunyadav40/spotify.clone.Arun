console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Jadugar(Paradox)", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Sawara", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "King shit", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Apa Phir Milenge", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "lalkara", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "NO Reason", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Check-It-Out", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Sab Fade Jange", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "No Love", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Hass Hass", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
    {songName: "Dua", filePath: "songs/11.mp3", coverPath: "covers/11.jpg"},
    {songName: "Patiala Peg", filePath: "songs/12.mp3", coverPath: "covers/12.jpg"},
    {songName: "3-Peg", filePath: "songs/13.mp3", coverPath: "covers/13.jpg"},
    {songName: "Naina", filePath: "songs/14.mp3", coverPath: "covers/14.jpg"},
    {songName: "Admire", filePath: "songs/15.mp3", coverPath: "covers/15.jpg"},
    {songName: "Kinni kinni", filePath: "songs/16.mp3", coverPath: "covers/16.jpg"},
    {songName: "100 million", filePath: "songs/17.mp3", coverPath: "covers/17.jpg"},
    {songName: "Psychotic", filePath: "songs/18.mp3", coverPath: "covers/18.jpg"},
    {songName: "Love ya ", filePath: "songs/19.mp3", coverPath: "covers/19.jpg"},
    {songName: "Born to shine", filePath: "songs/20.mp3", coverPath: "covers/20.jpg"},
];

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
});

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100); 
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex >= songs.length - 1){
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex <= 0){
        songIndex = songs.length - 1;
    } else {
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

// Play the next song automatically when the current one ends
audioElement.addEventListener('ended', ()=>{
    if(songIndex >= 1){
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});
23
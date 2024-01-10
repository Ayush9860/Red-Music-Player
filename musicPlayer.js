// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "On & On-Cartoon, Daniel Levi", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Invincible-DEAF KEV", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Mortals-Warriyo, Laura Brehm", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Shine-Spektrem", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Why We Lose-Cartoon, Coleman Trapp", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Sky High-Elektronomia", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Symbolism-Electro-Light", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Heroes Tonight-Janji, Johnning", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "My Heart-Different Heaven, EH!DE", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Feel Good-Syn Cole", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

const shuffleButton = document.getElementById('shuffle');
shuffleButton.addEventListener('click', shuffleAndPlay);

function shuffleAndPlay() {
    let shuffledOrder = Array.from({ length: songs.length }, (_, i) => i);
    for (let i = shuffledOrder.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledOrder[i], shuffledOrder[j]] = [shuffledOrder[j], shuffledOrder[i]];
    }

    // Clear existing content
    const songItemContainer = document.getElementById('songItemContainer');
    songItemContainer.innerHTML = '';

    // Create and append new song items in shuffled order
    shuffledOrder.forEach(index => {
        const songItem = document.createElement('div');
        songItem.className = 'songItem';
        songItem.innerHTML = `
            <img alt="img" src="${songs[index].coverPath}">
            <span class="songName">${songs[index].songName}</span>
            <span class="songlistplay">
                <span class="timestamp">02:30
                    <i id="${index}" class="far songItemPlay fa-play-circle"></i>
                </span>
            </span>
        `;
        songItemContainer.appendChild(songItem);
    });

    // Update event listeners for new song items
    updateEventListeners();

    // Start playing the first shuffled song
    songIndex = 0;
    audioElement.src = songs[shuffledOrder[songIndex]].filePath;
    masterSongName.innerText = songs[shuffledOrder[songIndex]].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
}

// Function to update event listeners for song items
function updateEventListeners() {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.addEventListener('click', (e) => {
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
}

// Add the shuffle button functionality to play all songs in random order
document.getElementById('shuffle').addEventListener('click', shuffleAndPlay);


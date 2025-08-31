document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("pressBtn");
  const video1 = document.getElementById("videoDisplay");
  const video2 = document.getElementById("videoDisplay2");
  const audioPlayer = document.getElementById("audioPlayer");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  const songTitle = document.getElementById("songTitle");
  const progressBar = document.getElementById("progressBar");
  const timeDisplay = document.getElementById("timeDisplay");
  const volumeSlider = document.getElementById("volumeSlider");

  let pressCount = 0;

  const collageSets = [
    ["jungwon.jpg", "tais.jpg", "sakina.jpg"],
    ["heeseung.jpg", "lolotte.jpg", "elena.jpg"],
    ["jay.jpg", "hayla.jpg"],
    ["jake.jpg", "sam.jpg"],
    ["sunghoon.jpg", "vivienne.jpg","charos.jpg","hanan.jpg"],
    ["sunoo.jpg", "anais.jpg", "zoe.jpg"],
    ["niki.jpg", "liz.jpg"]
  ];

  button.addEventListener("click", () => {
    document.querySelectorAll(".collage-img").forEach(img => img.remove());

    if (pressCount < collageSets.length) {
      collageSets[pressCount].forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        img.classList.add("collage-img");
        img.style.position = "absolute";
		
        img.style.top = `${Math.random() * (window.innerHeight - 200)}px`;
        img.style.left = `${Math.random() * (window.innerWidth - 200)}px`;
		
        let imgWidth = window.innerWidth <= 600 ? 120 : 180;
		img.style.width = imgWidth + "px";
		img.style.height = "auto";

        img.style.zIndex = "1";
        document.body.appendChild(img);
      });

      const btnX = Math.random() * (window.innerWidth - button.offsetWidth - 20);
      const btnY = Math.random() * (window.innerHeight - button.offsetHeight - 120);
      button.style.left = `${btnX}px`;
      button.style.top = `${btnY}px`;

      pressCount++;
    } else {
      button.style.display = "none";
      document.querySelectorAll(".collage-img").forEach(img => img.remove());
      video1.style.display = "block";
      video1.play();
    }
  });

  video1.addEventListener("ended", () => {
    video1.style.display = "none";
    video2.style.display = "block";
    video2.play();
  });

  video2.addEventListener("ended", () => {
    video2.style.display = "none";
    const message = document.createElement("div");
    message.textContent = "May you, the beauty of this world, always shine. Happy birthday Melina.";
    message.style.position = "absolute";
    message.style.top = "50%";
    message.style.left = "50%";
    message.style.transform = "translate(-50%, -50%)";
    message.style.fontSize = "36px";
    message.style.color = "#ff4d4d";
    message.style.textAlign = "center";
    message.style.textShadow = "0 0 10px rgba(255,0,0,0.8)";
    document.body.appendChild(message);
  });

  const songs = [
    { src: "fate.mp3", title: "Fate" },
    { src: "fever.mp3", title: "Fever" },
    { src: "fataltrouble.mp3", title: "Fatal Trouble" }
  ];
  let currentSongIndex = 0;

  function loadSong(index) {
    audioPlayer.src = songs[index].src;
    songTitle.textContent = songs[index].title;
    audioPlayer.load();
  }

  function playSong() {
    audioPlayer.play();
    playPauseBtn.textContent = "⏸";
  }

  function pauseSong() {
    audioPlayer.pause();
    playPauseBtn.textContent = "▶️";
  }

  playPauseBtn.addEventListener("click", () => {
    if (audioPlayer.paused) playSong();
    else pauseSong();
  });

  nextBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    playSong();
  });

  prevBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    playSong();
  });

  audioPlayer.addEventListener("timeupdate", () => {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.value = progress || 0;
    const formatTime = time => `${Math.floor(time/60)}:${Math.floor(time%60).toString().padStart(2,'0')}`;
    timeDisplay.textContent = `${formatTime(audioPlayer.currentTime)} / ${formatTime(audioPlayer.duration||0)}`;
  });

  progressBar.addEventListener("input", () => {
    audioPlayer.currentTime = (progressBar.value/100) * audioPlayer.duration;
  });

  audioPlayer.volume = 0.5;
  volumeSlider.addEventListener("input", () => {
    audioPlayer.volume = volumeSlider.value;
  });

  loadSong(currentSongIndex);
});

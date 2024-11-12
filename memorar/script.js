// Pilih semua elemen a-video dalam scene
const videoEntities = document.querySelectorAll("a-video");

// Loop melalui setiap elemen video
videoEntities.forEach(videoEntity => {
  const videoSrc = videoEntity.getAttribute('src');
  const videoElement = document.querySelector(videoSrc); // Ambil elemen video berdasarkan src

  // Tunggu video untuk memuat, lalu hitung rasio aspek dan sesuaikan skala
  videoElement.onloadedmetadata = () => {
    const videoAspectRatio = videoElement.videoWidth / videoElement.videoHeight;

    // Atur skala berdasarkan rasio aspek
    videoEntity.setAttribute("scale", `${videoAspectRatio} 1 1`);
  };
});

const raccoonVideo = document.getElementById("raccoonModel");
const raccoonAudio = document.getElementById("raccoonAudio");
const bearVideo = document.getElementById("bearModel");
const bearAudio = document.getElementById("bearAudio");

// Tambahkan event listener pada touch untuk memulai video jika belum
document.body.addEventListener('click', () => {
  if (raccoonVideo.paused) raccoonVideo.play();
  raccoonAudio.pause();
  if (bearVideo.paused) bearVideo.play();
  bearAudio.pause();
});

// Event listener MindAR untuk kontrol target
document.querySelector('[mindar-image-target="targetIndex: 0"]').addEventListener("targetFound", () => {
  raccoonVideo.play();
  raccoonAudio.play();
});

document.querySelector('[mindar-image-target="targetIndex: 0"]').addEventListener("targetLost", () => {
  raccoonVideo.pause();
  raccoonVideo.currentTime = 0;
  raccoonAudio.pause();
  raccoonAudio.currentTime = 0;
});

document.querySelector('[mindar-image-target="targetIndex: 1"]').addEventListener("targetFound", () => {
  bearVideo.play();
  bearAudio.play();
});

document.querySelector('[mindar-image-target="targetIndex: 1"]').addEventListener("targetLost", () => {
  bearVideo.pause();
  bearVideo.currentTime = 0;
  bearAudio.pause();
  bearAudio.currentTime = 0;
});
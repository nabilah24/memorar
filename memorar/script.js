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

const video1 = document.getElementById("vid1");
const video2 = document.getElementById("vid2");
const audio1 = document.getElementById("vid1Audio");
const audio2 = document.getElementById("vid2Audio");

// Tambahkan event listener pada touch untuk memulai video jika belum
document.body.addEventListener('click', () => {
  if (video1.paused) video1.play();
  if (video2.paused) video2.play();
  audio1.pause();
  audio2.pause();
});

// Event listener MindAR untuk kontrol target
document.querySelector('[mindar-image-target="targetIndex: 0"]').addEventListener("targetFound", () => {
  video1.play();
  audio1.play();
});

document.querySelector('[mindar-image-target="targetIndex: 0"]').addEventListener("targetLost", () => {
  video1.pause();
  video1.currentTime = 0;
  audio1.pause();
  audio1.currentTime = 0;
});

document.querySelector('[mindar-image-target="targetIndex: 1"]').addEventListener("targetFound", () => {
  video2.play();
  audio2.play();
});

document.querySelector('[mindar-image-target="targetIndex: 1"]').addEventListener("targetLost", () => {
  video2.pause();
  video2.currentTime = 0;
  audio2.pause();
  audio2.currentTime = 0;
});

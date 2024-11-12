document.querySelector("a-scene").addEventListener("loaded", () => {
  // Pilih semua elemen a-video dalam scene
  const videoEntities = document.querySelectorAll("a-video");

  // Loop melalui setiap elemen video
  videoEntities.forEach(videoEntity => {
    const videoSrc = videoEntity.getAttribute('src');
    const videoElement = document.querySelector(videoSrc); // Ambil elemen video berdasarkan src

    // Tunggu video untuk memuat, lalu hitung rasio aspek dan sesuaikan skala
    videoElement.onloadedmetadata = () => {
      const videoAspectRatio = videoElement.videoWidth / videoElement.videoHeight;
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
    if (bearVideo.paused) bearVideo.play();
    raccoonAudio.pause();
    bearAudio.pause();
  });

  // Event listener MindAR untuk kontrol target
  const target0 = document.querySelector('[mindar-image-target="targetIndex: 0"]');
  const target1 = document.querySelector('[mindar-image-target="targetIndex: 1"]');

  if (target0) {
    target0.addEventListener("targetFound", () => {
      raccoonVideo.play();
      raccoonAudio.play();
    });

    target0.addEventListener("targetLost", () => {
      raccoonVideo.pause();
      raccoonVideo.currentTime = 0;
      raccoonAudio.pause();
      raccoonAudio.currentTime = 0;
    });
  }

  if (target1) {
    target1.addEventListener("targetFound", () => {
      bearVideo.play();
      bearAudio.play();
    });

    target1.addEventListener("targetLost", () => {
      bearVideo.pause();
      bearVideo.currentTime = 0;
      bearAudio.pause();
      bearAudio.currentTime = 0;
    });
  }
});
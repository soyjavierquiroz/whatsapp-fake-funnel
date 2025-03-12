const SoundPlayer = (type) => {
  if (!type) return;
  const sound = new Audio(`/sounds/${type}.mp3`);
  sound.play();
};

export default SoundPlayer;

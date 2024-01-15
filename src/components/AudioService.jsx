export let audioInstance = null;

export const playAudio = (base64Audio, onEndedCallback) => {
  try {
    if (audioInstance) {
      audioInstance.pause();
      audioInstance = null; // Reset to allow creating a new Audio instance
    }

    audioInstance = new Audio(`data:audio/mp3;base64,${base64Audio}`);
    audioInstance.play();

    if (onEndedCallback) {
      audioInstance.onended = onEndedCallback;
    }
  } catch (error) {
    console.error('Error while playing audio:', error);
  }
};

export const muteAudio = () => {
  try {
    if (audioInstance) {
      audioInstance.pause();
      audioInstance = null; // Reset the audio instance
    }
  } catch (error) {
    console.error('Error while muting audio:', error);
  }
};


export const stopAudio = () => {
  try {
    if (audioInstance) {
      audioInstance.pause();
      audioInstance.currentTime = 0; // Reset the audio to the beginning
      audioInstance = null; // Reset the audio instance
    }
  } catch (error) {
    console.error('Error while stopping audio:', error);
  }
};
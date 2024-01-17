export let audioInstance = null;

export const playAudio = (base64Audio, onEndedCallback) => {
  try {
    console.log(audioInstance, 'sijksjKDASDJ') 
    if (audioInstance) {
      console.log('play')
      audioInstance.pause();
      audioInstance.currentTime = 0; // Reset the playback position
    }

    audioInstance = new Audio(`data:audio/mp3;base64,${base64Audio}`);
    audioInstance.play();

    if (onEndedCallback) {
      audioInstance.onended = onEndedCallback;
    }

    isMuted = false; // Reset the muted state
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
      console.log('stop the audio ')
      console.log(audioInstance, 'sijksjKDASDJ')

      audioInstance.pause(); 
      audioInstance.currentTime = 0; // Reset the audio to the beginning
      audioInstance = null; // Reset the audio instance
      console.log(audioInstance, 'sijksjKDASDJ')

    }
  } catch (error) {
    console.error('Error while stopping audio:', error);
  }
};


export const resumeAudio = () => {
  try {
    if (audioInstance && !isMuted) {
      audioInstance.play().catch((error) => {
        console.error('Error while resuming audio:', error);
      });
    }
  } catch (error) {
    console.error('Error while resuming audio:', error);
  }
};
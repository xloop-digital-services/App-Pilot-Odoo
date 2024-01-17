export let audioInstance = null;

export const playAudio = (base64Audio, onEndedCallback) => {
  try {
    if (audioInstance) {
      console.log('play')
      audioInstance.pause();
      // audioInstance = null; // Reset the playback position
      // setAnimation('Idle')
      // audioInstance.currentTime = 0;
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
      // audioInstance = null; // Reset the audio instance
    }
  } catch (error) {
    console.error('Error while muting audio:', error);
  }
};


export const stopAudio = (setAnimation) => {
  // const { setAnimation } = useChat();
  try {
    if (audioInstance) {
      console.log('stop the audio ')

      audioInstance.pause(); 
      // audioInstance.currentTime = 0; // Reset the audio to the beginning
      // audioInstance = null; // Reset the audio instance
      // setAnimation('Idle')

    }
  } catch (error) {
    console.error('Error while stopping audio:', error);
  }
};


export const resumeAudio = () => {
  console.log('resume')
  try {
    if (audioInstance) {
      audioInstance.play();
      
    }
  } catch (error) {
    console.error('Error while resuming audio:', error);
  }
};
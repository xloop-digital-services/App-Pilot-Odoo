import { useMuteContext } from "./Avatar2";

export let audioInstance = null;



export const playAudio = (base64Audio, onEndedCallback, isMuted) => {
  try {
    if (audioInstance) {
      audioInstance.pause();
    }

    audioInstance = new Audio(`data:audio/mp3;base64,${base64Audio}`);
    console.log(isMuted, 'muted');
    if(isMuted){
      audioInstance.play();
    }

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
      audioInstance.pause(); 

    }
  } catch (error) {
    console.error('Error while stopping audio:', error);
  }
};


export const resumeAudio = () => {
  try {
    if (audioInstance) {
      audioInstance.play();
      
    }
  } catch (error) {
    console.error('Error while resuming audio:', error);
  }
};
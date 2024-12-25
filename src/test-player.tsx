import { Fragment, FunctionalComponent } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import { useSignalEffect, useSignal, signal } from '@preact/signals';


type MuteButtonProps = {
  isMuted: boolean;
};

const MuteButton: FunctionalComponent<MuteButtonProps> = ({
  isMuted,
}) => {
  useEffect(() => {
    console.log('isMuted', isMuted);
  }, [isMuted]);

  return null;
};

export const muteVideo = signal(false);
const TestPlayer: FunctionalComponent = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useSignalEffect(() => {
    videoRef.current!.muted = muteVideo.value;
  });

  return (
    <Fragment>
      <div>
        <video
          data-testid='video-player'
          ref={videoRef}>
        </video>
        <MuteButton
          isMuted={muteVideo.value} 
          />
      </div>
    </Fragment>
  );

};

export default TestPlayer;
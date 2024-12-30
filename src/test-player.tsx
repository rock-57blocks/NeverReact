import { Fragment, FunctionalComponent } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import { useSignalEffect, useSignal, signal } from '@preact/signals';


type MuteButtonProps = {
  isVisible: boolean;
  videoPlayerHeight: number | undefined;
};

const MuteButton: FunctionalComponent<MuteButtonProps> = ({
  isVisible,
  videoPlayerHeight,
}) => {
  useEffect(() => {
    // do nothing
  }, [isVisible, videoPlayerHeight]);

  return (
    <button>
      Mute
    </button>
  );
};

export const muteVideo = signal(false);

const TestPlayer: FunctionalComponent = (

) => {
  const videoPlayerWrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useSignalEffect(() => {
    videoRef.current!.muted = muteVideo.value;
  });

  return (
    <Fragment>
      <div ref={videoPlayerWrapRef}>
        <video
          data-testid='video-player'
          ref={videoRef}>
        </video>
        <MuteButton
          isVisible={true}
          videoPlayerHeight={videoPlayerWrapRef.current?.clientHeight} />
      </div>
    </Fragment>
  );

};

export default TestPlayer;
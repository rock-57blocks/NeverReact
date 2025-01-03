import { Fragment, FunctionalComponent } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import { useSignalEffect, useSignal, signal } from '@preact/signals';

export const muteVideo = signal(false);
const TestPlayer: FunctionalComponent = (

) => {
  const videoPlayerWrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useSignalEffect(() => {
    console.log('invoke TestPlayer useSignalEffect, muteVideo.value =' + muteVideo.value);
    videoRef.current!.muted = muteVideo.value;
  });

  useEffect(() => {
    console.log('invoke TestPlayer useEffect, muteVideo.value =' + muteVideo.value);
  },[muteVideo.value]);

  console.log('rendering', muteVideo.value)
  return (
    <Fragment>
      <div ref={videoPlayerWrapRef}>
        <video
          data-testid='video-player'
          ref={videoRef}>
        </video>
      </div>
    </Fragment>
  );
};

export default TestPlayer;
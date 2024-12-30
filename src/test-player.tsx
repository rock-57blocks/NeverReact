import { Fragment, FunctionalComponent } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import { useSignalEffect, useSignal, signal } from '@preact/signals';


const TestPlayer: FunctionalComponent = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsUrl = useSignal('');

  useEffect(() => {
    const getHlsUrl = async () => {
      console.log('getHlsUrl');
      const url = await new Promise<string>((resolve) => {
        resolve('https://hlsurl.com/');
      });
      console.log('url', url);
      hlsUrl.value = url;
    };

    getHlsUrl();
  }, []);

  useSignalEffect(() => {
    console.log('useSignalEffect');
    videoRef.current!.src = hlsUrl.value;
  });

  return (
    <video
      data-testid='video-player'
      ref={videoRef}>
    </video>
  );
};

export default TestPlayer;

import { describe, expect, it } from '@jest/globals';
import { fireEvent, render } from '@testing-library/preact';
import TestPlayer, { muteVideo } from './test-player';
import { act } from 'preact/test-utils';
import { useSignal, useSignalEffect } from '@preact/signals';
import { useRef, useEffect } from 'preact/hooks';

describe('async', () => {
  function setupScratch(id?: string) {
    const scratch = document.createElement('div');
    scratch.id = id || 'scratch';
    (document.body || document.documentElement).appendChild(scratch);
    return scratch;
  }

  it.only("should render src correctly", async () => {
    let scratch = setupScratch();
    function App() {
      const videoRef = useRef<HTMLVideoElement>(null);
      const hlsUrl = useSignal("");

      useEffect(() => {
        const getHlsUrl = async () => {
          // this is the key issue here, if there is a promise in the useEffect, the test will fail
          const url = await new Promise<string>(resolve => {
            resolve("https://hlsurl.com/");
          });
          console.log("url changed", url);
          hlsUrl.value = url;
        };

        getHlsUrl();
      }, []);

      useSignalEffect(() => {
        console.log("call useSignalEffect with hlsUrl.value", hlsUrl.value);
        videoRef.current!.src = hlsUrl.value;
      });

      return <video data-testid="video-player" ref={videoRef}></video>;
    }

    await act(() => {
      render(<App />, { container: scratch });
    });
    const video = scratch.firstChild as HTMLVideoElement;
    expect(video.src).toBe("https://hlsurl.com/");
  });
});

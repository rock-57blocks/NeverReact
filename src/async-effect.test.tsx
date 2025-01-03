
import { describe, expect, it } from '@jest/globals';
import { render, waitFor } from '@testing-library/preact';
import { act } from 'preact/test-utils';
import { useRef, useEffect, useState } from 'preact/hooks';

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
      const [hlsUrl, setHlsUrl] = useState("");


      const getHlsUrl = async () => {
        // this is the key issue here, if there is a promise in the useEffect, the test will fail
        const url = await new Promise<string>(resolve => {
          resolve("https://hlsurl.com/");
        });
        console.log("url changed", url);
        setHlsUrl(url);
      };

      useEffect(() => {

        getHlsUrl();
      }, []);

      useEffect(() => {
        console.log("call useSignalEffect with hlsUrl", hlsUrl);
        videoRef.current!.src = hlsUrl;
      }, [hlsUrl]);

      return <video data-testid="video-player" ref={videoRef}></video>;
    }

    await act(async () => {
      render(<App />, { container: scratch });
    });
    const video = scratch.firstChild as HTMLVideoElement;
    await waitFor(() => {
      expect(video.src).toBe("https://hlsurl.com/");
    });
  });
});

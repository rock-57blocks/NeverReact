
import { describe, expect, it } from '@jest/globals';
import { fireEvent, render } from '@testing-library/preact';
import TestPlayer, { muteVideo } from './test-player';
import { act } from 'preact/test-utils';

describe('TestPlayer', () => {
  it('should render', () => {
    const { getByTestId } = render(<TestPlayer />);

    act(() => {
      muteVideo.value = true;
    });
    const video = getByTestId('video-player') as HTMLVideoElement;
    expect(video.muted).toBe(true);
  });
});

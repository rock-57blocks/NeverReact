
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { render } from '@testing-library/preact';
import TestPlayer from './test-player';
import { act } from 'preact/test-utils';

function setupScratch(id?: string) {
	const scratch = document.createElement('div');
	scratch.id = id || 'scratch';
	(document.body || document.documentElement).appendChild(scratch);
	return scratch;
}

describe('TestPlayer', () => {
  let scratch = document.createElement('div') as HTMLDivElement;
  beforeEach(() => {
    scratch = setupScratch();
  });

  it('should render', async () => {
    await act(() => {
      render(<TestPlayer />, { container: scratch });
    });
    const video = scratch.firstChild as HTMLVideoElement;
    expect(video.src).toBe('https://hlsurl.com/');
  });
});

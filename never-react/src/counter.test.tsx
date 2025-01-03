import { describe, expect, it } from '@jest/globals';
import { fireEvent, screen, render } from "@testing-library/preact";
import { act } from "preact/test-utils";
import Counter from "./counter";


it('increments count', () => {
  render(<Counter />);

  const button = screen.getByText(/increment/i);
  const countDisplay = screen.getByTestId('count');

  
  // act(() => {
    fireEvent.click(button);
  // });

  expect(countDisplay.textContent).toBe('1');
});

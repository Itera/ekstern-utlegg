import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';

import App from '../App';

// Routing being remembered between tests - force back to start each time
afterEach(() => {
  cleanup();
  const { getByText } = render(<App />);
  fireEvent.click(getByText('Forklaring'));
});

describe('Personlia', () => {
  it('should render', () => {
    const { getByText } = render(<App />);

    fireEvent.click(getByText('Mine detaljer'));

    getByText('Dine detaljer');
  });

  it('should allow name to be set', () => {
    const { getByText, getByTestId } = render(<App />);

    fireEvent.click(getByText('Start'));

    const input = getByTestId('personalia-name');

    expect(input.value).toBe('');

    fireEvent.change(input, {
      target: { value: 'John Doe' }
    });

    expect(input.value).toBe('John Doe');
  });
});

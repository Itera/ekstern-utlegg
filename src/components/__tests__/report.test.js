import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';

import App from '../App';

afterEach(cleanup);

describe('Report', () => {
  it('should remind you to send via e-mail', () => {
    const { getByText } = render(<App />);

    fireEvent.click(getByText('Ferdig'));

    getByText(/send.*e-post/);
  });

  it('should remind you to print with colour', () => {
    const { getByText } = render(<App />);

    fireEvent.click(getByText('Ferdig'));

    getByText(/print.*bakgrunnsfarger/);
  });
});

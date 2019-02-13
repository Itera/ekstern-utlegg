import React from 'react';
import { render, cleanup } from 'react-testing-library';

import App from '../App';

afterEach(cleanup);

describe('Home', () => {
  it('should mention receipts', () => {
    const { getByText } = render(<App />);

    getByText(/kvittering/);
  });

  it('should mention sending via e-mail', () => {
    const { getByText } = render(<App />);

    getByText(/send.*e-post/);
  });
});

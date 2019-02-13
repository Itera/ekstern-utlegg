import React from 'react';
import { render, cleanup } from 'react-testing-library';

import { Valid } from '../Icons';

afterEach(cleanup);

// Need to check span class name - since that's what octicon is using

describe('Valid', () => {
  it('should have an svg for valid', () => {
    const { container } = render(<Valid valid={true} />);
    const graphic = container.querySelector('svg');
    expect(graphic).toBeTruthy();
  });
  it('should have an svg for invalid', () => {
    const { container } = render(<Valid valid={false} />);
    const graphic = container.querySelector('svg');
    expect(graphic).toBeTruthy();
  });
});

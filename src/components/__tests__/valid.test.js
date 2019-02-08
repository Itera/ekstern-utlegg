import React from 'react';
import { render, cleanup } from 'react-testing-library';

import Valid from '../Valid';

afterEach(cleanup);

// Need to check span class name - since that's what octicon is using

describe('Valid', () => {
  it('should have a tick if valid', () => {
    const { container } = render(<Valid valid={true} />);
    const classNames = container.querySelector('span').className.split(' ');
    expect(classNames).toContain('octicon-check');
  });
  it('should have a warning if invalid', () => {
    const { container } = render(<Valid valid={false} />);
    const classNames = container.querySelector('span').className.split(' ');
    expect(classNames).toContain('octicon-alert');
  });
});

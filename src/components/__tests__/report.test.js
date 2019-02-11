import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';

import App from '../App';

afterEach(cleanup);

describe('Personlia', () => {
  it('should render', () => {
    const { getByText } = render(<App />);

    fireEvent.click(getByText('Utlegg'));

    getByText(/Sum.*/);
  });
});

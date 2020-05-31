import React from 'react';
import { render } from '@testing-library/react';
import App from './app.component';

describe('App compponent', () => {
  it('renders "Lottery Contract" title', () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/Lottery Contract/i);
    expect(linkElement).toBeInTheDocument();
  });
});
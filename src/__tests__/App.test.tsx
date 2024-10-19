import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import { StreamProvider } from '../context/StreamContext';
import { ThemeProvider } from '@mui/material';
import theme from '../theme/theme';

test('renders App component snapshot', () => {
  const { asFragment } = render(
    <StreamProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StreamProvider>
  );

  expect(asFragment()).toMatchSnapshot();
});

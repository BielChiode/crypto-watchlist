import React from 'react';
import Home from './pages/Home';
import { StreamProvider } from './context/StreamContext';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme/theme';

function App() {
  return (
    <StreamProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Home />
      </ThemeProvider>
    </StreamProvider>
  );
}

export default App;

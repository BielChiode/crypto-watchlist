import React from 'react';
import SymbolList from '../components/SymbolList';
import { Container, Grid2 } from '@mui/material';
import MarketWatch from '../components/MarketWatch';

const Home: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <Grid2 container data-testid="grid-container">
        <SymbolList />
        <MarketWatch />
      </Grid2>
    </Container>
  );
};

export default Home;

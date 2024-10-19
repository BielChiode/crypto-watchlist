import React, { useState, ChangeEvent, useEffect } from 'react';
import {
  Checkbox,
  Button,
  FormControlLabel,
  Paper,
  List,
  ListItem,
  TextField,
  InputAdornment,
  Pagination,
  Grid2,
  styled,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useStream } from '../context/StreamContext';
import { useAvailableSymbols } from '../api/hooks/useAvailableSymbols';

const ITEMS_PER_PAGE = 20;

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(2),
  maxHeight: 500,
  overflowY: 'auto',
  '&::-webkit-scrollbar': { width: 8 },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.text.secondary,
    borderRadius: 10,
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: theme.palette.background.paper,
  },
}));

const StyledPagination = styled(Pagination)(({ theme }) => ({
  '& .Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  '& .MuiPaginationItem-root': { color: theme.palette.text.secondary },
}));

function SymbolList(): JSX.Element {
  const [activeSelection, setActiveSelection] = useState<string[]>([]);
  const [filterTerm, setFilterTerm] = useState('');
  const [trackedSymbols, setTrackedSymbols] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const { registerSymbol, isFetching } = useStream();
  const availableSymbols = useAvailableSymbols();

  function toggleSymbolSelection(symbol: string) {
    setActiveSelection((current) =>
      current.includes(symbol)
        ? current.filter((s) => s !== symbol)
        : [...current, symbol]
    );
  }

  function addSelectedSymbols() {
    activeSelection.forEach((symbol) => {
      registerSymbol(symbol);
      setTrackedSymbols((prev) => [...prev, symbol]);
    });
    setActiveSelection([]);
  }

  const visibleSymbols = availableSymbols.filter((s) =>
    s.symbol.toLowerCase().includes(filterTerm.toLowerCase())
  );

  const totalPages = Math.ceil(visibleSymbols.length / ITEMS_PER_PAGE);
  const paginatedSymbols = visibleSymbols.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  function handlePageChange(event: ChangeEvent<unknown>, value: number) {
    setPage(value);
  }

  return (
    <Grid2
      size={{ xs: 12, md: 4 }}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: { xs: 'auto', md: '100vh' },
        padding: 2,
        borderRadius: 1,
        backgroundColor: 'background.default',
        border: '1px solid',
        borderColor: 'divider',
      }}
      data-testid="symbol-list"
    >
      <TextField
        label="Find Symbol"
        variant="outlined"
        fullWidth
        value={filterTerm}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setFilterTerm(e.target.value)
        }
        sx={{ marginBottom: 2 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <StyledPaper elevation={3}>
        <List>
          {paginatedSymbols.length > 0 ? (
            paginatedSymbols.map((s) => (
              <ListItem key={s.symbol}>
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={(theme) => ({
                        color: theme.palette.primary.main,
                      })}
                      checked={activeSelection.includes(s.symbol)}
                      onChange={() => toggleSymbolSelection(s.symbol)}
                      disabled={
                        trackedSymbols.includes(s.symbol) ||
                        trackedSymbols.length >= 5 ||
                        activeSelection.length >= 5
                      }
                    />
                  }
                  label={s.symbol}
                />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <FormControlLabel
                control={<Checkbox disabled />}
                label="No symbols found"
              />
            </ListItem>
          )}
        </List>
      </StyledPaper>

      <StyledPagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        sx={{ marginTop: 2 }}
      />

      <Button
        variant="contained"
        onClick={addSelectedSymbols}
        disabled={activeSelection.length === 0 || isFetching}
        endIcon={trackedSymbols.length >= 5 ? null : <AddIcon />}
        sx={(theme) => ({
          marginTop: 2,
          backgroundColor: theme.palette.primary.main,
          '&:hover': { backgroundColor: '#009e66' },
          color: '#fff',
        })}
      >
        {trackedSymbols.length >= 5
          ? 'Limit of 5 symbols reached '
          : 'Add symbols'}
      </Button>
    </Grid2>
  );
}

export default SymbolList;

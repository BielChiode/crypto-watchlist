import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Backdrop,
  CircularProgress,
  styled,
  tableCellClasses,
  Grid2,
  Chip,
} from '@mui/material';
import { useStream } from '../context/StreamContext';

function MarketWatch(): JSX.Element {
  const { priceData, isFetching } = useStream();

  const formatValue = (value: string, decimals = 4) =>
    parseFloat(value).toFixed(decimals);

  const formatPercent = (percent: string) =>
    `${Math.abs(parseFloat(percent) * 100).toFixed(2)}%`;

  const getChipColor = (percent: string) =>
    Math.abs(parseFloat(percent) * 100) >= 0 ? 'success' : 'error';

  const CustomTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightBold,
      borderBottom: `1px solid ${theme.palette.divider}`,
      fontFamily: theme.typography.fontFamily,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: theme.typography.pxToRem(14),
      color: theme.palette.text.secondary,
      borderBottom: `1px solid ${theme.palette.divider}`,
      fontFamily: theme.typography.fontFamily,
    },
  }));

  const CustomChip = styled(Chip)(({ theme, color }) => ({
    backgroundColor:
      color === 'success'
        ? theme.palette.success.main
        : theme.palette.error.main,
    color: theme.palette.common.white,
    fontWeight: theme.typography.fontWeightBold,
    minWidth: '80px',
    justifyContent: 'center',
  }));

  const CustomTableRow = styled(TableRow)(({ theme }) => ({
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  }));

  return (
    <Grid2 size={{ xs: 12, md: 8 }} data-testid="market-watch">
      <TableContainer
        component={Paper}
        sx={(theme) => ({
          padding: theme.spacing(1.5),
          height: { xs: 'auto', md: '90vh' },
          borderRadius: theme.shape.borderRadius,
          backgroundColor: theme.palette.background.default,
          border: `1px solid ${theme.palette.divider}`,
          position: 'relative',
        })}
      >
        <Backdrop
          open={isFetching}
          sx={(theme) => ({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: theme.palette.action.disabledBackground,
            zIndex: theme.zIndex.drawer + 1,
          })}
        >
          <CircularProgress data-testid="loading-spinner"
            sx={(theme) => ({ color: theme.palette.success.main })}
          />
        </Backdrop>

        {Object.keys(priceData).length === 0 ? (
          <Box
            sx={(theme) => ({
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              fontSize: theme.typography.h6.fontSize,
              color: theme.palette.text.disabled,
              fontFamily: theme.typography.fontFamily,
            })}
          >
            No symbols available to display
          </Box>
        ) : (
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <CustomTableCell>Ticker</CustomTableCell>
                <CustomTableCell align="right">Last price</CustomTableCell>
                <CustomTableCell align="right">Ask</CustomTableCell>
                <CustomTableCell align="right">Bid</CustomTableCell>
                <CustomTableCell align="right">Variation (%)</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(priceData).map(
                ([symbol, { last, changePercent, bid, ask }]) => (
                  <CustomTableRow key={symbol}>
                    <CustomTableCell>{symbol}</CustomTableCell>
                    <CustomTableCell align="right">
                      ${formatValue(last)}
                    </CustomTableCell>
                    <CustomTableCell align="right">
                      ${formatValue(bid)}
                    </CustomTableCell>
                    <CustomTableCell align="right">
                      ${formatValue(ask)}
                    </CustomTableCell>
                    <CustomTableCell align="right">
                      <CustomChip
                        label={formatPercent(changePercent)}
                        color={getChipColor(changePercent)}
                      />
                    </CustomTableCell>
                  </CustomTableRow>
                )
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Grid2>
  );
}

export default MarketWatch;

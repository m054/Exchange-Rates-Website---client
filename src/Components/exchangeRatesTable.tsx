import React, { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';


type Currency = {
  name: string;
  exchangeRates: number;
};


export const ExchangeRatesTable: React.FC<{ selectedCurrency: string }> = ({ selectedCurrency }) => {

  const [data, setData] = React.useState([]);

  //Retrieving exchange rates from the server
  const fetchData = async (selectedCurrency: any) => {
    try {
      const response = await fetch(`https://localhost:7203/api/ExchangeRatse/GetExchangeRatse/${selectedCurrency}`);
      if (response.ok) {
        const data = await response.json();
        setData(data);
        console.log(data);
      }
      else { console.error('Error fetching data:', response.statusText); }
    }
    catch (error) { console.error('Error fetching data:', error); };
  };


  React.useEffect(() => {
    fetchData(selectedCurrency);
  }, [selectedCurrency]);

  //Displaying the exchange rates in the Material Table

  const columns = useMemo<MRT_ColumnDef<Currency>[]>(
    () => [
      {
        header: 'base',
        footer: 'base',
        size: 150,
        Cell: ({ }) => <span>{selectedCurrency}</span>

      },
      {
        accessorKey: 'currencyName',
        header: 'Target',
        footer: 'Target',
        size: 150,
      },
      {
        accessorKey: 'rate',
        header: 'Exchange Rates',
        footer: 'Exchange Rates',
        size: 150,
      },

    ],
    [selectedCurrency],
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableStickyHeader: true,
    enableStickyFooter: true,
    enablePagination: false,
    muiTableContainerProps: { sx: { maxHeight: '400px' } },
    muiTableBodyCellProps: {
      sx: (theme) => ({
        backgroundColor:
          theme.palette.mode === 'dark'
            ? theme.palette.grey[900]
            : theme.palette.grey[50],
      }),
    },
  });

  return <MaterialReactTable table={table} />;
};


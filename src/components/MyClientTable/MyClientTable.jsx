import { useMemo } from 'react';

//MRT Imports
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
} from 'material-react-table';

//Material UI Imports
import {
  Box,
  Button,
  MenuItem,
  lighten,
} from '@mui/material';


const MyClientTable = ({data}) => {
  const columns = useMemo(
    () => [
      {
        id: 'client', //id used to define `group` column
        header: 'Client',
        columns: [
          {
            accessorKey: 'name', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: 'autocomplete',
            header: 'Name',
            size: 300,
          },
          {
            accessorKey: 'email', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: 'autocomplete',
            header: 'Email',
            size: 300,
          },

          {
            accessorKey: 'age',
            // filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn
            filterFn: 'between',
            header: 'Age',
            size: 300,
          },
          {
            accessorFn: (row) => new Date(row.startDate), //convert to Date for sorting and filtering
            id: 'startDate',
            header: 'Start Date',
            filterVariant: 'date',
            filterFn: 'lessThan',
            sortingFn: 'datetime',
            Cell: ({ cell }) => cell.getValue()?.toLocaleDateString(), //render Date as a string
            Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
            muiFilterTextFieldProps: {
              sx: {
                minWidth: '250px',
              },
            },
          },
          
        ],
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowActions: true,
    enableRowSelection: true,
    initialState: {
      showColumnFilters: true,
      showGlobalFilter: true,
      columnPinning: {
        left: ['mrt-row-expand', 'mrt-row-select'],
        right: ['mrt-row-actions'],
      },
    },
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    muiSearchTextFieldProps: {
      size: 'small',
      variant: 'outlined',
    },
    muiPaginationProps: {
      color: 'secondary',
      rowsPerPageOptions: [5, 10, 20],
      shape: 'rounded',
      variant: 'outlined',
    },
    renderDetailPanel: ({ row }) => (
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-around',
          left: '30px',
          maxWidth: '1000px',
          position: 'sticky',
          width: '100%',
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
        {`(Workouts Number: ${row.original.numberOfWorkouts} , Total Cost: ${row.original.totalCost} , Paid Amount: ${row.original.paidAmount})`}
        </Box>
        <Box sx={{ textAlign: 'center' }}>
        {`Caloric Intake: ${row.original.caloricIntake}`}
        </Box>
        
      </Box>
    ),
    renderRowActionMenuItems: ({ row, closeMenu  }) => [
      <MenuItem key={0}>
         <AddWorkoutDialog client={row.original}/>
      </MenuItem>,

      <MenuItem key={1}>
       <AddPackageDialog client={row.original}/>
      </MenuItem>,
    ],
    renderTopToolbar: ({ table }) => {
      const handleDeactivate = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert('deactivating ' + row.getValue('name'));
        });
      };

      const handleActivate = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert('activating ' + row.getValue('name'));
        });
      };


      return (
        <Box
          sx={(theme) => ({
            backgroundColor: lighten(theme.palette.background.default, 0.05),
            display: 'flex',
            gap: '0.5rem',
            p: '8px',
            justifyContent: 'space-between',
          })}
        >
          <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {/* import MRT sub-components */}
            <MRT_GlobalFilterTextField table={table} />
            <MRT_ToggleFiltersButton table={table} />
          </Box>
          <Box>
            <Box sx={{ display: 'flex', gap: '0.5rem' }}>
              <Button
                color="error"
                disabled={!table.getIsSomeRowsSelected()}
                onClick={handleDeactivate}
                variant="contained"
              >
                Deactivate
              </Button>
              <Button
                color="success"
                disabled={!table.getIsSomeRowsSelected()}
                onClick={handleActivate}
                variant="contained"
              >
                Activate
              </Button>
              
            </Box>
          </Box>
        </Box>
      );
    },
  });

  return     <Box sx={{ width: '80%' }}> {/* Parent container with full width */}
  <MaterialReactTable
    table={table}
  />
</Box>
};

//Date Picker Imports - these should just be in your Context Provider
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AddWorkoutDialog from '../Dialog/Dialog';
import AddPackageDialog from '../PackageDialog/PackageDialog';

const MyClientTableWithLocalizationProvider = ({ data }) => (
  //App.tsx or AppProviders file
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <MyClientTable data={data} />
  </LocalizationProvider>
);

export default MyClientTableWithLocalizationProvider;

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Typography,
  Box
} from "@mui/material";
import WeightLogItem from "../WeightLogItem/WeightLogItem";
import { useData } from "../../context/DataContext";

function WeightLogListTable({ weightTracking }) {
  const { currentClient, updateWeightTracking } = useData();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterDate, setFilterDate] = useState("");

  const handleUpdateWeightTracking = async (date, newWeight) => {
    const newLog = { weight: newWeight, date: new Date(date) };
    try {
      await updateWeightTracking(currentClient._id, newLog);
    } catch (error) {
      console.log("Error in handleUpdateWeightTracking:", error);
    }
  };

  const filteredLogs = weightTracking.filter((log) => {
    if (!filterDate) return true;
    const logDate = new Date(log.date).toISOString().split("T")[0];
    return logDate >= filterDate;
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };

  return (
    <Box sx={{ mt: 2, p:2 }} >
      <Typography variant="h7" component="h4" gutterBottom>
        Weight Log Table
      </Typography>
      <TextField
        type="date"
        label="Filter by Date"
        fullWidth
        InputLabelProps={{
          shrink: true, // Keep the label always condensed
        }}
        value={filterDate}
        onChange={(e) => setFilterDate(e.target.value)}
        sx={{m:1, mt:2}}
      />
      {filterDate && (
        <Typography variant="subtitle1" align="center">
          Showing logs after {new Date(filterDate).toLocaleDateString()}
        </Typography>
      )}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ display: "none" }}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLogs.length > 0 ? (
              filteredLogs
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((log) => (
                  <TableRow key={log.date}>
                    <TableCell>
                      <WeightLogItem
                        log={log}
                        onUpdate={handleUpdateWeightTracking}
                      />
                    </TableCell>
                    <TableCell style={{ display: "none" }}>
                      {log.date}
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={2}>No logs available!</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]} // Options for rows per page
        component="div"
        count={filteredLogs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        // sx={{border:"solid black 1px"}}
        sx={{
          width: "100%", // Full width of the container
          minWidth: "200px", // Minimum width for readability
          margin: "0 auto", // Centering the component itself within its container
          ".MuiTablePagination-toolbar": {
            display: "flex",
            justifyContent: "center", // Center pagination controls horizontally
            padding: 0, // Remove any extra padding
            gap: 2, // Optional: add a gap between controls for spacing
            flexWrap: "wrap", // Wrap on smaller screens if needed
          },
          ".MuiTablePagination-actions": {
            // Center align the actions (if needed)
            display: "flex",
            justifyContent: "center",
          },
        }}
      />
    </Box>
  );
}

export default WeightLogListTable;

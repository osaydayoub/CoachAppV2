import React from "react";
import {
  Box,
  Typography,
  Paper,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function WeightLogChart({ weightTracking }) {
  // Transform weightTracking data to the format required by Recharts
  const data = weightTracking.map((log) => ({
    date: new Date(log.date).toLocaleDateString(),
    weight: log.weight,
  }));

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Weight Log Chart
      </Typography>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="weight" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
}

export default WeightLogChart;

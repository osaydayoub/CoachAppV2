import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

function NutritionCard({scannedBarcode,nutritionData}) {
  return (
    <Card sx={{ minWidth: 275, mt: 2 , backgroundColor: '#f5f5f5'}}>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
        {`Nutrition Information for scanned Barcode ${scannedBarcode} `}
        </Typography>
        <Typography variant="h5" component="div">
        Calories in 100 gr
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{nutritionData}</Typography>
      </CardContent>
    </Card>
  )
}

export default NutritionCard



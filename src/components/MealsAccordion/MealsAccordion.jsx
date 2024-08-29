import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

export default function MealsAccordion() {
  return (
    <div style={{width:"300px"}}>
    <Accordion >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        Breakfast
      </AccordionSummary>
      <AccordionDetails>
      Breakfast Meal for Today Not Chosen!
      </AccordionDetails>
    </Accordion>
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2-content"
        id="panel2-header"
      >
        First Snack
      </AccordionSummary>
      <AccordionDetails>
      No First Snack picked for Today
      </AccordionDetails>
    </Accordion>
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2-content"
        id="panel2-header"
      >
        Lunch
      </AccordionSummary>
      <AccordionDetails>
      Lunch Meal for Today Not Chosen!
      </AccordionDetails>
    </Accordion>

    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2-content"
        id="panel2-header"
      >
        Second Snack
      </AccordionSummary>
      <AccordionDetails>
      Second Snack for Today Not Chosen!
      </AccordionDetails>
    </Accordion>
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2-content"
        id="panel2-header"
      >
        Dinner
      </AccordionSummary>
      <AccordionDetails>
      Dinner Meal for Today Not Chosen!
      </AccordionDetails>
    </Accordion>
  </div>
  )
}




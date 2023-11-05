import * as React from 'react';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary, {
  accordionSummaryClasses,
} from '@mui/joy/AccordionSummary';
import AddIcon from '@mui/icons-material/Add';
import '../styles/Faq.css';
import { blue } from '@mui/material/colors';

export default function Faq() {
  return (
    <>
    <h3 className=" heading1 text-xl font-semibold text-blue-600">How Can We Help You?</h3>
          <div className="search-bar2 ">
          
              <input type="text" placeholder="Search the Knowledge Base" className=" search-bar1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"  />
            
              <button className="search-button">
             
                <i className="search-icon">Click</i>
              </button>
          </div>
    <AccordionGroup className='Acoordion' 
      sx={{
        maxWidth: 700,
        marginLeft:45,
        display:'flex',
        justifyContent: 'center',
        marginTop:10,
        border: '1px solid black',
        [`& .${accordionSummaryClasses.indicator}`]: {
          transition: '0.2s',
        },
        [`& [aria-expanded="true"] .${accordionSummaryClasses.indicator}`]: {
          transform: 'rotate(45deg)',
        },
      }}
    >
       <Accordion sx={{ backgroundColor: 'lightblue',borderColor:'black' }}>
        <h1 className='header'> Faq </h1>
        <AccordionSummary indicator={<AddIcon />}>First accordion</AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ backgroundColor: 'lightblue',borderColor:'black' }}>
        <AccordionSummary indicator={<AddIcon />}>Second accordion</AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ backgroundColor: 'lightblue',borderColor:'black' }}>
        <AccordionSummary indicator={<AddIcon />}>Third accordion</AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ backgroundColor: 'lightblue',borderColor:'black' }}>
        <AccordionSummary indicator={<AddIcon />}>fourth accordion</AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ backgroundColor: 'lightblue',borderColor:'black' }}>
        <AccordionSummary indicator={<AddIcon />}>fifth accordion</AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ backgroundColor: 'lightblue' ,borderColor:'black' }}>
        <AccordionSummary indicator={<AddIcon />}>sixth accordion</AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ backgroundColor: 'lightblue' ,borderColor:'black' }}>
        <AccordionSummary indicator={<AddIcon />}>sixth accordion</AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ backgroundColor: 'lightblue' ,borderColor:'black'}}>
        <AccordionSummary indicator={<AddIcon />}>sixth accordion</AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ backgroundColor: 'lightblue' ,borderColor:'black'}}>
        <AccordionSummary indicator={<AddIcon />}>sixth accordion</AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </AccordionDetails>
      </Accordion>
    </AccordionGroup>
    </>
  );
}

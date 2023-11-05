

import React from 'react';
import image6 from '../images/help-icon-6.png';
import image1 from '../images/help-icon-1.png';
import image2 from '../images/help-icon-2.png';
import image3 from '../images/help-icon-3.png'
import { Link } from 'react-router-dom';
import '../styles/Help.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import Avatar from '@mui/joy/Avatar';
import AvatarGroup from '@mui/joy/AvatarGroup';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';


import CardActions from '@mui/joy/CardActions';
import IconButton from '@mui/joy/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { blue, green } from '@mui/material/colors';

const Help = () => {
  return (
    <>
    <div className="help-page">

          <h1 className=" heading text-xl font-semibold text-blue-600">How Can We Help You?</h1>
          <div className="search-bar ">
          
              <input type="text" placeholder="Search the Knowledge Base" className=" search-bar1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"  />
            
              <button className="search-button">
             
                <i className="search-icon">Click</i>
              </button>
          </div>
          <br/>

          <div className="card-container">
            
            <Card className='card'
      variant="outlined"
      sx={{
        width: 400,
        // to make the card resizable
        overflow: 'auto',
        
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        
       
      </Box>
      <CardContent>
      <img src={image1} size="lg" />
        <Typography className='header'><h2>Getting Started</h2></Typography>
        <Typography>
         <h3> Welcome to RuralEduConnect! We are so glad You here. Let's get started! </h3>
        </Typography>
      </CardContent>
      
      <CardActions>
      <Link to="https://google.com">
        <Button variant="outlined" color="neutral" className="btn">
          View
        </Button>
        </Link>
      
        </CardActions>
        
    </Card>
      
     
     <Card className='card'
    
      variant="outlined"
      sx={{
        width: 400,
        // to make the card resizable
        overflow: 'auto',
        
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        
        
      </Box>
      <CardContent>
        
       <img src={image2} size="lg" />
        <Typography className='header' ><h2>Account</h2></Typography>
        <Typography level="body-sm">
         <h3> Adjust your profile and preferences to make RuralEduConnect Works for you!
          </h3>
        </Typography>
      </CardContent>
      <CardActions>
          <Link to="https://www.google.com">
          <Button variant="outlined" color="neutral" className='btn'>
          View
        </Button>
          </Link>
        </CardActions>
      
    </Card>
              
   </div>
    <div className='card-container1'>
            
                <Card className='card'
                  variant="outlined"
                  sx={{
                    width: 400,
                    // to make the card resizable
                    overflow: 'auto',
                    
                  }}
                >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
           
      </Box>
      <CardContent>
      <img src={image3} size="lg" />
        <Typography className='header'><h2>Data Security</h2></Typography>
        <Typography level="body-sm">
          <h3>Some further explanation when RuralEduConnect can and cannot used!</h3>
        </Typography>
      </CardContent>
      <CardActions>
      <Link to="https://google.com">
        <Button variant="outlined" color="neutral" className='btn'>
          View
        </Button>
        </Link> 
      </CardActions>
    </Card>
              
   
      <Card className='card'
            variant="outlined"
            sx={{
              width: 400,
              // to make the card resizable
              overflow: 'auto',
              
            }}
          >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
        
        
      </Box>
      <CardContent>
      <img src={image6} size="lg" />
        <Typography className='header'><h2>Tips,tricks & more</h2></Typography>
        <Typography level="body-sm">
          <h3>
            Tips and tools for beginners and experts alike.know more about our functionalities 
          </h3>
          
        </Typography>
      </CardContent>
      <CardActions>
      <Link to="https://google.com">
        <Button variant="outlined" color="neutral" className='btn'sx={{bg:blue}}>
          View
        </Button>
        </Link>
      </CardActions>
    </Card>

             
          </div>
    </div>
        
    </>
  );
};

export default Help;

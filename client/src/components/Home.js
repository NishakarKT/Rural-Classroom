import React, { useState } from 'react'
import { Grid } from '@mui/material'
import Sidebar from './Sidebar'
import Nav from './Nav'
import Lectures from './Lectures'
import Tests from './Tests'
import AddCourseDialog from './AddCourseDialog'

const Home = () => {
  const [open,setOpen] = useState(false);
  
  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }
  
  return (
    <div>
      <Grid container spacing={2} height={'100vh'}>
        <Grid item xs={2}>
          <Sidebar openCourseDialog={handleOpen}/>
        </Grid>
        <Grid item xs={10}>
          <Nav/>
          <Lectures />
          <Tests />
        </Grid>
      </Grid>
      <AddCourseDialog open={open} handleClose={handleClose}/>
    </div>
  )
}

export default Home
import { Box, Button, IconButton, Typography } from '@mui/material'
import React, { useContext } from 'react'
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

import Courses from './Courses'
import { useGlobalContext } from '../hooks/useGlobalContext'

const Sidebar = ({
  openCourseDialog
}) => {
  const { userRole } = useContext(useGlobalContext);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center',
        gap: 4,
        position: 'sticky',
        zIndex: 1,
        top: 0,
        left: 0,
        overflowX: 'hidden',
      }}
      height={'100vh'}
    >
      <Courses/>
      {userRole === 'teacher' ? 
        <Box
          sx={{
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            flexGrow: 1,
          }}
        >
          <IconButton onClick={openCourseDialog}>
            <AddCircleRoundedIcon fontSize='large'/>
          </IconButton>
          <Typography>
            Add a Course
          </Typography>
        </Box>
      :
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          coordinator
        </Box>
      }
      <Box
        sx={{
          display:'flex',
          flexDirection: 'column',
          gap: 1,
          m: 3
        }}
      >
        <Button variant='text'>Contact Us</Button>
        <Button variant='text'>FAQ</Button>
        <Button variant='text'>Help</Button>
      </Box>
    </Box>
  )
}

export default Sidebar
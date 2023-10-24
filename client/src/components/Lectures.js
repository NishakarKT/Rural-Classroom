import { Box, Grid, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { useGlobalContext } from '../hooks/useGlobalContext'
import LectureCard from './LectureCard';

const Lectures = () => {

  const { userRole, lectures } = useContext(useGlobalContext);
  
  return (
    <Box>
      <Typography>
        {`${userRole==='teacher' ? 'Upcoming ' : ''}Lectures`}
      </Typography>
      <Grid container gap={2} sx={{my:2}}>
        {lectures && (lectures.length===0 ? (
          <Grid item xs={12}>
            <Typography> No lectures to show</Typography>
          </Grid>
        ):(
          lectures.map(lecture => (
            <LectureCard
              lecture={lecture}
              key={lecture.id}
            />
          ))
        ))}
      </Grid>

    </Box>
  )
}

export default Lectures
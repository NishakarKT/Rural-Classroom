import { Box, Grid, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { useGlobalContext } from '../hooks/useGlobalContext'
import TestCard from './TestCard';

const Tests = () => {

  const { userRole, tests } = useContext(useGlobalContext);
  
  return (
    <Box>
      <Typography>
      {`${userRole==='teacher' ? 'Your ' : ''}Tests`}
      </Typography>
      <Grid container gap={2} sx={{my:2}}>
        {tests && (tests.length===0 ? (
          <Grid item xs={12}>
            <Typography> No tests to show</Typography>
          </Grid>
        ):(
          tests.map(test => (
            <TestCard
              test={test}
              key={test.id}
            />
          ))
        ))}
      </Grid>

    </Box>
  )
}

export default Tests
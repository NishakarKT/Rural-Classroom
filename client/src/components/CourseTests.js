import { Box, Button, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import TestCard from './TestCard';

const CourseTests = ({
  tests,
}) => {

  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <Box
      sx={{
        mt: 4,
      }}
    >
      <Typography variant='h4' fontWeight={600}>Tests</Typography>
      <Grid container gap={2} sx={{ my: 2 }}>
        {tests &&
          (tests.length === 0 ? (
            <Grid item xs={12}>
              <Typography> No tests to show</Typography>
            </Grid>
          ) : (
            (isExpanded ? tests : tests.slice(0, 4)).map((test) => <TestCard test={test} key={test.id} />)
          ))}
      </Grid>
      {tests && tests.length > 4 && (
        <Button
          onClick={() => setIsExpanded((x) => !x)}
          variant="text"
          sx={{
            float: "right",
            mr: 8,
          }}
        >
          {isExpanded ? "Show less..." : "Show more..."}
        </Button>
      )}
    </Box>
  )
}

export default CourseTests
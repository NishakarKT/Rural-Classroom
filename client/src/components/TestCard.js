import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const TestCard = ({
  test,
}) => {
  const navigate = useNavigate();
  const img='something';
  
  return (
    <Grid item xs={2.8} component={Card}>
      <CardActionArea onClick={()=> navigate(`/test/${test.id}`)}>
        <CardMedia component="img" image={img} alt='An image' />
        <CardContent>
          <Typography>
            {test.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Grid>
  )
}

export default TestCard
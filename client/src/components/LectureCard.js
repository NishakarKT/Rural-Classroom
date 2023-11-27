import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const LectureCard = ({
  lecture,
}) => {
  const navigate = useNavigate();
  const img='something';
  
  return (
    <Grid item xs={2.8} component={Card}>
      <CardActionArea onClick={()=> navigate(`/live/${lecture.id}`)}>
        <CardMedia component="img" image={img} alt='An image' />
        <CardContent>
          <Typography>
            {lecture.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Grid>
  )
}

export default LectureCard
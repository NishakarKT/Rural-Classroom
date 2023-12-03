import { Box, Card, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { BASE } from '../constants/endpoints'

const CourseLectureCard = ({
  lecture,
  setThumbnail,
  setTitle,
  setDesc,
}) => {
  return (
    <Card
      onClick={()=>{
        setThumbnail(`${BASE}/${lecture.thumbnail}`);
        setTitle(lecture.title);
        setDesc(lecture.description);
      }}
      sx={{display:'flex',gap:2,mb: 2,}}
    >
        <CardMedia
          component="img"
          sx={{ width: 168, height: 94, borderRadius:'5px' }}
          image={`${BASE}/${lecture.thumbnail}`}
          alt="Live from space album cover"
        />
        <Box>
          <Typography variant='h6'>{lecture.title}</Typography>
          <Typography variant='subtitle1'>{lecture.description}</Typography>
        </Box>
    </Card>
  )
}

export default CourseLectureCard
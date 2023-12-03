import { Box, Button } from '@mui/material'
import React from 'react'

const CourseSidebar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // gap: 4,
        // position: "sticky",
        // zIndex: 1,
        // top: 0,
        // left: 0,
        // overflowX: "hidden",
      }}
      height={"100vh"}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: '100%',
          justifyContent:'center',
        }}
      >
        <Button variant="outlined" sx={{my:2}}>Test1</Button>
        <Button variant="outlined" sx={{my:2}}>Test2</Button>
        <Button variant="outlined" sx={{my:2}}>Study Material</Button>
        <Button variant="outlined" sx={{my:2}}>Upload Notes</Button>
        <Button variant="outlined" sx={{my:2}}>Students Enrolled</Button>
      </Box>
    </Box>
  )
}

export default CourseSidebar
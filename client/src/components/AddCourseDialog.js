import { Box, Button, Dialog, DialogActions, DialogTitle, InputLabel, TextField } from '@mui/material'
import React from 'react'

const AddCourseDialog = ({
  open,
  handleClose,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add new Course</DialogTitle>
        <Box sx={{mx: 3}}>
          <Box
            display='flex'
            gap={3}
            sx={{
              justifyContent: 'space-around',
              mt:1,
              mb: 2,
            }}
          >
            <Box>
              <InputLabel
                sx={{mb: 1,ml:.5}}
              >
							Name of the Course:
						</InputLabel>
            <TextField 
              defaultValue={"Enter course's name" }
            />
            </Box>
            <Box>
              <InputLabel
                sx={{mb: 1,ml:.5}}
              >
							Teacher's Name :
						</InputLabel>
            <TextField 
              InputProps={{
                readOnly: true,
              }}
              defaultValue='Test Name'
            />
            </Box>
          </Box>
          <Box>
            <InputLabel
              sx={{mb: 1,ml:.5}}
            >
              Material :
            </InputLabel>
            <TextField
              type='file'
              inputProps={{
								multiple: true,
								// accept: 'image/*',
							}}
              fullWidth
              sx={{mb: 2,}}
            />
          </Box>
          <Box>
            <InputLabel
              sx={{mb: 1,ml:.5}}
            >
              Picture :
            </InputLabel>
            <TextField
              type='file'
              fullWidth
              inputProps={{
								accept: 'image/*',
							}}
              sx={{mb: 2,}}
            />
          </Box>
        </Box>
        <DialogActions>
          <Button variant='outlined' onClick={handleClose}>Cancel</Button>
          <Button variant='contained' onClick={handleClose}>Add Course</Button>
        </DialogActions>
      </Dialog>
  )
}

export default AddCourseDialog
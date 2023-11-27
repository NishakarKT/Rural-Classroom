import { Box, Button, Container, Dialog, DialogActions, DialogTitle, InputLabel, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useGlobalContext } from '../hooks/useGlobalContext'

const CreateProfile = ({
  open,
  handleClose,
}) => {

  const {user,setUser, token} = useContext(useGlobalContext);
  const [error,setError] = useState({
    name:'',
    contact:'',
    profilePic:'',
    coverPic:'',
  })

  const [profile,setProfile]=useState({
    name:user.name || '',
    contact: user.contact || '',
    profilePic: user.profilePic || '',
    coverPic: user.coverPic || '',
  });

  const uploadProfilePic = async (files) => {
    const formData = new FormData();
		for (const key of Object.keys(files)) {
			formData.append('files',files[key]);
		}
    if(files.length){
      await fetch('http://localhost:8000/file/upload',{
      method:'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    })
    .then(res=>res.json())
    .then(data=>{
      setProfile(x=>({...x,profilePic:Object.values(data.data)[0]}));
    });
    }
  }

  const uploadCoverPic = async (files) => {

    const formData = new FormData();
		for (const key of Object.keys(files)) {
			formData.append('files',files[key]);
		}
    if(files.length){
      await fetch('http://localhost:8000/file/upload',{
      method:'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    })
    .then(res=>res.json())
    .then(data=>{
      setProfile(x=>({...x,coverPic:Object.values(data.data)[0]}));
    });
    }
  }

  const editUser =async ()=>{
    setError({
      name:'',
      contact:'',
      profilePic:'',
      coverPic:'',
    })
    if(!profile.name){
      setError(x=>({...x,name:'Field cannot be Empty'}))
    }
    if(!profile.contact){
      setError(x=>({...x,contact:'Field cannot be Empty'}))
    }
    if(!profile.profilePic){
      setError(x=>({...x,profilePic:'Field cannot be Empty'}))
    }
    if(!profile.coverPic){
      setError(x=>({...x,coverPic:'Field cannot be Empty'}))
    }
    if(!profile.name || !profile.contact || !profile.profilePic || !profile.coverPic){
      return;
    }
    await fetch('http://localhost:8000/user/edit',{
      method:'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body:JSON.stringify({
        query:user,
        edits:{...profile}
      }),
    })
    .then(res=>res.json())
    .then(data=>{
      setUser(data.user);
      localStorage.setItem('user',JSON.stringify(data.user))
      handleClose();
    });
  }

  return (
    <Dialog open={open}>
        <DialogTitle>Finish setting up Profile</DialogTitle>
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
							Name:
						</InputLabel>
            <TextField 
              variant='outlined'
              value={profile.name}
              error={error.name}
              helperText={error.name}
              onChange={(e)=>setProfile(x=>({...x,name:e.target.value}))}

            />
            </Box>
            <Box>
              <InputLabel
                sx={{mb: 1,ml:.5}}
              >
							Role:
						</InputLabel>
            <TextField 
              disabled
              InputProps={{
                readOnly: true,
              }}
              value={user.role}
            />
            </Box>
          </Box>
          <Box>
              <InputLabel
                sx={{mb: 1,ml:.5}}
              >
							Contact:
						</InputLabel>
            <TextField 
              variant='outlined'
              fullWidth
              error={error.contact}
              helperText={error.contact}
              sx={{
                mb:2,
              }}
              value={profile.contact}
              onChange={(e)=>setProfile(x=>({...x,contact:e.target.value}))}

            />
          </Box>
          <Box>
            <InputLabel
              sx={{mb: 1,ml:.5}}
            >
              Profile Picture :
            </InputLabel>
            <TextField
              type='file'
              fullWidth
              error={error.profilePic}
              helperText={error.profilePic}
              inputProps={{
                multiple: true,
								accept: 'image/*',
							}}
              sx={{mb: 2,}}
              onChange={e=>uploadProfilePic(e.target.files)}
            />
          </Box>
          <Box>
            <InputLabel
              sx={{mb: 1,ml:.5}}
            >
              Cover Picture :
            </InputLabel>
            <TextField
              type='file'
              fullWidth
              error={error.coverPic}
              helperText={error.coverPic}
              inputProps={{
								accept: 'image/*',
							}}
              onChange={e=>uploadCoverPic(e.target.files)}
              sx={{mb: 2,}}
            />
          </Box>
        </Box>
        <DialogActions>
          <Button
            variant='outlined'
            sx={{
                mx:'auto',
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                borderRadius:'50px',
                height:'59px',
                fontSize:'1.3em',
                fontWeight:'700',
                cursor:'pointer',
                my:2,
            }}
            fullWidth
            onClick={editUser}
          >
            Save
        </Button>
        </DialogActions>
      </Dialog>
  )
}

export default CreateProfile;
import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import '../styles/Profile.css';
import Photo from '../images/logo192.png'
export default function Profile() {
  const [isEditing, setEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(Photo);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const newImage = e.target.result;
        setProfileImage(newImage);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        <div className="profile-container">
      <h4 className="profile-heading">Profile</h4>
      <div className="profile-photo">
      {isEditing ? (
              <div className="photo-edit">
                <span>Profile Photo: </span>
                <input type="file" accept="image/*" onChange={handleImageChange} />
              </div>

      ) : (
           <img src={profileImage} alt="Profile" />
      )}
      </div>
      <div className="profile-details">
        {/* Username */}
        <div className="profile-field">
          <label>Username:</label>
          {isEditing ? (
            <input type="text" placeholder="Enter username" />
          ) : (
            <span className='placeholder'>Username Placeholder</span>
          )}
        </div>
        {/* First Name */}
        <div className="profile-field">
          <label>First Name:</label>
          {isEditing ? (
            <input type="text" placeholder="Enter first name" />
          ) : (
            <span className='placeholder'>First Name Placeholder</span>
          )}
        </div>
        {/* Last Name */}
        <div className="profile-field">
          <label>Last Name:</label>
          {isEditing ? (
            <input type="text" placeholder="Enter last name" />
          ) : (
            <span className='placeholder'>Last Name Placeholder</span>
          )}
        </div>
        {/* Organization Name */}
        <div className="profile-field">
          <label>Organization Name:</label>
          {isEditing ? (
            <input type="text" placeholder="Enter organization name" />
          ) : (
            <span className='placeholder'>Organization Name Placeholder</span>
          )}
        </div>
        {/* Location */}
        <div className="profile-field">
          <label>Location:</label>
          {isEditing ? (
            <input type="text" placeholder="Enter location" />
          ) : (
            <span className='placeholder'>Location Placeholder</span>
          )}
        </div>
        {/* Email Address */}
        <div className="profile-field">
          <label>Email Address:</label>
          {isEditing ? (
            <input type="email" placeholder="Enter email address" />
          ) : (
            <span className='placeholder'>Email Address Placeholder</span>
          )}
        </div>
        {/* Phone Number */}
        <div className="profile-field">
          <label>Phone Number:</label>
          {isEditing ? (
            <input type="tel" placeholder="Enter phone number" />
          ) : (
            <span className='placeholder'>Phone Number Placeholder</span>
          )}
        </div>
        {/* Birthday */}
        <div className="profile-field">
          <label>Birthday:</label>
          {isEditing ? (
            <input type="date" />
          ) : (
            <span className='placeholder'>Birthday Placeholder</span>
          )}
        </div>
      </div>
      <div>
        {/* Edit button */}
        {isEditing ? (
          <button onClick={() => setEditing(false)}>Save</button>
        ) : (
          <button onClick={() => setEditing(true)}>Edit</button>
        )}
      </div>
    </div>
      </Typography>
    </Container>
  )
}


import React from 'react';
import { Avatar, Typography, Box } from '@mui/material'; 

const ProfileCard = ({ user }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        borderRadius: 10,
        padding: 2,
        marginBottom: 2,
      }}
    >
      <Avatar alt={user?.first_name} src={user?.avatar} sx={{ width: 60, height: 60, marginRight: 2 }} /> 
      <div>
        <Typography variant="h6" fontWeight="bold">{user?.first_name} {user?.last_name}</Typography>
        <Typography variant="body1" color="textSecondary">{user?.email}</Typography>
      </div>
    </Box>
  );
};

export default ProfileCard;


import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, InputBase, Typography, Grid, Box, ThemeProvider, createTheme, styled, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import ProfileCard from './profilecard'; 

const apiUrl = 'https://mocki.io/v1/ddb7e0a8-e218-4e36-b1be-b902cdb1c098';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'Arial',
      'sans-serif'
    ].join(','),
  },
});

const StyledInputBase = styled(InputBase)({
  backgroundColor: 'white',
  borderRadius: 20,
  paddingLeft: 10,
  '& input': {
    color: 'black',
  },
});

const UserDetails = () => {
  const [admins, setAdmins] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios.get(apiUrl)
      .then(response => {
        const allUsers = response.data;
        const adminUsers = allUsers.filter(user => user.role === 'admin');
        const memberUsers = allUsers.filter(user => user.role === 'member');
        setAdmins(adminUsers);
        setMembers(memberUsers);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <AppBar position="static" sx={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }}>
          <Toolbar>
            <Typography variant="h6">
              User Details
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <StyledInputBase
              placeholder="Search…"
              startAdornment={<SearchIcon style={{ color: 'black' }} />}
              sx={{ pl: 6 }}
            />
          </Toolbar>
        </AppBar>
        <Grid container spacing={2} marginTop={2}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Administrators
            </Typography>
            <Grid container spacing={2}>
              {admins.map(user => (
                <Grid key={user.email} item xs={12} sm={6} md={3}>
                  <ProfileCard user={user} />
                </Grid>
              ))}
            </Grid>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Members
            </Typography>
            <Grid container spacing={2}>
              {members.map(user => (
                <Grid key={user.email} item xs={12} sm={6} md={3}>
                  <ProfileCard user={user} />
                </Grid>
              ))}
            </Grid>
            <Divider />
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default UserDetails;

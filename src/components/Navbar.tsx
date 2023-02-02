import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { redirect, useNavigate } from 'react-router-dom';

import { useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'

export default function LabelBottomNavigation() {

  const { currentUser } = useAuth()

  const location = useLocation();
  console.log(location.pathname.replace(/\//, ''));

  const [value, setValue] = React.useState(location.pathname.replace(/\//, ''));
  const navigate = useNavigate();

  const handleClick = (route: string) => {
    // navigate to the route
    console.log(route);
    navigate(route);
  }
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };


  return (
    
    <BottomNavigation sx={{ width: 375, position: 'fixed', bottom: 0, zIndex: 1000
     }} value={value} onChange={handleChange} >
      <BottomNavigationAction onClick={() => handleClick('/my-stats')}
        label="My stats"
        value="my-stats"
        disabled={currentUser? false : true}
        style={{color: currentUser? 'green' : 'grey'}}
        icon={<TimelineRoundedIcon />}
      />
        <BottomNavigationAction onClick={() => handleClick('/submit-new-score')}
          label="New Score"
          value="submit-new-score"
          disabled={currentUser? false : true}
          style={{color: currentUser? 'green' : 'grey'}}
          icon={<AddBoxRoundedIcon />}
        />
      <BottomNavigationAction onClick={() => handleClick('/leaderboard')}
        label="Leaderboard"
        value="leaderboard"
        style={{color: 'green' }}
        icon={<LeaderboardIcon />}
      />
      <BottomNavigationAction onClick={() => {currentUser? handleClick('/dashboard') : handleClick('/login')}}
        label="Dashboard"
        value="dashboard"
        style={{color: 'green' }}
        icon={<PersonRoundedIcon />}
      />
    </BottomNavigation>
    
  );
}
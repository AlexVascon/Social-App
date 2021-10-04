
import {useContext} from 'react';
import { Link } from "react-router-dom";
import MaterialIcon, {colorPalette} from 'material-icons-react';
import ChatIcon from '@mui/icons-material/Chat';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import LogoutIcon from '@mui/icons-material/Logout';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Avatar from '@mui/material/Avatar';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import { AuthContext } from "../context/auth.context";

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const API_URL = "http://localhost:5005";

export default function Navbar() {

  

    const { isLoggedIn, user, logOutUser } = useContext(AuthContext); 
    
    return (
      <Box sx={{ flexgrow: 1 }}>
      <AppBar position="static" className='nav-test'>
      <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} className='nav-title comp-pink'>
            Dust
          </Typography>
        { isLoggedIn ? (
          <>
            <Link to='/edit' className='nav-link'>
            <EditRoundedIcon className='sidebarIcon' fontSize='medium'/>
            </Link>
            <button onClick={logOutUser} className='nav-link'>
            <LogoutIcon className='sidebarIcon' fontSize='medium'/>
            </button>
            <Link to='/messenger' className='nav-link'>
            <ChatIcon className='sidebarIcon' fontSize='medium'/>
            </Link>
            <Link to='/feed' className='nav-link'>
            <CircleNotificationsIcon className='sidebarIcon' fontSize='medium'/>
            </Link>
            <Link to='/feed' className='nav-link'>
            <RssFeedIcon className='sidebarIcon' fontSize='medium'/>
            </Link>
            <Link to='/profile' className='nav-avatar'>
            <Avatar alt={user.username} src={user.profilePicture} sx={{ width: 55, height: 55 }} />
            </Link>
             </>
        ) : (
          <>
            <Link to='/login' className='nav-link'>Login</Link>
            <Link to='/signup' className='nav-link'>Signup</Link>
          </>
        )
        }
        {/* </nav> */}
        </Toolbar>
        </AppBar>
        </Box>
    )
}

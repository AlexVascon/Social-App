
import {useContext, useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import MaterialIcon, {colorPalette} from 'material-icons-react';
import ChatIcon from '@mui/icons-material/Chat';
import Menu from '@mui/material/Menu';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import LogoutIcon from '@mui/icons-material/Logout';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import { AuthContext } from "../context/auth.context";
import Badge from '@mui/material/Badge';
import axios from 'axios';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const API_URL = "http://localhost:5005";

export default function Navbar() {


  const [followers, setFollowers] = useState('')
  const [anchorEl, setAnchorEl] = useState(null);
  const [allNotifications, setAllNotifications] = useState([]);
  const [notificationsEL, setNotificationsEL] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const notifications = Boolean(notificationsEL);
  const handleNotificationsClick = (event) => {
    setNotificationsEL(event.currentTarget);
  };
  const handleNotificationClose = () => {
    setNotificationsEL(null);
  };

    const { isLoggedIn, user, logOutUser } = useContext(AuthContext); 

    useEffect(() => {
      const getInfo = () => {
        axios.get(`${API_URL}/follow/pending`, { withCredentials: true })
        .then(response => {
            setFollowers(response.data)
        })
        .catch(err => console.log('follow err:',err))
    }
    getInfo(); 
    },[])
    
    return (
      <Box sx={{ flexgrow: 1 }}>
      <AppBar position="static" className='nav-test'>
      <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} className='nav-title comp-pink'>
            Dust
          </Typography>
        { isLoggedIn ? (
          <>
            <Link to='/messenger' className='nav-link'>
            <ChatIcon className='sidebarIcon' fontSize='medium'/>
            </Link>

            <Tooltip title="Notifications" className='nav-link notifactionIcon'>
            <Badge badgeContent={followers?.length} color="secondary">
            <CircleNotificationsIcon onClick={handleNotificationsClick} fontSize='medium'/>
            </Badge>
            </Tooltip>
            
            <Link to='/feed' className='nav-link'>
            <RssFeedIcon className='sidebarIcon' fontSize='medium'/>
            </Link>
            <Link to='/profile' className='nav-avatar'>
            <Avatar alt={user.username} src={user.profilePicture} sx={{ width: 55, height: 55 }} />
            </Link>
            <Tooltip title="Account settings" className='nav-link'>
          <MoreVertIcon className='sidebarIcon' onClick={handleClick}  fontSize='medium'/>
        </Tooltip>
        <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
        <Avatar /> 
        <Link to='/edit' className='nav-link'>
        <span>My account</span> 
       </Link> 
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={logOutUser} >
          <button className='nav-link'>
            <LogoutIcon className='sidebarIcon' fontSize='medium'/>
            </button>
            Logout
        </MenuItem>
      </Menu>
      <Menu
        anchorEl={notificationsEL}
        open={notifications}
        onClose={handleNotificationClose}
        onClick={handleNotificationClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
        <Avatar /> 
        <Link to='/edit' className='nav-link'>
        <span>Notifications</span> 
       </Link> 
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          user id
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          user id
        </MenuItem>
        <MenuItem onClick={logOutUser} >
          <button className='nav-link'>
            <LogoutIcon className='sidebarIcon' fontSize='medium'/>
            </button>
           user id
        </MenuItem>
      </Menu>
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

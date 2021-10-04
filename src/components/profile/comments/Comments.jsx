import React, { useEffect, useState} from 'react';
import './comments.css'
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const API_URL = "http://localhost:5005";

export default function Comments(props) {

    const [users, setUsers] = useState([])

    
    useEffect(() => {
        const getInfo = () => {
            axios.get(`${API_URL}/comments/post/${props.postId}`, { withCredentials: true })
            .then(response => {
                console.log('ok');
            })
            .catch(err => console.log('err:',err))
        }
        const getUsers = () => {
            axios.get(`${API_URL}/comments/users/${props.postId}`, { withCredentials: true })
            .then(response => {
                setUsers(response.data);
            })
            .catch(err => console.log('err:',err))
        }
        getInfo(); 
        getUsers();
    }, [])

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
    {users.map(user => { return(
        <>
        <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={user.userMatch.username} src={user.userMatch.profilePicture} />
        </ListItemAvatar>
        <ListItemText
          primary={user.userMatch.username}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
              </Typography>
              {user.comment.description}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      </>
    )})}
    </List>
  );
}

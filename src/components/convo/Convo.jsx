import React from 'react';
import './convo.css';
import Avatar from '@mui/material/Avatar';


export default function Convo({user}) {


    return (
        <div className='convo'>
            <Avatar 
            alt={user?.username} 
            src={user?.profilePicture} 
            sx={{ width: 70, height: 70 }}
            className='convoIcon'
             />
            <h4>{user?.username}</h4>
        </div>
    )
}
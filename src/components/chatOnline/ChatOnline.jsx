import { useState, useEffect } from 'react';
import axios from 'axios';
import { Avatar } from '@mui/material'
import './chatOnline.css'

const API_URL = "http://localhost:5005";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {

    const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(`${API_URL}/users/friends/${currentId}`, { withCredentials: true });
      setFriends(res.data);
    };

    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => {
        onlineUsers.includes(f._id)
    }));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(`${API_URL}/chats/${user._id}`, { withCredentials: true });
      console.log('chats:', res)
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

    return (
        <div className='chatOnline'>
        {onlineFriends.map((o) => (
            <div className='chatOnlineFriend' onClick={() => handleClick(o)}>
                <div className='chatOnlineImageContainer'>
                <Avatar src={o.profilePicture} className='chatOnlineImg' sx={{ width: 32, height: 32 }}/>
                <div className='chatOnlineBadge'></div>
                </div>
                <span className='chatOnlineName'>{o.username}</span>
            </div>
        ))}
            
        </div>
    )
}

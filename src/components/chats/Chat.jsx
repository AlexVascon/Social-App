import React, { useState, useEffect} from 'react'
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import CurrentChat from '../CurrentChat';

const API_URL = "http://localhost:5005";

export default function Chat(props) {

    const [user, setUser] = useState('')

    useEffect(() => {
        const getInfo = () => {
            axios.get(`${API_URL}/profile/info`, { withCredentials: true })
            .then(response => {
                setUser(response.data);
            })
            .catch(err => console.log('err:',err));
        }
        getInfo(); 
    }, [])

    return (
        <>
        <div className='user-suggest'>
            <Link to={`/chats/${props.user._id}`}>
            <Avatar alt={props.user.username} src={props.user.profilePicture} sx={{ width: 120, height: 120 }}/>
            </Link>
        </div>
        <div className='chat-box'>
            <div className='chats-panel'>
            </div>
            <div className='chat-messaging'>
            <CurrentChat user={user} />
            </div>
        </div> 
        </>
    )
}

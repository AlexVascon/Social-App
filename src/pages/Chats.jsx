import React, {useState, useEffect} from 'react';
import CurrentChat from '../components/CurrentChat'
import FriendsToChat from '../components/FriendsToChat'
import axios from 'axios';
import ChatList from '../components/chats/ChatList';

const API_URL = "http://localhost:5005";

export default function Chats() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}/users/friends`, { withCredentials: true })
        .then(response => {
            setUsers(response.data);
        })
        .catch(err => console.log('could not retrieve list of users. Error:', err));
    }, [])
    return (
        <>
        <FriendsToChat />
        {/* <div className='chat-box'>
            <div className='chats-panel'>
            </div>
            <div className='chat-messaging'>
            <CurrentChat />
            </div>
        </div> */}
        </>

        /* <div>
            <CurrentChat />
            <FriendsToChat />
        </div> */ 
    )
}

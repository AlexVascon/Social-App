import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Convo from '../convo/Convo';
import './conversations.css'
const API_URL = "http://localhost:5005";

export default function Conversations({conversation, currentUser}) {

    const [user, setUser] = useState('');

    useEffect(() => {

        const friendId = conversation.participants.find(member => member !== currentUser._id)

        const getUser = async () => {
            try {
                const res = await axios(`${API_URL}/users/${friendId}`, { withCredentials: true })
                setUser(res.data)
            } catch(err) {
                console.log(err);
            }
        }
        getUser();
    }, [currentUser, conversation])
    return (
        <div className='convo-list'>
            <Convo key={user?._id} user={user} />
        </div>
    )
}

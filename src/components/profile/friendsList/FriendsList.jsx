import React, {useState, useEffect} from 'react';
import './friendsList.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';



const API_URL = "http://localhost:5005";

export default function FriendList() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}/users/friends`, { withCredentials: true })
        .then(response => {
            setUsers(response.data);
        })
        .catch(err => console.log('could not retrieve list of users. Error:', err));
    }, [])
    return (
        <div className='friends-suggestions'>
        <h1>Your Friends</h1>
            <ul>
                {users.map(user => {
                   return (
                   <div className='user-suggest'>
            <Link to={`/visit/${user._id}`}>
            <Avatar className='profileImg' alt={user.username} src={user.profilePicture} sx={{ width: 120, height: 120 }}/>
            </Link>
        </div>
                 ) })}
            </ul>
        </div>
    )
}

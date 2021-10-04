import React, {useState, useEffect} from 'react';
import './usersList.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';


const API_URL = "http://localhost:5005"; 

export default function UsersList() {


    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}/users/all`, { withCredentials: true })
        .then(response => {
            setUsers(response.data);
        })
        .catch(err => console.log('could not retrieve list of users,', err));
    }, [])
    return (
        <div className='friends-suggestions'>
        <h1>People you may know</h1>
            <ul>
                {users.map(user => {
                   return  (
                   <div className='user-suggest'>
            <Link to={`/visit/${user._id}`}>
            <Avatar className='profileImg' alt={user.username} src={user.profilePicture} sx={{ width: 120, height: 120 }}/>
            </Link>
        </div>
                 )
                })}
            </ul>
        </div>
    )
}

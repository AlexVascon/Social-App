import React, {useState, useEffect} from 'react';
import axios from 'axios';
import User from '../components/User';


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
                   return <User key={user._id} user={user}/>
                })}
            </ul>
        </div>
    )
}

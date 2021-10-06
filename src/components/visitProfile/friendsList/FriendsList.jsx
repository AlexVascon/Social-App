import React, {useState, useEffect} from 'react';
import './friendsList.css';
import axios from 'axios';
import User from '../../User';


const API_URL = "http://localhost:5005";

export default function FriendsList(props) {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getProfileFriends = async () => {
            try {
                const res = await axios.get(`${API_URL}/users/friends/${props.userId}`, { withCredentials: true });
                console.log('users:', res)
                setUsers(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        getProfileFriends();
        console.log('users 1:', users)
    }, [])

    return (
        <div className='friends-suggestions'>
        <h1>User Friends</h1>
            <ul>
                {
                    users ? (users?.map(user => {
                   return <User key={user?._id} user={user}/>
                })) : ('loading..')
                }
            </ul>
        </div>
    )
}

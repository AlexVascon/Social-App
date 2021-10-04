import React, { useState, useEffect } from 'react'
import axios from 'axios';

const API_URL = "http://localhost:5005";

export default function ProfilePhoto(props) {

    const [user, setUser] = useState('');

    const isFollowing = () => {
        axios.get(`${API_URL}/users/following/${props.userId}`, { withCredentials: true })
        .then(response => {
            setUser(response.data)
        })
        .catch(err => console.log(err));

        const userId = props.userId
        axios.post(`${API_URL}/follow/request`, userId ,{ withCredentials: true })
        .then(response => {
            console.log('request:', response);
        })
        .catch(err => console.log(err));
    }

    useEffect(() => {
        const getInfo = () => {
            axios.get(`${API_URL}/users/visit/${props.userId}`, { withCredentials: true })
            .then(response => {
                setUser(response.data);
            })
            .catch(err => console.log('err:',err))
        }
        getInfo(); 
      }, [])

    return (
        <div className='visit-profile-image' style={{zIndex:2}}>
        <img src={user.profilePicture} alt="" onClick={() => isFollowing()} />
            {user ? <h1>{user.username}</h1> : 'unknown'}
            {user ? <div className='visit-followers'>
                        <h3>Following: {user.following.length}</h3> 
                        <h3>Followers: {user.followers.length}</h3>
                     </div> : ''}
            
        </div>
    )
}

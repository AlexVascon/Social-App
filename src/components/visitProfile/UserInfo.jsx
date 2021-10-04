import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = "http://localhost:5005";

export default function UserInfo(props) {


    const [user, setUser] = useState('')

    useEffect(() => {
        const getInfo = () => {
            axios.get(`${API_URL}/users/visit/${props.userId}`, { withCredentials: true })
            .then(response => {
               setUser(response.data)
            })
            .catch(err => console.log('err:',err))
        }
        getInfo(); 
    }, [])


    return (
        <div id='user-info' className='user-info'>
        <h3>User Info</h3>

        <form className='form-info'>
        <div className='label-info'>
        <label htmlFor='city' >City:</label>
            <input 
            type="text" 
            placeholder={user.city}
            name='city' 
            />
        </div>
        <div className='label-info'>
        <label htmlFor='from' >From:</label>
            <input 
            type="text" 
            placeholder={user.from}
            name='from' 
            />
        </div>
        <button style={{display: 'none'}} type='submit'>Save</button>
        </form>
        </div>
    )
}

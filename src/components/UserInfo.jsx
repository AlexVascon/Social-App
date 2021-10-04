import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = "http://localhost:5005";

export default function UserInfo() {

    const [city, setCity] = useState('');
    const [from, setFrom] = useState('');

    const handleCity = (e) => setCity(e.target.value);
    const handleFrom = (e) => setFrom(e.target.value);

    const handleInfoSubmit = (e) => {
        e.preventDefault();
        const data = { city, from } 
        axios.post(`${API_URL}/profile/info`, data, { withCredentials: true })
        .then(response => {
            console.log('profile info', response);
        })
        .catch(err => console.log('info error:', err)); 
    }

    useEffect(() => {
        const getInfo = () => {
            axios.get(`${API_URL}/profile/info`, { withCredentials: true })
            .then(response => {
                setCity(response.data.city);
                setFrom(response.data.from);
            })
            .catch(err => console.log('err:',err))
        }
        getInfo(); 
    }, [])


    return (
        <div id='user-info' className='user-info'>
        <h3>User Info</h3>

        <form onSubmit={handleInfoSubmit} className='form-info'>
        <div className='label-info'>
        <label htmlFor='city' >City:</label>
            <input 
            type="text" 
            placeholder={city}
            name='city' 
            onChange={handleCity}
            />
        </div>
        <div className='label-info'>
        <label htmlFor='from' >From:</label>
            <input 
            type="text" 
            placeholder={from}
            name='from' 
            onChange={handleFrom}
            />
        </div>
        <button type='submit'>Save</button>
        </form>
        </div>
    )
}

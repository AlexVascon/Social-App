import React, { useEffect, useState, useContext } from 'react';
import './backdrop.css';
import axios from 'axios';
import ProfilePhoto from '../profilePhoto/ProfilePhoto';
import { AuthContext } from '../../../context/auth.context';

const API_URL = "http://localhost:5005";

export default function Backdrop(props) {

    const [file, setFile] = useState('');

    useEffect(() => {
        const getInfo = () => {
            axios.get(`${API_URL}/users/visit/${props.userId}`, { withCredentials: true })
            .then(response => {
                setFile(response.data.coverPicture);
            })
            .catch(err => console.log('err:',err))
        }
        getInfo(); 
      }, [])


    return (
        <div id='backdrop' className='backdrop' style={{backgroundImage: `url(${file})`}}>
        <ProfilePhoto userId={props.userId} />
    </div>
    )
}

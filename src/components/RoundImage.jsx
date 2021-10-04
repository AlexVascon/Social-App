import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';

const API_URL = "http://localhost:5005";

export default function RoundImage() {

    const [file, setFile] = useState('');
    const [username, setUsername] = useState('');

    const handleUpload = e => {
        const uploadData = new FormData();
        uploadData.append('profilePicture', e.target.files[0]);

        axios.post(`${API_URL}/profile/upload/profilePicture`, uploadData, { withCredentials: true })
          .then(res => setFile(res.secure_url))
          .catch(err => console.log('here?', err));
      };

      useEffect(() => {
        const getInfo = () => {
            axios.get(`${API_URL}/profile/info`, { withCredentials: true })
            .then(response => {
                setFile(response.data.profilePicture);
                setUsername(response.data.username);
            })
            .catch(err => console.log('err:',err))
        }
        getInfo(); 
      })
    


    return (
        
        <div className='round-image' style={{zIndex:2}}>
         <Avatar alt={username} src={file} sx={{ width: 200, height: 200 }} className='comp-border-white'>
        <label htmlFor="file">
        {/* <img src={file} alt="" /> */}
            <input style={{display: 'none'}} type="file" id='file' accept='.png, .jpeg, .jpg' onChange={handleUpload} />
        </label>
        </Avatar>
        {username ? <h1>{username}</h1> : 'unknown'}
        </div>
       
    )
}

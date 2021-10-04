

import { useEffect, useState } from 'react';
import './postForm.css';
import axios from 'axios';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Avatar from '@mui/material/Avatar';

const API_URL = "http://localhost:5005";

export default function PostForm() {

    const [username, setUsername] = useState('');
    const [file, setFile] = useState('');
    const [description, setDescription] = useState('');
    const [profilePicture , setProfilePicture] = useState('');


    const handleDescription = e => {setDescription(e.target.value)};

    const handleUploadPost = e => {
        const uploadData = new FormData();
        uploadData.append('postPicture', e.target.files[0]);

        axios.post(`${API_URL}/post/upload/postPicture`, uploadData, { withCredentials: true })
          .then(res => {
            setFile(res.data.secure_url)
        })
          .catch(err => console.log('here?', err));
      };


    const handlePostSubmit = e => {
        const data = { file , description }
        axios.post(`${API_URL}/post/create`, data, { withCredentials: true })
        .then(response => {
            console.log('response post data: ', response);
        })
        .catch(err => console.log('info error:', err)); 
    }

    useEffect(() => {
        const getInfo = () => {
            axios.get(`${API_URL}/profile/info`, { withCredentials: true })
            .then(response => { 
                setUsername(response.data.username);
                setProfilePicture(response.data.profilePicture);
            })
            .catch(err => console.log('err:',err))
        }
        getInfo(); 
    }, [])


    return (
        <div className='post'>
        <form className='post-form' onSubmit={handlePostSubmit}>
        <div className='post-form-top'>
        <Avatar alt={username} src={profilePicture} sx={{ width: 40, height: 40 }} />
               <input 
               type="text" 
               value={description}
               placeholder={`What's on your mind ${username}?`}
               name='post'
               onChange={handleDescription}
               />
               <hr className="sidebarHr" />
        </div>
            <div className='below-input'>
                <div className='post-icons'>
                    <div className='shareOption'>
                        <label htmlFor="postFile">
                         <PermMediaIcon fontSize='large' style={{fill: "orange" }} />
                         <input style={{display: 'none'}} type="file" id='postFile' accept='.png, .jpeg, .jpg' onChange={handleUploadPost} />
                         </label>
                         </div>
                     <div className='shareOption'>
                         <LabelIcon fontSize='large' style={{fill: "blue"}}/>
                     </div>
                     <div className='shareOption'>
                     <LocationOnIcon fontSize='large' style={{fill: "green"}}/>
                     </div>
            </div>
            <button type='submit'>Post</button>
            </div>
        </form>
        </div>
    )
}

import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';

const API_URL = "http://localhost:5005";

export default function RoundImage() {

    const [file, setFile] = useState('');
    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [user, setUser] = useState('');

    const handleUpload = async (e) => {
        try {
            const uploadData = new FormData();
            uploadData.append('profilePicture', e.target.files[0]);
            await axios.post(`${API_URL}/profile/upload/profilePicture`, uploadData, { withCredentials: true })
        } catch (err) {
            console.log(err)
        }
        // const uploadData = new FormData();
        // uploadData.append('profilePicture', e.target.files[0]);

        // axios.post(`${API_URL}/profile/upload/profilePicture`, uploadData, { withCredentials: true })
        //   .then(res => setFile(res.secure_url))
        //   .catch(err => console.log('here?', err));
      };

    const handleDescription = (e) => setDescription(e.target.value);

      useEffect(() => {
          const getUserDetails = async () => {
              try {
                  const user = await axios.get(`${API_URL}/profile/info`, { withCredentials: true });
                  setUser(user.data);
              } catch (err) {

              }
          }
        // const getInfo = () => {
        //     // axios.get(`${API_URL}/profile/info`, { withCredentials: true })
        //     .then(response => {
        //         setFile(response.data.profilePicture);
        //         setUsername(response.data.username);
        //         setDescription(response.data.description);
        //     })
        //     .catch(err => console.log('err:',err))
        // }
        // getInfo(); 
        getUserDetails();
      }, [])


      const handleDescriptionSubmit = async (e) => {
          e.preventDefault();
          try {
                const data = { description }
              const res = await axios.post(`${API_URL}/profile/description`, data, { withCredentials: true })
              setDescription(res.data.description)
          } catch (err) {
              console.log(err)
          }

      }
    

    return (
        
        <div className='round-image' style={{zIndex:2}}>
         <Avatar alt={user?.username} src={user?.profilePicture} sx={{ width: 200, height: 200 }} className='comp-border-white'>
        <label htmlFor="file">
            <input className='profileImg' style={{display: 'none'}} type="file" id='file' accept='.png, .jpeg, .jpg' onChange={handleUpload} />
        </label>
        </Avatar>
        {user? <h1>{user?.username}</h1> : 'unknown'}
        <form className='description-form' action="" onSubmit={handleDescriptionSubmit}>
            <input className='description' type="text" name='from' placeholder={user?.description} onChange={handleDescription}/>
            <button type='submit'>Save</button>
        </form>
        {/* {description ? <p>{description}</p> : 'no description'} */}
        </div>
       
    )
}

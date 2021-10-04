// import React, { useEffect, useState} from 'react';
// import axios from 'axios';
// import ProfilePhoto from './ProfilePhoto';

// const API_URL = "http://localhost:5005";

// export default function CoverPhoto(props) {

//     const [file, setFile] = useState('');

//     useEffect(() => {
//         const getInfo = () => {
//             axios.get(`${API_URL}/users/visit/${props.userId}`, { withCredentials: true })
//             .then(response => {
//                 setFile(response.data.coverPicture);
//             })
//             .catch(err => console.log('err:',err))
//         }
//         getInfo(); 
//       }, [])


//     return (
//         <div id='backdrop' className='backdrop' style={{backgroundImage: `url(${file})`}}>
//         <ProfilePhoto userId={props.userId} />
//     </div>
//     )
// }

// import React, {useEffect, useState} from 'react';
// import PostBox from './PostBox';
// import axios from 'axios';

// const API_URL = "http://localhost:5005";

// export default function PostList() {

//     const [posts, setPosts] = useState([]);

//     useEffect(() => {
//         const allUserPosts = () => {
//             axios.get(`${API_URL}/post/all`, { withCredentials: true })
//             .then(response => {
//                 setPosts(response.data);
//             })
//             .catch(err => console.log(err));
//         }

//         allUserPosts();
//     }, [])

//     return (
//         <div className='post-list'>
//         {posts.map(post => {
//            return <PostBox post={post}/>
//         })}
               
//         </div>
//     )
// }

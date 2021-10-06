import React, {useEffect, useState} from 'react';
import './postList.css'
import axios from 'axios';
// import Post from '../post/Post';
// import Post from '../../visitProfile/postList/PostList'
import Post from '../../visitProfile/post/Post'

const API_URL = "http://localhost:5005";

export default function PostList({ userId }) {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const allUserPosts = async () => {
            try {
                const posts = await axios.get(`${API_URL}/post/viewedUser/${userId}`, { withCredentials: true })
                setPosts(posts.data)
            } catch (err) {
                console.log(err)
            }
        }

        // axios.get(`${API_URL}/post/viewedUser/${userId}`, { withCredentials: true })
        //     .then(response => {
        //         setPosts(response.data);
        //     })
        //     .catch(err => console.log(err));
        allUserPosts();
    }, [])

    return (
        <div className='post-list'>
        {posts?.map(post => {
           return <Post post={post}/>
        }) }     
        </div>
    )
}


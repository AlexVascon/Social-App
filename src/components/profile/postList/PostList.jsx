import React, {useEffect, useState} from 'react';
import './postList.css'
import axios from 'axios';
import Post from '../post/Post';

const API_URL = "http://localhost:5005";

export default function PostList() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const allUserPosts = () => {
            axios.get(`${API_URL}/post/all`, { withCredentials: true })
            .then(response => {
                setPosts(response.data);
            })
            .catch(err => console.log(err));
        }

        allUserPosts();
    }, [])

    return (
        <div className='post-list'>
        {posts.map(post => {
           return <Post post={post}/>
        })}
               
        </div>
    )
}

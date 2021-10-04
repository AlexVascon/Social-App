import React, {useEffect, useState} from 'react';
import axios from 'axios';
import PostCard from './PostCard';

const API_URL = "http://localhost:5005";

export default function PostList(props) {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const allUserPosts = () => {
            axios.get(`${API_URL}/post/viewedUser/${props.userId}`, { withCredentials: true })
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
           return <PostCard post={post}/>
        })}     
        </div>
    )
}

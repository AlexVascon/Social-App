import React, {useEffect, useState} from 'react';
import './feedList.css'
import axios from 'axios';
// import FeedPost from './FeedPost';
import FeedPost from '../feedPost/FeedPost';


const API_URL = "http://localhost:5005";

export default function FeedtList() {

    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getInfo = () => {
            axios.get(`${API_URL}/profile/info`, { withCredentials: true })
            .then(response => {
                setUser(response.data);
            })
            .catch(err => console.log('err:',err))
        }
        const allUserPosts = () => {
            axios.get(`${API_URL}/post/feed`, { withCredentials: true })
            .then(response => {
                setPosts(response.data);
            })
            .catch(err => console.log(err));
        }
        getInfo(); 
        allUserPosts();
    }, [])

    return (
        <div className='post-list'>
        {posts.map(post => {
           return <FeedPost post={post} user={user}/>
        })}
               
        </div>
    )
}

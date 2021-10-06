import React, {useEffect, useState} from 'react';
import './feedList.css'
import axios from 'axios';
// import FeedPost from './FeedPost';
import FeedPost from '../feedPost/FeedPost';


const API_URL = "http://localhost:5005";

export default function FeedtList() {

    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState('');
    // let users = [{}]

    useEffect(() => {
        const allUserPosts = async () => {

            try {
                const res = await axios.get(`${API_URL}/post/feed`, { withCredentials: true })

                const postData = res.data.sort((p1,p2) => {
                    return new Date(p2.createdAt) - new Date(p1.createdAt);
                })

                setPosts(
                    res.data.sort((p1,p2) => {
                        return new Date(p2.createdAt) - new Date(p1.createdAt);
                    })
                )

                let postUsers = []
                for (let index in postData) {
                    const userResponse = await axios.get(`${API_URL}/users/${postData[index].userId}`, { withCredentials: true })
                    await setUsers([...users, {user: userResponse.data, post: postData[index]}])
                    console.log('users:', users)
                    postUsers.push({user: userResponse.data, post: postData[index]});
                }

                setUsers(postUsers)
              
            } catch (err) {
                console.log(err)
            }
        }
        allUserPosts();
    }, [])

    return (
        <div className='post-list'>
        {users ? (users.map(post => {
           return <FeedPost post={post.post} user={post.user}/>
        })) : ('')}
               
        </div>
    )
}

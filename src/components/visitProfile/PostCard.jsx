import React, {useState, useEffect} from 'react'
import axios from 'axios';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import ChatIcon from '@mui/icons-material/Chat';

const API_URL = "http://localhost:5005";

export default function PostCard(props) {

    const [likeAmount, setLikeAmount] = useState(props.post.likes.length);
    const [commentBox, setCommentBox] = useState('none')

    const pressedLike = () => {
        axios.get(`${API_URL}/post/like/${props.post._id}`, { withCredentials: true })
        .then(response => {
            setLikeAmount(response.data.likes.length);
        })
        .catch(err => console.log(err));
    }

    const toggleComments = () => {
        commentBox === 'none' ? setCommentBox('block'): setCommentBox('none');
    }

    useEffect(() => {
        pressedLike();
    }, [])

    return (
        <>
        <div className='post-body'>
        <div className='post-header'>
        <p>{props.post.description}</p>
        </div>
        <div className='post-image'>
        <img src={props.post.img} alt="" />
        </div>
        <div className='post-comments' style={{ display: commentBox}}>
        <h1>Post comments div</h1>
        </div>
        <div className='post-footer'>
        <ChatIcon className='sidebarIcon' onClick={() => toggleComments()} />
        <span><ThumbUpAltRoundedIcon className='thumb-icon' onClick={() => pressedLike()}/>{likeAmount}</span>
        </div>
        </div>
        </>
    )
}

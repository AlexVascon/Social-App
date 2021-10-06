import React, {useEffect, useState} from 'react'
import './post.css'
import ChatIcon from '@mui/icons-material/Chat';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import axios from 'axios';
import { TextField } from '@material-ui/core';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import {format} from 'timeago.js';
import Comments from '../../visitProfile/comments/Comments'
import Badge from '@mui/material/Badge';

const API_URL = "http://localhost:5005";

export default function Post(props) {

    console.log('post:', props.post)
    const [user, setUser] = useState('')

    const [likeAmount, setLikeAmount] = useState(props.post?.likes.length);
    const [commentBox, setCommentBox] = useState('none');
    const [comment, setComment] = useState('');

    const [comments, setComments] = useState([]);

    
    useEffect(() => {
        const getComments = async () => {
            try {
                const allComments = await axios.get(`${API_URL}/comments/post/${props.post?.postId}`, { withCredentials: true })
                setComments(allComments.data);
            } catch (err) {
                console.log(err)
            }
        }
        getComments();
    }, [])
    

    const handleComment = (e) => setComment(e.target.value);

    const pressedLike = async () => {
        try {
            const res = await axios.get(`${API_URL}/post/like/${props.post?._id}`, { withCredentials: true })
            setLikeAmount(res.data.likes.length)
        } catch (err) {
            console.log(err)
        }
        // axios.get(`${API_URL}/post/like/${props.post?._id}`, { withCredentials: true })
        // .then(response => {
        //     setLikeAmount(response.data.likes.length);
        // })
        // .catch(err => console.log(err));
    }

    const toggleComments = () => {
        console.log('here')
        commentBox === 'none' ? setCommentBox('block') : setCommentBox('none');
    }

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        try {
            const postId = props.post?._id
            const data = { comment, postId };
            const newPost = await axios.post(`${API_URL}/comments/create`, data, { withCredentials: true })
            setComments([...comments, newPost.data])
        } catch (err) {
            console.log(err);
        }
        // const postId = props.post._id
        // const data = { comment, postId };
        // axios.post(`${API_URL}/comments/create`, data, { withCredentials: true })
        // .then(response => {
        //     console.log('comment response', response)
        //     setComments([...comments, response.data])
        // })
        // .catch(err => console.log(err));
    }

    // useEffect(() => {
    //     pressedLike();
    // }, [])

    useEffect(() => {
        const getInfo = () => {
            axios.get(`${API_URL}/users/${props.post.userId}`, { withCredentials: true })
            .then(response => { 
                setUser(response.data);
            })
            .catch(err => console.log('err:',err))
        }
        getInfo(); 
    }, [])

    return (
        <>
        <div className='post-body'>
        <div className='post-header'>
        <Avatar alt={user?.username} src={user?.profilePicture} sx={{ width: 40, height: 40 }} />
        <h4>{user?.username}</h4>
        <span>{format(props.post.createdAt)}</span>
        </div>
        <div className='post-description'>
        <p>{props.post.description}</p>
        </div>
        <div className='post-image'>
        <img src={props.post.img} alt="" />
        </div>
        <div className='post-comments' style={{ display: commentBox}}>
        {/* <Comments postId={props.post._id}/> */}
        {comments ? (comments.map(comment => (
            <Comments comment={comment}/>
        ))) : ('...loading') }
        </div>
        <form className='post-comment-form' onSubmit={handleCommentSubmit}>
            <TextField
                size="small"
                value={comment}
                variant="outlined"
                className="comment-post-input"
                placeholder="add comment"
                onChange={handleComment}
            />
            <Button
            variant="contained"
            size="small"
            color='secondary'
            endIcon={<SendIcon />}
            type="submit"
             >
            Send
            </Button>
        </form>
        <div className='post-footer'>
        <Badge badgeContent={likeAmount} anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}>
        <span><ThumbUpAltRoundedIcon className='thumb-icon' onClick={() => pressedLike()}/></span>
        </Badge>
        <ChatIcon className='footerIcon' onClick={() => toggleComments()} />
        </div>
        </div>
        </>
    )
}

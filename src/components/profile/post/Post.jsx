import React, {useEffect, useState} from 'react'
import './post.css'
import DeleteIcon from '@mui/icons-material/Delete';
import ChatIcon from '@mui/icons-material/Chat';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import axios from 'axios';
import { TextField } from '@material-ui/core';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import {format} from 'timeago.js';
import Comments from '../comments/Comments';
import Badge from '@mui/material/Badge';

const API_URL = "http://localhost:5005";

export default function Post(props) {

    const [user, setUser] = useState('')

    const [likeAmount, setLikeAmount] = useState(props.post.likes.length);
    const [commentBox, setCommentBox] = useState('none');
    const [comment, setComment] = useState('');
    

    const handleComment = (e) => setComment(e.target.value);

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

    const handleCommentSubmit = (e) => {
        e.preventDefault();

        const postId = props.post._id
        const data = { comment, postId };
        axios.post(`${API_URL}/comments/create`, data, { withCredentials: true })
        .then(response => {
            console.log('comment response', response)
        })
        .catch(err => console.log(err));
    }

    useEffect(() => {
        pressedLike();
    }, [])

    const deletePost = (post) => {
        axios.post(`${API_URL}/post/delete`, post, { withCredentials: true })
        .then(response => {
            console.log('post deleted succesfully', response)
        })
        .catch(err => console.log('problem?:', err));
    }

    useEffect(() => {
        const getInfo = () => {
            axios.get(`${API_URL}/profile/info`, { withCredentials: true })
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
        <Avatar alt={user.username} src={user.profilePicture} sx={{ width: 40, height: 40 }} />
        <h4>{user.username}</h4>
        <span>{format(props.post.createdAt)}</span>
        </div>
        <div className='post-description'>
        <p>{props.post.description}</p>
        </div>
        <div className='post-image'>
        <img src={props.post.img} alt="" />
        </div>
        <div className='post-comments' style={{ display: commentBox}}>
        <Comments postId={props.post._id}/>
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
        <span className='delete-icon-span' onClick={() => deletePost(props.post)}><DeleteIcon className='delete-icon' /></span>
        </div>
        </div>
        </>
    )
}

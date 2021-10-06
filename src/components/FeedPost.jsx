// import React, {useEffect, useState} from 'react'
// import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
// import ChatIcon from '@mui/icons-material/Chat';
// import axios from 'axios';
// import Comments from './Comments';
// import { TextField } from '@material-ui/core';
// import { Avatar, Button } from '@mui/material';
// import SendIcon from '@mui/icons-material/Send';
// import {format} from 'timeago.js';

// const API_URL = "http://localhost:5005";

// export default function FeedPost(props) {

//     const [likeAmount, setLikeAmount] = useState(props.post.likes.length);
//     const [commentBox, setCommentBox] = useState('none');
//     const [comment, setComment] = useState('');
    

//     const handleComment = (e) => setComment(e.target.value);

//     const pressedLike = () => {
//         axios.get(`${API_URL}/post/like/${props.post._id}`, { withCredentials: true })
//         .then(response => {
//             setLikeAmount(response.data.likes.length);
//         })
//         .catch(err => console.log(err));
//     }

//     const toggleComments = () => {
//         commentBox === 'none' ? setCommentBox('block'): setCommentBox('none');
//     }

//     const handleCommentSubmit = (e) => {
//         e.preventDefault();

//         const postId = props.post._id
//         const data = { comment, postId };
//         axios.post(`${API_URL}/comments/create`, data, { withCredentials: true })
//         .then(response => {
//             console.log('comment response', response)
//         })
//         .catch(err => console.log(err));
//     }

//     useEffect(() => {
//         pressedLike();
//     }, [])

//     return (
//         <>
//         <div className='post-body'>
//         <div className='post-header'>
//         {/* <Avatar alt={props.user.username} src={props.user.profilePicture} sx={{ width: 40, height: 40 }} />
//         <h4>{props.user.username}</h4> */}
//         <div>{format(props.post.createdAt)}</div>
//         </div>
//         <div className='post-description'>
//             <p>{props.post.description}</p>
//         </div>
//         <div className='post-image'>
//         <img src={props.post.img} alt="" />
//         </div>
//         <div className='post-comments' style={{ display: commentBox}}>
//         <Comments postId={props.post._id}/>
//         </div>
//         <form className='post-comment-form' onSubmit={handleCommentSubmit}>
//             <TextField 
//                 size="small"
//                 value={comment}
//                 variant="outlined"
//                 className="comment-post-input"
//                 placeholder="add comment"
//                 onChange={handleComment}
//             />
//             <Button
//             variant="contained"
//             size="small"
//             color='secondary'
//             endIcon={<SendIcon />}
//             type="submit"
//              >
//             Send
//             </Button>
//         </form>
//         <div className='post-footer'>
//         <ChatIcon className='sidebarIcon' onClick={() => toggleComments()} />
//         <span><ThumbUpAltRoundedIcon className='thumb-icon' onClick={() => pressedLike()}/>{likeAmount}</span>
//         </div>
//         </div>
//         </>
//     )
// }

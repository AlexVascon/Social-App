import React from 'react';
import './visit.css';
import { useParams } from 'react-router-dom';
import SideBar from '../../components/SideBar';
// import FriendsList from '../../components/visitProfile/FriendsList';
import FriendsList from '../../components/visitProfile/friendsList/FriendsList'
// import PostList from '../../components/visitProfile/PostList';
import PostList from '../../components/visitProfile/postList/PostList'
import UserInfo from '../../components/visitProfile/UserInfo';
import Backdrop from '../../components/visitProfile/backdrop/Backdrop';


export default function Visit() {
    
    const { userId } = useParams();

    return (
       <div className='profilePaigeContainer'>
            <SideBar />
            <div className='right-profile-view'>
                <Backdrop userId={userId} />
                <div className='below-backdrop-view'>
                     <div className='post-card'>
                         <PostList userId={userId}/>
                     </div>
                     <div id='profile-info' className='right-info-view'>
                         <UserInfo userId={userId}/>
                         <FriendsList userId={userId} />
                     </div>
                </div>
            </div>
        </div>  
    )
}

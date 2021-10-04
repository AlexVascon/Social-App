import React from 'react';
import { useParams } from 'react-router-dom';
import SideBar from '../components/SideBar';
import CoverPhoto from '../components/visitProfile/CoverPhoto';
import FriendsList from '../components/visitProfile/FriendsList';
import PostList from '../components/visitProfile/PostList';
import UserInfo from '../components/visitProfile/UserInfo';


export default function Visit() {
    
    const { userId } = useParams();

    return (
       <div className='profile-page'>
            <SideBar />
            <div className='right-profile-view'>
                <CoverPhoto userId={userId} />
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

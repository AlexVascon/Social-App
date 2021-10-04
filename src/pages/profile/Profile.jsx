import React from 'react'
import './profile.css';
import Backdrop from '../../components/Backdrop'
import FriendList from '../../components/profile/friendsList/FriendsList';
import PostForm from '../../components/profile/postForm/PostForm';
import PostList from '../../components/profile/postList/PostList';
import SideBar from '../../components/profile/sidebar/SideBar';
import UserInfo from '../../components/UserInfo'


export default function Profile() {


    return (
        <div className='profilePaigeContainer'>
            <SideBar />
            <div className='right-profile-view'>
                <Backdrop />
                <div className='below-backdrop-view'>
                    <div className='post-card'>
                         <PostForm />
                         <PostList />
                    </div>
                     <div id='profile-info' className='right-info-view'>
                         <UserInfo />
                         <FriendList />
                     </div>
                </div>
            </div>
        </div>
    )
}

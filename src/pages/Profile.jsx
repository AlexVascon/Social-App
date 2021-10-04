import React from 'react'
import Backdrop from '../components/Backdrop'
import FriendSuggestions from '../components/FriendSuggestions'
import Post from '../components/Post'
import PostList from '../components/PostList'
import SideBar from '../components/SideBar'
import UserInfo from '../components/UserInfo'


export default function Profile() {


    return (
        <div className='profile-page'>
            <SideBar />
            <div className='right-profile-view'>
                <Backdrop />
                <div className='below-backdrop-view'>
                    <div className='post-card'>
                         <Post />
                         <PostList />
                    </div>
                     <div id='profile-info' className='right-info-view'>
                         <UserInfo />
                         <FriendSuggestions />
                     </div>
                </div>
            </div>
        </div>
    )
}

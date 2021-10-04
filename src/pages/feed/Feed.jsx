import React from 'react'
import './feed.css'
import PostForm from '../../components/feed/postForm/PostForm'
import SideBar from '../../components/SideBar'
import FeedtList from '../../components/feed/feedList/FeedList'
import UsersList from '../../components/feed/usersList/UsersList'



export default function Feed() {


    return (
        <div className='feedContainer'>
            <SideBar />
            <div className='right-profile-view'>
                <div className='below-backdrop-view'>
                <div className='post-card'>
                    <PostForm />
                    <FeedtList />
                </div>
                     <div id='profile-info' className='right-info-view'>
                         <UsersList />
                     </div>
                </div>
            </div>
        </div>
    )
}

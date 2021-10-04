import React from 'react'
import Post from '../components/Post'
import SideBar from '../components/SideBar'
import UsersList from '../components/UsersList'
import FeedtList from '../components/FeedList'


export default function Feed() {


    return (
        <div className='profile-page'>
            <SideBar />
            <div className='right-profile-view'>
                <div className='below-backdrop-view'>
                <div className='post-card'>
                    <Post />
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

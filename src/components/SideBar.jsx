import React from 'react'
import ChatIcon from '@mui/icons-material/Chat';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import GroupIcon from '@mui/icons-material/Group';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import FriendSuggestions from './FriendSuggestions';

export default function SideBar() {
    return (
        <div id='sidebar' className='side-bar'>
            <ul className='sidebarList'>
                <li className='sidebarListItem'>
                    <ChatIcon className='sidebarIcon' fontSize='large'/>
                    <span className='sidebarListItemText'>Chats</span>
                </li>
                <li className='sidebarListItem'>
                    <PlayCircleIcon className='sidebarIcon' fontSize='large'/>
                    <span className='sidebarListItemText'>Videos</span>
                </li>
                <li className='sidebarListItem'>
                    <GroupIcon className='sidebarIcon' fontSize='large'/>
                    <span className='sidebarListItemText'>Groups</span>
                </li>
                <li className='sidebarListItem'>
                    <BookmarkIcon  className='sidebarIcon' fontSize='large'/>
                    <span className='sidebarListItemText'>Bookmarks</span>
                </li>
                <li className='sidebarListItem'>
                    <HelpOutlineIcon className='sidebarIcon' fontSize='large'/>
                    <span className='sidebarListItemText'>Questions</span>
                </li>
                <li className='sidebarListItem'>
                    <WorkOutlineIcon  className='sidebarIcon' fontSize='large'/>
                    <span className='sidebarListItemText'>Jobs</span>
                </li>
                <li className='sidebarListItem'>
                    <EventIcon className='sidebarIcon' />
                    <span className='sidebarListItemText'>Events</span>
                </li>
                <li className='sidebarListItem'>
                    <SchoolIcon className='sidebarIcon' fontSize='large'/>
                    <span className='sidebarListItemText'>Courses</span>
                </li>
            </ul>
            <hr className="sidebarHr" />
        </div>
    )
}

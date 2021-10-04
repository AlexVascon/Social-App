import {useState, useEffect} from 'react';
import axios from 'axios';
import LogoutIcon from '@mui/icons-material/Logout';
import ChatList from './chats/ChatList';

const API_URL = "http://localhost:5005";

export default function FriendsToChat() {

    const [user, setUser] = useState('')

    useEffect(() => {
        const getInfo = () => {
            axios.get(`${API_URL}/profile/info`, { withCredentials: true })
            .then(response => {
                setUser(response.data);
            })
            .catch(err => console.log('err:',err));
        }
        getInfo(); 
    }, [])
    
    return (
        <div className='chat-list'>
            <div>
             {user ? <img src={user.profilePicture} alt=""/> : <img src='./public/logo192.png' alt="" />}   
             <LogoutIcon  fontSize='large'/>
            </div>
            <ChatList />
        </div>
    )
}

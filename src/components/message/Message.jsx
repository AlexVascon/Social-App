import { Avatar } from '@mui/material'
import './message.css'
import {format} from 'timeago.js'

export default function Message({message ,own}) {

   
    return (
        <div className={own ?  'message own' : 'message'}>
            <div className='messageTop'>
                <Avatar src={message.sender.profilePicture} className='messageImg' sx={{ width: 32, height: 32 }}/>
                <p className='messageText'>
                    {message.message}
                </p>
            </div>
            <div className='messageBottom'>{format(message.createdAt)}</div>
        </div>
    )
}

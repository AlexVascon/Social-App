import React from 'react'
import MaterialIcon, {colorPalette} from 'material-icons-react';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';


export default function User(props) {

    return (
        <div className='user-suggest'>
            <Link to={`/visit/${props.user._id}`}>
            <Avatar className='profileImg' alt={props.user.username} src={props.user.profilePicture} sx={{ width: 120, height: 120 }}/>
            </Link>
        </div>
    )
}

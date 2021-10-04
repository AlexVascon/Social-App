import { useState, useContext } from 'react';
import axios from "axios";
import { AuthContext } from '../context/auth.context'; 

const API_URL = "http://localhost:5005";

export default function UpdateUser(props) {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    const { logInUser } = useContext(AuthContext);  

    const handleUsername = (e) => setUsername(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const requestBody = { username, password };

        axios.post(`${API_URL}/auth/login`, requestBody, { withCredentials: true })
        .then(response => {
            const user = response.data;
            logInUser(user);
            props.history.push('/profile');
        })
        .catch(err => {
            console.log('err login', err);
            const errorDescription = err.response;
            setErrorMessage(errorDescription);
        })
    };

    return (
        <div className='login'>
           <form onSubmit={handleLoginSubmit} className='form'>
           <label htmlFor="">Username</label>
               <input 
               type="text" 
               placeholder='username...' 
               value={username}
               name='username'
               onChange={handleUsername}
               />
               {errorMessage ? <p className='error'>{errorMessage}</p> : ''}
               <label htmlFor="">Password</label>
               <input 
               type="password" 
               placeholder='password...' 
               value={password}
               name='password'
               onChange={handlePassword}
               />
               <button type='submit'>Login</button>
           </form>  
        </div>   
    )
}

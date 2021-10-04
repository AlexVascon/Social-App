import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios";


const API_URL = "http://localhost:5005";

export default function SignupForm(props) {
    

    const [errorMessage, setErrorMessage] = useState(undefined);
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        await axios.post(`${API_URL}/auth/signup`, data)
        .then(() => {
            props.history.push('/login') 
        })
        .catch((error) => {
            const errorDescription = error.response.data.message;
            setErrorMessage(errorDescription);
        })
    }

    return (
        <div className='signup'>
           <form onSubmit={handleSubmit(onSubmit)} className='form'>
           <label htmlFor="">Username</label>
               <input 
               type="text" 
               placeholder='username...' 
               {...register('username')} 
               name='username'
               />
               {errorMessage ? <p className='error'>{errorMessage}</p> : ''}
               <label htmlFor="">Password</label>
               <input 
               type="password" 
               placeholder='password...' 
               {...register('password')} 
               name='password'
               />
               <button type='submit'>Signup</button>
           </form>
           </div>
    )
}

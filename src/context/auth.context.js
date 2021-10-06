// src/context/auth.context.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
const API_URL = "http://localhost:5005";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {

  const history = useHistory();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const verifyStoredSession = () => {                          
  
    const storedSession = localStorage.getItem('sessionUser');
    
    if (storedSession) {
      axios.get(`${API_URL}/auth/user`, { withCredentials: true })
      .then((response) => {
        const user = response.data;
        setUser(user);
        setIsLoggedIn(true);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoggedIn(false);
        setUser(null);
        setIsLoading(false);
      });      
    } else {
      setIsLoading(false);
    }   
  }

  const logOutUser = () => {                                 
    localStorage.removeItem("sessionUser");
    const logout = async () => {
      try {
        const res = await axios.post(`${API_URL}/profile/logout`, {} , { withCredentials: true })
      } catch (err) {
        console.log(err)
      }
    }
    setIsLoggedIn(false);
    setUser(null);
    logout();
    history.push('/login');
  } 

  useEffect(() => {                                    
    verifyStoredSession(); 
  }, []);
  
  const logInUser = (sessionUser) => {                              
    localStorage.setItem('sessionUser', sessionUser);
    verifyStoredSession();
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, user, logInUser, logOutUser }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthProviderWrapper, AuthContext };

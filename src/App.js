import React, {  useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import Visit from './pages/Visit';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Feed from './pages/Feed'
import Chats from './pages/Chats';
import Login from './pages/Login';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import UpdateUser from './pages/UpdateUser';
import CurrentChat from './components/CurrentChat';
import Messenger from './pages/messenger/Messenger';


const API_URL = "http://localhost:5005";

function App() {

  const [value, setValue] = useState(null);
  const [user, setUser] = useState(undefined);

  const history = useHistory();

  const handleSignIn = async (event) => {
    event.preventDefault();

    const { username, password } = event.target;

    const myUser = {
      username: username.value,
      password: password.value
    }

    try{
      const userResponse = await axios.post(`${API_URL}/auth/login`, myUser, { withCredentials: true });
      setUser(userResponse.data);
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className="App">
     <Navbar />
    
    <Switch>
      <Route exact path='/visit/:userId' component={Visit} />
      <Route exact path='/messenger' component={Messenger} />
      <Route exact path='/chats/:chatId' component={CurrentChat} />
      <Route exact path='/edit' component={UpdateUser} />
      <Route exact path='/chats' component={Chats} />
      <Route exact path='/profile' component={Profile} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/feed' component={Feed} />
    </Switch>
    </div>

  );
}

export default App;

import axios from 'axios';
import {useContext, useState, useEffect, useRef} from 'react';
import ChatOnline from '../../components/chatOnline/ChatOnline';
import Conversations from '../../components/conversations/Conversations';
import Message from '../../components/message/Message';
import Box from '@mui/material/Box';
import { AuthContext } from '../../context/auth.context';
import './messenger.css';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { io } from "socket.io-client";


const API_URL = "http://localhost:5005";
const filter = createFilterOptions();

export default function Messenger() {

    const [value, setValue] = useState(null);
    const [users, setUsers] = useState([]);
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { user } = useContext(AuthContext);
    const scrollRef = useRef();
    const socket = useRef();

    useEffect(() => {
        socket.current = io('ws://localhost:6000');
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
              sender: data.senderId,
              text: data.text,
              createdAt: Date.now(),
            });
          });
    }, [])

    useEffect(() => {
        arrivalMessage &&
          currentChat?.members.includes(arrivalMessage.sender) &&
          setMessages((prev) => [...prev, arrivalMessage]);
      }, [arrivalMessage, currentChat]);

    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", (users) => {
          setOnlineUsers(
            user.following.filter((f) => users.some((u) => u.userId === f))
          );
        });
      }, [user]);

      useEffect(() => {
        const getConversations = async () => {
          try {
            const res = await axios.get(`${API_URL}/conversations/` + user._id, { withCredentials: true });
            setConversations(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        getConversations();
      }, [user._id]);

      useEffect(() => {
        const getMessages = async () => {
          try {
            const res = await axios.get(`${API_URL}/messages/` + currentChat?._id, { withCredentials: true });
            setMessages(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        getMessages();
      }, [currentChat]);

      const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
          sender: user._id,
          text: newMessage,
          conversationId: currentChat._id,
        };
    
        const receiverId = currentChat.members.find(
          (member) => member !== user._id
        );
    
        socket.current.emit("sendMessage", {
          senderId: user._id,
          receiverId,
          text: newMessage,
        });
    
        try {
          const res = await axios.post(`${API_URL}/messages`, message, { withCredentials: true });
          setMessages([...messages, res.data]);
          setNewMessage("");
        } catch (err) {
          console.log(err);
        }
      };

      useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messages]);


    const searchFriend =  async (friend) => {
        try {
            const convo = { senderId: user._id  , receiverId: friend._id}
            const res = await axios.post(`${API_URL}/conversations`, convo, { withCredentials: true })
            console.log('convo data:', res.data)
            setConversations([...conversations, res.data])
        } catch (err) {
            console.log(err)
        }
    }
   
    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await axios.get(`${API_URL}/users/friends`, { withCredentials: true })
                setUsers(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getUsers();
    }, [])

    return (
       <>
        {!user ?   <h1>Loading...</h1> : 
        <div className='messenger'>
            <div className='chatMenu'>
                <div className='chatMenuWrapper'>
                <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setValue({
            username: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          setValue({
            username: newValue.inputValue,
          });
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        const isExisting = options.some((option) => inputValue === option.username);
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            username: `Add "${inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={users}
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option;
        }
        if (option.inputValue) {
          return option.inputValue;
        }
        return option.username;
      }}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}  onClick={() => searchFriend(option)}>
          <img
            loading="lazy"
            width="20"
            src={option.profilePicture}
            srcSet={option.profilePicture}
            alt=""
          />
          {option.username} 
        </Box>
      )}
      sx={{ width: 300 }}
      freeSolo
      renderInput={(params) => (
        <TextField {...params}  placeholder='Search for friends' className='chatMenuInput'/>
      )}
    />
                {/* <input placeholder='Search for friends' type="text" className='chatMenuInput' onChange={handleUserSearch}/> */}
                {conversations.map(conversation => (
                    <div onClick={() => setCurrentChat(conversation)}>
                    <Conversations conversation={conversation} currentUser={user}/>
                    </div>
                ))}
                </div>
            </div>
            <div className='chatBox'>
                <div className='chatBoxWrapper'>
                {
                    currentChat ? (
                <>
                <div className='chatBoxTop'>
                {messages.map(message => (
                    <div ref={scrollRef}>
                    <Message message={message} own={message.sender === user._id} user={user}/>
                    </div>
                ))}
                </div>
                <div className='chatBoxBottom'>
                <textarea className='chatMessageInput' 
                placeholder='write something...' 
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
                >
                </textarea>
                <button className='chatSubmitButton' onClick={handleSubmit}>Send</button>
                </div>
                 </> 
                 ) : ( 
                    <span className='noConversationText'>
                    Open a conversation to start a chat.
                    </span>
                )}
                </div>
            </div>
            <div className='chatOnline'>
                <div className='chatOnlineWrapper'>
                <ChatOnline 
                    onlineUsers={onlineUsers}
                    currentId={user._id}
                    setCurrentChat={setCurrentChat}
                />
                </div>
            </div>
        </div>
        }
        </>
    )
}

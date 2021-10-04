import axios from 'axios';
import {useContext, useState, useEffect, useRef} from 'react';
import ChatOnline from '../../components/chatOnline/ChatOnline';
import Conversations from '../../components/conversations/Conversations';
import Message from '../../components/message/Message';
import { AuthContext } from '../../context/auth.context';
import './messenger.css';
import { io } from "socket.io-client";



const API_URL = "http://localhost:5005";

export default function Messenger() {

    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { user } = useContext(AuthContext);
    const scrollRef = useRef();
    const socket = useRef()
  
    useEffect(() => {
        socket.current = io(
            "http://localhost:5005",
            {
                reconnectionDelay: 1000,
                reconnection: true,
                reconnectionAttemps: 10,
                transports: ['websocket'],
                agent: false,
                upgrade: false,
                rejectUnauthorized: false
            });
        socket.current.on("getMessage", (data) => {
          setArrivalMessage({
            sender: data.senderId,
            message: data.message,
            createdAt: Date.now(),
          });
        });
      }, []);

      useEffect(() => {
        arrivalMessage &&
          currentChat?.participants.includes(arrivalMessage?.sender) &&
          setMessages((prev) => [...prev, arrivalMessage]);
      }, [arrivalMessage, currentChat]);

      useEffect(() => {
          console.log('line 45', user)
        socket.current.emit("addUser", user?._id);
        socket.current.on("getUsers", (users) => {
          setOnlineUsers(
            user?.following.filter((f) => users.some((u) => u.userId === f))
          );
        });
      }, [user]);
    

    useEffect(() => {
        console.log('line 56', user)
        const getConversations = () => {
                axios.get(`${API_URL}/chats/${user?._id}`, { withCredentials: true })
                .then(res => {
                    setConversations(res.data);
                })
        }
        getConversations();
    }, [user]);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get(`${API_URL}/messages/convoMessages/${currentChat?._id}`, { withCredentials: true })
                setMessages(res.data);
            } catch(err) {
                console.log(err)
            }
        }
        getMessages();
    }, [currentChat]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: user._id,
            message: newMessage,
            conversationId: currentChat._id
        };

        const receiverId = currentChat.participants.find(
            (member) => member !== user._id
          );
      
          socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            message: newMessage,
          });

        try{
            const res = await axios.post(`${API_URL}/messages/create`, message, { withCredentials: true })
            setMessages([...messages, res.data]);
            setNewMessage('');
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messages]);

    return (
       <>
        {!user ?   <h1>Loading...</h1> : 
        <div className='messenger'>
            <div className='chatMenu'>
                <div className='chatMenuWrapper'>
                <input placeholder='Search for friends' type="text" className='chatMenuInput'/>
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
                    <Message message={message} own={message.sender._id == user._id} />
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

import axios from 'axios'
import React, { Component, useRef, useState, useEffect, useParams } from 'react'
import io from "socket.io-client";
import { Redirect } from 'react-router-dom';

const API_URL = "http://localhost:5005";
let socket = ''

export default function CurrentChat(props) {

    let messagesEnd = useRef();
    const [state, setState] = useState({
        loading: true,
        messageList: [],
        currentMessage: ''
    })

    // const scrollToBottom = () => {
    //     messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    //   }
    
    //   useEffect(scrollToBottom, [messages]);

    const scrollToBottom = () => {
        messagesEnd.current.scrollIntoView({ behavior: "smooth" });
    }

    const handleMessageInput = (e) => {
        setState({
            currentMessage: e.target.value
        })
    }

    const sendMessage = async () => {
        // Create the object structure
        let messageContent = {
            chatId: props.user._id,
            content: {
              sender: props.user,
              message: state.currentMessage,
            },
          };
          
          // emit it so that everyone connected to the same chat receives the message
        await socket.emit("send_message", messageContent);
        setState({
            messageList: [...state.messageList, messageContent.content],
            currentMessage: ''
        }, () => {
            scrollToBottom();
        })
    }

    useEffect(() => {
        socket = io(`${API_URL}`);

        axios.get(`${API_URL}/chats/messages/${props.user._id}`)
            .then((response) => {
                setState({
                    loading: false, 
                    messageList: response.data
                }, () => {
                    scrollToBottom();
                })
            })

        socket.emit("join_chat", props.user._id);

        socket.on("receive_message", (data) => {
            console.log('Got data', data)
            setState({
                messageList: [...state.messageList, data]
            }, () => {
                scrollToBottom();
            })
        });  
        
        handleMessageInput();
        sendMessage();
    }, [])

    const { loading , messageList} = state
    const { user } = props

    return ( 
        <div>
                <h3>You're in the Chat Page </h3>
                <div className="chatContainer">
                    <div className="messages">
                        {
                            messageList.map((val) => {
                                return (
                                    <div key={val._id} className="messageContainer" id={val.sender.username == user.username ? "You" : "Other"}>
                                        <div className="messageIndividual">
                                            {val.sender.username}: {val.message}
                                        </div>
                                    </div>
                                );
                            })
                        }
                        <div style={{ float:"left", clear: "both" }}
                            ref={(el) => { messagesEnd = el; }}>
                        </div>
                    </div>
                    <div className="messageInputs">
                        <input value={state.currentMessage} type="text" placeholder="Message..."
                            onChange={handleMessageInput}
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
            </div>
    )
}

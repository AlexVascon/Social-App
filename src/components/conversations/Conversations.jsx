import axios from "axios";
import { useEffect, useState } from "react";
import "./conversations.css";
import Convo from '../convo/Convo';

const API_URL = "http://localhost:5005";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
      console.log('conversation object: ', conversation)
      console.log('user object:', currentUser)
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios(`${API_URL}/users/` + friendId, { withCredentials: true });
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <Convo key={user?._id} user={user} />
    </div>
  );
}


import MessageBubble from "./MessageBubble";
import styles from "../styles/Chatbot.module.css";
import { useEffect, useRef } from "react";

export default function ChatBody({ messages, avatar, onOpenVideo }) {
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={styles.chatBody} ref={chatBodyRef}>
      {messages.map((msg, index) => (
        <MessageBubble 
          key={index} 
          message={msg} 
          avatar={avatar} 
          onOpenVideo={onOpenVideo} 
        />
      ))}
    </div>
  );
}
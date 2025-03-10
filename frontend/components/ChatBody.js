import MessageBubble from "./MessageBubble";
import styles from "../styles/Chatbot.module.css";
import { useEffect, useRef } from "react";

export default function ChatBody({ messages, avatar }) {
  const chatBodyRef = useRef(null);

  // 🔹 Hace scroll automático cuando llegan nuevos mensajes
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={styles.chatBody} ref={chatBodyRef}>
      {messages.map((msg, index) => (
        <MessageBubble key={index} message={msg} avatar={avatar} />
      ))}
    </div>
  );
}

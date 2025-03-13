import MessageBubble from "./MessageBubble";
import styles from "../styles/Chatbot.module.css";
import { useEffect, useRef } from "react";

export default function ChatBody({ messages, avatar, onOptionSelect }) {
  const chatBodyRef = useRef(null);
  const lastMessageRef = useRef(null);
  const actionRef = useRef(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [messages]);

  useEffect(() => {
    if (actionRef.current) {
      actionRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [messages]);

  const lastBotMessageWithOptions = messages
    .slice()
    .reverse()
    .find((msg) => msg.sender === "bot" && msg.options?.length > 0);

  return (
    <div className={styles.chatBody} ref={chatBodyRef}>
      {messages.map((msg, index) => (
        <div key={index} ref={index === messages.length - 1 ? lastMessageRef : null}>
          <MessageBubble message={msg} avatar={avatar} />
        </div>
      ))}

      {lastBotMessageWithOptions && lastBotMessageWithOptions.options.length > 0 && (
        <div className={styles.actionButtons} ref={actionRef}>
          {lastBotMessageWithOptions.options.map((option, i) => (
            <button
              key={i}
              className={`${styles.optionButton} ${styles.growButton}`} 
              onClick={() => onOptionSelect(option.text, Number(option.next))}
            >
              {option.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

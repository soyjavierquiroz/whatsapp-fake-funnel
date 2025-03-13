import MessageBubble from "./MessageBubble";
import styles from "../styles/Chatbot.module.css";
import { useEffect, useRef } from "react";

export default function ChatBody({ messages, avatar, onOptionSelect }) {
  const chatBodyRef = useRef(null);
  const actionRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (actionRef.current) {
      actionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // 🔹 Encuentra el último mensaje del bot con opciones
  const lastBotMessageWithOptions = messages
    .slice()
    .reverse()
    .find((msg) => msg.sender === "bot" && msg.options?.length > 0);

  return (
    <div className={styles.chatBody} ref={chatBodyRef}>
      {messages.map((msg, index) => (
        <MessageBubble key={index} message={msg} avatar={avatar} />
      ))}

      {/* 🔹 Renderizar botones solo si hay opciones disponibles */}
      {lastBotMessageWithOptions && lastBotMessageWithOptions.options.length > 0 && (
        <div className={styles.actionButtons} ref={actionRef}>
          {lastBotMessageWithOptions.options.map((option, i) => (
            <button
              key={i}
              className={styles.optionButton}
              onClick={() => onOptionSelect(option.text, Number(option.next))}
            >
              {option.text}
            </button>
          ))}
        </div>
      )}

      {/* Ref para asegurar el scroll automático */}
      <div ref={actionRef} />
    </div>
  );
}

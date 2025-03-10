import React from "react";
import styles from "../styles/Chatbot.module.css";

const ChatHeader = ({ avatar, name }) => {
  return (
    <div className={styles.chatHeader}>
      <img src={avatar} alt={name} className={styles.avatar} />
      <div className={styles.chatInfo}>
        <strong>{name}</strong>
        <p>Online</p>
      </div>
      <div className={styles.icons}>
        <span>📞</span>
        <span>📎</span>
        <span>≡</span>
      </div>
    </div>
  );
};

export default ChatHeader;

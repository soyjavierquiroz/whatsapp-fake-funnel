import styles from "../styles/Chatbot.module.css";

export default function MessageBubble({ message, avatar }) {
  return (
    <div className={`${styles.messageWrapper} ${styles[message.sender]}`}>
      {message.sender === "bot" && <img src={avatar} alt="Avatar" className={styles.avatarMsg} />}
      <div className={`${styles.chatBubble} ${styles[message.sender]}`}>
        {message.typing ? (
          <div className={styles.typingIndicator}>
            <span></span><span></span><span></span>
          </div>
        ) : (
          <>
            {message.text && <p>{message.text}</p>}
            {message.image && <img src={message.image} alt="Imagen" className={styles.chatImage} />}
          </>
        )}
      </div>
    </div>
  );
}

import styles from "../styles/Chatbot.module.css";

export default function ChatHeader({ avatar, name }) {
  return (
    <div className={styles.chatHeader}>
      <div className={styles.headerLeft}>
        <span className={styles.backButton}>←</span> 
        <img src={avatar} alt={name} className={styles.avatar} />
        <div className={styles.userInfo}>
          <strong>{name}</strong>
          <p>Online</p>
        </div>
      </div>
      <div className={styles.icons}>
        <span className={styles.icon}>📞</span>
        <span className={styles.icon}>📎</span>
        <span className={styles.icon}>≡</span>
      </div>
    </div>
  );
}

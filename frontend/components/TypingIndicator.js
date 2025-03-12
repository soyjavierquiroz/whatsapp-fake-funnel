import styles from "../styles/Chatbot.module.css";

export default function TypingIndicator() {
  return (
    <div className={styles.typingIndicator}>
      <span></span><span></span><span></span>
    </div>
  );
}
import styles from "../styles/Chatbot.module.css";

export default function ChatFooter({ options, onOptionClick }) {
  if (!options || options.length === 0) return null; // 🔹 No renderiza si no hay opciones

  return (
    <div className={styles.chatFooter}>
      {options.map((option, index) => (
        <button
          key={index}
          className={styles.optionButton}
          onClick={() => onOptionClick(option.text, Number(option.next))}
        >
          {option.text}
        </button>
      ))}
    </div>
  );
}

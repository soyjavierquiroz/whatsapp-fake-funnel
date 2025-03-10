import { useState, useEffect, useRef } from "react";
import conversations from "../data/conversation";
import ChatHeader from "./ChatHeader"; 
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import SoundPlayer from "./SoundPlayer";
import UserForm from "./UserForm"; // ✅ Importamos el nuevo formulario
import styles from "../styles/Chatbot.module.css"; 

export default function Chatbot() {
  const conversationId = "janny-helguero"; // Se puede cambiar dinámicamente en el futuro
  const conversation = conversations[conversationId];

  const [messages, setMessages] = useState([
    { text: conversation.messages[0].text, sender: "bot", options: conversation.messages[0].options }
  ]);

  const [currentStep, setCurrentStep] = useState(0);
  const [showForm, setShowForm] = useState(false); // ✅ Estado para mostrar el formulario
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]); // Hace scroll automático cuando se actualizan los mensajes

  const handleOptionClick = (text, nextStep) => {
    const step = Number(nextStep);
    if (isNaN(step) || step < 0) return console.error("🚨 ERROR: nextStep no es válido.");

    SoundPlayer("sent"); // Reproduce sonido de mensaje enviado
    setMessages(prev => [...prev, { text, sender: "user" }]);
    setCurrentStep(null); // Oculta botones

    // ✅ Mostrar formulario si estamos en el paso de captura de datos
    if (step === 2) {
      setTimeout(() => setShowForm(true), 1000);
      return;
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { sender: "bot", typing: true }]); // Simula "escribiendo..."

      setTimeout(() => {
        const nextMessage = conversation.messages[step];
        if (!nextMessage || (!nextMessage.text && !nextMessage.image)) {
          return console.error("🚨 ERROR: No se encontró un mensaje.");
        }

        SoundPlayer("received"); // Reproduce sonido de mensaje recibido
        setMessages(prev => prev.filter(msg => !msg.typing));
        setMessages(prev => [
          ...prev,
          { text: nextMessage.text || "", image: nextMessage.image || null, sender: "bot", options: nextMessage.options || [] }
        ]);
        
        if (nextMessage.options && nextMessage.options.length > 0) setCurrentStep(step);
      }, 2000);
    }, 500);
  };

  // ✅ Manejo del envío del formulario
  const handleFormSubmit = (formData) => {
    console.log("Datos capturados:", formData);
    setShowForm(false);
    // Aquí podríamos enviar los datos a una API
  };

  return (
    <div className={styles.chatWrapper}>
      <div className={styles.chatContainer}>
        <ChatHeader avatar={conversation.avatar} name={conversation.name} />
        {/* ✅ Si showForm está activo, mostramos el formulario en lugar del chat */}
        {showForm ? (
          <UserForm onSubmit={handleFormSubmit} />
        ) : (
          <>
            <ChatBody messages={messages} chatBodyRef={chatBodyRef} avatar={conversation.avatar} />
            <ChatFooter options={currentStep !== null ? conversation.messages[currentStep]?.options : []} onOptionClick={handleOptionClick} />
          </>
        )}
      </div>
    </div>
  );
}

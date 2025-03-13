import { useState, useEffect, useRef } from "react";
import conversations from "../data/conversation";
import ChatHeader from "./ChatHeader"; 
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import VideoModal from "./VideoModal";  
import UserForm from "./UserForm";  
import SoundPlayer from "./SoundPlayer";  
import styles from "../styles/Chatbot.module.css"; 

export default function Chatbot() {
  const conversationId = "janny-helguero"; 
  const conversation = conversations[conversationId];

  const [messages, setMessages] = useState([
    { text: conversation.messages[0].text, sender: "bot", options: conversation.messages[0].options }
  ]);

  const [currentStep, setCurrentStep] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const chatBodyRef = useRef(null);
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      setTimeout(() => {
        chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight - (chatBodyRef.current.clientHeight / 3);
      }, 300);
    }
  }, [messages]);

  // 🔹 Función para manejar la selección de opciones
  const handleOptionClick = (text, nextStep) => {
    const step = Number(nextStep);
    if (isNaN(step) || step < 0) return console.error("🚨 ERROR: nextStep no es válido.");

    SoundPlayer("sent"); 

    // 🔹 Eliminamos las opciones antes de agregar "escribiendo..."
    setMessages(prev => {
      const updatedMessages = prev.map((msg, index) =>
        index === prev.length - 1 ? { ...msg, options: [] } : msg
      );
      return [...updatedMessages, { text, sender: "user" }];
    });

    setCurrentStep(null); // 🔹 Limpiamos el estado de opciones antes del typing

    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { sender: "bot", typing: true } // 🔹 Se muestra escribiendo después de limpiar opciones
      ]);

      setTimeout(() => {
        const nextMessage = conversation.messages[step];
        if (!nextMessage) {
          return console.error("🚨 ERROR: No se encontró un mensaje.");
        }

        SoundPlayer("received"); 

        setMessages(prev => prev.filter(msg => !msg.typing)); // 🔹 Quitar el estado de typing
        setMessages(prev => [
          ...prev,
          {
            text: nextMessage.text || "",
            image: nextMessage.image || null,
            videoThumbnail: nextMessage.videoThumbnail || null,
            videoMobile: nextMessage.videoMobile || null,
            videoDesktop: nextMessage.videoDesktop || null,
            sender: "bot",
            options: nextMessage.options || [],
            form: nextMessage.form || false
          }
        ]);

        if (nextMessage.form) {
          console.log("📋 Mostrando formulario...");
          setShowForm(true);
        }

        if (nextMessage.options && nextMessage.options.length > 0) {
          setCurrentStep(step);
        }
      }, 2000);
    }, 500);
  };

  return (
    <div className={styles.chatWrapper}>
      <div className={styles.chatContainer}>
        <ChatHeader avatar={conversation.avatar} name={conversation.name} />
        <ChatBody 
          messages={messages} 
          avatar={conversation.avatar} 
          onOptionSelect={handleOptionClick} 
        />
        <ChatFooter />
        
        {showForm && <UserForm onSubmit={(data) => console.log("Formulario enviado:", data)} />}
      </div>

      {videoUrl && <VideoModal videoUrl={videoUrl} onClose={() => setVideoUrl(null)} />}
    </div>
  );
}

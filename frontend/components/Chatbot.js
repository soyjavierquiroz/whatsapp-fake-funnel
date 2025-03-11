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
  const [showForm, setShowForm] = useState(false); // 🔹 Estado para el formulario
  const chatBodyRef = useRef(null);

  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const handleOptionClick = (text, nextStep) => {
    const step = Number(nextStep);
    if (isNaN(step) || step < 0) return console.error("🚨 ERROR: nextStep no es válido.");

    SoundPlayer("sent"); // 🔹 Sonido de mensaje enviado
    setMessages(prev => [...prev, { text, sender: "user" }]);
    setCurrentStep(null);

    setTimeout(() => {
      setMessages(prev => [...prev, { sender: "bot", typing: true }]);

      setTimeout(() => {
        const nextMessage = conversation.messages[step];
        if (!nextMessage) {
          return console.error("🚨 ERROR: No se encontró un mensaje.");
        }

        SoundPlayer("received"); // 🔹 Sonido de mensaje recibido

        setMessages(prev => prev.filter(msg => !msg.typing));
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

  const openVideoModal = (url) => {
    setVideoUrl(url);
  };

  const closeVideoModal = () => {
    setVideoUrl(null);
  };

  return (
    <div className={styles.chatWrapper}>
      <div className={styles.chatContainer}>
        <ChatHeader avatar={conversation.avatar} name={conversation.name} />
        <ChatBody 
          messages={messages} 
          chatBodyRef={chatBodyRef} 
          avatar={conversation.avatar} 
          onOpenVideo={openVideoModal} 
        />
        <ChatFooter 
          options={currentStep !== null ? conversation.messages[currentStep]?.options : []} 
          onOptionClick={handleOptionClick} 
        />
        
        {showForm && <UserForm onSubmit={(data) => console.log("Formulario enviado:", data)} />}
      </div>

      {videoUrl && <VideoModal videoUrl={videoUrl} onClose={closeVideoModal} />}
    </div>
  );
}

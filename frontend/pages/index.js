import { useState } from "react";
import conversations from "../data/conversation";

export default function Chatbot() {
  const conversationId = "janny-helguero"; // Se puede cambiar dinámicamente en el futuro
  const conversation = conversations[conversationId];

  const [messages, setMessages] = useState([
    { text: conversation.messages[0].text, sender: "bot", options: conversation.messages[0].options }
  ]);
  const [currentStep, setCurrentStep] = useState(0);

  const handleOptionClick = (text, nextStep) => {
    const step = Number(nextStep);

    if (isNaN(step) || step < 0) {
      console.error("🚨 ERROR: nextStep no es válido.");
      return;
    }

    // Agregar respuesta del usuario
    setMessages(prev => [...prev, { text, sender: "user" }]);

    setCurrentStep(null); // Ocultar botones temporalmente

    setTimeout(() => {
      setMessages(prev => [...prev, { sender: "bot", typing: true }]); // Mostrar "escribiendo..."

      setTimeout(() => {
        const nextMessage = conversation.messages[step];
        if (!nextMessage || !nextMessage.text) {
          console.error("🚨 ERROR: No se encontró un mensaje.");
          return;
        }

        setMessages(prev => prev.filter(msg => !msg.typing)); // Eliminar "escribiendo..."
        setMessages(prev => [...prev, { text: nextMessage.text, sender: "bot", options: nextMessage.options || [] }]);

        if (nextMessage.options && nextMessage.options.length > 0) {
          setCurrentStep(step);
        }
      }, 2000); // Simula el tiempo de escritura
    }, 500);
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-container">
        {/* Cabecera */}
        <div className="chat-header">
          <img src={conversation.avatar} alt={conversation.name} className="avatar" />
          <div>
            <strong>{conversation.name}</strong>
            <p>Online</p>
          </div>
          <div className="icons">
            <span>📞</span>
            <span>📎</span>
            <span>≡</span>
          </div>
        </div>

        {/* Cuerpo del Chat */}
        <div className="chat-body">
          {messages.map((msg, index) => (
            <div key={index} className={`message-wrapper ${msg.sender}`}>
              {msg.sender === "bot" && <img src={conversation.avatar} alt="Avatar" className="avatar-msg" />}
              <div className={`chat-bubble ${msg.sender}`}>
                {msg.typing ? (
                  <div className="typing-indicator">
                    <span></span><span></span><span></span>
                  </div>
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Botones de Opciones */}
        {currentStep !== null && conversation.messages[currentStep]?.options && (
          <div className="chat-footer">
            {conversation.messages[currentStep].options.map((option, index) => (
              <button key={index} onClick={() => handleOptionClick(option.text, Number(option.next))}>
                {option.text}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Estilos CSS Optimizados */}
      <style jsx>{`
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: Arial, sans-serif; }
        
        .chat-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100vw;
          background: url('/background.png') no-repeat center center;
          background-size: cover;
          overflow: hidden;
        }
        
        .chat-container {
          width: 100%;
          max-width: 500px;
          height: 100vh;
          display: flex;
          flex-direction: column;
          background: white;
          border-radius: 0;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        }
        
        .chat-header {
          position: fixed;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 500px;
          display: flex;
          align-items: center;
          padding: 10px;
          background: #075e54;
          color: white;
          z-index: 1000;
        }

        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 10px;
        }

        .icons {
          margin-left: auto;
          font-size: 20px;
          display: flex;
          gap: 15px;
          cursor: pointer;
        }

        .chat-body {
          flex: 1;
          overflow-y: auto;
          padding: 15px;
          background: #ece5dd;
          margin-top: 60px;
        }

        .message-wrapper {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }

        .message-wrapper.bot {
          justify-content: flex-start;
        }

        .message-wrapper.user {
          justify-content: flex-end;
        }

        .chat-bubble {
          max-width: 80%;
          padding: 10px;
          border-radius: 10px;
          margin-bottom: 5px;
          word-wrap: break-word;
          color: black;
        }

        .chat-bubble.user {
          background: #dcf8c6;
          text-align: right;
        }

        .chat-bubble.bot {
          background: #fff;
        }

        .avatar-msg {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          margin-right: 10px;
        }

        .chat-footer {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          padding: 10px;
          background: white;
          border-top: 1px solid #ddd;
          gap: 10px;
        }

        .chat-footer button {
          flex: 1;
          min-width: 120px;
          max-width: 48%;
          padding: 10px;
          background: #075e54;
          color: white;
          border: none;
          border-radius: 20px;
          cursor: pointer;
          font-size: 14px;
          text-align: center;
          white-space: nowrap;
        }

        .chat-footer button:hover {
          background: #064e45;
        }

        .typing-indicator {
          display: flex;
          gap: 5px;
        }

        .typing-indicator span {
          width: 8px;
          height: 8px;
          background-color: gray;
          border-radius: 50%;
          animation: typingAnimation 1.5s infinite;
        }

        .typing-indicator span:nth-child(1) { animation-delay: 0s; }
        .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
        .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes typingAnimation {
          0% { opacity: 0.3; transform: translateY(0px); }
          50% { opacity: 1; transform: translateY(-5px); }
          100% { opacity: 0.3; transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
}

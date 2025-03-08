import { useState } from "react";
import conversations from "../data/conversation";

export default function Chatbot() {
  const conversationId = "janny-helguero"; // En el futuro se puede cambiar dinámicamente
  const conversation = conversations[conversationId];

  const [messages, setMessages] = useState([
    { text: conversation.messages[0].text, sender: "bot", options: conversation.messages[0].options }
  ]);
  const [currentStep, setCurrentStep] = useState(0);

  const handleOptionClick = (text, nextStep) => {
    const step = Number(nextStep); // 🔹 Convertimos a número directamente

    console.log("⏩ Botón presionado:", text, "| NextStep recibido:", step, "| Tipo:", typeof step);

    if (isNaN(step) || step < 0) {
      console.error("🚨 ERROR: nextStep no es un número válido. Verifica conversation.js.");
      return;
    }

    // 🔹 Agregar la respuesta del usuario como mensaje enviado antes de ocultar los botones
    setMessages(prev => [...prev, { text: text, sender: "user" }]);

    // 🔹 Ocultar los botones inmediatamente
    setCurrentStep(null);

    setTimeout(() => {
      console.log("⏩ Buscando nextMessage en conversation.js con index:", step);
      const nextMessage = conversation.messages[step];

      if (!nextMessage || !nextMessage.text) {
        console.error("🚨 ERROR: No se encontró un mensaje en conversation.js con index:", step);
        return;
      }

      console.log("✅ Mensaje del bot encontrado:", nextMessage.text);

      // 🔹 Agregar el mensaje del bot correctamente
      setMessages(prev => [...prev, { text: nextMessage.text, sender: "bot", options: nextMessage.options || [] }]);

      // 🔹 Actualizar el paso si hay más opciones
      if (nextMessage.options && nextMessage.options.length > 0) {
        setCurrentStep(step);
      }
    }, 1000);
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-container">
        <div className="chat-header">
          <img src={conversation.avatar} alt={conversation.name} className="avatar"/>
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

        <div className="chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={`message-wrapper ${msg.sender}`}>
                {msg.sender === "bot" && <img src={conversation.avatar} alt="Avatar" className="avatar-msg" />}
                <div className={`chat-bubble ${msg.sender}`}>
                  {msg.text}
                </div>
              </div>
            ))}
        </div>


        {/* 🔹 Renderizar botones de opciones */}
        {currentStep !== null && conversation.messages[currentStep]?.options && (
          <div className="chat-footer">
            {conversation.messages[currentStep].options.map((option, index) => (
              <button key={index} onClick={() => {
                console.log("🛠 Botón seleccionado:", option.text, "| Next esperado:", option.next, "| Tipo:", typeof option.next);
                handleOptionClick(option.text, Number(option.next)); // 🔹 Convertimos next a número
              }}>
                {option.text}
              </button>
            ))}
          </div>
        )}
      </div>

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
          max-width: 500px; /* 🔹 Mantiene el ancho máximo del chat */
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
          margin-top: 60px; /* Ajusta esto según el tamaño de la cabecera */
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
          align-self: flex-end;
        }

        .chat-bubble.bot {
          background: #fff;
          align-self: flex-start;
        }

        .chat-footer {
          display: flex;
          flex-wrap: wrap;
          padding: 10px; 
          background: white;
          border-top: 1px solid #ddd;
          gap: 10px;
        }

        .chat-footer button {
          flex: 1;
          padding: 10px;
          background: #075e54;
          color: white;
          border: none;
          border-radius: 20px;
          cursor: pointer;
          font-size: 14px;
        }

        @media (max-width: 600px) {
          .chat-container {
            width: 100%;
            height: 100%;
            border-radius: 0;
          }
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

      `}</style>
    </div>
  );
}

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/messages')
      .then(res => setMessages(res.data))
      .catch(err => console.error(err));
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', message: input };
    setMessages(prev => [...prev, userMessage]);

    await axios.post('http://localhost:5000/messages', userMessage);
    setInput('');

    const botResponse = await axios.post('http://localhost:5000/bot-response', { message: input });
    setMessages(prev => [...prev, { sender: 'bot', message: botResponse.data.message }]);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <img src="/avatar.png" alt="Dra. Maria" className="avatar"/>
        <div>
          <strong>Dra. Maria</strong>
          <p>Online</p>
        </div>
      </div>
      <div className="chat-body">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === 'user' ? 'chat-bubble user' : 'chat-bubble bot'}>
            {msg.message}
          </div>
        ))}
      </div>
      <div className="chat-footer">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Escribe un mensaje..." />
        <button onClick={sendMessage}>Enviar</button>
      </div>
      <style jsx>{`
        .chat-container { width: 300px; border: 1px solid #ddd; border-radius: 10px; overflow: hidden; font-family: Arial; }
        .chat-header { display: flex; align-items: center; padding: 10px; background: #075e54; color: white; }
        .avatar { width: 40px; height: 40px; border-radius: 50%; margin-right: 10px; }
        .chat-body { height: 400px; overflow-y: auto; padding: 10px; background: #ece5dd; }
        .chat-bubble { max-width: 80%; padding: 10px; border-radius: 10px; margin-bottom: 5px; }
        .chat-bubble.user { background: #dcf8c6; align-self: flex-end; }
        .chat-bubble.bot { background: #fff; align-self: flex-start; }
        .chat-footer { display: flex; padding: 10px; background: white; }
        input { flex: 1; padding: 5px; border: none; }
        button { background: #075e54; color: white; border: none; padding: 5px 10px; cursor: pointer; }
      `}</style>
    </div>
  );
}

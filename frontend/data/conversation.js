const conversations = {
  "janny-helguero": {
    name: "Janny Helguero",
    avatar: "/avatars/janny.png",
    messages: [
      {
        text: "👋 ¡Hola! Soy Janny. Quiero ayudarte con un contenido especial. ¿Te gustaría recibirlo? 😊",
        options: [
          { text: "¡Sí, quiero empezar! 🚀", next: 1 }
        ]
      },
      {
        text: "¿Por qué estás interesado en este contenido? 🤔",
        options: [
          { text: "Enfermedad Celíaca 🍞🚫", next: 2 },
          { text: "Diabetes 🍬", next: 2 },
          { text: "Alergia al trigo 🌾", next: 2 },
          { text: "Intolerancia al Gluten ❌", next: 2 },
          { text: "Mejor alimentación 🥗", next: 2 }
        ]
      },
      {
        text: "¡Gracias! Te enviaré información relevante 📩.",
        options: []
      }
    ]
  }
};
export default conversations;

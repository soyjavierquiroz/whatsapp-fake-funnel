const conversations = {
  "janny-helguero": {
    name: "Janny Helguero",
    avatar: "/avatars/janny.png",
    messages: [
      {
        text: "👋 Hola, soy Janny. Quiero ayudarte con un contenido especial. ¿Te gustaría recibirlo?",
        options: [
          { text: "¡Sí, quiero empezar!", next: 1 }
        ]
      },
      {
        text: "¿Por qué estás interesado en este contenido?",
        options: [
          { text: "Enfermedad Celíaca", next: 2 },
          { text: "Diabetes", next: 3 },
          { text: "Alergia al trigo", next: 4 },
          { text: "Intolerancia al Gluten", next: 5 },
          { text: "Mejor alimentación", next: 6 }
        ]
      },
      {
        text: "¡Gracias! Te enviaré información relevante sobre Enfermedad Celíaca.",
        options: []
      },
      {
        text: "¡Gracias! Te enviaré información relevante sobre Diabetes.",
        options: []
      },
      {
        text: "¡Gracias! Te enviaré información relevante sobre Alergia al Trigo.",
        options: []
      },
      {
        text: "¡Gracias! Te enviaré información relevante sobre Intolerancia al Gluten.",
        options: []
      },
      {
        text: "¡Gracias! Te enviaré información relevante sobre Mejor Alimentación.",
        options: []
      }
    ]
  }
};

export default conversations;

const conversations = {
  "janny-helguero": {
    name: "Janny Helguero",
    avatar: "/avatars/janny.png",
    messages: [
      {
        text: "👋 Hola, soy Janny. ¿Te gustaría recibir un contenido especial?",
        options: [
          { text: "¡Sí, quiero empezar!", next: 1 }
        ]
      },
      {
        text: "Aquí tienes una imagen relacionada con el contenido.",
        image: "/images/example.jpg",  // Asegúrate de que la ruta es relativa a `public/`
        options: [
          { text: "¡Genial!", next: 2 }
        ]
      },
      {
        text: "¿Te gustaría recibir más información?",
        options: [
          { text: "Sí, quiero saber más", next: 3 },
          { text: "No, gracias", next: 4 }
        ]
      }
    ]
  }
};

export default conversations;

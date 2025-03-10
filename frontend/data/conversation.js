const conversations = {
  "janny-helguero": {
    name: "Janny Helguero",
    avatar: "/avatars/janny.png",
    messages: [
      {
        text: "👋 Hola, soy Janny. ¿Te gustaría recibir un contenido especial?",
        options: [{ text: "¡Sí, quiero empezar!", next: 1 }]
      },
      {
        text: "Aquí tienes una imagen relacionada con el contenido.",
        image: "/images/example.jpg", // 📌 Asegúrate de que la ruta de la imagen sea correcta
        options: [{ text: "¡Genial!", next: 2 }]
      },
      {
        text: "¿Te gustaría recibir más información?",
        options: [
          { text: "Sí, quiero saber más", next: 3 },
          { text: "No, gracias", next: 4 }
        ]
      }
    ]
  },

  "dr-maria": {
    name: "Dra. Maria",
    avatar: "/avatars/maria.png",
    messages: [
      {
        text: "👋 Hola, soy la Dra. Maria. ¿Por qué necesitas recetas sin gluten?",
        options: [
          { text: "Intolerancia al gluten", next: 1 },
          { text: "Mejor alimentación", next: 2 }
        ]
      },
      {
        text: "Perfecto... Sé exactamente cómo te sientes.",
        options: [{ text: "¡Continuar!", next: 3 }]
      },
      {
        text: "Esa frustración de no poder disfrutar lo que otros comen sin preocuparte por el gluten o el azúcar No existirá más.",
        options: [{ text: "Quiero saber más", next: 4 }]
      }
    ]
  }
};

export default conversations;

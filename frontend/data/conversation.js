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
        text: "Mira este video exclusivo sobre el tema 👇",
        videoThumbnail: "/images/video-thumbnail.jpg",
        videoMobile: "https://www.youtube.com/embed/du2unbKhtZo",
        videoDesktop: "https://www.youtube.com/embed/du2unbKhtZo",
        options: [{ text: "¡Quiero ver más!", next: 2 }]
      },
      {
        text: "¿Te gustaría recibir más información?",
        options: [{ text: "Sí, quiero saber más", next: 3 }, { text: "No, gracias", next: 4 }]
      },
      {
        text: "Déjame tus datos en el formulario 📋",
        form: true
      }
    ]
  }
};

export default conversations;


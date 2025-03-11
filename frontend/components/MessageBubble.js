import { useState, useEffect } from "react";
import styles from "../styles/Chatbot.module.css";
import VideoModal from "./VideoModal"; 

export default function MessageBubble({ message, avatar }) {
  const [showVideo, setShowVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);

  useEffect(() => {
    if (showVideo) {
      setVideoUrl(isMobile ? message.videoMobile : message.videoDesktop);
    }
  }, [showVideo, message.videoMobile, message.videoDesktop, isMobile]);

  return (
    <>
      <div className={`${styles.messageWrapper} ${styles[message.sender]}`}>
        {message.sender === "bot" && <img src={avatar} alt="Avatar" className={styles.avatarMsg} />}
        
        <div className={`${styles.chatBubble} ${styles[message.sender]}`}>
          {message.typing ? (
            <div className={styles.typingIndicator}>
              <span></span><span></span><span></span>
            </div>
          ) : (
            <>
              {message.text && <p>{message.text}</p>}

              {message.image && !message.videoMobile && !message.videoDesktop && (
                <img src={message.image} alt="Imagen" className={styles.chatImage} />
              )}

              {message.videoThumbnail && message.videoMobile && message.videoDesktop && (
                <div className={styles.videoThumbnail} onClick={() => setShowVideo(true)}>
                  <img src={message.videoThumbnail} alt="Miniatura del video" className={styles.chatImage} />
                  <button className={styles.videoPlayButton}>▶</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {showVideo && <VideoModal videoUrl={videoUrl} onClose={() => setShowVideo(false)} />}
    </>
  );
}

import { useEffect, useState } from "react";
import styles from "../styles/VideoModal.module.css";

export default function VideoModal({ videoUrl, title, subtitle, ctaText, ctaLink, onClose }) {
  const [showCTA, setShowCTA] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [finalVideoUrl, setFinalVideoUrl] = useState(videoUrl);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(/iPhone|iPad|Android/i.test(navigator.userAgent));
    }
  }, []);

  useEffect(() => {
    // 🔹 Mostrar el botón CTA después de 4 segundos
    const timer = setTimeout(() => {
      setShowCTA(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // 🔹 En móviles, usar Bunny.net si el video no es de YouTube
    if (isMobile) {
      setFinalVideoUrl(
        "https://iframe.mediadelivery.net/embed/161095/f9a1fb53-dd48-46b2-bea3-275cdc7d8b16?autoplay=false&loop=true&muted=false&preload=true&responsive=false"
      );
    }
  }, [isMobile]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>✖</button>

        {/* 🔹 Título y subtítulo */}
        <h2 className={styles.modalTitle}>{title}</h2>
        <p className={styles.modalSubtitle}>{subtitle}</p>

        {/* 🔹 Contenedor del Video */}
        {finalVideoUrl ? (
          <iframe
            className={styles.videoFrame}
            src={finalVideoUrl}
            title="Video"
            allow="autoplay; fullscreen"
            allowFullScreen
          ></iframe>
        ) : (
          <p className={styles.modalSubtitle}>⚠️ Error: No hay un video disponible.</p>
        )}

        {/* 🔹 Botón CTA */}
        <div className={styles.ctaContainer}>
          {showCTA && ctaText && ctaLink && (
            <a href={ctaLink} target="_blank" rel="noopener noreferrer">
              <button className={`${styles.ctaButton} show`}>{ctaText}</button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

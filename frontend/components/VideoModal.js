import styles from "../styles/VideoModal.module.css";

export default function VideoModal({ videoUrl, onClose }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>✖</button>
        <iframe 
          className={styles.videoFrame}
          src={videoUrl} 
          title="Video"
          allow="autoplay; fullscreen"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

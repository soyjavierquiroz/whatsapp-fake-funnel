import { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import styles from "../styles/UserForm.module.css";

export default function UserForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
  });

  // 🔹 Estado para guardar el país detectado
  const [detectedCountry, setDetectedCountry] = useState("us"); // Por defecto: US

  // 🔹 Obtener la clave API desde las variables de entorno
  const API_KEY = process.env.NEXT_PUBLIC_IPINFO_API_KEY;

// 🔹 useEffect para detectar el país del usuario
useEffect(() => {
  const fetchCountry = async () => {
    try {
      const API_KEY = process.env.NEXT_PUBLIC_IPINFO_API_KEY;
      let url = API_KEY
        ? `https://ipinfo.io/json?token=${API_KEY}`
        : "http://ip-api.com/json";

      console.log("Obteniendo IP desde:", url);

      let response = await fetch(url);
      if (!response.ok) throw new Error("Error al obtener la IP desde ipinfo.io");

      let data = await response.json();
      if (data && data.countryCode) {
        setDetectedCountry(data.countryCode.toLowerCase());
        return;
      }

      // 🔹 Si ipinfo.io falla, intenta con ip-api.com
      console.warn("Fallo en ipinfo.io, intentando con ip-api.com...");
      response = await fetch("http://ip-api.com/json");
      if (!response.ok) throw new Error("Error al obtener la IP desde ip-api.com");

      data = await response.json();
      if (data && data.countryCode) {
        setDetectedCountry(data.countryCode.toLowerCase());
        return;
      }

      // 🔹 Si todas las APIs fallan, usa US como fallback
      console.error("Ambas APIs fallaron, usando US por defecto.");
      setDetectedCountry("us");

    } catch (error) {
      console.error("Error obteniendo la IP, usando US por defecto:", error);
      setDetectedCountry("us");
    }
  };

  fetchCountry();
}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
    setErrors({ ...errors, phone: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "El nombre es obligatorio";
    if (!formData.phone.trim() || formData.phone.length < 8)
      newErrors.phone = "Ingresa un número válido";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Ingresa un correo válido";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.formContainer}>
        <h2 className={styles.formTitle}>Recibe tu contenido exclusivo</h2>
        <p className={styles.formSubTitle}>Completa el formulario para recibir tu contenido exclusivo al instante.</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          
          {/* Nombre */}
          <div className={`${styles.inputGroup} ${styles.name}`}>
            <input
              type="text"
              name="name"
              placeholder="Escribe tu nombre"
              value={formData.name}
              onChange={handleChange}
              className={`${styles.input} ${formData.name ? styles.filled : ""}`}
            />
            {errors.name && <span className={styles.tooltip}>{errors.name}</span>}
          </div>

          {/* Teléfono / WhatsApp */}
          <div className={`${styles.inputGroup} ${styles.phone}`}>
            <PhoneInput
              country={detectedCountry} // 🔹 Usamos el país detectado
              value={formData.phone}
              onChange={handlePhoneChange}
              inputProps={{
                name: "phone",
                placeholder: "WhatsApp o Teléfono",
              }}
              containerClass={styles.phoneContainer}
              inputClass={styles.phoneInput}
              buttonClass={styles.phoneButton}
            />
            {errors.phone && <span className={styles.tooltip}>{errors.phone}</span>}
          </div>

          {/* Correo Electrónico */}
          <div className={`${styles.inputGroup} ${styles.email}`}>
            <input
              type="email"
              name="email"
              placeholder="Correo Electrónico"
              value={formData.email}
              onChange={handleChange}
              className={`${styles.input} ${formData.email ? styles.filled : ""}`}
            />
            {errors.email && <span className={styles.tooltip}>{errors.email}</span>}
          </div>

          {/* Botón de Enviar */}
          <button type="submit" className={styles.submitButton}>
            Enviar
          </button>
        </form>
        <p className={styles.formDisclaimer}>Tus datos son seguros. Resguardamos tu Privacidad.</p>
      </div>
    </div>
  );
}
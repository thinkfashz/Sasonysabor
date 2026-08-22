import { useState } from "react";
import { WHATSAPP_NUMBER } from "../../data/products";
import "./Contact.css";

const info = [
  {
    label: "Dirección",
    value: "Calle 15 # 24-10, Barrio Centro",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z" />
        <circle cx="12" cy="10" r="2.6" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    value: "+57 300 123 4567",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    link: `https://wa.me/${WHATSAPP_NUMBER}`,
  },
  {
    label: "Horario",
    value: "Lunes a domingo · 8:00 a. m. - 10:00 p. m.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </svg>
    ),
  },
];

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      "Hola! Me gustaría hacer un pedido o hacer una reserva. ¡Gracias!"
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    e.target.reset();
  };

  return (
    <section className="section contact" id="contacto">
      <div className="container">
        <div className="section-head">
          <span className="kicker">Estamos para ti</span>
          <h2>
            Contáctanos o <span>haz tu pedido</span>
          </h2>
          <p>Escríbenos por WhatsApp o llena el formulario y te responderemos pronto.</p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            {info.map((i) => (
              <div className="info-row" key={i.label}>
                <span className="info-icon">{i.icon}</span>
                <div>
                  <strong>{i.label}</strong>
                  {i.link ? (
                    <a href={i.link} target="_blank" rel="noopener noreferrer" className="info-link">
                      {i.value}
                    </a>
                  ) : (
                    <p>{i.value}</p>
                  )}
                </div>
              </div>
            ))}

            <button className="btn btn-whatsapp contact-whatsapp" onClick={handleWhatsApp}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Escribir por WhatsApp
            </button>

            <div className="contact-map">
              <iframe
                title="Ubicación Sabor y Sazón"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-74.08%2C4.60%2C-74.07%2C4.61&layer=mapnik&marker=4.605%2C-74.075"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="contact-strip">
              <span>15%</span>
              <p>de descuento en tu primer pedido por WhatsApp</p>
            </div>
          </div>

          <form className="contact-form" onSubmit={submit}>
            <label>
              Nombre
              <input type="text" name="nombre" placeholder="Tu nombre" required />
            </label>
            <label>
              Correo
              <input type="email" name="correo" placeholder="tucorreo@ejemplo.com" required />
            </label>
            <label>
              Mensaje
              <textarea
                name="mensaje"
                rows="4"
                placeholder="Cuéntanos qué plato quieres pedir..."
                required
              />
            </label>
            <button type="submit" className="btn btn-red contact-submit">
              {sent ? "¡Mensaje enviado!" : "Enviar mensaje"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

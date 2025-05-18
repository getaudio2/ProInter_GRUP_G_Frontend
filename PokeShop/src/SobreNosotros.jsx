
import React from "react";
import "./SobreNosotros.css";

export default function SobreNosotros() {
  return (
    <div className="sobrenosotros">
        <div className="sobrenosotros-container">
            <section className="historia-section">
                <h2>Sobre PokeShop</h2>
                <p>
                Bienvenido a <strong>PokeShop</strong>, la tienda oficial para todos los entrenadores Pokémon.
                Aquí encontrarás todo lo que necesitas para tu aventura: desde Poké Balls, pociones, hasta objetos especiales para mejorar tus Pokémon.
                </p>
                <p>
                Nuestra historia comienza en Pueblo Paleta, cuando un joven entrenador decidió abrir un pequeño local para ayudar a los entrenadores a prepararse para sus batallas. Con el tiempo, PokeShop creció y se convirtió en un punto de referencia para entrenadores de todas las regiones.
                </p>
                <p>
                En PokeShop creemos que cada entrenador merece lo mejor, por eso ofrecemos productos originales y exclusivos, con la garantía de calidad del propio Profesor Oak.
                </p>
                <p>
                ¡Prepárate para capturar, entrenar y vencer con PokeShop a tu lado!
                </p>
            </section>

            <section className="contact-section">
                <h2>Contacta con nosotros</h2>
                <p>¿Tienes alguna pregunta o necesitas ayuda? No dudes en ponerte en contacto con nuestro equipo de soporte.</p>
                <ul>
                <li><strong>Email:</strong> soporte@pokeshop.com</li>
                <li><strong>Teléfono:</strong> +34 900 123 456</li>
                <li><strong>Dirección:</strong> Calle Pokémon 25, Pueblo Paleta, Región Kanto</li>
                </ul>
            </section>
        </div>
    </div>
  );
}

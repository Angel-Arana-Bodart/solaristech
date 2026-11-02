// Cambia este correo por la dirección real donde quieras recibir solicitudes.
const CONTACT_EMAIL = "tucorreo@ejemplo.com";

const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("quote-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const subject = encodeURIComponent("Solicitud de cotización | SolarisTech");
  const body = encodeURIComponent(
    `Hola, quiero solicitar información sobre una solución solar.\n\n` +
    `Nombre: ${data.get("name")}\n` +
    `Correo: ${data.get("email")}\n` +
    `Tipo de proyecto: ${data.get("project")}\n` +
    `Recibo aproximado: ${data.get("bill") || "No especificado"}\n\n` +
    `Enviado desde el sitio web de SolarisTech.`
  );

  if (CONTACT_EMAIL === "tucorreo@ejemplo.com") {
    document.getElementById("form-note").textContent =
      "Antes de publicar, configura tu correo en script.js (CONTACT_EMAIL).";
    return;
  }
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
});

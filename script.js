/* Abrir invitación */

const page = document.querySelector(".page");
const openInviteBtn = document.getElementById("openInvite");

if (openInviteBtn) {
openInviteBtn.addEventListener("click", () => {
  // 1) Fade‑out cinematográfico del hero
  page.classList.add("fade-out-hero");

  // Fade‑out del pasaporte cerrado
  const passportClosed = document.querySelector(".hero-passport-img");
  passportClosed.classList.add("fade-out");

  passportClosed.addEventListener("transitionend", () => {
    passportClosed.style.display = "none";
  }, { once: true });

  // 2) Mostrar layout con fade‑in suave
  setTimeout(() => {
    page.classList.add("show-layout");
    document.body.classList.add("show-layout");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 1000);

  // 3) Activar animación del pasaporte abierto (fade‑in + saltito)
  setTimeout(() => {
    const passportOpen = document.querySelector(".collage-open");
    passportOpen.classList.add("show");
  }, 1200);
})
}

/* COUNTDOWN */

// Fecha exacta del evento
const targetDate = new Date("2026-03-20T17:00:00");

function monthDiff(a, b) {
  let months = (b.getFullYear() - a.getFullYear()) * 12;
  months += b.getMonth() - a.getMonth();
  return Math.max(0, months);
}

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    updateDigits("months-container", 0);
    updateDigits("days-container", 0);
    updateDigits("hours-container", 0);
    return;
  }

  const months = monthDiff(now, targetDate);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24)) % 30;
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;

  updateDigits("months-container", months);
  updateDigits("days-container", days);
  updateDigits("hours-container", hours);
}

function updateDigits(containerId, value) {
  const digits = value.toString().padStart(2, "0").split("");
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  digits.forEach((d) => {
    const el = document.createElement("div");
    el.className = "digit";

    const span = document.createElement("span");
    span.textContent = d;

    el.appendChild(span);
    container.appendChild(el);
  });
}

updateCountdown();
setInterval(updateCountdown, 60 * 1000); // Se actualiza cada minuto
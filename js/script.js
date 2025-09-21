// Loading screen
window.addEventListener("load", function () {
  const loading = document.getElementById("loading");
  setTimeout(() => {
    loading.style.opacity = "0";
    setTimeout(() => {
      loading.style.display = "none";
    }, 500);
  }, 1000);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Scroll to top button
const scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", function () {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
});

scrollTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Form submission to WhatsApp
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const telefone = document.getElementById("telefone").value;
  const idade = document.getElementById("idade").value;
  const tipo = document.getElementById("tipo").value;
  const mensagem = document.getElementById("mensagem").value;

  if (!nome || !telefone) {
    alert("Por favor, preencha pelo menos o nome e telefone.");
    return;
  }

  let whatsappMessage = `Olá! Gostaria de agendar uma consulta de musicoterapia.\n\n`;
  whatsappMessage += `*Nome:* ${nome}\n`;
  whatsappMessage += `*Telefone:* ${telefone}\n`;

  if (idade) {
    whatsappMessage += `*Idade do paciente:* ${idade} anos\n`;
  }

  if (tipo) {
    const tipoTexto = {
      crianca: "Criança",
      adolescente: "Adolescente",
      adulto: "Adulto",
      idoso: "Idoso",
      tea: "TEA (Transtorno do Espectro Autista)",
      tdah: "TDAH",
      "transtorno-motor": "Transtorno Motor",
      aprendizagem: "Transtorno de Aprendizagem",
    };
    whatsappMessage += `*Tipo de atendimento:* ${tipoTexto[tipo]}\n`;
  }

  if (mensagem) {
    whatsappMessage += `*Mensagem:* ${mensagem}\n`;
  }

  const encodedMessage = encodeURIComponent(whatsappMessage);
  const whatsappURL = `https://wa.me/5521996601266?text=${encodedMessage}`;

  window.open(whatsappURL, "_blank");
});

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationDelay = "0s";
      entry.target.classList.add("fade-in");
    }
  });
}, observerOptions);

// Observe service cards
document.querySelectorAll(".service-card").forEach((card) => {
  observer.observe(card);
});

// Header background on scroll
window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)";
    header.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.15)";
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.1)";
  }
});

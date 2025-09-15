// Smooth scrolling for navigation
document.addEventListener("DOMContentLoaded", function () {
  // Form handling
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const idade = document.getElementById("idade").value;
    const tipo = document.getElementById("tipo").value;
    const mensagem = document.getElementById("mensagem").value;

    // Validate required fields
    if (!nome || !telefone) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Create WhatsApp message
    let whatsappMessage = `Olá! Gostaria de mais informações sobre musicoterapia:\n\n`;
    whatsappMessage += `👤 *Nome:* ${nome}\n`;
    whatsappMessage += `📱 *Telefone:* ${telefone}\n`;

    if (idade) {
      whatsappMessage += `🎂 *Idade do paciente:* ${idade} anos\n`;
    }

    if (tipo) {
      const tipoTexto = getTipoTexto(tipo);
      whatsappMessage += `🎯 *Tipo de atendimento:* ${tipoTexto}\n`;
    }

    if (mensagem) {
      whatsappMessage += `💬 *Mensagem:* ${mensagem}\n`;
    }

    whatsappMessage += `\nEnviado através do site da Clínica Psico & Terapias Integradas`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);

    const whatsappNumber = "5521996601266";

    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappURL, "_blank");

    // Show success message
    showSuccessMessage();

    // Reset form
    form.reset();
  });

  // Convert select option values to readable text
  function getTipoTexto(tipo) {
    const tipos = {
      crianca: "Criança",
      adolescente: "Adolescente",
      adulto: "Adulto",
      idoso: "Idoso",
      tea: "TEA (Transtorno do Espectro Autista)",
      tdah: "TDAH (Transtorno do Déficit de Atenção com Hiperatividade)",
      "transtorno-motor": "Transtorno Motor",
      aprendizagem: "Transtorno de Aprendizagem",
    };
    return tipos[tipo] || tipo;
  }

  // Show success message
  function showSuccessMessage() {
    // Create success message element
    const successMsg = document.createElement("div");
    successMsg.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(45deg, #25d366, #20ba5a);
                color: white;
                padding: 2rem;
                border-radius: 15px;
                text-align: center;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                z-index: 10000;
                max-width: 400px;
                width: 90%;
            ">
                <i class="fas fa-check-circle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <h3 style="margin-bottom: 1rem;">Mensagem enviada!</h3>
                <p style="margin-bottom: 1.5rem;">Você será redirecionado para o WhatsApp. Nossa equipe responderá em breve!</p>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background: rgba(255,255,255,0.2);
                    color: white;
                    border: 2px solid rgba(255,255,255,0.3);
                    padding: 0.5rem 1.5rem;
                    border-radius: 25px;
                    cursor: pointer;
                    font-weight: 600;
                ">Fechar</button>
            </div>
        `;

    document.body.appendChild(successMsg);

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (successMsg.parentElement) {
        successMsg.remove();
      }
    }, 5000);
  }

  // Add floating animation to hero elements
  const heroElements = document.querySelectorAll(
    ".musical-notes i, .instrument"
  );

  heroElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.2}s`;
  });

  // Add intersection observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeInUp 0.8s ease forwards";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".service-card, .contact-form, .about-text"
  );
  animateElements.forEach((element) => {
    observer.observe(element);
  });

  // Phone number formatting
  const phoneInput = document.getElementById("telefone");
  phoneInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length <= 11) {
      if (value.length <= 2) {
        value = value.replace(/(\d{0,2})/, "($1");
      } else if (value.length <= 7) {
        value = value.replace(/(\d{2})(\d{0,5})/, "($1) $2");
      } else {
        value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
      }
    }

    e.target.value = value;
  });

  // Add CSS animations
  const style = document.createElement("style");
  style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .service-card,
        .contact-form,
        .about-text {
            opacity: 0;
        }
        
        .service-card:hover .fas,
        .service-card:hover .far {
            animation: wiggle 0.5s ease;
        }
        
        @keyframes wiggle {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(-5deg); }
            75% { transform: rotate(5deg); }
        }
        
        .btn-submit:active {
            transform: translateY(0);
        }
        
        .hero-image {
            animation: gentleFloat 6s ease-in-out infinite;
        }
        
        @keyframes gentleFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
    `;
  document.head.appendChild(style);

  // Add click effects to service cards
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card) => {
    card.addEventListener("click", function () {
      const tipo = this.querySelector("h3").textContent.toLowerCase();
      const select = document.getElementById("tipo");

      // Map card titles to select values
      const typeMap = {
        crianças: "crianca",
        adolescentes: "adolescente",
        adultos: "adulto",
        idosos: "idoso",
        tea: "tea",
        tdah: "tdah",
        "transtornos motores": "transtorno-motor",
        "transtornos de aprendizagem": "aprendizagem",
      };

      const selectValue = typeMap[tipo] || "";
      if (selectValue) {
        select.value = selectValue;
      }

      // Scroll to contact form
      document.querySelector(".contact").scrollIntoView({
        behavior: "smooth",
      });

      // Add visual feedback
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);
    });
  });

  // Add particle effect on form submission
  function createParticles() {
    const colors = ["#ff6b35", "#f7931e", "#25d366"];

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement("div");
      particle.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${
                  colors[Math.floor(Math.random() * colors.length)]
                };
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                animation: particle ${Math.random() * 2 + 1}s ease-out forwards;
            `;

      document.body.appendChild(particle);

      // Remove particle after animation
      setTimeout(() => particle.remove(), 3000);
    }
  }

  // Add particle animation CSS
  const particleStyle = document.createElement("style");
  particleStyle.textContent = `
        @keyframes particle {
            to {
                transform: translate(
                    calc(-50% + ${Math.random() * 400 - 200}px),
                    calc(-50% + ${Math.random() * 400 - 200}px)
                ) scale(0);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(particleStyle);

  // Trigger particles on successful form submission
  const originalShowSuccess = showSuccessMessage;
  showSuccessMessage = function () {
    createParticles();
    originalShowSuccess();
  };

  // Add loading state to submit button
  const submitBtn = document.querySelector(".btn-submit");
  const originalBtnText = submitBtn.innerHTML;

  form.addEventListener("submit", function () {
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    }, 2000);
  });
});

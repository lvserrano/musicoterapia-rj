document.addEventListener("DOMContentLoaded", function () {
  // Check if cookie consent has already been accepted
  if (!localStorage.getItem("cookieConsent")) {
    // Create cookie modal
    const cookieModal = document.createElement("div");
    cookieModal.id = "cookieModal";
    cookieModal.style.cssText = `
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      padding: 1.5rem 1rem;
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
      box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.2);
      width: 100%;
      max-width: 100%;
      z-index: 10001;
      text-align: center;
      border: 2px solid transparent;
      background: linear-gradient(white, white) padding-box,
        linear-gradient(45deg, #ff6b35, #f7931e) border-box;
      opacity: 0;
      animation: slideInUp 0.8s ease forwards 0.5s;
      margin: 0;
      box-sizing: border-box;
    `;
    cookieModal.innerHTML = `
      <h3 style="
        font-size: 1.5rem;
        color: #333;
        margin-bottom: 1rem;
        background: linear-gradient(45deg, #ff6b35, #f7931e);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        font-family: 'Poppins', sans-serif;
        font-weight: 600;
      ">Nós usamos cookies</h3>
      <p style="
        font-size: 0.9rem;
        color: #666;
        margin-bottom: 1.5rem;
        line-height: 1.6;
        font-family: 'Poppins', sans-serif;
      ">Este site utiliza cookies para melhorar sua experiência de navegação, analisar o uso do site e personalizar conteúdo. Ao continuar navegando, você concorda com nossa <a href='/politica-de-privacidade.html' style='color: #ff6b35; text-decoration: underline;'>Política de Privacidade</a>.</p>
      <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
        <button id="acceptCookies" style="
          background: linear-gradient(45deg, #25d366, #20ba5a);
          color: white;
          border: none;
          padding: 0.8rem 2rem;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          font-family: 'Poppins', sans-serif;
        ">Aceitar</button>
        <button id="declineCookies" style="
          background: rgba(255, 255, 255, 0.2);
          color: #333;
          border: 2px solid #ff6b35;
          padding: 0.8rem 2rem;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          font-family: 'Poppins', sans-serif;
        ">Recusar</button>
      </div>
    `;

    document.body.appendChild(cookieModal);

    // Add hover effects
    const acceptBtn = document.getElementById("acceptCookies");
    const declineBtn = document.getElementById("declineCookies");

    acceptBtn.addEventListener("mouseover", function () {
      this.style.transform = "translateY(-2px)";
      this.style.boxShadow = "0 10px 20px rgba(37, 211, 102, 0.3)";
    });
    acceptBtn.addEventListener("mouseout", function () {
      this.style.transform = "";
      this.style.boxShadow = "";
    });

    declineBtn.addEventListener("mouseover", function () {
      this.style.transform = "translateY(-2px)";
      this.style.boxShadow = "0 10px 20px rgba(255, 107, 53, 0.3)";
    });
    declineBtn.addEventListener("mouseout", function () {
      this.style.transform = "";
      this.style.boxShadow = "";
    });

    // Handle accept cookies
    acceptBtn.addEventListener("click", function () {
      localStorage.setItem("cookieConsent", "accepted");
      cookieModal.style.animation = "slideOutDown 0.5s ease forwards";
      setTimeout(() => cookieModal.remove(), 500);
    });

    // Handle decline cookies
    declineBtn.addEventListener("click", function () {
      localStorage.setItem("cookieConsent", "declined");
      cookieModal.style.animation = "slideOutDown 0.5s ease forwards";
      setTimeout(() => cookieModal.remove(), 500);
    });

    // Add CSS animations
    const style = document.createElement("style");
    style.textContent = `
      @keyframes slideInUp {
        from {
          opacity: 0;
          transform: translateY(100%);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes slideOutDown {
        from {
          opacity: 1;
          transform: translateY(0);
        }
        to {
          opacity: 0;
          transform: translateY(100%);
        }
      }
      @media (max-width: 768px) {
        #cookieModal {
          padding: 1rem;
          border-radius: 0;
          border-top-left-radius: 15px;
          border-top-right-radius: 15px;
        }
        #cookieModal h3 {
          font-size: 1.2rem;
        }
        #cookieModal p {
          font-size: 0.8rem;
        }
        #cookieModal button {
          padding: 0.6rem 1.5rem;
          font-size: 0.9rem;
        }
      }
      @media (max-width: 480px) {
        #cookieModal {
          padding: 0.8rem;
        }
        #cookieModal h3 {
          font-size: 1rem;
        }
        #cookieModal p {
          font-size: 0.75rem;
        }
        #cookieModal button {
          padding: 0.5rem 1rem;
          font-size: 0.85rem;
        }
        #cookieModal > div {
          flex-direction: column;
          gap: 0.8rem;
        }
      }
    `;
    document.head.appendChild(style);
  }
});

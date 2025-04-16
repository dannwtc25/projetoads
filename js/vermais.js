document.addEventListener("DOMContentLoaded", function () {
  const verMaisBtn = document.getElementById("verMaisBtn");
  const produtosExtras = document.getElementById("produtosExtras");

  verMaisBtn.addEventListener("click", function () {
    if (produtosExtras.style.display === "none") {
      produtosExtras.style.display = "grid";

      // Aplica animação aos cards
      const cards = produtosExtras.querySelectorAll(".produto-card");
      cards.forEach((card, index) => {
        card.classList.remove("fade-in"); // reseta se já tiver
        setTimeout(() => {
          card.classList.add("fade-in");
        }, index * 100); // delay progressivo
      });

      verMaisBtn.textContent = "Ver Menos";
    } else {
      produtosExtras.style.display = "none";
      verMaisBtn.textContent = "Ver Mais";
    }
  });
});

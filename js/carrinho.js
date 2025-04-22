document.addEventListener("DOMContentLoaded", () => {
  const comprarBtns = document.querySelectorAll(".comprar-btn");
  const cartCount = document.getElementById("cart-count");

  // Atualiza o contador do carrinho baseado no localStorage
  function atualizarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    cartCount.textContent = carrinho.length;
  }

  comprarBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const card = e.target.closest(".produto-card");
      const nome = card.querySelector("h3").textContent;
      const imagem = card.querySelector("img").src;

      let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

      carrinho.push({ nome, imagem });

      localStorage.setItem("carrinho", JSON.stringify(carrinho));

      atualizarCarrinho();

      alert(`${nome} foi adicionado ao carrinho!`);
    });
  });

  atualizarCarrinho();
});

// js/cartUtils.js
function atualizarContadorCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const contador = document.getElementById('cart-count');
    if (contador) {
      contador.textContent = carrinho.length;
    }
  }
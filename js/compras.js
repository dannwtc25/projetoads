// Funções do carrinho de compras

document.addEventListener("DOMContentLoaded", function () {
  atualizarResumo();

  // Event listeners para botões de + e -
  document.querySelectorAll(".btn-quantidade").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const produto = this.closest(".carrinho-produto");
      const quantidadeInput = produto.querySelector(".quantidade");
      let quantidade = parseInt(quantidadeInput.value);

      if (this.classList.contains("mais")) {
        quantidade++;
      } else if (this.classList.contains("menos") && quantidade > 1) {
        quantidade--;
      }

      quantidadeInput.value = quantidade;
      atualizarResumo();
    });
  });

  // Botão para remover item do carrinho
  document.querySelectorAll(".remover-produto").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const produto = this.closest(".carrinho-produto");
      produto.remove();
      atualizarResumo();
    });
  });
});

// Função para atualizar o resumo do carrinho
function atualizarResumo() {
  let subtotal = 0;
  document.querySelectorAll(".carrinho-produto").forEach(function (produto) {
    const precoTexto = produto
      .querySelector(".preco")
      .innerText.replace("R$", "")
      .replace(",", ".");
    const preco = parseFloat(precoTexto);
    const quantidade = parseInt(produto.querySelector(".quantidade").value);
    subtotal += preco * quantidade;
  });

  const frete = subtotal > 100 ? 0 : 15; // Frete grátis acima de 100
  const total = subtotal + frete;

  document.getElementById("subtotal").innerText = `R$ ${subtotal
    .toFixed(2)
    .replace(".", ",")}`;
  document.getElementById("frete").innerText = `R$ ${frete
    .toFixed(2)
    .replace(".", ",")}`;
  document.getElementById("total").innerText = `R$ ${total
    .toFixed(2)
    .replace(".", ",")}`;
}

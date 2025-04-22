// carrinho.js

// Função para formatar o preço
function formatarPreco(preco) {
  return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Função para calcular o subtotal
function calcularSubtotal(carrinho) {
  let subtotal = 0;
  carrinho.forEach(item => {
      subtotal += item.preco;
  });
  return subtotal;
}

// Função para calcular o frete (simulado)
function calcularFrete(carrinho) {
  const subtotal = calcularSubtotal(carrinho);
  return subtotal > 100 ? 0 : 10;
}

// Função para calcular o total
function calcularTotal(subtotal, frete) {
  return subtotal + frete;
}

// Função para exibir os detalhes do carrinho
function exibirDetalhesCarrinho(carrinho) {
  const carrinhoItens = document.getElementById('carrinho-itens');
  const subtotalValor = document.getElementById('subtotal-valor');
  const freteValor = document.getElementById('frete-valor');
  const totalValor = document.getElementById('total-valor');

  if (!carrinhoItens || !subtotalValor || !freteValor || !totalValor) {
      console.error('Um ou mais elementos do carrinho não foram encontrados.');
      return;
  }

  carrinhoItens.innerHTML = '';

  if (carrinho.length === 0) {
      carrinhoItens.innerHTML = '<p>Seu carrinho está vazio.</p>';
      subtotalValor.textContent = formatarPreco(0);
      freteValor.textContent = 'A calcular';
      totalValor.textContent = formatarPreco(0);
      return;
  }

  carrinho.forEach((item, index) => { // Modificação: Adicionar index
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('item-carrinho');
      itemDiv.innerHTML = `
          <img src="${item.imagem}" alt="${item.nome}" style="width: 100px; height: 100px; margin-right: 15px;">
          <div>
              <h3>${item.nome}</h3>
              <p>Preço: ${formatarPreco(item.preco)}</p>
              <button class="remover-item" data-index="${index}">Remover</button> </div>
      `;
      carrinhoItens.appendChild(itemDiv);
  });

  const subtotal = calcularSubtotal(carrinho);
  const frete = calcularFrete(carrinho);
  const total = calcularTotal(subtotal, frete);

  subtotalValor.textContent = formatarPreco(subtotal);
  freteValor.textContent = frete === 0 ? 'Grátis' : formatarPreco(frete);
  totalValor.textContent = formatarPreco(total);

  // Modificação: Adicionar event listeners para os botões de remover
  const botoesRemover = document.querySelectorAll('.remover-item');
  botoesRemover.forEach(botao => {
      botao.addEventListener('click', () => {
          const index = parseInt(botao.dataset.index);
          removerItemDoCarrinho(carrinho, index);
      });
  });
}

// Modificação: Função para remover item do carrinho
function removerItemDoCarrinho(carrinho, index) {
  carrinho.splice(index, 1);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  exibirDetalhesCarrinho(carrinho); // Atualizar a exibição
}

// Carregar o carrinho e exibir os detalhes
document.addEventListener('DOMContentLoaded', () => {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  exibirDetalhesCarrinho(carrinho);

  // Finalizar compra
  const finalizarCompraBtn = document.getElementById('finalizar-compra');
  if (finalizarCompraBtn) {
      finalizarCompraBtn.addEventListener('click', () => {
          alert('Compra finalizada com sucesso!');
          localStorage.removeItem('carrinho');
          window.location.href = 'produtos.html';
      });
  }
});

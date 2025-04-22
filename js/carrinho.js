 // Função para adicionar um produto ao carrinho
 function adicionarAoCarrinho(produto) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  carrinho.push(produto);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  atualizarContadorCarrinho();
}

// Função para atualizar o contador do carrinho no ícone
function atualizarContadorCarrinho() {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const contador = document.getElementById('cart-count');
  if (contador) {
    contador.textContent = carrinho.length;
  }
}

// Função para exibir os itens do carrinho na página carrinho.html
function exibirCarrinho() {
  const carrinhoItens = document.getElementById('carrinho-itens');
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  if (!carrinhoItens) return; // Verifica se o elemento existe

  carrinhoItens.innerHTML = ''; // Limpa o conteúdo anterior

  if (carrinho.length === 0) {
    carrinhoItens.innerHTML = '<p>Seu carrinho está vazio.</p>';
    return;
  }

  carrinho.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item-carrinho');
    itemDiv.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}">
      <div>
        <h3>${item.nome}</h3>
        <p>Preço: R$ ${item.preco.toFixed(2)}</p>
      </div>
    `;
    carrinhoItens.appendChild(itemDiv);
  });
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  atualizarContadorCarrinho(); // Atualiza o contador ao carregar a página
  if (window.location.pathname.includes('carrinho.html')) {
    exibirCarrinho(); // Exibe os itens se estiver na página do carrinho
  }

  // Adiciona listeners para os botões "Comprar"
  const botoesComprar = document.querySelectorAll('.comprar-btn');
  botoesComprar.forEach(botao => {
    botao.addEventListener('click', () => {
      const produto = JSON.parse(botao.dataset.produto);
      console.log('Produto a ser adicionado:', produto); // Novo log
      adicionarAoCarrinho(produto);
      
    });
  });

  // Finalizar compra (na página do carrinho)
  const finalizarCompraBtn = document.getElementById('finalizar-compra');
  if (finalizarCompraBtn) {
    finalizarCompraBtn.addEventListener('click', () => {
      localStorage.removeItem('carrinho');
      alert('Compra finalizada!');
      window.location.href = 'produtos.html'; // Redireciona para a página de produtos
    });
  }
});
function carregarCarrinho() {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  console.log('Carrinho carregado:', carrinho);
  let container = document.getElementById('carrinho-itens');

  if (!container) {
      console.warn('Container carrinho-itens não encontrado');
      return;
  }

  if (carrinho.length === 0) {
      container.innerHTML = "<p>Seu carrinho está vazio.</p>";
      return;
  }

  container.innerHTML = "";

  carrinho.forEach((produto, index) => { // Adicionamos o 'index' aqui
      console.log('Produto:', produto);
      let item = document.createElement('div');
      item.classList.add('item-carrinho');
      item.innerHTML = `
          <img src="${produto.imagem}" alt="${produto.nome}">
          <div>
              <h3>${produto.nome}</h3>
              <p>Preço: R$ ${produto.preco.toFixed(2)}</p>
              <button class="remover-item" data-index="${index}">Remover</button>  
          </div>
      `;
      container.appendChild(item);
  });
}
// Função para remover um item do carrinho
function removerItemDoCarrinho(index) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.splice(index, 1); // Remove o item do array
    localStorage.setItem('carrinho', JSON.stringify(carrinho)); // Atualiza o localStorage
    carregarCarrinho(); // Recarrega os itens na página
    atualizarContadorCarrinho(); // Atualiza o contador (se necessário)
}

// Ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    atualizarContadorCarrinho();
    carregarCarrinho();

    // Finalizar compra
    const finalizar = document.getElementById('finalizar-compra');
    if (finalizar) {
        finalizar.addEventListener('click', () => {
            alert('Compra finalizada com sucesso!');
            localStorage.removeItem('carrinho');
            location.reload();
        });
    }

    // Event listener para os botões de remover
    const container = document.getElementById('carrinho-itens');
    if (container) {
        container.addEventListener('click', (event) => {
            if (event.target.classList.contains('remover-item')) {
                const index = parseInt(event.target.dataset.index);
                removerItemDoCarrinho(index);
            }
        });
    }
});
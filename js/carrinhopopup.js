// Elementos
const botoesComprar = document.querySelectorAll('.comprar-btn');
const listaCarrinhoPopup = document.getElementById('lista-carrinho');
const totalCarrinhoPopup = document.getElementById('total-carrinho');
const popupCarrinho = document.getElementById('carrinho-popup');
const overlay = document.getElementById('overlay');
const mensagemAdicionado = document.getElementById('mensagem-adicionado');
const fecharCarrinhoBtn = document.getElementById('fechar-carrinho');
const finalizarCompraBtn = document.getElementById('finalizar-compra-popup');

let carrinhoLocal = JSON.parse(localStorage.getItem('carrinho')) || [];

// Atualizar Carrinho
function atualizarCarrinhoPopup() {
  listaCarrinhoPopup.innerHTML = '';
  let total = 0;

  carrinhoLocal.forEach((item, index) => {
      console.log('Item:', item);
      if (typeof item.preco !== 'number') {
          console.error('Preço inválido:', item.preco, 'Nome:', item.nome);
          return; // Pula para a próxima iteração
      }

      total += item.preco;
      const li = document.createElement('li');
      li.innerHTML = `
        ${item.nome} - R$${item.preco.toFixed(2)}
        <button onclick="removerItemCarrinho(${index})">×</button>
      `;
      listaCarrinhoPopup.appendChild(li);
  });

  totalCarrinhoPopup.textContent = `Total: R$${total.toFixed(2)}`;
}

// Abrir/Fechar Popup
function abrirCarrinhoPopup() {
  popupCarrinho.classList.add('aberto');
  overlay.classList.add('mostrar');
}

function fecharCarrinhoPopup() {
  popupCarrinho.classList.remove('aberto');
  overlay.classList.remove('mostrar');
}

// Remover item
function removerItemCarrinho(index) {
  carrinhoLocal.splice(index, 1);
  localStorage.setItem('carrinho', JSON.stringify(carrinhoLocal));
  atualizarCarrinhoPopup();
}

// Mostrar mensagem Produto Adicionado
function mostrarMensagemAdicionado() {
  mensagemAdicionado.classList.add('mostrar');
  mensagemAdicionado.classList.remove('escondido');

  setTimeout(() => {
    mensagemAdicionado.classList.remove('mostrar');
    mensagemAdicionado.classList.add('escondido');
  }, 2000);
}

// Evento de compra
botoesComprar.forEach(botao => {
  botao.addEventListener('click', () => {
      const card = botao.closest('.produto-card');
      const nome = card.querySelector('h3').textContent;
      const precoTexto = card.querySelectorAll('p')[1].textContent;
      const preco = parseFloat(precoTexto.replace('R$', '').replace(',', '.'));
      const imagem = card.querySelector('img').getAttribute('src');

      if (isNaN(preco)) {
          console.error('Preço inválido para o produto:', nome);
          return; // Interrompe a execução se o preço for inválido
      }

      carrinhoLocal.push({ nome, preco, imagem });
      localStorage.setItem('carrinho', JSON.stringify(carrinhoLocal));
      atualizarCarrinhoPopup();
      abrirCarrinhoPopup();
      mostrarMensagemAdicionado();
      atualizarContadorCarrinho();
  });
});

// Evento de fechar
fecharCarrinhoBtn.addEventListener('click', fecharCarrinhoPopup);
overlay.addEventListener('click', fecharCarrinhoPopup);

// Evento finalizar compra
finalizarCompraBtn.addEventListener('click', () => {
  alert('Compra finalizada com sucesso!');
  localStorage.removeItem('carrinho');
  location.reload();
});

// Atualiza carrinho no carregamento
document.addEventListener('DOMContentLoaded', atualizarCarrinhoPopup);
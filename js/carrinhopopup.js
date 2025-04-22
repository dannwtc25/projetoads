// carrinhopopup.js

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
      total += item.preco;
      const li = document.createElement('li');
      li.innerHTML = `
          <img src="${item.imagem}" alt="${item.nome}" style="width: 50px; height: 50px; margin-right: 10px;">
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
    atualizarCarrinhoPopup(); // Garante que o popup é atualizado ao abrir
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
    atualizarContadorCarrinho(); // Atualiza o contador após remover
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

        const novoProduto = { nome, preco, imagem };
        carrinhoLocal.push(novoProduto);
        localStorage.setItem('carrinho', JSON.stringify(carrinhoLocal));
        atualizarCarrinhoPopup();
        abrirCarrinhoPopup();
        mostrarMensagemAdicionado();
        atualizarContadorCarrinho(); // Atualiza o contador do carrinho no ícone também
    });
});

// Evento de fechar
fecharCarrinhoBtn.addEventListener('click', fecharCarrinhoPopup);
overlay.addEventListener('click', fecharCarrinhoPopup);

// Evento finalizar compra
finalizarCompraBtn.addEventListener('click', () => {
    alert('Compra finalizada com sucesso!');
    localStorage.removeItem('carrinho');
    carrinhoLocal = []; // Limpa o carrinho local
    atualizarCarrinhoPopup(); // Atualiza a exibição
    window.location.href = 'produtos.html'; // Redireciona para a página de produtos
});

// Atualiza carrinho no carregamento
document.addEventListener('DOMContentLoaded', () => {
    atualizarCarrinhoPopup();
    atualizarContadorCarrinho(); // Garante que o contador é atualizado
});
// Espera o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    // 1. Destacar página ativa
    const currentPage = window.location.pathname;
    const menuItems = document.querySelectorAll('.menu-item a');
    
    menuItems.forEach(item => {
        // Remove o '/' inicial e compara com o href do link
        if (item.getAttribute('href') === currentPage.split('/').pop()) {
            item.parentElement.classList.add('active');
        }
    });

    // 2. Funcionalidade de busca
    const searchInput = document.querySelector('#query');
    const searchBar = document.querySelector('.search-bar');
    
    searchInput.addEventListener('keypress', function(e) {
        // Quando pressionar Enter
        if (e.key === 'Enter') {
            e.preventDefault();
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            // Array de páginas e seus conteúdos relacionados
            const pages = [
                { url: 'index.html', keywords: ['página inicial', 'home', 'início', 'tempero do nordeste'] },
                { url: 'produtos.html', keywords: ['produtos', 'temperos', 'especiarias', 'comprar'] },
                { url: 'receitas.html', keywords: ['receitas', 'pratos', 'culinária', 'comida'] },
                { url: 'dicas.html', keywords: ['dicas', 'sugestões', 'informações'] }
            ];
            
            // Procura nas keywords
            const foundPage = pages.find(page => 
                page.keywords.some(keyaaaaword => keyword.includes(searchTerm))
            );
            
            if (foundPage) {
                window.location.href = foundPage.url;
            } else {
                // Cria ou atualiza mensagem de "não encontrado"
                let message = searchBar.querySelector('.search-message');
                if (!message) {
                    message = document.createElement('div');
                    message.className = 'search-message';
                    searchBar.appendChild(message);
                }
                message.textContent = 'Nenhum resultado encontrado';
                message.style.color = '#f39c12';
                message.style.fontSize = '14px';
                message.style.marginTop = '5px';
                
                // Remove a mensagem após 3 segundos
                setTimeout(() => {
                    message.remove();
                }, 3000);
            }
        }
    });
});
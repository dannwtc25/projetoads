// Espera o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os formulários de registro
    const forms = document.querySelectorAll('.registration-form form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Previne o envio do formulário
            
            // Pega o campo de email
            const emailInput = form.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Remove mensagem de erro anterior se existir
            const oldError = form.querySelector('.error-message');
            if (oldError) {
                oldError.remove();
            }
            
            // Verifica se o email contém @
            if (!email.includes('@')) {
                // Cria elemento de erro
                const errorDiv = document.createElement('div');
                errorDiv.className = 'error-message';
                errorDiv.style.color = '#f39c12';
                errorDiv.style.marginTop = '5px';
                errorDiv.textContent = `Por favor, inclua um '@' no endereço de e-mail. '${email}' está faltando um '@'.`;
                
                // Insere mensagem após o campo de email
                emailInput.parentNode.insertBefore(errorDiv, emailInput.nextSibling);
                return;
            }
            
            // Se chegou aqui, o formulário é válido
            alert('Obrigado por se registrar!');
            form.reset();
        });
    });
});
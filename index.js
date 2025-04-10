const express = require('express');
const path = require('path');
const app = express();

// Configuração da porta - Render requer isso
const port = process.env.PORT || 10000;

// Middleware para servir arquivos estáticos
// Servindo arquivos da pasta public
app.use(express.static(path.join(__dirname, 'public')));
// Servindo arquivos da pasta raiz (para os arquivos CSS e JS fora de public)
app.use(express.static(path.join(__dirname)));

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para produtos
app.get('/produtos', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'produtos.html'));
});

// Middleware para tratar erros 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

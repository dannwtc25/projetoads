const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const app = express();

// Configuração da porta - Render requer isso
const port = process.env.PORT || 10000;

// Middleware para processar JSON
app.use(express.json());

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
// Servindo arquivos da pasta raiz (para os arquivos CSS e JS fora de public)
app.use(express.static(path.join(__dirname)));

// In-memory user storage (in a real app, you'd use a database)
const users = [];

// Validação de registro
const registerValidation = [
    body('username')
        .trim()
        .isLength({ min: 3 })
        .withMessage('Username deve ter pelo menos 3 caracteres')
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage('Username deve conter apenas letras, números e underscore'),
    body('email')
        .trim()
        .isEmail()
        .withMessage('Email inválido')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Senha deve ter pelo menos 6 caracteres')
        .matches(/\d/)
        .withMessage('Senha deve conter pelo menos um número')
        .matches(/[A-Z]/)
        .withMessage('Senha deve conter pelo menos uma letra maiúscula')
        .matches(/[a-z]/)
        .withMessage('Senha deve conter pelo menos uma letra minúscula')
];

// API de registro
app.post('/api/register', registerValidation, async (req, res) => {
    try {
        // Verificar erros de validação
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password } = req.body;

        // Verificar se o usuário já existe
        if (users.some(user => user.email === email)) {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }

        // Hash da senha
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Criar novo usuário
        const newUser = {
            id: users.length + 1,
            username,
            email,
            password: hashedPassword,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);

        // Retornar sucesso (sem enviar a senha)
        const { password: _, ...userWithoutPassword } = newUser;
        res.status(201).json({
            message: 'Usuário registrado com sucesso',
            user: userWithoutPassword
        });
    } catch (error) {
        console.error('Erro no registro:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

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
app.listen(port, '0.0.0.0', () => {
    console.log('Server running on port', port);
});

require('dotenv').config();

const express = require('express');
const cors = require('cors');

const LoginController = require('./controllers/LoginController');

const app = express();
const port = process.env.PORT || 3011;

// Middleware
app.use(cors());
app.use(express.json());

// Роуты
app.use('/api/login', LoginController);

// Тестовый роут для проверки работы сервера
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Запуск сервера
app.listen(port, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${port}`);
  console.log(
    `🔑 Login API: http://localhost:${port}/api/login/auth?login=admin&password=admin123`
  );
});

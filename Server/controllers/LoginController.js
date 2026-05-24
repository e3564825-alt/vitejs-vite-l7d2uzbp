// Загружает переменные из .env
require('dotenv').config();

// Подключаем сервис для работы с таблицами
const tableService = require('../services/TableService');

// Подключаем express
const express = require('express');

/*
 * работа с роутом (уникальным путем контроллера)
 * LoginController: Авторизация
 */
const router = express.Router();

/*
 * description: Маршрут для поиска пользователя по email/логину и паролю
 * router: http://localhost:3011/api/login/auth?login={login}&password={password}
 * type: get
 */
router.get('/auth', async (req, res) => {
  const { login, password } = req.query;

  // Проверка наличия обязательных полей
  if (!login || !password) {
    return res.status(400).json({
      message: 'Не заполнены обязательные поля',
      success: false,
    });
  }

  console.log('Попытка входа:', login, password);

  try {
    // Сначала ищем по email, потом по логину
    let user = await tableService.findUserByEmailAndPassword(login, password);

    if (!user) {
      user = await tableService.findUserByLoginAndPassword(login, password);
    }

    if (!user) {
      return res.status(400).json({
        message: 'Пользователь не найден',
        success: false,
        userId: 0,
      });
    }

    res.status(200).json({
      message: 'Успешная авторизация',
      success: true,
      userId: user.id,
      userName: user.name || user.login,
      login: user.login,
      email: user.email,
    });
  } catch (error) {
    console.error('Ошибка авторизации:', error);
    res.status(500).json({
      message: 'Ошибка сервера',
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;

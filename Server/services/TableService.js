// Загружаем переменные из файла .env
require('dotenv').config();

// Подключаем fs для работы с файлами
const fs = require('fs');
const path = require('path');

// Путь к файлу с пользователями
const usersPath = path.join(__dirname, '../data', 'users.json');

class TablesService {
  constructor() {
    this.usersPath = usersPath;
  }

  // Получить всех пользователей
  async getAllUsers() {
    try {
      const data = fs.readFileSync(this.usersPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Ошибка при чтении файла users.json:', error.message);
      throw error;
    }
  }

  // Найти пользователя по email и паролю
  async findUserByEmailAndPassword(email, password) {
    try {
      const users = await this.getAllUsers();
      const user = users.find(
        (u) => u.email === email && u.password === password
      );
      return user || null;
    } catch (error) {
      console.error('Ошибка при поиске пользователя:', error.message);
      throw error;
    }
  }

  // Найти пользователя по логину и паролю
  async findUserByLoginAndPassword(login, password) {
    try {
      const users = await this.getAllUsers();
      const user = users.find(
        (u) => u.login === login && u.password === password
      );
      return user || null;
    } catch (error) {
      console.error('Ошибка при поиске пользователя:', error.message);
      throw error;
    }
  }
}

module.exports = new TablesService();

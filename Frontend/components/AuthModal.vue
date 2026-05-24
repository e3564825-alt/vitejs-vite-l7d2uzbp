<template>
  <v-dialog v-model="visible" max-width="500" @click:outside="closeModal">
    <v-card class="auth-modal">
      <v-card-title class="auth-title">
        {{ isLogin ? 'Вход' : 'Регистрация' }}
      </v-card-title>

      <v-card-text>
        <div class="auth-tabs">
          <button
            class="auth-tab"
            :class="{ active: isLogin }"
            @click="switchTab(true)"
          >
            Войти
          </button>
          <button
            class="auth-tab"
            :class="{ active: !isLogin }"
            @click="switchTab(false)"
          >
            Зарегистрироваться
          </button>
        </div>

        <div class="auth-fields">
          <div v-if="!isLogin" class="auth-field">
            <label>Email</label>
            <input v-model="email" placeholder="your@email.com" />
          </div>
          <div class="auth-field">
            <label>Логин</label>
            <input v-model="login" placeholder="Введите логин" />
          </div>
          <div class="auth-field">
            <label>Пароль</label>
            <input
              type="password"
              v-model="password"
              placeholder="Введите пароль"
              @keyup.enter="handleSubmit"
            />
          </div>
          <div v-if="!isLogin" class="auth-field">
            <label>Подтверждение пароля</label>
            <input
              type="password"
              v-model="confirmPassword"
              placeholder="Повторите пароль"
              @keyup.enter="handleSubmit"
            />
          </div>
        </div>

        <div v-if="errorMessage" class="auth-error">{{ errorMessage }}</div>

        <div class="auth-actions">
          <button class="auth-cancel-btn" @click="closeModal">Отмена</button>
          <button class="auth-submit-btn" @click="handleSubmit">
            {{ isLogin ? 'Войти' : 'Зарегистрироваться' }}
          </button>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, defineModel } from 'vue';

const visible = defineModel();
const isLogin = ref(true);
const login = ref('');
const password = ref('');
const email = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');

const switchTab = (tab) => {
  isLogin.value = tab;
  errorMessage.value = '';
};

const closeModal = () => {
  visible.value = false;
  resetForm();
};

const resetForm = () => {
  login.value = '';
  password.value = '';
  email.value = '';
  confirmPassword.value = '';
  errorMessage.value = '';
  isLogin.value = true;
};

const handleSubmit = () => {
  errorMessage.value = '';

  if (isLogin.value) {
    // ВХОД
    if (!login.value.trim() || !password.value.trim()) {
      errorMessage.value = 'Заполните логин и пароль';
      return;
    }
    // Сохраняем никнейм в localStorage
    localStorage.setItem('forumUser', login.value);
    alert(`Добро пожаловать, ${login.value}!`);
    closeModal();
    // Обновляем страницу без перезагрузки (диспатчим событие)
    window.dispatchEvent(new CustomEvent('auth-updated'));
  } else {
    // РЕГИСТРАЦИЯ
    if (
      !email.value.trim() ||
      !login.value.trim() ||
      !password.value.trim() ||
      !confirmPassword.value.trim()
    ) {
      errorMessage.value = 'Заполните все поля';
      return;
    }
    if (password.value !== confirmPassword.value) {
      errorMessage.value = 'Пароли не совпадают';
      return;
    }
    // Сохраняем никнейм в localStorage
    localStorage.setItem('forumUser', login.value);
    alert(`Регистрация успешна! Добро пожаловать, ${login.value}!`);
    closeModal();
    // Обновляем страницу без перезагрузки (диспатчим событие)
    window.dispatchEvent(new CustomEvent('auth-updated'));
  }
};
</script>

<style scoped>
.auth-modal {
  border-radius: 20px;
  background: white;
  padding: 8px 0 16px;
}
.auth-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  text-align: center;
}
.auth-tabs {
  display: flex;
  border-bottom: 1px solid #ffd4c5;
  margin: 20px 0;
}
.auth-tab {
  flex: 1;
  background: none;
  border: none;
  padding: 12px;
  font-weight: 600;
  color: #8e8e8e;
  cursor: pointer;
}
.auth-tab.active {
  color: #ffb5a7;
  border-bottom: 2px solid #ffb5a7;
}
.auth-field {
  margin-bottom: 20px;
}
.auth-field label {
  display: block;
  font-size: 0.85rem;
  margin-bottom: 6px;
}
.auth-field input {
  width: 100%;
  padding: 12px;
  background: white;
  border: 1px solid #ffd4c5;
  border-radius: 12px;
}
.auth-error {
  background: #ffe5e5;
  color: #e53935;
  padding: 10px;
  border-radius: 12px;
  margin: 16px 0;
}
.auth-actions {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}
.auth-cancel-btn {
  flex: 1;
  background: transparent;
  border: 1px solid #ffd4c5;
  border-radius: 40px;
  padding: 12px;
  cursor: pointer;
}
.auth-submit-btn {
  flex: 1;
  background: #2c2c2c;
  border: none;
  border-radius: 40px;
  padding: 12px;
  color: white;
  cursor: pointer;
}
.auth-submit-btn:hover {
  background: #ffb5a7;
  color: #2c2c2c;
}
</style>

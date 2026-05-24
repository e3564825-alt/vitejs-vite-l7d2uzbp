<template>
  <div class="navbar">
    <div class="navbar-container">
      <router-link to="/" class="logo"> THE NEIGHBOURHOOD </router-link>

      <div class="nav-links">
        <router-link to="/history" class="nav-link" active-class="active"
          >История</router-link
        >
        <router-link to="/tours" class="nav-link" active-class="active"
          >Концерты</router-link
        >
        <router-link to="/gallery" class="nav-link" active-class="active"
          >Галерея</router-link
        >
        <router-link to="/forum" class="nav-link" active-class="active"
          >Форум</router-link
        >
      </div>

      <!-- Авторизован: имя + аватар + стрелка -->
      <div v-if="isLoggedIn" class="user-menu" ref="userMenuRef">
        <button class="user-btn" @click="toggleMenu">
          <v-icon icon="mdi-account-circle" size="small" class="user-icon" />
          <span class="user-name">{{ userName }}</span>
          <v-icon icon="mdi-chevron-down" size="small" class="chevron-icon" />
        </button>

        <!-- Выпадающее меню -->
        <div v-if="isMenuOpen" class="dropdown-menu">
          <button class="dropdown-item logout-item" @click="logout">
            <v-icon icon="mdi-door-open" size="small" />
            <span>Выйти</span>
          </button>
        </div>
      </div>

      <!-- Не авторизован: кнопка "Войти" -->
      <button v-else class="auth-btn" @click="$emit('open-auth')">Войти</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isLoggedIn = ref(false);
const userName = ref('');
const isMenuOpen = ref(false);
const userMenuRef = ref(null);

defineEmits(['open-auth']);

const checkAuth = () => {
  const user = localStorage.getItem('forumUser');
  isLoggedIn.value = !!user;
  userName.value = user || '';
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const logout = () => {
  localStorage.removeItem('forumUser');
  localStorage.removeItem('userId');
  localStorage.removeItem('userLogin');
  localStorage.removeItem('userEmail');
  alert('Вы вышли из аккаунта');
  window.dispatchEvent(new CustomEvent('auth-updated'));
  isMenuOpen.value = false;
};

// Закрытие меню при клике вне его
const handleClickOutside = (event) => {
  if (userMenuRef.value && !userMenuRef.value.contains(event.target)) {
    isMenuOpen.value = false;
  }
};

onMounted(() => {
  checkAuth();
  window.addEventListener('auth-updated', checkAuth);
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener('auth-updated', checkAuth);
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.navbar {
  width: 100%;
  background: white;
  border-bottom: 2px solid #ffb5a7;
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.logo {
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  font-size: 1.3rem;
  color: #2c2c2c;
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.3s ease;
}

.logo:hover {
  color: #ffb5a7;
}

.nav-links {
  display: flex;
  gap: 32px;
}

.nav-link {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  color: #2c2c2c;
  text-decoration: none;
  transition: color 0.3s ease;
  padding: 4px 0;
  position: relative;
}

.nav-link:hover {
  color: #ffb5a7;
}

.nav-link.active {
  color: #ffb5a7;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 2px;
  background: #ffb5a7;
}

/* Кнопка пользователя (авторизован) */
.user-menu {
  position: relative;
}

.user-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: none;
  padding: 6px 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 40px;
}

.user-btn:hover {
  background: #fff5f0;
}

.user-icon {
  color: #ffb5a7;
  font-size: 28px !important;
}

.user-name {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  color: #2c2c2c;
  font-size: 0.9rem;
}

.chevron-icon {
  color: #8e8e8e;
  transition: transform 0.3s ease;
}

/* Выпадающее меню */
.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: white;
  border: 1px solid #ffd4c5;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  min-width: 140px;
  z-index: 200;
  overflow: hidden;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  width: 100%;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
}

.logout-item {
  color: #e53935;
}

.logout-item:hover {
  background: #ffe5e5;
}

/* Кнопка "Войти" (не авторизован) */
.auth-btn {
  background: #2c2c2c;
  color: white;
  border: none;
  border-radius: 30px;
  padding: 8px 28px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.auth-btn:hover {
  background: #ffb5a7;
  color: #2c2c2c;
  transform: scale(1.02);
}

@media (max-width: 768px) {
  .navbar-container {
    flex-wrap: wrap;
    justify-content: center;
  }
  .nav-links {
    order: 3;
    width: 100%;
    justify-content: center;
    gap: 20px;
  }
  .user-menu {
    order: 2;
  }
  .auth-btn {
    order: 2;
  }
  .logo {
    order: 1;
  }
}
</style>

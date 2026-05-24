<template>
  <v-app>
    <Navbar @open-auth="authModal = true" />
    <v-main>
      <router-view />
    </v-main>
    <Footer />
    <AuthModal v-model="authModal" />
  </v-app>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import AuthModal from './components/AuthModal.vue';

const authModal = ref(false);

const handleOpenAuth = () => {
  authModal.value = true;
};

// Слушаем событие обновления авторизации
const handleAuthUpdate = () => {
  // Можно добавить логику, но форум сам обновит статус
  console.log('Авторизация обновлена');
};

onMounted(() => {
  window.addEventListener('open-auth-modal', handleOpenAuth);
  window.addEventListener('auth-updated', handleAuthUpdate);
});

onUnmounted(() => {
  window.removeEventListener('open-auth-modal', handleOpenAuth);
  window.removeEventListener('auth-updated', handleAuthUpdate);
});
</script>

<style>
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #ffd4c5;
}
::-webkit-scrollbar-thumb {
  background: #ffb5a7;
  border-radius: 4px;
}
body,
.v-application,
.v-application__wrap {
  background: #fff5f0 !important;
}
body {
  font-family: 'Inter', sans-serif;
  margin: 0;
}
</style>

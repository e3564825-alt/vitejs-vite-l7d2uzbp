<template>
  <div class="forum-page">
    <v-container class="py-8">
      <h1 class="section-title">Форум пользователей</h1>

      <!-- Форма добавления поста (только для авторизованных) -->
      <div v-if="isLoggedIn" class="forum-card">
        <div class="forum-label">Что думаешь о группе:</div>
        <textarea
          v-model="newPost"
          class="forum-textarea"
          rows="4"
          placeholder="Напишите свой комментарий..."
        ></textarea>
        <button class="submit-btn" @click="addPost" :disabled="!newPost.trim()">
          Отправить
        </button>
      </div>

      <!-- Блок для неавторизованных -->
      <div v-else class="login-prompt">
        <p class="login-prompt-text">
          Чтобы оставить комментарий,
          <button class="login-prompt-btn" @click="openAuthModal">
            войдите
          </button>
          в аккаунт
        </p>
      </div>

      <div class="posts-container">
        <div v-for="(post, index) in posts" :key="post.id" class="post-card">
          <div class="post-header">
            <div class="post-avatar">
              <span>{{ post.avatar }}</span>
            </div>
            <div class="post-info">
              <div class="post-author">{{ post.author }}</div>
              <div class="post-date">{{ post.date }}</div>
            </div>
          </div>

          <div class="post-content">
            {{ post.text }}
          </div>

          <div class="post-actions">
            <button
              class="like-btn"
              @click="likePost(post.id)"
              :class="{ liked: userLikes[post.id] }"
              :disabled="!isLoggedIn"
            >
              <v-icon icon="mdi-heart" size="small" class="heart-icon"></v-icon>
              {{ post.likes }}
            </button>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive } from 'vue';

const newPost = ref('');
const isLoggedIn = ref(false);
const currentUser = ref('');

// Хранилище лайков пользователя { postId: true }
const userLikes = reactive({});

// Ключи для localStorage
const POSTS_KEY = 'forum_posts';
const LIKES_KEY = 'forum_likes';

// Получить текущего пользователя
const getCurrentUser = () => {
  return localStorage.getItem('forumUser') || null;
};

// Проверка авторизации
const checkAuth = () => {
  const user = getCurrentUser();
  isLoggedIn.value = !!user;
  currentUser.value = user || '';
};

// Загрузка лайков текущего пользователя
const loadUserLikes = () => {
  const user = getCurrentUser();
  if (!user) return;

  const allLikes = JSON.parse(localStorage.getItem(LIKES_KEY) || '{}');
  const userLikesData = allLikes[user] || {};

  // Очищаем и заполняем реактивный объект
  Object.keys(userLikes).forEach((key) => delete userLikes[key]);
  Object.assign(userLikes, userLikesData);
};

// Сохранение лайков текущего пользователя
const saveUserLikes = () => {
  const user = getCurrentUser();
  if (!user) return;

  const allLikes = JSON.parse(localStorage.getItem(LIKES_KEY) || '{}');
  allLikes[user] = { ...userLikes };
  localStorage.setItem(LIKES_KEY, JSON.stringify(allLikes));
};

// Загрузка постов
const loadPosts = () => {
  const savedPosts = localStorage.getItem(POSTS_KEY);
  if (savedPosts) {
    posts.value = JSON.parse(savedPosts);
  } else {
    // Начальные посты
    posts.value = [
      {
        id: 1,
        author: 'Киорил',
        avatar: 'К',
        date: '21.05.2026',
        text: 'Sweater Weather — лучшее, что я слышал!',
        likes: 15,
      },
      {
        id: 2,
        author: 'Тимати',
        avatar: 'Т',
        date: '25.05.2026',
        text: 'Когда новый альбом? Очень жду!',
        likes: 8,
      },
    ];
    savePosts();
  }
};

// Сохранение постов
const savePosts = () => {
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts.value));
};

// Обновление счётчиков лайков в постах на основе данных о лайках
const updatePostsLikes = () => {
  const user = getCurrentUser();
  if (!user) return;

  posts.value.forEach((post) => {
    if (userLikes[post.id]) {
      // Если лайк уже учтён в userLikes, но не учтён в счётчике?
      // Счётчики хранятся отдельно, их не нужно пересчитывать
    }
  });
};

const posts = ref([]);

const addPost = () => {
  if (!isLoggedIn.value) {
    openAuthModal();
    return;
  }

  if (!newPost.value.trim()) return;

  const user = currentUser.value;
  const newPostObj = {
    id: Date.now(),
    author: user,
    avatar: user.charAt(0).toUpperCase(),
    date: new Date().toLocaleDateString('ru-RU'),
    text: newPost.value,
    likes: 0,
  };

  posts.value.unshift(newPostObj);
  savePosts();
  newPost.value = '';
};

const likePost = (postId) => {
  if (!isLoggedIn.value) {
    openAuthModal();
    return;
  }

  // Если уже лайкал — ничего не делаем
  if (userLikes[postId]) return;

  // Находим пост
  const post = posts.value.find((p) => p.id === postId);
  if (!post) return;

  // Увеличиваем счётчик лайков
  post.likes++;

  // Сохраняем, что пользователь лайкнул этот пост
  userLikes[postId] = true;
  saveUserLikes();
  savePosts();
};

const openAuthModal = () => {
  window.dispatchEvent(new CustomEvent('open-auth-modal'));
};

// Обновление данных при изменении авторизации
const refreshData = () => {
  checkAuth();
  loadUserLikes();
};

// Загрузка начальных данных
onMounted(() => {
  checkAuth();
  loadPosts();
  loadUserLikes();
  window.addEventListener('auth-updated', refreshData);
});

onUnmounted(() => {
  window.removeEventListener('auth-updated', refreshData);
});
</script>

<style scoped>
.forum-page {
  background: #fff5f0;
  min-height: 100vh;
}

.section-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #2c2c2c;
  text-align: center;
  margin-bottom: 48px;
  position: relative;
}

.section-title::after {
  content: '';
  display: block;
  width: 80px;
  height: 3px;
  background: #ffb5a7;
  margin: 16px auto 0;
  border-radius: 2px;
}

.forum-card {
  background: white;
  border: 1px solid #ffd4c5;
  border-radius: 20px;
  padding: 24px;
  max-width: 700px;
  margin: 0 auto;
  margin-bottom: 60px;
}

.forum-label {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  color: #2c2c2c;
  margin-bottom: 12px;
}

.forum-textarea {
  width: 100%;
  padding: 12px 16px;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  color: #2c2c2c;
  background: #fff5f0;
  border: 1px solid #ffd4c5;
  border-radius: 16px;
  resize: vertical;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.forum-textarea:focus {
  outline: none;
  border-color: #ffb5a7;
  box-shadow: 0 0 0 2px rgba(255, 181, 167, 0.2);
}

.forum-textarea::placeholder {
  color: #8e8e8e;
}

.submit-btn {
  background: #2c2c2c;
  color: white;
  border: none;
  border-radius: 30px;
  padding: 12px 32px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 16px;
}

.submit-btn:hover:not(:disabled) {
  background: #ffb5a7;
  color: #2c2c2c;
  transform: scale(1.02);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.login-prompt {
  background: white;
  border: 1px solid #ffd4c5;
  border-radius: 20px;
  padding: 32px;
  max-width: 700px;
  margin: 0 auto;
  margin-bottom: 60px;
  text-align: center;
}

.login-prompt-text {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #8e8e8e;
  margin: 0;
}

.login-prompt-btn {
  background: none;
  border: none;
  color: #ffb5a7;
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.login-prompt-btn:hover {
  color: #2c2c2c;
  text-decoration: underline;
}

.posts-container {
  max-width: 700px;
  margin: 0 auto;
}

.post-card {
  background: white;
  border: 1px solid #ffd4c5;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 20px;
  transition: all 0.3s ease;
}

.post-card:hover {
  transform: translateX(5px);
  border-color: #ffb5a7;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
}

.post-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.post-avatar {
  width: 40px;
  height: 40px;
  background: #ffb5a7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  color: white;
}

.post-info {
  flex: 1;
}

.post-author {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  color: #2c2c2c;
}

.post-date {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: #8e8e8e;
}

.post-content {
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  color: #2c2c2c;
  line-height: 1.5;
  padding: 12px 0;
  border-top: 1px solid #ffd4c5;
  border-bottom: 1px solid #ffd4c5;
  margin-bottom: 12px;
}

.post-actions {
  display: flex;
  gap: 16px;
}

.like-btn {
  background: transparent;
  border: none;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #ffb5a7;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 4px 8px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.like-btn:hover:not(:disabled) {
  background: #ffb5a7;
  color: #2c2c2c;
}

.like-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.like-btn.liked {
  color: #e53935;
}

.like-btn.liked .heart-icon {
  color: #e53935;
}

.heart-icon {
  transition: all 0.3s ease;
}

/* Адаптив */
@media (max-width: 768px) {
  .section-title {
    font-size: 1.8rem;
    margin-bottom: 32px;
  }

  .forum-card {
    padding: 16px !important;
    margin-bottom: 40px;
  }

  .post-card {
    padding: 16px;
  }

  .post-avatar {
    width: 32px;
    height: 32px;
    font-size: 0.9rem;
  }

  .post-author {
    font-size: 0.9rem;
  }

  .post-content {
    font-size: 0.85rem;
  }
}
</style>

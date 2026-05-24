<template>
  <div class="gallery-page">
    <v-container class="py-8">
      <h1 class="section-title">Галерея концертов</h1>

      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
          v-for="(photo, index) in photos"
          :key="index"
        >
          <div class="gallery-item" @click="openModal(index)">
            <div class="gallery-image-wrapper">
              <img :src="photo.thumb" class="gallery-image" />
              <div class="gallery-overlay"></div>
            </div>
          </div>
        </v-col>
      </v-row>

      <!-- Модальное окно с навигацией -->
      <v-dialog v-model="modalOpen" max-width="900" @click:outside="closeModal">
        <v-card class="modal-card">
          <v-btn
            class="close-btn"
            icon="mdi-close"
            variant="text"
            @click="closeModal"
          ></v-btn>

          <img :src="photos[currentPhoto].full" class="modal-image" />

          <v-card-actions class="justify-center">
            <button
              class="nav-btn"
              @click="prevPhoto"
              :disabled="currentPhoto === 0"
            >
              ◀ Назад
            </button>
            <button
              class="nav-btn"
              @click="nextPhoto"
              :disabled="currentPhoto === photos.length - 1"
            >
              Вперед ▶
            </button>
          </v-card-actions>

          <div class="photo-counter">
            {{ currentPhoto + 1 }} / {{ photos.length }}
          </div>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const photos = ref([
  { thumb: '/a.png', full: '/a.png' },
  { thumb: '/b.png', full: '/b.png' },
  { thumb: '/c.png', full: '/c.png' },
  { thumb: '/d.png', full: '/d.png' },
  { thumb: '/e.png', full: '/e.png' },
  { thumb: '/f.png', full: '/f.png' },
]);

const modalOpen = ref(false);
const currentPhoto = ref(0);

const openModal = (index) => {
  currentPhoto.value = index;
  modalOpen.value = true;
};

const closeModal = () => {
  modalOpen.value = false;
};

const nextPhoto = () => {
  if (currentPhoto.value < photos.value.length - 1) {
    currentPhoto.value++;
  }
};

const prevPhoto = () => {
  if (currentPhoto.value > 0) {
    currentPhoto.value--;
  }
};
</script>

<style scoped>
.gallery-page {
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

.gallery-item {
  cursor: pointer;
  margin-bottom: 24px;
}

.gallery-image-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  border: 1px solid #ffd4c5;
  background: white;
}

.gallery-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}

.gallery-item:hover .gallery-image {
  transform: scale(1.08);
}

.gallery-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 181, 167, 0.3);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-item:hover .gallery-overlay {
  opacity: 1;
}

/* Модальное окно */
.modal-card {
  position: relative;
  background: #1a1a1a;
  padding: 20px;
  border-radius: 16px;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  color: white !important;
  background: rgba(0, 0, 0, 0.5) !important;
}

.close-btn:hover {
  background: #ffb5a7 !important;
  color: #2c2c2c !important;
}

.modal-image {
  width: 100%;
  max-height: 500px;
  object-fit: contain;
  border-radius: 8px;
}

.nav-btn {
  background: transparent;
  color: #ffb5a7;
  border: 1px solid #ffb5a7;
  border-radius: 30px;
  padding: 8px 24px;
  margin: 0 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
}

.nav-btn:hover:not(:disabled) {
  background: #ffb5a7;
  color: #2c2c2c;
  transform: scale(1.05);
}

.nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.photo-counter {
  text-align: center;
  margin-top: 16px;
  color: #8e8e8e;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
}

/* Адаптив */
@media (max-width: 768px) {
  .section-title {
    font-size: 1.8rem;
    margin-bottom: 32px;
  }

  .gallery-image {
    height: 200px;
  }
}

@media (max-width: 600px) {
  .section-title {
    font-size: 1.5rem;
  }

  .gallery-image {
    height: 180px;
  }

  .nav-btn {
    padding: 6px 16px;
    font-size: 0.8rem;
  }
}
</style>

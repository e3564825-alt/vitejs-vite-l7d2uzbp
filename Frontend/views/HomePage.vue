<template>
  <div>
    <!-- Hero секция с фоновой картинкой -->
    <div class="hero-section">
      <div class="hero-bg">
        <img src="/image.png" alt="I Love You album" />
        <div class="hero-overlay"></div>
      </div>

      <v-container class="hero-content">
        <v-row justify="start" align="center" class="min-vh-75">
          <v-col cols="12" md="8" lg="7" class="text-left">
            <h1 class="main-title">THE NEIGHBOURHOOD</h1>

            <!-- Поиск и кнопка в одну строку -->
            <div class="search-row">
              <v-card class="search-card pa-2" elevation="0">
                <v-text-field
                  v-model="searchQuery"
                  placeholder="Поиск песен, альбомов, туров..."
                  variant="solo"
                  density="comfortable"
                  prepend-inner-icon="mdi-magnify"
                  clearable
                  class="search-input"
                  hide-details
                ></v-text-field>
              </v-card>

              <button class="cta-btn" @click="goToTours">
                Узнать концерты
              </button>
            </div>

            <!-- Результаты поиска (под строкой поиска) -->
            <div
              v-if="searchQuery && searchResults.length > 0"
              class="search-results"
            >
              <div class="search-results-header">
                <v-icon icon="mdi-magnify" size="small" />
                <span>Результаты поиска: "{{ searchQuery }}"</span>
              </div>
              <div class="search-results-list">
                <div
                  v-for="result in searchResults"
                  :key="result.title"
                  class="search-result-item"
                  @click="handleResultClick(result)"
                >
                  <div class="result-icon">
                    <v-icon
                      :icon="
                        result.type === 'album' ? 'mdi-album' : 'mdi-ticket'
                      "
                      size="small"
                    />
                  </div>
                  <div class="result-info">
                    <div class="result-title">{{ result.title }}</div>
                    <div class="result-description">
                      {{ result.description }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Если ничего не найдено -->
            <div
              v-else-if="searchQuery && searchResults.length === 0"
              class="search-results empty"
            >
              <v-icon icon="mdi-emoticon-sad" size="small" />
              <span>Ничего не найдено по запросу "{{ searchQuery }}"</span>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- Альбомы с картинками -->
    <v-container class="py-8">
      <h2 class="text-h4 mb-6 text-center section-title">Альбомы</h2>
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="3"
          v-for="album in albums"
          :key="album.title"
        >
          <a :href="album.yandexLink" target="_blank" class="album-link">
            <v-card class="album-card">
              <v-img
                :src="`/${album.image}`"
                height="200"
                cover
                class="album-img"
              ></v-img>
              <v-card-title class="album-card-title">{{
                album.title
              }}</v-card-title>
              <v-card-subtitle class="album-card-subtitle">{{
                album.year
              }}</v-card-subtitle>
            </v-card>
          </a>
        </v-col>
      </v-row>
    </v-container>

    <!-- Ближайшие концерты -->
    <v-container class="py-8">
      <h2 class="text-h4 mb-6 text-center section-title">Ближайшие концерты</h2>
      <v-row>
        <v-col cols="12" md="4" v-for="tour in upcomingTours" :key="tour.city">
          <v-card class="tour-home-card">
            <div class="tour-card-content">
              <div class="tour-info">
                <div class="tour-card-title">{{ tour.city }}</div>
                <div class="tour-card-date">{{ tour.date }}</div>
                <div class="tour-card-venue">{{ tour.venue }}</div>
              </div>
              <button class="tour-details-btn" @click="goToTours">
                Подробнее
              </button>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const searchQuery = ref('');

const goToTours = () => {
  router.push('/tours');
};

const albums = [
  {
    title: 'I Love You',
    year: 2013,
    image: '1.png',
    yandexLink:
      'https://music.yandex.ru/album/39947140?utm_source=web&utm_medium=copy_link',
  },
  {
    title: 'Wiped Out!',
    year: 2015,
    image: '2.png',
    yandexLink:
      'https://music.yandex.ru/album/39947534?utm_source=web&utm_medium=copy_link',
  },
  {
    title: 'Hard To Imagine',
    year: 2018,
    image: '3.png',
    yandexLink:
      'https://music.yandex.ru/album/5960534?utm_source=web&utm_medium=copy_link',
  },
  {
    title: 'Chrome & Mono',
    year: 2020,
    image: '4.png',
    yandexLink:
      'https://music.yandex.ru/album/18334790?utm_source=web&utm_medium=copy_link',
  },
];

const upcomingTours = [
  { city: 'Лондон', date: '25 июля 2025', venue: 'O2 Arena' },
  { city: 'Берлин', date: '28 июля 2025', venue: 'Mercedes-Benz Arena' },
  { city: 'Париж', date: '1 августа 2025', venue: 'Accor Arena' },
];

const searchResults = computed(() => {
  if (!searchQuery.value) return [];
  const query = searchQuery.value.toLowerCase();
  return [
    ...albums
      .filter((a) => a.title.toLowerCase().includes(query))
      .map((a) => ({
        title: a.title,
        description: `Альбом ${a.year} года`,
        type: 'album',
        link: a.yandexLink,
      })),
    ...upcomingTours
      .filter((t) => t.city.toLowerCase().includes(query))
      .map((t) => ({
        title: t.city,
        description: `Концерт ${t.date}, ${t.venue}`,
        type: 'tour',
        link: '/tours',
      })),
  ];
});

const handleResultClick = (result) => {
  if (result.type === 'album') {
    window.open(result.link, '_blank');
  } else if (result.type === 'tour') {
    router.push(result.link);
  }
  searchQuery.value = '';
};
</script>

<style scoped>
/* Hero секция */
.hero-section {
  position: relative;
  min-height: 80vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.hero-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 245, 240, 0.8);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
}

.min-vh-75 {
  min-height: 80vh;
}

/* Заголовок THE NEIGHBOURHOOD */
.main-title {
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(48px, 8vw, 100px);
  font-weight: 900;
  letter-spacing: -0.03em;
  line-height: 1.1;
  color: #2c2c2c;
  text-transform: uppercase;
  margin-bottom: 32px;
  text-align: left;
}

/* Поиск и кнопка в одну строку */
.search-row {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  width: 100%;
}

.search-card {
  background: white;
  border-radius: 60px;
  border: 1px solid #ffd4c5;
  flex: 1;
  min-width: 300px;
}

.search-card :deep(.v-field) {
  border-radius: 60px;
}

.search-card :deep(.v-field__input) {
  padding: 14px 20px !important;
  font-size: 1rem;
}

.cta-btn {
  background: #2c2c2c;
  color: white;
  border: none;
  border-radius: 60px;
  padding: 0 32px;
  height: 54px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  flex-shrink: 0;
}

.cta-btn:hover {
  background: #ffb5a7;
  color: #2c2c2c;
  transform: scale(1.02);
}

/* Результаты поиска */
.search-results {
  margin-top: 20px;
  background: white;
  border-radius: 20px;
  border: 1px solid #ffd4c5;
  overflow: hidden;
  width: 100%;
}

.search-results-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #fff5f0;
  border-bottom: 1px solid #ffd4c5;
  font-size: 0.85rem;
  font-weight: 500;
  color: #2c2c2c;
}

.search-results-list {
  max-height: 300px;
  overflow-y: auto;
}

.search-result-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid #ffd4c5;
}

.search-result-item:last-child {
  border-bottom: none;
}

.search-result-item:hover {
  background: #fff5f0;
  transform: translateX(4px);
}

.result-icon {
  width: 32px;
  height: 32px;
  background: #ffb5a7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.result-info {
  flex: 1;
}

.result-title {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  color: #2c2c2c;
}

.result-description {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: #8e8e8e;
}

.search-results.empty {
  padding: 16px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #8e8e8e;
  font-size: 0.85rem;
}

/* Секции */
.section-title {
  font-family: 'Montserrat', sans-serif;
  color: #2c2c2c;
  font-weight: 800;
  letter-spacing: -0.02em;
}

/* Карточки альбомов */
.album-card {
  background: white;
  border: 1px solid #ffd4c5;
  transition: all 0.3s ease;
  cursor: pointer;
  overflow: hidden;
}

.album-card:hover {
  transform: translateY(-5px);
  border-color: #ffb5a7;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
}

.album-img {
  transition: transform 0.5s ease;
}

.album-card:hover .album-img {
  transform: scale(1.08);
}

.album-card-title {
  font-family: 'Montserrat', sans-serif;
  color: #2c2c2c;
  text-align: center !important;
  justify-content: center !important;
  display: flex !important;
  width: 100%;
  padding: 12px 0 0 0 !important;
  margin: 0;
}

.album-card-subtitle {
  font-family: 'Inter', sans-serif;
  color: #8e8e8e;
  text-align: center !important;
  justify-content: center !important;
  display: flex !important;
  width: 100%;
  padding: 0 0 12px 0 !important;
  margin: 0;
}

.album-link {
  text-decoration: none;
}

/* Карточки туров на главной */
.tour-home-card {
  background: white;
  border: 1px solid #ffd4c5;
  border-radius: 24px;
  transition: all 0.3s ease;
  cursor: pointer;
  overflow: hidden;
}

.tour-home-card:hover {
  transform: translateY(-5px);
  border-color: #ffb5a7;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
}

.tour-card-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.tour-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.tour-card-title {
  font-family: 'Montserrat', sans-serif;
  color: #2c2c2c;
  font-weight: 700;
  font-size: 1.2rem;
}

.tour-card-date {
  font-family: 'Inter', sans-serif;
  color: #8e8e8e;
  font-weight: 500;
  font-size: 0.85rem;
}

.tour-card-venue {
  font-family: 'Inter', sans-serif;
  color: #8e8e8e;
  font-size: 0.85rem;
}

.tour-details-btn {
  background: #2c2c2c;
  color: white;
  border: none;
  border-radius: 30px;
  padding: 10px 16px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.tour-details-btn:hover {
  background: #ffb5a7;
  color: #2c2c2c;
  transform: scale(1.02);
}
</style>

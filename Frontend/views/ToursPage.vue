<template>
  <div class="tours-page">
    <v-container class="py-8">
      <h1 class="section-title">Ближайшие концерты</h1>

      <v-row>
        <v-col cols="12" sm="6" md="4" v-for="tour in tours" :key="tour.city">
          <v-card class="tour-card" elevation="0">
            <v-card-item>
              <v-card-title class="tour-city">{{ tour.city }}</v-card-title>
              <v-card-subtitle class="tour-date">{{
                tour.date
              }}</v-card-subtitle>
            </v-card-item>

            <v-card-text>
              <div class="tour-venue">{{ tour.venue }}</div>
              <div class="tour-address">{{ tour.address }}</div>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <button class="tour-btn" @click="openTourModal(tour)">
                Купить билет
              </button>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <TourModal v-model="modalOpen" :tour="selectedTour" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TourModal from '../components/TourModal.vue';

const tours = [
  {
    city: 'Лондон',
    date: '25 июля 2026',
    venue: 'O2 Arena',
    address: 'London, Peninsula Square',
    title: 'The Neighbourhood в Лондоне',
    time: '19:00 - 23:00',
    location: 'O2 Arena, London, Peninsula Square',
    price: 'От 5 000 ₽ до 25 000 ₽',
    description:
      'Долгожданное выступление The Neighbourhood в Лондоне. Грандиозное шоу с новым звуком и визуальными эффектами.',
    warning:
      'Вход строго 18+. Рекомендуем приходить заранее, чтобы избежать очередей.',
  },
  {
    city: 'Берлин',
    date: '28 июля 2026',
    venue: 'Mercedes-Benz Arena',
    address: 'Berlin, Mercedes-Platz 1',
    title: 'The Neighbourhood в Берлине',
    time: '20:00 - 23:30',
    location: 'Mercedes-Benz Arena, Berlin',
    price: 'От 4 500 ₽ до 20 000 ₽',
    description:
      'Не пропустите единственный концерт The Neighbourhood в Берлине в этом году.',
    warning:
      'Вход строго 18+. Рекомендуем приходить заранее, чтобы избежать очередей.',
  },
  {
    city: 'Париж',
    date: '1 августа 2026',
    venue: 'Accor Arena',
    address: 'Paris, Boulevard de Bercy',
    title: 'The Neighbourhood в Париже',
    time: '19:30 - 22:30',
    location: 'Accor Arena, Paris',
    price: 'От 6 000 ₽ до 30 000 ₽',
    description:
      'The Neighbourhood возвращаются в Париж с новой программой. Шоу с полным погружением.',
    warning:
      'Вход строго 18+. Рекомендуем приходить заранее, чтобы избежать очередей.',
  },
  {
    city: 'Лос-Анджелес',
    date: '15 августа 2026',
    venue: 'Hollywood Bowl',
    address: 'Los Angeles, Highland Ave',
    title: 'The Neighbourhood в Лос-Анджелесе',
    time: '20:00 - 23:00',
    location: 'Hollywood Bowl, LA',
    price: 'От 7 000 ₽ до 35 000 ₽',
    description:
      'Историческое выступление на легендарной сцене Hollywood Bowl.',
    warning:
      'Вход строго 18+. Рекомендуем приходить заранее, чтобы избежать очередей.',
  },
  {
    city: 'Нью-Йорк',
    date: '20 августа 2026',
    venue: 'Madison Square Garden',
    address: 'New York, 4 Pennsylvania Plaza',
    title: 'The Neighbourhood в Нью-Йорке',
    time: '19:00 - 22:30',
    location: 'Madison Square Garden, NYC',
    price: 'От 8 000 ₽ до 40 000 ₽',
    description:
      'The Neighbourhood на главной арене Нью-Йорка. Грандиозное шоу.',
    warning:
      'Вход строго 18+. Рекомендуем приходить заранее, чтобы избежать очередей.',
  },
  {
    city: 'Токио',
    date: '5 сентября 2026',
    venue: 'Tokyo Dome',
    address: 'Tokyo, 1-3-61 Koraku',
    title: 'The Neighbourhood в Токио',
    time: '18:00 - 21:30',
    location: 'Tokyo Dome, Tokyo',
    price: 'От 5 500 ₽ до 28 000 ₽',
    description:
      'Первый визит The Neighbourhood в Токио. Уникальное шоу с восточным колоритом.',
    warning:
      'Вход строго 18+. Рекомендуем приходить заранее, чтобы избежать очередей.',
  },
];

const selectedTour = ref(null);
const modalOpen = ref(false);

const openTourModal = (tour) => {
  selectedTour.value = tour;
  modalOpen.value = true;
};
</script>

<style scoped>
.tours-page {
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

.tour-card {
  background: white;
  border: 1px solid #ffd4c5;
  border-radius: 24px;
  transition: all 0.3s ease;
  cursor: pointer;
  padding: 8px;
  position: relative;
  overflow: hidden;
}

.tour-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: #ffb5a7;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.tour-card:hover {
  transform: translateY(-4px);
  border-color: #ffb5a7;
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.06);
}

.tour-card:hover::before {
  transform: scaleX(1);
}

.tour-city {
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  font-size: 1.3rem;
  letter-spacing: -0.02em;
  color: #2c2c2c;
  margin-bottom: 4px;
  padding: 0;
}

.tour-date {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.8rem;
  color: #ffb5a7;
  margin-bottom: 8px;
}

.tour-venue {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.9rem;
  color: #2c2c2c;
  margin-bottom: 6px;
}

.tour-address {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  color: #8e8e8e;
  font-size: 0.75rem;
  margin-top: 4px;
}

.tour-btn {
  background: #2c2c2c;
  color: white;
  border: none;
  border-radius: 30px;
  padding: 6px 20px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tour-btn:hover {
  background: #ffb5a7;
  color: #2c2c2c;
  transform: scale(1.02);
}

/* Адаптив */
@media (max-width: 960px) {
  .section-title {
    font-size: 2rem;
    margin-bottom: 36px;
  }

  .tour-city {
    font-size: 1.2rem;
  }
}

@media (max-width: 600px) {
  .section-title {
    font-size: 1.6rem;
    margin-bottom: 28px;
  }

  .tour-card {
    padding: 6px;
  }

  .tour-city {
    font-size: 1.1rem;
  }

  .tour-date {
    font-size: 0.7rem;
  }

  .tour-venue {
    font-size: 0.8rem;
  }

  .tour-address {
    font-size: 0.65rem;
  }

  .tour-btn {
    padding: 4px 14px;
    font-size: 0.65rem;
  }
}
</style>

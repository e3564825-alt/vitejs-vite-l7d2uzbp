<template>
  <div class="history-page">
    <v-container class="py-8">
      <h1 class="section-title">История группы</h1>

      <div class="timeline">
        <div
          v-for="(event, index) in history"
          :key="index"
          class="timeline-item"
          :class="{ 'timeline-item-right': index % 2 === 1 }"
        >
          <div class="timeline-icon">
            <div class="timeline-dot"></div>
          </div>
          <div class="timeline-content">
            <div class="timeline-year">{{ event.year }}</div>
            <h3 class="timeline-title">{{ event.title }}</h3>
            <p class="timeline-description">{{ event.description }}</p>
          </div>
        </div>
      </div>

      <div class="achievements-section">
        <h2 class="achievements-title">Достижения</h2>
        <div class="achievements-grid">
          <div
            v-for="(ach, index) in achievements"
            :key="index"
            class="achievement-card"
          >
            <div class="achievement-number">{{ index + 1 }}</div>
            <p class="achievement-text">{{ ach }}</p>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script setup>
const history = [
  {
    year: '2011',
    title: 'Основание',
    description: 'Группа сформирована в Ньюбери-Парк, Калифорния',
  },
  {
    year: '2012',
    title: 'Дебютный EP',
    description: 'Релиз "I\'m Sorry..."',
  },
  {
    year: '2013',
    title: 'Мировой успех',
    description: 'Сингл "Sweater Weather" становится платиновым',
  },
  {
    year: '2018',
    title: 'Альбом Hard To Imagine',
    description: 'Экспериментальный период группы',
  },
];

const achievements = [
  'Платиновый статус "Sweater Weather" (США, Австралия, Великобритания)',
  'Более 2 миллиардов стримов на Spotify',
  'Туры по 25 странам мира',
  '3 студийных альбома в топ-10 Billboard',
  'Премия Alternative Press Music Awards',
  'Номинация на MTV Video Music Awards 2014',
];
</script>

<style scoped>
.history-page {
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

/* Таймлайн */
.timeline {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px 0;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 100%;
  background: #ffb5a7;
}

.timeline-item {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 24px;
  position: relative;
  width: 100%;
}

.timeline-item-right {
  justify-content: flex-end;
}

.timeline-icon {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 28px;
  height: 28px;
  background: white;
  border: 2px solid #ffb5a7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.timeline-dot {
  width: 8px;
  height: 8px;
  background: #ffb5a7;
  border-radius: 50%;
}

.timeline-content {
  width: 45%;
  padding: 12px 16px;
  background: white;
  border-radius: 12px;
  border: 1px solid #ffd4c5;
  transition: all 0.3s ease;
  position: relative;
}

.timeline-content:hover {
  transform: translateY(-2px);
  border-color: #ffb5a7;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
}

.timeline-item:not(.timeline-item-right) .timeline-content {
  margin-right: 55%;
}

.timeline-item-right .timeline-content {
  margin-left: 55%;
}

.timeline-year {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  color: #ffb5a7;
  margin-bottom: 4px;
}

.timeline-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #2c2c2c;
  margin-bottom: 6px;
}

.timeline-description {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #8e8e8e;
  line-height: 1.4;
  margin: 0;
}

/* Достижения */
.achievements-section {
  margin-top: 60px;
  text-align: center;
}

.achievements-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #2c2c2c;
  margin-bottom: 40px;
  position: relative;
  display: inline-block;
}

.achievements-title::after {
  content: '';
  display: block;
  width: 60px;
  height: 3px;
  background: #ffb5a7;
  margin: 12px auto 0;
  border-radius: 2px;
}

.achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  max-width: 1000px;
  margin: 0 auto;
}

.achievement-card {
  background: white;
  padding: 24px 20px;
  border-radius: 20px;
  border: 1px solid #ffd4c5;
  transition: all 0.3s ease;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.achievement-card:hover {
  transform: translateY(-5px);
  border-color: #ffb5a7;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
}

.achievement-number {
  width: 40px;
  height: 40px;
  background: #ffb5a7;
  color: white;
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  font-size: 1.2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
}

.achievement-text {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #2c2c2c;
  margin: 0;
  line-height: 1.4;
  text-align: center;
}

/* Адаптив */
@media (max-width: 768px) {
  .section-title {
    font-size: 1.8rem;
    margin-bottom: 32px;
  }

  .timeline::before {
    left: 20px;
  }

  .timeline-icon {
    left: 20px;
    transform: translateX(0);
    width: 24px;
    height: 24px;
  }

  .timeline-dot {
    width: 6px;
    height: 6px;
  }

  .timeline-content {
    width: calc(100% - 60px);
    margin-left: 60px !important;
    margin-right: 0 !important;
    padding: 10px 14px;
  }

  .timeline-item {
    justify-content: flex-start !important;
    margin-bottom: 20px;
  }

  .timeline-item-right .timeline-content {
    margin-left: 60px !important;
  }

  .timeline-title {
    font-size: 1rem;
  }

  .timeline-description {
    font-size: 0.8rem;
  }

  .achievements-title {
    font-size: 1.5rem;
  }

  .achievements-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>

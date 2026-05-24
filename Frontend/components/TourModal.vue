<template>
  <v-dialog v-model="visible" max-width="700" @click:outside="close" scrollable>
    <v-card class="tour-modal">
      <v-card-title class="tour-modal-title">
        {{ tour.title }}
      </v-card-title>

      <v-card-text class="modal-scrollable">
        <div class="tour-info">
          <!-- Дата, время, место в одну строку -->
          <div class="tour-meta-row">
            <div class="tour-meta-item">
              <v-icon icon="mdi-calendar" size="small" class="meta-icon" />
              <span>{{ tour.date }}</span>
            </div>
            <div class="tour-meta-item">
              <v-icon icon="mdi-clock-outline" size="small" class="meta-icon" />
              <span>{{ tour.time }}</span>
            </div>
            <div class="tour-meta-item">
              <v-icon icon="mdi-map-marker" size="small" class="meta-icon" />
              <span>{{ tour.location }}</span>
            </div>
          </div>

          <!-- Интерактивный блок цен -->
          <div class="price-selector">
            <div
              v-for="price in priceOptions"
              :key="price.value"
              class="price-card"
              :class="{ active: selectedPrice === price.value }"
              @click="selectPrice(price.value)"
            >
              <div class="price-amount">{{ price.label }}</div>
              <div class="price-zone">{{ price.zoneName }}</div>
            </div>
          </div>

          <div class="tour-description">
            {{ tour.description }}
          </div>

          <div class="tour-warning">
            <v-icon icon="mdi-alert" size="small" class="warning-icon" />
            <span>{{ tour.warning }}</span>
          </div>

          <!-- Схема зала -->
          <div class="hall-scheme">
            <h4 class="scheme-title">
              <v-icon icon="mdi-floor-plan" size="small" />
              Схема зала
            </h4>
            <div class="scheme-container">
              <!-- Сцена на всю ширину -->
              <div class="stage-full">СЦЕНА</div>

              <!-- Основная схема -->
              <div class="hall-layout">
                <div
                  class="vip-left"
                  :class="{ active: selectedPrice === 'vip' }"
                >
                  <div class="vip-circles-column">
                    <span
                      class="circle"
                      v-for="n in 5"
                      :key="'left-' + n"
                    ></span>
                  </div>
                </div>

                <div
                  class="dancefloor-section"
                  :class="{
                    active:
                      selectedPrice === 'dancefloor' ||
                      selectedPrice === 'meet',
                  }"
                >
                  <span>ТАНЦПОЛ</span>
                </div>

                <div
                  class="vip-right"
                  :class="{ active: selectedPrice === 'vip' }"
                >
                  <div class="vip-circles-column">
                    <span
                      class="circle"
                      v-for="n in 5"
                      :key="'right-' + n"
                    ></span>
                  </div>
                </div>
              </div>

              <div
                class="vip-bottom"
                :class="{ active: selectedPrice === 'vip' }"
              >
                <div class="vip-circles-row">
                  <span
                    class="circle"
                    v-for="n in 12"
                    :key="'bottom-' + n"
                  ></span>
                </div>
              </div>

              <div class="legend">
                <div class="legend-item">
                  <div class="legend-box dancefloor"></div>
                  <span>Танцпол</span>
                </div>
                <div class="legend-item">
                  <div class="legend-box vip"></div>
                  <span>VIP</span>
                </div>
              </div>
            </div>
          </div>

          <div v-if="selectedTicketInfo" class="selected-ticket-info">
            <v-icon icon="mdi-check-circle" color="#FFB5A7" />
            {{ selectedTicketInfo }}
          </div>
        </div>
      </v-card-text>

      <v-card-actions class="modal-actions">
        <button class="tour-modal-btn" @click="close">Закрыть</button>
        <button class="tour-modal-btn primary" @click="orderTicket">
          Оформить заказ
        </button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, defineModel } from 'vue';

const visible = defineModel();
const selectedPrice = ref(null);

const props = defineProps({
  tour: {
    type: Object,
    default: () => ({
      title: 'The Neighbourhood в Лондоне',
      date: '25 июля 2025',
      time: '19:00 - 23:00',
      location: 'O2 Arena, London, Peninsula Square',
      description:
        'Долгожданное выступление The Neighbourhood в Лондоне. Грандиозное шоу с новым звуком и визуальными эффектами.',
      warning:
        'Вход строго 18+. Рекомендуем приходить заранее, чтобы избежать очередей.',
    }),
  },
});

const priceOptions = [
  { value: 'dancefloor', label: '5 000 ₽', zoneName: 'Танцпол' },
  { value: 'vip', label: '15 000 ₽', zoneName: 'VIP' },
  { value: 'meet', label: '25 000 ₽', zoneName: 'Meet & Greet' },
];

const selectPrice = (value) => {
  selectedPrice.value = value;
};

const selectedTicketInfo = computed(() => {
  if (!selectedPrice.value) return null;
  const option = priceOptions.find((p) => p.value === selectedPrice.value);
  if (selectedPrice.value === 'meet') {
    return `Вы выбрали Meet & Greet (${option.label}) — доступ на танцпол + встреча с группой`;
  }
  if (selectedPrice.value === 'vip') {
    return `Вы выбрали VIP (${option.label})`;
  }
  return `Вы выбрали ${option.zoneName} (${option.label})`;
});

const close = () => {
  visible.value = false;
  selectedPrice.value = null;
};

const orderTicket = () => {
  if (selectedPrice.value) {
    alert(`Билет ${selectedTicketInfo.value} оформлен!`);
  } else {
    alert('Пожалуйста, выберите категорию билета');
  }
  close();
};
</script>

<style scoped>
.tour-modal {
  border-radius: 28px;
  background: white;
  overflow: hidden;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.modal-scrollable {
  overflow-y: auto;
  max-height: 65vh;
  padding: 16px 24px !important;
}

.tour-modal-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.6rem;
  font-weight: 800;
  background: #ffb5a7;
  color: #2c2c2c;
  padding: 20px 24px;
  flex-shrink: 0;
}

.tour-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Дата, время, место в одну строку */
.tour-meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: flex-start;
}

.tour-meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: #2c2c2c;
  background: #fff5f0;
  padding: 5px 12px;
  border-radius: 40px;
  width: fit-content;
}

.meta-icon {
  color: #ffb5a7;
}

/* Блок выбора цен */
.price-selector {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin: 8px 0;
}

.price-card {
  flex: 1;
  background: #fff5f0;
  border: 2px solid #ffd4c5;
  border-radius: 20px;
  padding: 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.price-card.active {
  border-color: #ffb5a7;
  background: #ffb5a7;
  transform: scale(1.02);
}

.price-amount {
  font-weight: 800;
  font-size: 1.1rem;
  color: #2c2c2c;
}

.price-zone {
  font-size: 0.75rem;
  color: #8e8e8e;
}

.price-card.active .price-zone {
  color: #2c2c2c;
}

.tour-description {
  background: #fff5f0;
  padding: 14px;
  border-radius: 20px;
  line-height: 1.45;
  color: #2c2c2c;
}

.tour-warning {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #ffe5e5;
  padding: 12px;
  border-radius: 16px;
  color: #e53935;
  font-size: 0.85rem;
}

.warning-icon {
  color: #e53935;
}

/* Схема зала */
.hall-scheme {
  margin-top: 0;
  padding-top: 0;
  background: #faf7f2;
  border-radius: 24px;
  padding: 16px;
}

.scheme-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 16px;
  margin-top: 0;
  color: #2c2c2c;
}

.scheme-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

/* Сцена на всю ширину */
.stage-full {
  background: #2c2c2c;
  color: white;
  padding: 14px;
  text-align: center;
  font-weight: 800;
  border-radius: 40px;
  width: 100%;
  letter-spacing: 2px;
  font-size: 1rem;
}

.hall-layout {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 16px;
  width: 100%;
}

.vip-left,
.vip-right {
  display: flex;
  align-items: center;
  background: transparent;
  transition: all 0.2s;
}

.vip-left.active .circle,
.vip-right.active .circle,
.vip-bottom.active .circle {
  transform: scale(1.1);
  box-shadow: 0 0 0 2px #2c2c2c;
}

.vip-circles-column {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.vip-circles-column .circle {
  width: 32px;
  height: 32px;
  background: #ffb5a7;
  border-radius: 50%;
  display: block;
  opacity: 0.8;
  transition: all 0.2s;
}

.vip-circles-column .circle:hover {
  transform: scale(1.1);
}

.dancefloor-section {
  flex: 3;
  background: white;
  border: 2px solid #ffd4c5;
  border-radius: 20px;
  padding: 32px 16px;
  text-align: center;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dancefloor-section.active {
  background: #ffb5a7;
  border-color: #2c2c2c;
  transform: scale(1.02);
}

.dancefloor-section span {
  font-weight: 800;
  color: #2c2c2c;
  letter-spacing: 1px;
}

.vip-bottom {
  width: 100%;
  margin-top: 8px;
  transition: all 0.2s;
}

.vip-circles-row {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.vip-circles-row .circle {
  width: 32px;
  height: 32px;
  background: #ffb5a7;
  border-radius: 50%;
  display: inline-block;
  opacity: 0.8;
  transition: all 0.2s;
}

.vip-circles-row .circle:hover {
  transform: scale(1.1);
}

.vip-bottom.active .circle {
  transform: scale(1.1);
  box-shadow: 0 0 0 2px #2c2c2c;
}

/* Легенда */
.legend {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 20px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.7rem;
}

.legend-box {
  width: 20px;
  height: 20px;
  border-radius: 6px;
}

.legend-box.dancefloor {
  background: white;
  border: 2px solid #ffd4c5;
}

.legend-box.vip {
  background: #ffb5a7;
  border-radius: 50%;
}

.selected-ticket-info {
  margin-top: 12px;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  color: #2c2c2c;
  background: #ffb5a7;
  padding: 8px;
  border-radius: 40px;
}

.modal-actions {
  padding: 16px 24px 24px;
  gap: 16px;
  flex-shrink: 0;
}

.tour-modal-btn {
  background: #2c2c2c;
  color: white;
  border: none;
  border-radius: 40px;
  padding: 10px 28px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.tour-modal-btn.primary {
  background: #ffb5a7;
  color: #2c2c2c;
}

.tour-modal-btn:hover {
  transform: scale(1.02);
  filter: brightness(0.96);
}
</style>

import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import HistoryPage from '../views/HistoryPage.vue';
import ToursPage from '../views/ToursPage.vue';
import GalleryPage from '../views/GalleryPage.vue';
import ForumPage from '../views/ForumPage.vue';

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/history', name: 'history', component: HistoryPage },
  { path: '/tours', name: 'tours', component: ToursPage },
  { path: '/gallery', name: 'gallery', component: GalleryPage },
  { path: '/forum', name: 'forum', component: ForumPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { top: 0 };
  },
});

export default router;

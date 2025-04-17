import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/views/dashboard.vue';
import Exam from '@/views/exam.vue';
import Salamat from '@/views/salamat.vue';
import Note from '@/views/note.vue';

const routes = [
  { path: '/', component: Dashboard },
  { path: '/exam', component: Exam },
  { path: '/salamat', component: Salamat },
  { path: '/note', component: Note }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
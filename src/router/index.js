import { createRouter, createWebHistory } from 'vue-router';
import pb from '@/pb'; // وارد کردن PocketBase
import Dashboard from '@/views/dashboard.vue';
import Exam from '@/views/exam.vue';
import Salamat from '@/views/salamat.vue';
import Note from '@/views/note.vue';
import SignUp from '@/components/SignUp.vue';
import Login from '@/components/Login.vue';

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  { path: '/exam', name: 'Exam', component: Exam, meta: { requiresAuth: true } },
  { path: '/salamat', name: 'Salamat', component: Salamat, meta: { requiresAuth: true } },
  { path: '/note', name: 'Note', component: Note, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token') && pb.authStore.isValid;
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue';
import Registro from '@/views/Registro.vue';
import ResetPassword from '@/views/ResetPassword.vue';
import ForgotPassword from '@/views/ForgotPassword.vue';
import Dashboard from '@/views/Dashboard.vue';
import CbcAnalyzer from '@/views/CbcAnalyzer.vue';
import BmpAnalyzer from '@/views/BmpAnalyzer.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/Registro',
    name: 'Registro',
    component: Registro
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: ResetPassword
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true } // Añadimos esta meta para indicar que esta ruta requiere autenticación
  },
  {
    path: '/CbcAnalyzer',
    name: 'CbcAnalyzer',
    component: CbcAnalyzer,// Añadimos esta meta para indicar que esta ruta requiere autenticación
  },
  {
    path: '/BmpAnalyzer',
    name: 'BmpAnalyzer',
    component: BmpAnalyzer,// Añadimos esta meta para indicar que esta ruta requiere autenticación
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// Ruta de protección para las rutas que requieren autenticación
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem('auth_token')) {
    // Si la ruta requiere autenticación y no hay un token, redirige al login
    next({ name: 'Login' });
  } else {
    next(); // Si la ruta no requiere autenticación o el usuario está autenticado, continúa
  }
});

export default router;

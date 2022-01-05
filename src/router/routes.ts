import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/login',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', component: () => import('pages/AuthPage.vue') },
      { path: '/register', component: () => import('pages/RegisterPage.vue') },
      {
        path: '/confirmation',
        component: () => import('pages/MailConfirmationPage.vue'),
      },      
    ],
  },
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/commands', component: () => import('pages/CommandsPage.vue') },
      {
        path: '/me',
        component: () => import('pages/MailConfirmationPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;

import { route } from 'quasar/wrappers';
import VueRouter from 'vue-router';
import { Store } from 'vuex';
import { StateInterface } from '../store';
import routes from './routes';
import Supabase from 'src/services/supabase/Supabase';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default route<Store<StateInterface>>(function ({ Vue }) {
  Vue.use(VueRouter);

  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  Router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login', '/password/reset/', '/register', 'confirmation', '/me'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = new Supabase().getUser();
  
    if (authRequired && !loggedIn) {
      return next('/login');
    }   
    if(to.path == '/login' && loggedIn) {
      return next('/commands');
    }
    next();
  })
  return Router;
})

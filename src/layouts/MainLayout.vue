<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title @click="$router.push('/')" style="cursor:pointer;">
          Command Voice
        </q-toolbar-title>
        <ButtonLogout />

      </q-toolbar>
    
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered      
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in linksData"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">


import { Vue, Component } from 'vue-property-decorator';
import EssentialLink from 'components/EssentialLink.vue'
import ButtonLogout  from 'src/components/layout/ButtonLogout.vue'

@Component({
  components: { EssentialLink, ButtonLogout }
})
export default class MainLayout extends Vue {
 private leftDrawerOpen = false;

  private linksData = [  
  {
    title: 'Início',
    caption: '',
    icon: 'home',
    target: '_self',
    link: '/home'
  },
  {
    title: 'Comandos',
    caption: '',
    icon: 'mic',
    target: '_self',
    link: '/commands'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    target: '_blank',
    link: 'https://github.com/quasarframework'
  }, 
];

 
}
</script>

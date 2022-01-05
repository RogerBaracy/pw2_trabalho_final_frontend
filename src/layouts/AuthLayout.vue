<template>
  <q-layout> 
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Command Voice </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class AuthLayout extends Vue {
}
</script>

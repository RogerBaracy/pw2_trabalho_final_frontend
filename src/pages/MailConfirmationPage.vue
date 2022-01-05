<template>
  <q-page padding>
    <div class="text-h6 text-center q-pa-md">Obrigado por se cadastrar</div>
    <div
      class="text-subtitle2 text-center q-pa-md"
      v-if="$route.query.mail !== 'confirmation'"
    >
      Verifique o seu email
      <span class="text-bold primary">{{ $route.query.mail }}</span> para
      concluir
    </div>
    <div v-else class="text-subtitle2 text-center q-pa-md">
      Email confirmado com sucesso
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class MailConfirmationPage extends Vue {}
</script>

<template>
  <q-page class="fixed-center q-mt-xl">
    <q-card class="auth-card q-pa-md" flat>
      <q-card-section
        class="bg-primary text-white text-h5 text-bold text-uppercase text-center"
      >
        Cadastro
      </q-card-section>
      <q-card-section class="q-mt-xl">
        <q-input
          outlined
          label="Email"
          type="mail"
          v-model.trim="mail"
          maxlength="32"
        />
      </q-card-section>
      <q-card-section class="q-mt-xl">
        <q-input
          outlined
          label="Senha"
          type="password"
          v-model.trim="password"
          maxlength="32"
        />
      </q-card-section>

      <q-card-actions align="center" class="q-mt-xl">
        <q-btn
          size="xl"
          class="full-width"
          color="primary"
          rounded
          no-caps
          :label="loading ? 'Loading' : 'Enviar'"
          @click="sendSingUp()"
        />

        
        <q-btn
          size="xl"
          class="full-width q-mt-xl"
          color="primary"          
          no-caps 
          rounded
          outline
          label="Voltar"
          to="/login"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Supabase from 'src/services/supabase/Supabase';
@Component
export default class RegisterPage extends Vue {
  private mail = '';
  private password = '';
  private loading = false;

  private async sendSingUp() {
    this.loading = true;

    const service = new Supabase();

    const { user, error } = await service.register(this.mail, this.password);

    if (user) {
      this.$q.notify({
        color: 'positive',
        position: 'bottom',
        message: 'Cadastro realizado com sucesso',
      });

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.$router.push({ path: 'confirmation', query: { mail: this.mail } });
    }

    if (error) {
      console.error(error);
      this.$q.notify({
        color: 'negative',
        position: 'bottom',
        message: 'Falha ao cadastrar',
      });
    }

    this.loading = false;
  }
}
</script>
<style lang="css" scoped>
.auth-card {
  width: 400px;
}
</style>

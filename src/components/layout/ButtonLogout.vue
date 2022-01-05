<template>
  <div class="q-pa-md">
    <q-btn-dropdown icon="person" color="white" flat rounded>
      <div class="row no-wrap q-pa-md">
        <div class="column">
          <div class="text-h6 q-mb-md">Settings</div>
          <q-toggle v-model="darkmode" label="Modo Escuro" />
        </div>
        <q-separator vertical inset class="q-mx-lg" />
        <div class="column items-center">
          <q-btn
            class="q-mt-md mobile-hide"
            color="primary"
            icon="logout"
            label="LogOut"
            size="md"
            @click="logout()"
          />
          <q-btn
            class="q-mt-md desktop-hide"
            color="primary"
            icon="logout"
            round
            size="md"
            @click="logout()"
          >
            <q-tooltip> LogOut </q-tooltip>
          </q-btn>
        </div>
      </div>
    </q-btn-dropdown>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import Supabase from 'src/services/supabase/Supabase';
@Component
export default class ButtonLogout extends Vue {
  private darkmode = false;

  @Watch('darkmode')
  private changeDarkMode(currentValue: boolean, oldValue: boolean): void {
    this.$q.dark.set(currentValue);
  }

  private async logout() {
    const service = new Supabase();

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    const { error } = await service.logout();

    if (!error) {
      localStorage.clear();
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.$router.push({ path: '/login' });
    }
  }
}
</script>

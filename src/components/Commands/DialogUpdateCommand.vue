<template>
  <q-dialog
    v-model="_showDialog"
    persistent
    transition-show="flip-down"
    transition-hide="flip-up"
  >
    <q-card class="bg-blue-6 text-white" style="width: 300px">
      <q-bar>
        <div>Editar Comando</div>
        <q-space />

        <q-btn dense flat icon="close" v-on:click="_showDialog = false">
          <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section class="q-pa-md">
        <q-input v-model="cmd" label="Comando" outlined />
      </q-card-section>

      <q-card-actions class="float-right">
        <q-btn
          label="Atualizar"
          class="q-ma-md"
          color="primary"
          v-on:click="updateCommand()"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Vue, Component, PropSync, Prop } from 'vue-property-decorator';
import Supabase from 'src/services/supabase/Supabase';
import { QSpinnerFacebook } from 'quasar';

@Component
export default class DialogUpdateCommand extends Vue {
  @PropSync('showDialog')
  private _showDialog!: boolean;

  @Prop({ type: Number })
  private readonly id!: number;

  @Prop({ type: String })
  private readonly command!: string;

  private cmd = '';

  created() {
    this.cmd = this.command;
  }

  private updateCommand(): void {
    if (this.cmd === '') return;

    const user = new Supabase().getUser();
    this.$q.loading.show({
      spinner: QSpinnerFacebook,
      spinnerColor: 'primary',
      spinnerSize: 140,
      backgroundColor: 'grey-8',
    });

    this.$axios
      .put(
        `http://localhost:8080/commands/update/${this.id.toString()}/${this.cmd.toLowerCase()}`
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.$q.loading.hide();
        this._showDialog = false;
      });
  }
}
</script>

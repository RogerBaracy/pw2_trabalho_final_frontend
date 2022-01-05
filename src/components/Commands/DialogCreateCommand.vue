<template>
  <q-dialog
    v-model="_showDialog"
    persistent
    transition-show="flip-down"
    transition-hide="flip-up"
  >
    <q-card class="bg-blue-6 text-white" style="width: 300px">
      <q-bar>
        <div>Novo Comando</div>
        <q-space />

        <q-btn
          dense
          flat
          icon="close"
          v-on:click="(_showDialog = false), (cmdVoice = '')"
        >
          <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section class="q-pt-none">
        <div v-if="hasRecognition">
          <div class="row justify-center full-width q-mt-xl">
            <q-btn
              v-bind:loading="loading"
              size="xl"
              round
              color="primary"
              icon="mic"
              v-on:click="listenVoicer()"
            >
              <template v-slot:loading>
                <q-spinner-audio color="white" />
              </template>
              <q-tooltip content-class="bg-primary"
                >Executar comando de voz</q-tooltip
              >
            </q-btn>
          </div>
          <div
            v-if="cmdVoice"
            class="row justify-center full-width q-mt-md text-h4 text-capitalize"
          >
            {{ cmdVoice }}
          </div>
        </div>
        <div v-else class="row justify-center full-width q-mt-xl">
          <q-input v-model.trim="cmdVoice" label="Comando" filled />
          <q-btn
            color="primary"
            :disable="!cmdVoice"
            icon="play"
            v-on:click="storeCommand(cmdVoice)"
            round
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Vue, Component, PropSync } from 'vue-property-decorator';
import Supabase from 'src/services/supabase/Supabase';
import { QSpinnerFacebook } from 'quasar';

@Component
export default class DialogCreateCommand extends Vue {
  @PropSync('showDialog')
  private _showDialog!: boolean;

  private cmdVoice = '';
  private hasRecognition = false;
  private loading = false;

  mounted() {
    const SpeechRecognition =
      //@ts-ignore
      window.webkitSpeechRecognition || window.SpeechRecognition;
    SpeechRecognition
      ? (this.hasRecognition = true)
      : (this.hasRecognition = false);
  }

  private listenVoicer() {
    this.loading = true;
    this.cmdVoice = '';
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const SpeechRecognition =
      window.webkitSpeechRecognition || window.SpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = 'pt-br';
    recognition.continuous = true;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    recognition.start();
    var transcript = '';
    recognition.onresult = (event: any) => {
      if (event.results) {
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            transcript = event.results[i][0].transcript.trim();
          } else {
            transcript += event.results[i][0].transcript;
          }
        }
      }
    };

    setTimeout(() => {
      recognition.stop();
      this.cmdVoice = transcript;
      this.loading = false;
      this.storeCommand(this.cmdVoice);
    }, 5000);
  }

  private storeCommand(cmd: string): void {
    if (cmd === '') return;

    const user = new Supabase().getUser();
    this.$q.loading.show({
      spinner: QSpinnerFacebook,
      spinnerColor: 'primary',
      spinnerSize: 140,
      backgroundColor: 'grey-8',
    });

    this.$axios
      .get('http://localhost:8080/commands/create', {
        params: {
          user_id: user.id,
          command: cmd.toLowerCase(),
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.$q.loading.hide();
      });
  }
}
</script>

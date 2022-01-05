<template>
  <q-page padding>
    <DialogCreateCommand :showDialog.sync="showDialogCreate" />
    <div class="q-pa-md">
      <q-table
        title="Treats"
        :data="data"
        :columns="columns"
        row-key="name"
        :filter="filter"
        flat
        bordered
        :pagination.sync="pagination"
        hide-pagination
      >
        <template v-slot:top>
          <q-input
            borderless
            dense
            debounce="300"
            color="primary"
            v-model="filter"
            maxlength="15"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>

          <q-space />

          <q-btn
            color="primary"
            :disable="loading"
            size="md"
            n0-caps
            icon="add"
            round
            @click="showDialogCreate = true"
          >
            <q-tooltip>Novo Comando</q-tooltip>
          </q-btn>
        </template>
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
            </q-th>
            <q-th auto-width> Executar </q-th>
            <q-th auto-width> Editar </q-th>
            <q-th auto-width> Remover </q-th>
          </q-tr>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.value }}
            </q-td>
            <q-td auto-width>
              <q-btn
                class="q-ma-sm"
                round
                icon="play_arrow"
                outline
                color="positive"
                v-on:click="executeCommand(props.row.command)"
              >
                <q-tooltip content-class="bg-primary"> Executar </q-tooltip>
              </q-btn>
            </q-td>
            <q-td auto-width>
              <UpdateCommand
                :command="props.row.command"
                :id="props.row.id"
                :showDialog.sync="showDialogUpdate"
              />
            </q-td>
            <q-td auto-width>
              <q-btn
                class="q-ma-lx"
                round
                icon="delete"
                outline
                color="negative"
                v-on:click="removeCommand(props.row.id)"
              >
                <q-tooltip content-class="bg-negative"> Remover </q-tooltip>
              </q-btn>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
    <div class="row justify-center q-mt-md">
      <q-pagination
        v-model="pagination.page"
        color="grey-8"
        :max="pagesNumber"
        size="sm"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import Supabase from 'src/services/supabase/Supabase';
import DialogCreateCommand from 'src/components/Commands/DialogCreateCommand.vue';
import UpdateCommand from 'src/components/Commands/UpdateCommand.vue';

import { QSpinnerFacebook } from 'quasar';

@Component({
  components: {
    DialogCreateCommand,
    UpdateCommand,
  },
})
export default class PageName extends Vue {
  private filter = '';
  private loading = false;
  private showDialogCreate = false;
  private showDialogUpdate = false;

  private columns = [
    {
      name: 'commands',
      required: true,
      label: 'Comandos',
      align: 'left',
      field: (row) => row.command,
      format: (val) => `${val}`,
      classes: 'ellipsis text-capitalize',
      style: 'max-width: 50px',
      headerClasses: 'bg-primary text-white',
    },
  ];
  private data = [];
  private pagination = {
    sortBy: 'desc',
    descending: false,
    page: 1,
    rowsPerPage: 5,
  };

  private get pagesNumber() {
    return Math.ceil(this.data.length / this.pagination.rowsPerPage);
  }

  created() {
    this.getCommands();
  }

  @Watch('showDialogCreate')
  private changeShowDialogCreate(currentValue: boolean, oldValue: boolean) {
    if (oldValue === true) {
      this.getCommands();
    }
  }

  @Watch('showDialogUpdate')
  private changeShowDialogUpdate(currentValue: boolean, oldValue: boolean) {
    if (oldValue === true) {
      this.getCommands();
    }
  }

  private getCommands(): void {
    const user = new Supabase().getUser();
    this.$q.loading.show({
      spinner: QSpinnerFacebook,
      spinnerColor: 'primary',
      spinnerSize: 140,
      backgroundColor: 'grey-8',
    });

    this.$axios
      .get('http://localhost:8080/commands/list/', {
        params: {
          user_id: user.id,
        },
      })
      .then((response) => {
        this.data = response.data;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.$q.loading.hide();
      });
  }

  private executeCommand(cmd: string): void {
    if (cmd === '') return;

    const user = new Supabase().getUser();
    this.$q.loading.show({
      spinner: QSpinnerFacebook,
      spinnerColor: 'primary',
      spinnerSize: 140,
      backgroundColor: 'grey-8',
    });

    this.$axios
      .get('http://localhost:8080/listen/create', {
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

  private removeCommand(id: string): void {
    this.$q.loading.show({
      spinner: QSpinnerFacebook,
      spinnerColor: 'primary',
      spinnerSize: 140,
      backgroundColor: 'grey-8',
    });

    this.$axios
      .delete('http://localhost:8080/commands/delete', {
        params: {
          id: id,
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
        this.getCommands();
      });
  }
}
</script>

<template>
  <div>
    <DialogUpdateCommand
      :showDialog.sync="showDialogUpdate"
      :command="command"
      :id="id"
      :key="updateKeyDialog"
    />
    <q-btn
      class="q-ma-sm"
      round
      icon="edit"
      outline
      color="primary"
      @click="showDialogUpdate = true"
    >
      <q-tooltip content-class="bg-primary"> Editar </q-tooltip>
    </q-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import DialogUpdateCommand from './DialogUpdateCommand.vue'
@Component({
  components: {
    DialogUpdateCommand
  }
})
export default class UpdateCommand extends Vue {
  @Prop({ type: Number })
  private readonly id!: number;

  @Prop({ type: String })
  private readonly command!: string;

  private showDialogUpdate = false;

  private updateKeyDialog = 0;

  @Watch('showDialogUpdate')
  chanceShowDialogUpdate(currentValue: boolean, oldValue: boolean){    
    this.updateKeyDialog++
    this.$emit('update:showDialog', currentValue)
  }
}
</script>

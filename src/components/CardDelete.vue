<template>
  <div class="text-center">
    <v-dialog v-model="dialog" max-width="400">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          color="error"
          v-bind="activatorProps"
          prepend-icon="mdi-delete"
          text
          class="ml-4"
        >
          Supprimer tout
        </v-btn>
      </template>

      <v-card prepend-icon="mdi-file-remove" prepend-icon-color="red">
        <template v-slot:title
          ><span class="text-red-dark">Confirmer la suppression</span></template
        >
        <template v-slot:text
          >Êtes-vous sûr de vouloir supprimer
          <span class="text-bold text-red-dark">{{ props.total }}</span> note(s)
          ?<br />
          Cette action est irréversible.</template
        >

        <template v-slot:actions>
          <v-spacer></v-spacer>

          <v-btn @click="dialog = false"> Retour </v-btn>

          <v-btn color="red" @click="handleClick"> Supprimer tout </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<style>
.mdi-file-remove {
  color: #cc1f1a;
}
</style>
<script setup>
import { ref, defineProps, defineEmits } from "vue";

const dialog = ref(false);
const props = defineProps(["total"]);
const emit = defineEmits(["onDelete"]);

const handleClick = () => {
  emit("onDelete");
  dialog.value = false;
};
</script>

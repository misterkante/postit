<template>
  <div class="text-center">
    <v-dialog v-model="dialog" max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          v-bind="activatorProps"
          id="editBtn"
          icon="mdi-playlist-edit"
          size="small"
          class="mr-2 mt-2"
          variant="tonal"
        ></v-btn>
      </template>

      <v-card
        prepend-icon="mdi-playlist-edit"
        :style="`boder:2px;border-color:${props.note.color}`"
      >
        <template v-slot:title
          ><span class="text-blue-dark">Modifier Post-It</span></template
        >
        <v-form>
          <v-text-field
            class="px-6"
            variant="outlined"
            v-model="formValues.title"
            color="primary"
            :rules="[
              (v) => !!v || 'Un titre est requis.',
              (v) => v.length <= 100 || '100 caractères maximum.',
            ]"
            :counter="100"
            label="Title"
            placeholder="Donnez un titre à votre post-it"
            required
            type="text"
          ></v-text-field>
          <v-textarea
            class="px-6 pt-4 pb-2"
            variant="outlined"
            color="primary"
            v-model="formValues.content"
            :rules="[
              (v) => !!v || 'La description est requise.',
              (v) => v.length <= 1000 || '1000 caractères maximum.',
            ]"
            label="Description"
            placeholder="Insérez votre note ici"
            required
            type="text"
          ></v-textarea>
          <div class="px-6 text-xs">
            {{ formValues.content.length }}
            {{ formValues.content.length === 1 ? "caractère" : "caractères" }}
          </div>
        </v-form>

        <template v-slot:actions>
          <div class="px-6">
            <v-spacer></v-spacer>
            <v-btn @click="dialog = false"> Retour </v-btn>
            <v-btn @click="handleSubmit" color="primary"> Enregistrer </v-btn>
          </div>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
.mdi-playlist-edit {
  background-color: blue;
}
</style>
<script setup>
import { ref, defineEmits, defineProps } from "vue";

const dialog = ref(false);
const emit = defineEmits(["onUpdate"]);
const props = defineProps(["note"]);
const formValues = ref({
  title: props.note.title,
  content: props.note.content[0],
});

const handleSubmit = async () => {
  emit("onUpdate", {
    ...formValues.value,
    content: [formValues.value.content],
    _id: props.note._id,
  });
  formValues.value = {
    title: "",
    content: "",
  };
  dialog.value = false;
};
</script>

<!-- 
/**
 * Ressource : https://medium.com/@carlos.henrique.sa.filho/using-vuetify-2-3-native-validation-rules-the-right-way-138f9a974a49
 */
-->

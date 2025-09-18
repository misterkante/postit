<template>
  <div class="text-center">
    <v-dialog v-model="dialog" max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          v-bind="activatorProps"
          color="blue"
          prepend-icon="mdi-plus"
          text
        >
          Nouveau PostIt
        </v-btn>
      </template>

      <v-card prepend-icon="mdi-file-plus" prepend-icon-color="red">
        <template v-slot:title
          ><span class="text-grey-dark">Nouveau Post-It</span></template
        >
        <v-form>
          <v-text-field
            class="px-6"
            variant="outlined"
            color="primary"
            v-model="formValues.title"
            label="Title"
            placeholder="Donnez un titre à votre post-it"
            required
            type="text"
          ></v-text-field>
          <v-textarea
            class="px-6"
            variant="outlined"
            color="primary"
            v-model="formValues.content"
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
            <v-btn color="primary" @click="handleSubmit"> Ajouter + </v-btn>
          </div>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<style>
.mdi-file-plus {
  color: #2779bd;
}
</style>
<script setup>
import { ref, defineEmits } from "vue";

const dialog = ref(false);
const emit = defineEmits(["onAdd"]);
const formValues = ref({
  title: "",
  content: "",
});

const handleSubmit = async () => {
  emit("onAdd", { ...formValues.value });
  dialog.value = false;
};
</script>

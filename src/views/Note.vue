<template>
  <v-container class="details my-24">
    <div
      class="mx-auto flex flex-row flex-wrap justify-between"
      style="max-width: 700px"
    >
      <v-btn prepend-icon="mdi-arrow-left" variant="text" to="/" class="my-4">
        Retour
      </v-btn>
      <div>
        <v-btn
          variant="text"
          class="my-4"
          v-if="!isOpen"
          color="primary"
          @click="isOpen = true"
        >
          Modifier
        </v-btn>
        <v-btn
          variant="text"
          to="/"
          class="my-4"
          color="error"
          @click="handleDelete"
        >
          Supprimer
        </v-btn>
      </div>
    </div>
    <!-- Si le bouton d'edit n'est pas appuyé -->
    <v-card
      max-width="700"
      v-if="!isOpen"
      dark
      class="text-left px-8 mx-auto"
      :color="noteStore.selectedItem?.color"
    >
      <v-card-title>
        {{ noteStore.selectedItem?.title || "Titre inconnu" }}
      </v-card-title>
      <!-- <div>
          <v-btn
            icon="mdi-playlist-edit"
            variant="elevated"
            class="mr-1"
          ></v-btn>
          <v-btn dark icon="mdi-delete" variant="elevated" class="ml-1"></v-btn>
        </div> -->
      <v-card-subtitle>
        <div class="flex flex-wrap">
          <div class="flex items-center mt-2">
            <v-icon class="text-grey-dark mr-2">mdi-clock</v-icon
            ><span
              >Créé le
              {{
                formatDate(noteStore.selectedItem?.createdAt) || "Date Inconnu"
              }}</span
            >
          </div>
          <!--  -->
          <div class="flex items-center mt-2">
            <span class="hidden sm:block">&nbsp;&nbsp;&nbsp;&nbsp;</span
            ><v-icon class="text-grey-dark mr-2">mdi-file</v-icon
            ><span
              >{{ noteStore.selectedItem?.content?.[0].length || 0 }}
              {{
                noteStore.selectedItem?.content?.[0].length === 1
                  ? "caractère"
                  : "caractères"
              }}</span
            >
          </div>
        </div>
      </v-card-subtitle>
      <v-card-text>
        {{
          noteStore.selectedItem?.content?.[0] || "Aucun contenu"
        }}</v-card-text
      >
    </v-card>
    <!-- Si le bouton d'edit est pas appuyé -->
    <v-card
      v-if="isOpen"
      class="mx-auto text-left"
      max-width="700"
      :color="noteStore.selectedItem.color"
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
          <div class="flex justify-between">
            <v-btn @click="isOpen = false"> Annuler </v-btn>
            <v-btn @click="handleSubmit" color="primary"> Enregistrer </v-btn>
          </div>
        </div>
      </template>
    </v-card>
  </v-container>
</template>

<style>
.v-btn .v-btn__content {
  text-transform: capitalize;
}

/* details .mdi-arrow-left {
  font-size: 16px;
}

details .mdi-clock {
  color: blue;
}
.details .mdi-playlist-edit {
  color: blue;
}
.details .mdi-delete {
  color: #cc1f1a;
}
*/
.details .v-card-title {
  font-weight: 100;
}
.details .v-card-text {
  color: #8795a1;
  font-weight: 100;
}
</style>
<script setup>
import { onMounted, watch, ref } from "vue";
import { useNoteStore } from "@/store/notes";
import { useRoute } from "vue-router";

const noteStore = useNoteStore();
const route = useRoute();
const noteId = route.params.id;
const isOpen = ref(false);

const formValues = ref({});
onMounted(() => {
  // console.log("Note--------------->", useNoteStore.selectedItem);
  noteStore.getNote(noteId);
});

function formatDate(date) {
  const months = Array.from({ length: 12 }, (item, i) => {
    return new Date(0, i).toLocaleString("fr-FR", { month: "long" });
  });
  let formated = new Date(date);
  return (
    formated.getDate() +
    " " +
    months[formated.getMonth()] +
    " " +
    formated.getFullYear() +
    " à " +
    formated.getUTCHours() +
    ":" +
    formated.getUTCMinutes()
  );
}

watch(
  () => noteStore.selectedItem,
  (note) => {
    if (note) {
      formValues.value.title = note.title;
      formValues.value.content = note.content?.[0] || "";
    }
  },
  { immediate: true }
);

const handleSubmit = async () => {
  let note = {
    ...formValues.value,
    content: [formValues.value.content],
  };
  await noteStore.updateNote(noteStore.selectedItem._id, note);
  noteStore.getNote(noteStore.selectedItem._id);
  isOpen.value = false;
};

const handleDelete = async () => {
  await noteStore.deleteNote(noteStore.selectedItem._id);
};
</script>

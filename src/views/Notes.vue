<template>
  <v-container class="notes mt-24">
    <!-- Buttons -->
    <v-row class="flex mt-8 sm:mt-5">
      <div class="flex px-3">
        <CardAdd @onAdd="handleAddNote" />
        <CardDelete :total="noteStore.notes.length" @onDelete="handleDelete" />
      </div>
      <v-col cols="12"
        ><v-text-field
          clearable
          label=""
          v-model="search"
          placeholder="Rechercher ..."
          prepend-inner-icon="mdi-magnify"
          variant="underlined"
        ></v-text-field>
      </v-col>
    </v-row>
    <!-- Chargement  -->
    <v-row class="gutter" v-if="noteStore.isLoading === true">
      <v-col cols="12" sm="6" md="4" lg="3" v-for="i in 12" :key="i">
        <v-skeleton-loader
          class="mx-auto border"
          type="list-item-three-line"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <!-- Liste de cards -->
    <v-row class="gutter" v-else-if="filteredNotes.length > 0">
      <v-col
        cols="12"
        v-for="item in filteredNotes"
        :key="item.id"
        sm="6"
        md="4"
        lg="3"
        xl="2"
      >
        <div class="relative">
          <v-hover v-slot="{ isHovering, props }">
            <!-- Bouton d'édition en position absolue -->
            <div
              v-bind="props"
              :class="isHovering ? 'absolute top-2 right-0 z-50' : 'hidden'"
            >
              <CardUpdate :note="item" @onUpdate="handleUpdate" />
            </div>
            <!-- La carte cliquable pour accéder aux détails -->
            <router-link
              :to="`/note/${item._id}`"
              style="text-decoration: none"
            >
              <v-card
                dark
                class="text-left"
                v-bind="props"
                :elevation="isHovering ? 24 : 3"
                :style="`background-color: ${item.color};`"
              >
                <v-card-title>{{ item.title }}</v-card-title>
                <v-card-subtitle>{{ item.content[0] }}</v-card-subtitle>
                <v-card-text class="text-right text-2xs"
                  >.{{ item.content[0].length }}</v-card-text
                >
              </v-card>
            </router-link>
          </v-hover>
        </div>
      </v-col>
    </v-row>
    <!-- Pas de données -->
    <v-row class="gutter" v-else>
      <div
        class="container mx-auto px-4 pt-8 flex-1 flex flex-col items-center justify-center"
      >
        <div class="max-w-md w-full text-center">
          <div class="mb-4">
            <svg
              class="w-full h-48"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M21.6601 10.44L20.6801 14.62C19.8401 18.23 18.1801 19.69 15.0601 19.39C14.5601 19.35 14.0201 19.26 13.4401 19.12L11.7601 18.72C7.59006 17.73 6.30006 15.67 7.28006 11.49L8.26006 7.30001C8.46006 6.45001 8.70006 5.71001 9.00006 5.10001C10.1701 2.68001 12.1601 2.03001 15.5001 2.82001L17.1701 3.21001C21.3601 4.19001 22.6401 6.26001 21.6601 10.44Z"
                  stroke="#292D32"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M15.06 19.39C14.44 19.81 13.66 20.16 12.71 20.47L11.13 20.99C7.15998 22.27 5.06997 21.2 3.77997 17.23L2.49997 13.28C1.21997 9.30998 2.27997 7.20998 6.24997 5.92998L7.82997 5.40998C8.23997 5.27998 8.62997 5.16998 8.99997 5.09998C8.69997 5.70998 8.45997 6.44998 8.25997 7.29998L7.27997 11.49C6.29997 15.67 7.58998 17.73 11.76 18.72L13.44 19.12C14.02 19.26 14.56 19.35 15.06 19.39Z"
                  stroke="#292D32"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M12.64 8.53003L17.49 9.76003"
                  stroke="#292D32"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M11.66 12.4L14.56 13.14"
                  stroke="#292D32"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </g>
            </svg>
          </div>
          <h1
            class="text-lg font-semibold mb-4 text-[#6366f1] dark:text-[#818cf8]"
          >
            Aucune note pour le moment.
          </h1>
          <p class="text-md font-lighter">
            Créez votre premier post-it pour commencer
          </p>
        </div>
      </div>
    </v-row>
  </v-container>
</template>

<style scoped>
#deleteBtn {
  color: #cc1f1a;
}
</style>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useNoteStore } from "@/store/notes";
import CardAdd from "@/components/CardAdd.vue";
import CardDelete from "@/components/CardDelete.vue";
import CardUpdate from "@/components/CardUpdate.vue";

const noteStore = useNoteStore();
const search = ref("");

onMounted(async () => await noteStore.getAllNote());

const handleAddNote = (note) => {
  noteStore.addNote(note);
};

const handleUpdate = (note) => {
  noteStore.updateNote(note._id, { title: note.title, content: note.content });
};

const handleDelete = () => {
  noteStore.deleteAllNote();
};

const filteredNotes = computed(() =>
  noteStore.notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.value.toLowerCase().trim()) ||
      note.content[0].toLowerCase().includes(search.value.toLowerCase().trim())
  )
);
console.log("filter", noteStore.notes);
</script>
<!-- /**
 * Ressource : https://vuetifyjs.com/en/styles/elevation/
 */ -->

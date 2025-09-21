import { defineStore, acceptHMRUpdate } from "pinia";
import { get, post, put, destroy } from "@/api/notes";
import { ref } from "vue";

export const useNoteStore = defineStore("note", () => {
  // state
  const notes = ref(JSON.parse(localStorage.getItem("notes")) || []);
  const selectedItem = ref(null);
  const isLoading = ref(false);
  const error = ref(null);
  // constante
  const colors = ["#F0F8FF", "#F5FFFA", "#FFFAEE", "#FFF0F5", "#F8F8FF"];

  /**
   * getAllNote : fonction de récupération de stockage des notes dans le store
   */
  async function getAllNote() {
    isLoading.value = true;
    const response = await get();
    if (typeof response === "object") {
      response.every(
        (el) => (el.color = colors[Math.floor(Math.random() * colors.length)])
      );
      localStorage.setItem("notes", JSON.stringify(response));
      notes.value = JSON.parse(localStorage.getItem("notes"));
    } else {
      error.value = response;
    }
    isLoading.value = false;
  }
  /** */
  function getNote(itemID) {
    let note = notes.value.find((el) => el._id === itemID);
    // console.log("Note------------------------------>", note);
    localStorage.setItem("selection", JSON.stringify(note));
    selectedItem.value = JSON.parse(localStorage.getItem("selection"));
  }
  /**
   * addNote : fonction d'ajout de notes qui met à jour le store
   * @param {*} item : une note au format {title: "", content:""}
   */
  async function addNote(item) {
    isLoading.value = true;
    const response = await post(item);
    if (typeof response === "object") {
      item._id = response.note_id;
      notes.value.unshift(item);
      localStorage.setItem("notes", JSON.stringify(notes.value));
      error.value = null;
    } else {
      error.value = response;
    }
    isLoading.value = false;
  }
  /**
   *updateNote : fonction de modification de la note via l'api et mets à jour le store et le localStorage
   * @param {*} item :note passé depuis l'URL sous forme d'objet
   */
  async function updateNote(id, item) {
    isLoading.value = true;
    const response = await put(id, item);
    if (typeof response === "object") {
      const index = notes.value.findIndex((element) => element._id === id);
      if (index !== -1) {
        notes.value[index] = {
          ...notes.value[index],
          title: item.title,
          content: item.content,
        };
        localStorage.setItem("notes", JSON.stringify(notes.value));
        error.value = null;
      }
    } else {
      error.value = response;
    }
    isLoading.value = false;
  }

  /**
   * deleteNote : fonction de suppression de la note via l'api qui mets à jour le store et le localStorage
   * @param {*} itemID : id de la note passé depuis l'URL
   */
  async function deleteNote(itemID) {
    isLoading.value = true;
    const response = await destroy(itemID);
    if (typeof response === "object") {
      notes.value = notes.value.filter((element) => element._id !== itemID);
      localStorage.setItem("notes", JSON.stringify(notes.value));
      error.value = null;
    } else {
      error.value = response;
    }
    isLoading.value = false;
  }

  /**
   * deleteAllNote : fonction qui vide le store et mets à jour le localStorage
   */
  async function deleteAllNote() {
    let total = notes.value.length;
    let deleted = 0;
    isLoading.value = true;
    for (let note in notes) {
      let response = await destroy(note._id);
      if (typeof response === "object") {
        deleted++;
      }
    }
    if (deleted < total) {
      error.value = `Erreur lors de la suppression : Seul ${deleted} / ${total} ont été supprimés`;
    } else {
      error.value = null;
    }
    notes.value = [];
    localStorage.setItem("notes", JSON.stringify([]));
    error.value = null;
    isLoading.value = false;
  }

  // getter
  return {
    notes,
    selectedItem,
    isLoading,
    getAllNote,
    getNote,
    addNote,
    updateNote,
    deleteNote,
    deleteAllNote,
  };
});

// make sure to pass the right store definition, `useAuth` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNoteStore, import.meta.hot));
}
/**
 * Ressource : https://deepgram.com/learn/build-a-todo-list-with-pinia-and-vue-3
 */

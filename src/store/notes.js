import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";

export const useNoteStore = defineStore("note", () => {
  // state
  const notes = ref(JSON.parse(localStorage.getItem("notes")) || []);

  /**
   * getAllNote : fonction de récupération de stockage des notes dans le store
   */
  async function getAllNote() {}
  /** */
  function getNote(itemID) {}
  /**
   * addNote : fonction d'ajout de notes qui met à jour le store
   * @param {*} item : une note au format {title: "", content:""}
   */
  async function addNote(item) {}
  /**
   *updateNote : fonction de modification de la note via l'api et mets à jour le store et le localStorage
   * @param {*} item :note passé depuis l'URL sous forme d'objet
   */
  async function updateNote(item) {}

  /**
   * deleteNote : fonction de suppression de la note via l'api qui mets à jour le store et le localStorage
   * @param {*} itemID : id de la note passé depuis l'URL
   */
  async function deleteNote(itemID) {}

  /**
   * deleteAllNote : fonction qui vide le store et mets à jour le localStorage
   */
  function deleteAllNote() {}

  // getter
  return {
    notes,
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

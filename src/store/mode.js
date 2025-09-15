import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";

export const useModeStore = defineStore("mode", () => {
  // state
  const isOnline = ref("false");
  // actions
  const toggleMode = () => {
    isOnline.value = !isOnline.value;
  };
  // getter
  return { isOnline, toggleMode };
});

// make sure to pass the right store definition, `useAuth` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useModeStore, import.meta.hot));
}

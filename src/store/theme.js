import { defineStore, acceptHMRUpdate } from "pinia";
import { computed, ref } from "vue";

export const useThemeStore = defineStore("theme", () => {
  const darkTheme = ref(false);
  const switchTheme = computed(() => (darkTheme.value = !darkTheme.value));
  //action

  // getter
  return { isDark: darkTheme, switchTheme };
});

// make sure to pass the right store definition, `useAuth` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useThemeStore, import.meta.hot));
}

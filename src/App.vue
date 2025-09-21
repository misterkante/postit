<template>
  <v-app>
    <nav
      class="bg-grey-light fixed top-0 left-0 w-full z-50 transition-all duration-300"
    >
      <router-link to="/"
        ><button class="flex flex-col text-3xl justify-start items-start">
          <span>📑 Mes Post-Its</span>
          <span class="text-xs text-grey-dark text-light mt-1"
            >Organisez vos idées, simplement et efficacement</span
          >
        </button></router-link
      >
    </nav>
    <v-main>
      <router-view />
    </v-main>
    <footer>© {{ currentYear }} Made by {{ author }}</footer>
  </v-app>
</template>

<style>
nav {
  padding: 30px 80px;
}

nav a {
  color: #2c3e50;
}
</style>

<script setup>
const currentYear = new Date().getFullYear();
const author = "Mister KANTE";
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navbar -->
     <NavBar />

    <!-- Conteúdo Principal -->
    <router-view />

    <!-- Footer -->
    <Footer />

  </div>
</template>

<script setup>
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";

</script>

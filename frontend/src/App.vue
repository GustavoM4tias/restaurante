<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from './stores/auth'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import LoginModal from './components/auth/Login.vue'
import RegisterModal from './components/auth/Register.vue'
import { useThemeStore } from './stores/theme'

const authStore = useAuthStore()
const themeStore = useThemeStore()

const showLoginModal = ref(false)
const showRegisterModal = ref(false)

// Theme initialization
onMounted(() => {
  themeStore.initializeTheme()
})

const switchAuthModals = (type) => {
  showLoginModal.value = type === 'login'
  showRegisterModal.value = type === 'register'
}

const closeAuthModals = () => {
  showLoginModal.value = false
  showRegisterModal.value = false
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <NavBar 
      @open-login="showLoginModal = true"
      @open-register="showRegisterModal = true"
    />
    
    <main class="flex-1 container mx-auto px-4 py-8">
      <router-view />
    </main>

    <Footer />

    <!-- Auth Modals -->
    <LoginModal
      v-if="showLoginModal"
      @close="closeAuthModals"
      @switch-to-register="switchAuthModals('register')"
    />
    
    <RegisterModal
      v-if="showRegisterModal"
      @close="closeAuthModals"
      @switch-to-login="switchAuthModals('login')"
    />
  </div>
</template>

<style>
/* Smooth transitions for dark mode */
* {
  transition: background-color 0.3s ease, border-color 0.3s ease;
}
</style>
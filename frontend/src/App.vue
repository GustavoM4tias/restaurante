<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import authModal from '@/components/auth/Modal.vue'
import { useUserStore } from '@/stores/user'
import { useLocationStore } from '@/stores/location'

const route = useRoute()

onMounted(() => {
  const user = useUserStore()
  user.fetchUser()

  const location = useLocationStore()
  location.init()
})
</script>

<template>
  <div class="relative bg-white dark:bg-gray-800">
    <div :class="[
      'min-h-screen',
      { 'pb-16': !route.meta.hideNavbar }
    ]">
      <router-view />
    </div>
    <Navbar v-if="!route.meta.hideNavbar" />
  </div>
  <authModal />
</template>

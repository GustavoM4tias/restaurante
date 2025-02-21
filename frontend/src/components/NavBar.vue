<template>
    <nav class="bg-white dark:bg-gray-800 shadow-md">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <router-link 
            to="/" 
            class="text-2xl font-bold text-gray-800 dark:text-white"
          >
            E-commerce
          </router-link>
  
          <div class="flex items-center space-x-6">
            <div class="hidden md:flex space-x-4">
              <router-link
                v-if="authStore.isAuthenticated"
                to="/account"
                class="nav-link"
              >
                Minha Conta
              </router-link>
              
              <button
                v-if="authStore.isAuthenticated && authStore.userRole === 'admin'"
                @click="$router.push('/create-product')"
                class="nav-link"
              >
                Novo Produto
              </button>
            </div>
  
            <div class="flex items-center space-x-4">
              <button
                v-if="!authStore.isAuthenticated"
                @click="$emit('open-login')"
                class="nav-link"
              >
                Login
              </button>
              
              <button
                v-if="!authStore.isAuthenticated"
                @click="$emit('open-register')"
                class="nav-link"
              >
                Cadastro
              </button>
  
              <button
                v-if="authStore.isAuthenticated"
                @click="authStore.logout()"
                class="nav-link"
              >
                Logout
              </button>
  
              <ThemeButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { useAuthStore } from '../stores/auth'
  import ThemeButton from './UI/ThemeButton.vue'
  
  const authStore = useAuthStore()
  </script>
  
  <style>
  .nav-link {
    @apply px-3 py-2 rounded-md text-sm font-medium 
           text-gray-700 dark:text-gray-300 
           hover:bg-gray-100 dark:hover:bg-gray-700 
           transition-colors duration-200;
  }
  </style>
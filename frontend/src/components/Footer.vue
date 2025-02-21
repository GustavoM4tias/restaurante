<template>
  <footer class="bg-gray-100 dark:bg-gray-800">
    <nav class="w-full h-full flex justify-around align-middle text-3xl text-gray-700 dark:text-gray-300">
      <RouterLink to="/" class="w-full h-full flex group hover:bg-gray-200 hover:dark:bg-gray-700">
        <i class="fas fa-house group-hover:scale-110 transition duration-200 m-auto"></i>
      </RouterLink>
      <RouterLink to="/mapa" class="w-full h-full flex group hover:bg-gray-200 hover:dark:bg-gray-700">
        <i class="fas fa-map group-hover:scale-110 transition duration-200 m-auto"></i>
      </RouterLink>
      <RouterLink to="/historico" class="w-full h-full flex group hover:bg-gray-200 hover:dark:bg-gray-700">
        <i class="fas fa-clock-rotate-left group-hover:scale-110 transition duration-200 m-auto"></i>
      </RouterLink>
      <RouterLink to="/conta" class="w-full h-full flex group hover:bg-gray-200 hover:dark:bg-gray-700">
        <i class="fas fa-user group-hover:scale-110 transition duration-200 m-auto"></i>
      </RouterLink>
    </nav>
  </footer>
</template>
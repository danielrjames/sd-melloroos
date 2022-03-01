<template>
  <div class="flex justify-between items-center w-full h-full">
    <div class="ml-4 md:ml-6 nav-group">
      <nuxt-link class="nav-link" :to="{ name: 'index' }" exact>Home</nuxt-link>
      <nuxt-link class="nav-link" :to="{ name: 'about' }" exact
        >About</nuxt-link
      >
    </div>

    <div class="nav-group">
      <nuxt-link class="nav-link" :to="{ name: 'history' }">History</nuxt-link>
    </div>
  </div>
</template>

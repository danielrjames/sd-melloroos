<template>
  <div class="flex justify-between items-center w-full h-full">
    <div class="ml-4 md:ml-6 nav-group">
      <nuxt-link class="nav-link" :to="{ name: 'index' }" exact>Home</nuxt-link>
      <nuxt-link class="nav-link" :to="{ name: 'about' }" exact
        >About</nuxt-link
      >
    </div>

    <div class="nav-group">
      <nuxt-link class="nav-link" :to="{ name: 'sign-in' }">Sign In</nuxt-link>
      <nuxt-link
        class="mb-0 btn btn-sm btn-primary"
        :to="{ name: 'register' }"
        exact
        >Create Account</nuxt-link
      >
    </div>
  </div>
</template>

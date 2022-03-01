<template>
  <div class="hidden sm:block w-full h-full text-sm">
    <app-nav-items-public></app-nav-items-public>
  </div>
</template>

<script>
import NavItemsPublic from './nav-items/NavItemsPublic.vue';

export default {
  components: {
    appNavItemsPublic: NavItemsPublic,
  },
};
</script>

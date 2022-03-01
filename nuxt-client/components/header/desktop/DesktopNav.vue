<template>
  <div class="hidden sm:block w-full h-full text-sm">
    <app-nav-items-auth v-if="isAuth"></app-nav-items-auth>
    <app-nav-items-public v-else></app-nav-items-public>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import NavItemsAuth from './nav-items/NavItemsAuth.vue';
import NavItemsPublic from './nav-items/NavItemsPublic.vue';

export default {
  components: {
    appNavItemsAuth: NavItemsAuth,
    appNavItemsPublic: NavItemsPublic,
  },

  computed: {
    ...mapGetters('auth', {
      isAuth: 'authSet',
    }),
  },
};
</script>

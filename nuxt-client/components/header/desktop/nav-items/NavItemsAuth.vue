<template>
  <div class="flex justify-between items-center w-full h-full">
    <div class="ml-4 md:ml-6 nav-group">
      <nuxt-link class="nav-link" :to="{ name: 'index' }" exact>Home</nuxt-link>
    </div>

    <div class="nav-group">
      <div v-click-outside="closeDropdown" class="relative select-none">
        <div class="cursor-pointer nav-link" @click="toggleDropdown">
          Account

          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="ml-1 w-3 h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        <app-auth-dropdown v-if="navDropdown"></app-auth-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import AuthDropdown from '../dropdown/AuthDropdown.vue';

export default {
  components: {
    appAuthDropdown: AuthDropdown,
  },

  computed: {
    ...mapState('app', {
      navDropdown: 'navDropdown',
    }),
  },

  methods: {
    async closeDropdown() {
      await this.$store.dispatch('app/closeNavDropdown');
    },

    async toggleDropdown() {
      await this.$store.dispatch('app/updateNavDropdown', !this.navDropdown);
    },
  },
};
</script>

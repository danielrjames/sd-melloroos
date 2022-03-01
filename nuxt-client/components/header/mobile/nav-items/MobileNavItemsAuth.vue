<template>
  <div class="divide-y divide-gray-100">
    <div class="py-3 px-4 text-gray-500">
      <div class="mb-0.5 text-xs">Signed in as</div>
      <div class="text-sm font-semibold truncate text-gray-heading">
        {{ fullName }}
      </div>
    </div>
    <div class="py-2 space-y-1">
      <div class="px-2" @click="closeMobileNav('index')">
        <nuxt-link class="mobile-nav-link" :to="{ name: 'index' }" exact
          >Home</nuxt-link
        >
      </div>
    </div>
    <div class="py-2 space-y-1">
      <div class="px-2" @click="closeMobileNav('settings-account')">
        <nuxt-link class="mobile-nav-link" :to="{ name: 'settings-account' }"
          >Account Settings</nuxt-link
        >
      </div>
      <div class="px-2" @click="logout">
        <div class="cursor-pointer mobile-nav-link">Sign Out</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({ user: (state) => state.user }),

    fullName() {
      return `${this.user.firstName} ${this.user.lastName}`;
    },
  },

  methods: {
    async closeMobileNav(linkTo) {
      if (linkTo === this.$route.name || linkTo === 'x') {
        await this.$store.dispatch('app/closeMobileNav');
      }
    },

    async logout() {
      await this.$store.dispatch('auth/logout');
    },
  },
};
</script>

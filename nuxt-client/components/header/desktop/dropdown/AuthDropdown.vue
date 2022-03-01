<template>
  <div
    class="overflow-hidden absolute top-9 -right-2 z-50 w-52 text-xs text-gray-500 bg-white rounded divide-y divide-gray-100 ring-1 shadow-md ring-gray-default"
  >
    <div class="p-3">
      <div class="mb-0.5">Signed in as</div>
      <div class="text-sm font-semibold truncate text-gray-heading">
        {{ fullName }}
      </div>
    </div>
    <div class="p-3 space-y-3 text-sm font-medium">
      <div>
        <nuxt-link
          class="group flex items-center text-gray-500 transition hover:text-gray-input"
          :to="{ name: 'settings-account' }"
          @click.native="closeDropdown('settings-account')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mr-3 w-4 h-4 text-gray-400 transition group-hover:text-gray-input"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          Account Settings</nuxt-link
        >
      </div>

      <div>
        <div
          class="group flex items-center text-gray-500 transition cursor-pointer hover:text-gray-input"
          @click="logout"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mr-3 w-4 h-4 text-gray-400 transition group-hover:text-gray-heading"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Sign Out
        </div>
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
    async closeDropdown(linkTo) {
      if (linkTo === this.$route.name || linkTo === 'x') {
        await this.$store.dispatch('app/closeNavDropdown');
      }
    },

    async logout() {
      await this.$store.dispatch('auth/logout');
    },
  },
};
</script>

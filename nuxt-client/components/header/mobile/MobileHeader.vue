<template>
  <div class="relative z-50 h-14 sm:h-16 bg-white border-b border-gray-default">
    <div
      class="container flex justify-between sm:justify-start items-center h-full"
    >
      <nuxt-link
        :to="{ name: 'index' }"
        @click.native="closeMobileNav('index')"
      >
        <app-horizontal-logo></app-horizontal-logo>
      </nuxt-link>
      <div
        class="sm:hidden p-1 -mr-1 hover:bg-gray-100 rounded-sm transition cursor-pointer"
        @click="closeMobileNav('x')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 text-gray-default hover:text-gray-input"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import HorizontalLogo from '../../logo/HorizontalLogo.vue';

export default {
  components: {
    appHorizontalLogo: HorizontalLogo,
  },

  methods: {
    closeMobileNav(linkTo) {
      if (linkTo === this.$route.name || linkTo === 'x') {
        this.$store.dispatch('app/updateMobileNav', false);
      }
    },
  },
};
</script>

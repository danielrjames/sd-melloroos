<template>
  <div class="divide-y divide-gray-100">
    <div class="py-2 space-y-1">
      <div class="px-2" @click="closeMobileNav('index')">
        <nuxt-link class="mobile-nav-link" :to="{ name: 'index' }" exact
          >Home</nuxt-link
        >
      </div>
      <div class="px-2" @click="closeMobileNav('history')">
        <nuxt-link class="mobile-nav-link" :to="{ name: 'history' }"
          >History</nuxt-link
        >
      </div>
      <div class="px-2" @click="closeMobileNav('about')">
        <nuxt-link class="mobile-nav-link" :to="{ name: 'about' }"
          >About</nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async closeMobileNav(linkTo) {
      if (linkTo === this.$route.name || linkTo === 'x') {
        await this.$store.dispatch('app/closeMobileNav');
      }
    },
  },
};
</script>

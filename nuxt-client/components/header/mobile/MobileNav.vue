<template>
  <div
    aria-controls="mobile-menu"
    aria-expanded="false"
    class="sm:hidden p-1 -mr-1 hover:bg-gray-100 rounded-sm transition cursor-pointer"
    @click="showMobileNav"
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
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  </div>
</template>

<script>
export default {
  methods: {
    showMobileNav() {
      this.$store.dispatch('app/updateMobileNav', true);
    },
  },
};
</script>

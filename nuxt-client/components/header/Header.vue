<template>
  <header
    class="relative z-50 w-full h-14 sm:h-16 bg-white border-b ring-1 ring-gray-900 ring-opacity-5 border-gray-default"
  >
    <app-header-nav></app-header-nav>
    <app-mobile-nav-overlay></app-mobile-nav-overlay>
  </header>
</template>

<script>
import HeaderNav from './HeaderNav.vue';
import MobileNavOverlay from './mobile/MobileNavOverlay.vue';

export default {
  components: {
    appHeaderNav: HeaderNav,
    appMobileNavOverlay: MobileNavOverlay,
  },
};
</script>

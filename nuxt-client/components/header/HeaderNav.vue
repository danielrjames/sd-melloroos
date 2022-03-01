<template>
  <nav
    class="container flex justify-between sm:justify-start items-center h-full"
  >
    <nuxt-link :to="{ name: 'index' }">
      <app-horizontal-logo></app-horizontal-logo>
    </nuxt-link>
    <app-mobile-nav></app-mobile-nav>
    <app-desktop-nav></app-desktop-nav>
  </nav>
</template>

<script>
import HorizontalLogo from '../logo/HorizontalLogo.vue';
import DesktopNav from './desktop/DesktopNav.vue';
import MobileNav from './mobile/MobileNav.vue';

export default {
  components: {
    appDesktopNav: DesktopNav,
    appHorizontalLogo: HorizontalLogo,
    appMobileNav: MobileNav,
  },
};
</script>

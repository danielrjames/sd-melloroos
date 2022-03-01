<template>
  <client-only>
    <transition name="fade">
      <div
        v-if="mobileNav"
        class="fixed top-0 left-0 z-50 w-full h-full bg-white"
      >
        <app-mobile-header></app-mobile-header>
        <app-mobile-nav-items-public></app-mobile-nav-items-public>
      </div>
    </transition>
  </client-only>
</template>

<script>
import { mapState } from 'vuex';
import MobileHeader from './MobileHeader.vue';
import MobileNavItemsPublic from './nav-items/MobileNavItemsPublic.vue';

export default {
  components: {
    appMobileHeader: MobileHeader,
    appMobileNavItemsPublic: MobileNavItemsPublic,
  },

  computed: {
    ...mapState('app', {
      mobileNav: 'mobileNav',
    }),
  },
};
</script>

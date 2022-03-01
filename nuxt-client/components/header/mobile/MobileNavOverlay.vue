<template>
  <client-only>
    <transition name="fade">
      <div
        v-if="mobileNav"
        class="fixed top-0 left-0 z-50 w-full h-full bg-white"
      >
        <app-mobile-header></app-mobile-header>
        <app-mobile-nav-items-auth v-if="isAuth"></app-mobile-nav-items-auth>
        <app-mobile-nav-items-public v-else></app-mobile-nav-items-public>
      </div>
    </transition>
  </client-only>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import MobileHeader from './MobileHeader.vue';
import MobileNavItemsAuth from './nav-items/MobileNavItemsAuth.vue';
import MobileNavItemsPublic from './nav-items/MobileNavItemsPublic.vue';

export default {
  components: {
    appMobileHeader: MobileHeader,
    appMobileNavItemsAuth: MobileNavItemsAuth,
    appMobileNavItemsPublic: MobileNavItemsPublic,
  },

  computed: {
    ...mapState('app', {
      mobileNav: 'mobileNav',
    }),

    ...mapGetters('auth', {
      isAuth: 'authSet',
    }),
  },
};
</script>

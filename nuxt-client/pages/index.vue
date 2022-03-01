<template>
  <app-home-auth v-if="isAuth"></app-home-auth>
  <app-home-public v-else></app-home-public>
</template>

<script>
import { mapGetters } from 'vuex';
import HomeAuth from '../components/home/HomeAuth.vue';
import HomePublic from '../components/home/HomePublic.vue';

export default {
  head() {
    return {
      title: this.isAuth ? 'Dashboard' : 'nuxt-client',
      titleTemplate: this.isAuth
        ? '%s | nuxt-client'
        : '%s | An Amazing Framework',
    };
  },

  components: {
    appHomeAuth: HomeAuth,
    appHomePublic: HomePublic,
  },

  mounted() {
    this.key = false;
  },

  computed: {
    ...mapGetters('auth', {
      isAuth: 'authSet',
    }),
  },

  methods: {
    ahoy() {
      return true;
    },

    hello() {
      this.key = true;
    },
  },
};
</script>

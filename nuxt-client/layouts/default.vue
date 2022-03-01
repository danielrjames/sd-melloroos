<template>
  <div>
    <app-header></app-header>
    <div class="container pt-16 sm:pt-20 -mt-14 sm:-mt-16 h-screen">
      <nuxt />
    </div>
    <app-footer></app-footer>
    <app-modal></app-modal>
  </div>
</template>

<script>
/* eslint-disable nuxt/no-globals-in-created */
import { mapState } from 'vuex';
import Header from '../components/header/Header.vue';
import Modal from '../components/modal/Modal.vue';
import Footer from '../components/footer/Footer.vue';

export default {
  head() {
    return {
      title: 'nuxt-client',
      titleTemplate: '%s | nuxt-client',
    };
  },

  components: {
    appFooter: Footer,
    appHeader: Header,
    appModal: Modal,
  },

  async created() {
    if (process.client) {
      window.scrollTo(0, 0);
      window.addEventListener('resize', await this.handleResize);
      await this.handleResize();
    }
  },

  async destroyed() {
    window.removeEventListener('resize', await this.handleResize);
  },

  async mounted() {
    if (this.auth && this.authTimer > 0) {
      await this.$store.dispatch('auth/startTimer', this.authTimer);
      this.addBodyClass(['auth']);
    }
  },

  watch: {
    async auth(newValue, oldValue) {
      if (oldValue === true && newValue === false) {
        this.removeBodyClass(['auth']);

        if (this.overlay) {
          await this.$store.dispatch('app/closeMobileNav');
          await this.$store.dispatch('app/closeModal');
        }
      }
    },

    async authLoaded(newValue, oldValue) {
      if (newValue === true) {
        this.addBodyClass(['auth']);

        await this.$store.dispatch('auth/updateAuthLoading', false);

        if (this.navDropdown) {
          await this.$store.dispatch('app/closeNavDropdown');
        }
      }
    },

    async isMobile(newValue, oldValue) {
      if (this.mobileNav) {
        await this.$store.dispatch('app/closeMobileNav');
      }

      if (this.navDropdown) {
        await this.$store.dispatch('app/closeNavDropdown');
      }
    },

    overlay(newValue, oldValue) {
      if (newValue === true) {
        this.addBodyClass(['fixed', 'w-full']);
      } else {
        this.removeBodyClass(['fixed', 'w-full']);
      }
    },
  },

  computed: {
    ...mapState('app', {
      isLoading: 'loading',
      isMobile: 'mobile',
      mobileNav: 'mobileNav',
      modal: 'modal',
      navDropdown: 'navDropdown',
    }),

    ...mapState('auth', {
      auth: 'authenticated',
      authLoading: 'authLoading',
      authSubmit: 'authSubmit',
      authTimer: 'timer',
    }),

    authLoaded() {
      return (
        this.auth && this.authLoading && !this.authSubmit && !this.isLoading
      );
    },

    overlay() {
      return this.mobileNav || this.modal.open;
    },
  },

  methods: {
    addBodyClass(classList) {
      if (Array.isArray(classList)) {
        classList.forEach((className) =>
          document.body.classList.add(className)
        );
      }
    },

    async handleResize() {
      const status = window.innerWidth < 640;

      if (status !== this.isMobile) {
        await this.$store.dispatch('app/updateMobile', status);
      }
    },

    removeBodyClass(classList) {
      if (Array.isArray(classList)) {
        classList.forEach((className) =>
          document.body.classList.remove(className)
        );
      }
    },
  },
};
</script>

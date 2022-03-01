<template>
  <div>
    Hello

    <div>
      <app-lookup-form></app-lookup-form>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex';
import LookupForm from '../components/lookup/LookupForm.vue';

export default {
  head() {
    return {
      title: 'San Diego Mello Roos Lookup',
      titleTemplate: '%s | Find Mello Roos Taxes by Address',
    };
  },

  components: {
    appLookupForm: LookupForm,
  },

  computed: {
    // ...mapGetters('auth', {
    //   isAuth: 'authSet',
    // }),
  },

  methods: {
    ahoy() {
      return true;
    },
  },
};
</script>

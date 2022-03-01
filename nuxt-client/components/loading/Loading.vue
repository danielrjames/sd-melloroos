<template>
  <div v-if="false"></div>
</template>

<script>
export default {
  methods: {
    finish() {
      this.$store.dispatch('app/updateLoading', false);
    },

    start() {
      this.$store.dispatch('app/updateLoading', true);
    },
  },
};
</script>

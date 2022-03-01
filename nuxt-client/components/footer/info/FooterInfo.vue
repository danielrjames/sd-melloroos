<template>
  <div class="py-5 text-sm text-center border-t border-gray-default">
    <span> &copy; {{ currentYear }}</span>
    <span> Company Name </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentYear: null,
    };
  },

  mounted() {
    this.currentYear = new Date().getFullYear();
  },
};
</script>

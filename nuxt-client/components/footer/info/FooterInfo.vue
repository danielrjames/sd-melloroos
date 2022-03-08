<template>
  <div class="py-5 text-sm text-center">
    <span> &copy; {{ currentYear }}</span>
    <span>San Diego Mello-Roos Tax Lookup</span>
    <div class="mt-5 text-xs text-center">
      <a
        class="font-normal text-gray-default"
        href="https://www.flaticon.com/free-icons/household"
        rel="nofollow noopener noreferrer"
        target="_blank"
        >Favicon by Becris - Flaticon</a
      >
    </div>
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

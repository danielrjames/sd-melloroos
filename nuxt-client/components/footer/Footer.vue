<template>
  <div class="mt-10 sm:mt-14 bg-gray-50 text-gray-input">
    <div class="container">
      <app-footer-info> </app-footer-info>
    </div>
  </div>
</template>

<script>
import FooterInfo from './info/FooterInfo.vue';

export default {
  components: {
    appFooterInfo: FooterInfo,
  },
};
</script>

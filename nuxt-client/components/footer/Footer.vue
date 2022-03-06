<template>
  <div class="bg-gray-50 border-t text-gray-input border-gray-default">
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

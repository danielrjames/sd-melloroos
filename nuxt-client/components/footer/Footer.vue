<template>
  <div class="bg-gray-50 border-t text-gray-input border-gray-default">
    <div class="container">
      <app-footer-nav></app-footer-nav>
      <app-footer-info> </app-footer-info>
    </div>
  </div>
</template>

<script>
import FooterNav from './nav/FooterNav.vue';
import FooterInfo from './info/FooterInfo.vue';

export default {
  components: {
    appFooterInfo: FooterInfo,
    appFooterNav: FooterNav,
  },
};
</script>

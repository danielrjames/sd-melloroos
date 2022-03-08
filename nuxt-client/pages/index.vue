<template>
  <div>
    <div class="mx-auto mt-5 sm:mt-10 mb-10 max-w-lg text-center">
      <h2>San Diego Mello-Roos Tax Lookup</h2>
      <p class="my-5">
        Find San Diego County Mello-Roos Special Assessments and Property Tax
        records by address.
      </p>
    </div>
    <div class="my-10 mx-auto max-w-lg">
      <app-lookup-form></app-lookup-form>
    </div>
    <client-only>
      <div v-if="searchResult" class="mt-10 sm:mt-14 border-t border-gray-200">
        <app-property-detail :result="searchResult"></app-property-detail>
      </div>
    </client-only>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import LookupForm from '../components/lookup/LookupForm.vue';
import PropertyDetail from '../components/property/PropertyDetail.vue';
import { pageHeadConfig } from '../utils/app';

export default {
  data() {
    return {
      headConfig: {
        description:
          'Search current San Diego County Mello-Roos taxes by property address.',
        imgPath: `${this.$config.baseDomain}${this.$config.ogImgDefault}`,
        ogTitle:
          'San Diego Mello-Roos Tax Lookup | Find Mello-Roos Taxes by Address',
        title: 'San Diego Mello-Roos Tax Lookup',
        titleTemplate: 'Find Mello-Roos Taxes by Address',
        url: `${this.$config.baseDomain}`,
      },
    };
  },

  head() {
    return pageHeadConfig(this.headConfig);
  },

  components: {
    appLookupForm: LookupForm,
    appPropertyDetail: PropertyDetail,
  },

  computed: {
    ...mapGetters('property', {
      searchResult: 'searchResult',
    }),
  },
};
</script>

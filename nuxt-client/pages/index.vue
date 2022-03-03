<template>
  <div>
    <div class="mx-auto max-w-lg text-center">
      <h2>San Diego Mello Roos Tax Lookup</h2>
      <p class="my-5">
        Find San Diego County Mello Roos and Base Tax records by property
        address.
      </p>
    </div>
    <div class="my-10 mx-auto max-w-lg">
      <app-lookup-form></app-lookup-form>
    </div>
    <client-only>
      <div v-if="result" class="my-14 border-t border-gray-200">
        <app-property-detail></app-property-detail>
      </div>
    </client-only>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import LookupForm from '../components/lookup/LookupForm.vue';
import PropertyDetail from '../components/property/PropertyDetail.vue';

export default {
  head() {
    return {
      title: 'San Diego Mello Roos Lookup',
      titleTemplate: '%s | Find Mello Roos Taxes by Address',
    };
  },

  components: {
    appLookupForm: LookupForm,
    appPropertyDetail: PropertyDetail,
  },

  computed: {
    ...mapGetters('property', {
      result: 'searchResult',
    }),
  },

  methods: {
    ahoy() {
      return true;
    },
  },
};
</script>

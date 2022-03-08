<template>
  <client-only>
    <div>
      <div
        class="sm:flex sm:justify-between sm:items-center mt-2 sm:mt-0 mb-2 sm:mb-4"
      >
        <div
          class="mb-4 sm:mb-0 text-lg font-semibold tracking-tight text-center sm:text-left text-gray-heading"
        >
          History
        </div>
        <app-text-input
          auto-complete="off"
          :class="'mb-5 sm:mb-0 sm:max-w-xs'"
          :show-label="false"
          placeholder="Search by Address"
          input-name="search"
          :input-value="searchTerm"
          :max-length="250"
          :disabled="propertyList.length < 2"
          :required="false"
          @output="searchTerm = $event"
        ></app-text-input>
      </div>

      <div v-if="propertyList.length > 0" class="space-y-5">
        <div
          v-for="property in sortedList"
          :key="property.parcel"
          class="px-4 odd:bg-gray-50 rounded-sm"
        >
          <app-property-detail
            :result="property"
            :show-date="true"
            :toggle-details="true"
          ></app-property-detail>
        </div>
        <div
          v-if="sortedList.length < 1"
          class="py-5 text-sm text-center sm:text-left"
        >
          No records found.
        </div>
        <app-pagination
          v-if="listLength > size"
          :total-pages="pageCount"
          :total="listLength"
          :per-page="size"
          :current-page="currentPage"
          @pagechanged="onPageChange"
        ></app-pagination>
        <div class="w-full text-center">
          <button
            class="mt-2 mb-0 btn btn-xs btn-primary"
            @click="clearHistory"
          >
            Clear History
          </button>
        </div>
      </div>
      <div v-else class="py-5 text-sm text-center sm:text-left">
        There is no prior search history.
      </div>
    </div>
  </client-only>
</template>

<script>
import { mapState } from 'vuex';
import TextInput from '../../components/form/TextInput.vue';
import Pagination from '../../components/pagination/Pagination.vue';
import PropertyDetail from '../../components/property/PropertyDetail.vue';
import { pageHeadConfig } from '../../utils/app';

export default {
  data() {
    return {
      currentPage: 1,
      headConfig: {
        description: 'Search History page for San Diego Mello-Roos Tax Lookup.',
        imgPath: `${this.$config.baseDomain}${this.$config.ogImgDefault}`,
        ogTitle: 'History | San Diego Mello-Roos Tax Lookup',
        title: 'History',
        url: `${this.$config.baseDomain}${this.$route.fullPath}`,
      },
      listLength: 0,
      pageCount: 1,
      searchTerm: '',
      size: 6,
    };
  },

  head() {
    return pageHeadConfig(this.headConfig);
  },

  components: {
    appPagination: Pagination,
    appPropertyDetail: PropertyDetail,
    appTextInput: TextInput,
  },

  mounted() {},

  computed: {
    ...mapState('property', {
      propertyList: 'list',
    }),

    sortedList() {
      let returnList = [...this.propertyList];

      if (returnList.length > 0) {
        if (this.searchTerm.length > 0) {
          returnList = returnList.filter((x) =>
            x.address.includes(this.searchTerm.toUpperCase())
          );
        }

        returnList = returnList.sort((a, b) =>
          a.lookupDate < b.lookupDate ? 1 : -1
        );

        this.getPageCount(returnList);
        const start = (this.currentPage - 1) * this.size;

        const end = start + this.size;

        returnList = returnList.slice(start, end);
      }

      return returnList;
    },
  },

  methods: {
    async clearHistory() {
      await this.$store.dispatch('property/clearHistory');
      window.scrollTo(0, 0);
    },

    getPageCount(list) {
      this.listLength = list.length;
      const s = this.size;

      let count = Math.ceil(this.listLength / s);

      if (count < 1) {
        count = 1;
      }

      this.pageCount = count;

      if (count < this.currentPage) {
        this.currentPage = count;
      }
    },

    onPageChange(page) {
      this.currentPage = page;
      window.scrollTo(0, 0);
    },
  },
};
</script>

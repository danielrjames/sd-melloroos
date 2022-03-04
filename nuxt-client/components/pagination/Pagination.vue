<template>
  <div
    class="flex justify-between items-center py-3 bg-white rounded-b-md border-t border-gray-default"
    aria-label="Pagination"
  >
    <div class="hidden sm:block text-sm">
      Showing results
      <span v-if="totalPages > 1">
        <span class="font-medium text-gray-heading">{{ beginNumber() }}</span>
        <span v-if="currentPage < totalPages">to</span>
        <span v-else>of</span>
        <span class="font-medium text-gray-heading">{{ middleNumber() }}</span>
      </span>
      <span v-if="currentPage < totalPages">of</span>
      <span
        v-if="currentPage < totalPages"
        class="font-medium text-gray-heading"
        >{{ total }}</span
      >
      <span>total</span>
    </div>
    <div class="flex justify-between sm:justify-end space-x-3">
      <button
        type="button"
        class="mb-0 btn btn-xs btn-white"
        :disabled="isInFirstPage"
        @click="onClickPreviousPage"
      >
        Previous
      </button>
      <button
        type="button"
        class="mb-0 btn btn-xs btn-white"
        :disabled="isInLastPage"
        @click="onClickNextPage"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    btnColor: {
      type: String,
      default: 'btn-indigo',
    },

    currentPage: {
      type: Number,
      required: true,
    },

    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
    },

    perPage: {
      type: Number,
      required: true,
    },

    publicPage: {
      type: Boolean,
      default: false,
    },

    shadow: {
      type: Boolean,
      default: false,
    },

    tabTable: {
      type: Boolean,
      default: false,
    },

    total: {
      type: Number,
      required: true,
    },

    totalPages: {
      type: Number,
      required: true,
    },
  },

  computed: {
    endPage() {
      return Math.min(
        this.startPage + this.maxVisibleButtons - 1,
        this.totalPages
      );
    },

    isInFirstPage() {
      return this.currentPage === 1;
    },

    isInLastPage() {
      return this.currentPage === this.totalPages;
    },

    pages() {
      const range = [];

      for (let i = this.startPage; i <= this.endPage; i += 1) {
        if (i > 0) {
          range.push({
            isDisabled: i === this.currentPage,
            name: i,
          });
        }
      }

      return range;
    },

    startPage() {
      if (this.currentPage === 1) {
        return 1;
      }

      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons + 1;
      }

      return this.currentPage - 1;
    },
  },

  methods: {
    beginNumber() {
      let num = 1;

      if (this.currentPage > 1) {
        num = this.perPage * (this.currentPage - 1);

        return num + 1;
      }

      return num;
    },

    isPageActive(page) {
      return this.currentPage === page;
    },

    middleNumber() {
      return this.currentPage < this.totalPages
        ? this.perPage * this.currentPage
        : this.total;
    },

    onClickFirstPage() {
      this.$emit('pagechanged', 1);
    },

    onClickLastPage() {
      this.$emit('pagechanged', this.totalPages);
    },

    onClickNextPage() {
      this.$emit('pagechanged', this.currentPage + 1);
    },

    onClickPage(page) {
      this.$emit('pagechanged', page);
    },

    onClickPreviousPage() {
      this.$emit('pagechanged', this.currentPage - 1);
    },
  },
};
</script>

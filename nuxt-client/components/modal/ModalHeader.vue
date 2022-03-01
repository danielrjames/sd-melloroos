<template>
  <div class="modal-header">
    <div
      class="font-semibold text-gray-heading"
      :class="{ 'text-center w-full': header.center }"
    >
      {{ header.title }}
    </div>
    <button
      v-if="header.close"
      type="button"
      class="-mt-2 -mr-1 text-gray-400 hover:text-gray-500 bg-white rounded-md transition focus:outline-none"
      @click="closeModal"
    >
      <span class="sr-only">Close</span>
      <svg
        class="w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('app', {
      modal: 'modal',
    }),

    header() {
      return this.modal.header;
    },
  },

  methods: {
    closeModal() {
      this.$store.dispatch('app/closeModal');
    },
  },
};
</script>

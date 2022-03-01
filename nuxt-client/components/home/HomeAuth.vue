<template>
  <client-only>
    <div>
      <h2>This is the dashboard.</h2>
      <button class="mt-20 btn btn-sm btn-primary" @click="openModal">
        Open Modal
      </button>
    </div>
  </client-only>
</template>

<script>
import { getModalConfig } from '../../utils/app';

export default {
  methods: {
    openModal() {
      const config = getModalConfig();

      this.$store.dispatch('app/openModal', config);
    },
  },
};
</script>

<template>
  <div v-if="btnList" class="modal-footer">
    <button
      v-for="(btn, index) in btnList"
      :key="index"
      :class="[
        'btn',
        'btn-sm',
        'm-0',
        isMobile ? 'btn-stretch' : 'btn-w-auto',
        btn.class,
        { 'btn-loading': loading },
      ]"
      @click="handleClick(btn.storeAction, btn.actionModel)"
    >
      {{ btn.text }}
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('app', {
      isMobile: 'mobile',
      loading: 'loading',
      modal: 'modal',
    }),

    btnList() {
      return this.modal.buttons;
    },
  },

  methods: {
    handleClick(action, model) {
      this.$store.dispatch(action, model);
    },
  },
};
</script>

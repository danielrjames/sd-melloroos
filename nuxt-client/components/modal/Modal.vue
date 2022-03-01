<template>
  <client-only>
    <transition name="fade">
      <div
        v-if="modal.open"
        class="overflow-auto fixed inset-0 z-50"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          class="flex justify-center items-center sm:p-0 px-4 pt-4 pb-20 min-h-screen text-center"
        >
          <div
            class="fixed inset-0 bg-gray-500 bg-opacity-70 transition-all"
            aria-hidden="true"
          ></div>
          <component
            :is="modal.component"
            v-if="modal.component !== null"
          ></component>
          <div
            v-else
            class="overflow-hidden p-4 sm:p-5 sm:my-8 w-full text-left align-middle bg-white rounded-md shadow-xl transition-all transform"
            :class="modal.width"
          >
            <app-modal-header></app-modal-header>
            <div class="modal-body">
              <div v-if="modal.body.html" v-html="modal.body.text"></div>
              <div v-else>
                {{ modal.body.text }}
              </div>
            </div>
            <app-modal-footer></app-modal-footer>
          </div>
        </div>
      </div>
    </transition>
  </client-only>
</template>

<script>
import { mapState } from 'vuex';
import ModalHeader from './ModalHeader.vue';
import ModalFooter from './ModalFooter.vue';

export default {
  components: {
    appModalFooter: ModalFooter,
    appModalHeader: ModalHeader,
  },
  computed: {
    ...mapState('app', {
      modal: 'modal',
    }),
  },
};
</script>

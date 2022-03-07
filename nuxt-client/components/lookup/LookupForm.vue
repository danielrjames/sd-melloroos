<template>
  <form @submit.prevent="handleSubmit">
    <div v-if="error" class="my-2 text-red-default">{{ errorText }}</div>
    <app-text-input
      :show-label="true"
      label="Street Address Only"
      auto-complete="off"
      :input-value="address"
      placeholder="Enter Street Address"
      :show-error-message="false"
      :touch-validation="touchValidation"
      @reset-touch="touchValidation = $event"
      @output="address = $event"
      @valid="valid.address = $event"
    ></app-text-input>
    <button
      type="submit"
      :class="[
        'btn',
        'btn-primary',
        'btn-stretch',
        'mb-0',
        slim ? 'btn-sm' : 'btn-md',
        { 'btn-loading': spinner },
      ]"
    >
      Look Up
    </button>
  </form>
</template>

<script>
import { mapState } from 'vuex';
import TextInput from '../form/TextInput.vue';

export default {
  props: {
    slim: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      address: '',
      error: false,
      errorText: '',
      touchValidation: false,
      valid: {
        address: false,
      },
    };
  },
  components: {
    appTextInput: TextInput,
  },

  watch: {
    address(newValue, oldValue) {
      if (newValue && this.error) {
        this.error = false;
      }
    },
  },

  computed: {
    ...mapState('app', {
      spinner: 'spinner',
    }),
  },

  methods: {
    async handleSubmit() {
      if (Object.values(this.valid).includes(false) || this.error) {
        return (this.touchValidation = true);
      }

      try {
        const model = {
          address: this.address,
        };

        await this.$store.dispatch('property/lookup', model);
      } catch (err) {
        this.error = true;
        this.errorText = err.message;
      }
    },
  },
};
</script>

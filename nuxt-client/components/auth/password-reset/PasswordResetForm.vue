<template>
  <form @submit.prevent="handleSubmit">
    <div
      v-if="showMessage"
      :class="[
        'auth-frame-message',
        {
          'text-green-default': result.success,
          'text-red-default': result.error,
        },
      ]"
    >
      {{ messageText }}
    </div>
    <app-email-input
      :show-label="!slim"
      label="Email"
      placeholder="Email Address"
      :show-error-message="false"
      :touch-validation="touchValidation"
      @reset-touch="touchValidation = $event"
      @output="reset.email = $event"
      @valid="valid.email = $event"
    ></app-email-input>

    <button
      :class="[
        'btn',
        'btn-primary',
        'btn-stretch',
        'mb-0',
        'btn-sm sm:btn-md',
        { 'btn-loading': spinner },
      ]"
      type="submit"
    >
      Reset Password
    </button>
    <div class="mt-3 sm:mt-4 text-center">
      <nuxt-link class="text-xs sm:text-sm" to="sign-in"
        >Back to Sign In</nuxt-link
      >
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex';
import EmailInput from '../../form/EmailInput.vue';

export default {
  props: {
    slim: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      messageText: '',
      reset: {
        email: '',
      },
      result: {
        error: false,
        success: false,
      },
      touchValidation: false,
      valid: {
        email: false,
      },
    };
  },

  components: {
    appEmailInput: EmailInput,
  },

  watch: {
    reset: {
      handler(newValue, oldValue) {
        if (newValue && this.showMessage) {
          this.updateResult();
        }
      },
      deep: true,
    },
  },

  computed: {
    ...mapState('app', {
      spinner: 'spinner',
    }),

    showMessage() {
      return Object.values(this.result).includes(true);
    },
  },

  methods: {
    async handleSubmit() {
      if (
        Object.values(this.valid).includes(false) ||
        Object.values(this.result).includes(true)
      ) {
        return (this.touchValidation = true);
      }

      try {
        const model = {
          email: this.reset.email,
        };

        await this.$store.dispatch('auth/passwordReset', model);

        const msg = 'Reset instructions have been emailed.';

        this.updateResult('success', true, msg);
      } catch (err) {
        this.updateResult('error', true, err.message);
      }
    },

    updateResult(setKey = null, result = false, message = '') {
      Object.keys(this.result).forEach(
        (key) => (this.result[key] = key === setKey ? result : false)
      );

      this.messageText = message;
    },
  },
};
</script>

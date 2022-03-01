<template>
  <form :class="{ slim: slim }" @submit.prevent="handleSubmit">
    <div
      v-if="error"
      :class="[
        'auth-frame-message',
        'text-red-default',
        { 'text-xs py-1': slim },
      ]"
    >
      {{ errorText }}
    </div>
    <app-email-input
      :show-label="!slim"
      label="Email"
      placeholder="Email Address"
      :show-error-message="false"
      :touch-validation="touchValidation"
      @reset-touch="touchValidation = $event"
      @output="login.email = $event"
      @valid="valid.email = $event"
    ></app-email-input>
    <app-password-input
      :show-label="!slim"
      label="Password"
      placeholder="Password"
      :display-validations="false"
      :suppress-criteria="true"
      :touch-validation="touchValidation"
      @reset-touch="touchValidation = $event"
      @output="login.password = $event"
      @valid="valid.password = $event"
    ></app-password-input>
    <app-checkbox
      v-if="!slim"
      :show-label="false"
      input-name="rememberMe"
      :required="false"
      :custom-link="!slim"
      :options="[{ name: 'Remember Me', value: 1 }]"
      :touch-validation="touchValidation"
      @output="login.rememberMe = $event"
    >
      <nuxt-link v-if="!slim" to="password-reset">Forgot Password?</nuxt-link>
    </app-checkbox>
    <button
      :class="[
        'btn',
        'btn-primary',
        'btn-stretch',
        'mb-0',
        slim ? 'btn-sm' : 'btn-sm sm:btn-md',
        { 'btn-loading': spinner },
      ]"
      type="submit"
    >
      Sign In
    </button>
    <div class="text-center" :class="slim ? 'mt-3' : 'mt-3 sm:mt-4'">
      <nuxt-link v-if="slim" class="text-xs" to="password-reset"
        >Forgot Password?</nuxt-link
      >
      <nuxt-link v-else class="text-xs sm:text-sm" to="register"
        >Not signed up yet?</nuxt-link
      >
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex';
import EmailInput from '../../form/EmailInput.vue';
import PasswordInput from '../../form/PasswordInput.vue';
import Checkbox from '../../form/Checkbox.vue';

export default {
  props: {
    slim: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      error: false,
      errorText: '',
      login: {
        email: '',
        password: '',
        rememberMe: false,
      },
      touchValidation: false,
      valid: {
        email: false,
        password: false,
      },
    };
  },

  components: {
    appCheckbox: Checkbox,
    appEmailInput: EmailInput,
    appPasswordInput: PasswordInput,
  },

  watch: {
    login: {
      handler(newValue, oldValue) {
        if (newValue && this.error) {
          this.error = false;
        }
      },
      deep: true,
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
          email: this.login.email,
          password: this.login.password,
          redirect: this.$route.query.returnUrl ?? null,
          rememberMe: this.slim === true ? true : this.login.rememberMe,
        };

        await this.$store.dispatch('auth/login', model);
      } catch (err) {
        this.error = true;
        this.errorText = err.message;
      }
    },
  },
};
</script>

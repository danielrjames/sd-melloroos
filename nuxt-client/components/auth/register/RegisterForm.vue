<template>
  <form
    class="grid grid-cols-2 gap-x-4 sm:gap-x-5"
    @submit.prevent="handleSubmit"
  >
    <div v-if="error" class="col-span-2 auth-frame-message text-red-default">
      {{ errorText }}
    </div>
    <app-text-input
      :class="['col-span-1']"
      :show-label="!slim"
      label="First Name"
      placeholder="First Name"
      input-name="firstName"
      :touch-validation="touchValidation"
      @output="register.firstName = $event"
      @reset-touch="touchValidation = $event"
      @valid="valid.firstName = $event"
    ></app-text-input>
    <app-text-input
      :class="['col-span-1']"
      :show-label="!slim"
      label="Last Name"
      placeholder="Last Name"
      input-name="lastName"
      :touch-validation="touchValidation"
      @output="register.lastName = $event"
      @reset-touch="touchValidation = $event"
      @valid="valid.lastName = $event"
    ></app-text-input>
    <app-email-input
      :class="'col-span-2'"
      :show-label="!slim"
      label="Email"
      placeholder="Email Address"
      :show-error-message="false"
      :touch-validation="touchValidation"
      @reset-touch="touchValidation = $event"
      @output="register.email = $event"
      @valid="valid.email = $event"
    ></app-email-input>
    <app-password-input
      :class="'col-span-2'"
      :show-label="!slim"
      label="Password"
      placeholder="Password"
      :touch-validation="touchValidation"
      @reset-touch="touchValidation = $event"
      @output="register.password = $event"
      @valid="valid.password = $event"
    ></app-password-input>
    <app-checkbox
      :class="'col-span-2'"
      :show-label="false"
      input-name="consent"
      :required="true"
      :custom-text="true"
      :options="[{ name: 'consent', value: 1 }]"
      :touch-validation="touchValidation"
      @output="register.consent = $event"
      @valid="valid.consent = $event"
    >
      I agree to the
      <nuxt-link :to="{ name: 'terms-of-use' }">Terms</nuxt-link>
      <span>and</span>
      <nuxt-link :to="{ name: 'privacy' }">Privacy Policy</nuxt-link>
    </app-checkbox>

    <div class="col-span-2">
      <button
        :class="[
          'btn',
          'btn-primary',
          'btn-stretch',
          'mb-0',
          'btn-sm sm:btn-md',
          { 'btn-loading': spinner && !navDropdown },
        ]"
        type="submit"
      >
        Register
      </button>
    </div>
    <div class="col-span-2 mt-3 sm:mt-4 text-center">
      <nuxt-link class="text-xs sm:text-sm" to="sign-in"
        >Already have an account?</nuxt-link
      >
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex';
import TextInput from '../../form/TextInput.vue';
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
      register: {
        consent: false,
        email: '',
        firstName: '',
        lastName: '',
        password: '',
      },
      touchValidation: false,
      valid: {
        consent: false,
        email: false,
        firstName: false,
        lastName: false,
        password: false,
      },
    };
  },

  components: {
    appCheckbox: Checkbox,
    appEmailInput: EmailInput,
    appPasswordInput: PasswordInput,
    appTextInput: TextInput,
  },

  watch: {
    register: {
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
      navDropdown: 'navDropdown',
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
          email: this.register.email,
          firstName: this.register.firstName,
          lastName: this.register.lastName,
          password: this.register.password,
          redirect: this.$route.query.returnUrl ?? null,
        };

        await this.$store.dispatch('auth/register', model);
      } catch (err) {
        this.error = true;
        this.errorText = err.message;
      }
    },
  },
};
</script>

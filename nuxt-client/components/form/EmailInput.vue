<template>
  <div :class="['input-group', { 'has-error': inputError }]">
    <label v-if="showLabel" :for="inputName" class="input-label">
      {{ label }}
    </label>
    <input
      :ref="inputName"
      v-model.trim="inputText"
      type="email"
      :name="inputName"
      class="input-control"
      :placeholder="placeholder"
      :maxlength="maxLength"
      :disabled="disabled"
      :autocomplete="autoComplete"
      spellcheck="false"
      @input="validateEmail"
      @blur="checkBlur"
    />
    <div v-if="showErrorMessage && inputError" class="relative">
      <div class="absolute top-0.5 left-0 text-xs text-red-default">
        {{ errorText }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    autoComplete: {
      type: String,
      default: 'on',
    },

    customClass: {
      type: String,
      default: '',
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    focus: {
      type: Boolean,
      default: false,
    },

    inputName: {
      type: String,
      default: 'email',
    },

    inputValue: {
      type: String,
      default: '',
    },

    label: {
      type: String,
      default: 'Email',
    },

    maxLength: {
      type: Number,
      default: 250,
    },

    notAvailable: {
      type: Boolean,
      default: false,
    },

    placeholder: {
      type: String,
      default: 'Email Address',
    },

    required: {
      type: Boolean,
      default: true,
    },

    showErrorMessage: {
      type: Boolean,
      default: true,
    },

    showLabel: {
      type: Boolean,
      default: true,
    },

    touchValidation: {
      type: Boolean,
      default: false,
    },

    validateBlur: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      error: {
        maxLength: false,
        notAvailable: false,
        required: false,
        valid: false,
      },
      errorText: '',
      inputError: false,
      inputText: '',
    };
  },

  created() {
    if (this.inputValue) {
      this.inputText = this.inputValue;
      this.validateEmail();
    }
  },

  mounted() {
    if (this.focus) {
      this.$refs[this.inputName].focus();
    }
  },

  watch: {
    disabled(newValue, oldValue) {
      if (newValue === true && this.inputError) {
        this.inputError = false;
      }
    },

    focus: {
      handler(newValue, oldValue) {
        if (newValue) {
          this.$refs[this.inputName].focus();
        }
      },
      immediate: true,
    },

    inputValue: {
      handler(newValue, oldValue) {
        if (newValue !== this.inputText) {
          this.inputText = newValue;
          this.validateText();
        }
      },
      immediate: true,
    },

    isTaken(newValue, oldValue) {
      if (newValue) {
        this.email.notAvailable = true;
      }
    },

    touchValidation(newValue, oldValue) {
      if (newValue === true) {
        this.checkValidation();
      }
    },
  },

  methods: {
    checkBlur() {
      if (this.validateBlur) {
        this.checkValidation();
      }
    },

    checkRequired() {
      this.error.required = this.required && !(this.inputText.length > 0);

      if (this.error.required) {
        this.errorText = `${this.label} is required.`;
      }
    },

    checkValid() {
      if (this.inputText.length > 0) {
        const emailRegex =
          /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/;

        this.error.valid = !emailRegex.test(this.inputText);

        if (this.error.valid) {
          this.errorText = 'Please enter a valid email address.';
        }
      }
    },

    checkValidation() {
      if (!this.disabled) {
        this.checkRequired();
        this.checkValid();

        this.inputError = Object.values(this.error).includes(true);

        this.$emit('valid', !this.inputError);
      }
    },

    validateEmail() {
      if (this.touchValidation) {
        this.$emit('reset-touch', false);
      }

      this.checkValidation();

      this.$emit('output', this.inputText);
    },
  },
};
</script>

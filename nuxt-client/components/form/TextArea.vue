<template>
  <div :class="['input-group', { 'has-error': inputError }]">
    <label v-if="showLabel" :for="inputName" class="input-label">
      {{ label }}
    </label>
    <textarea
      :ref="inputName"
      v-model.trim="inputText"
      :name="inputName"
      class="input-control"
      :rows="rows"
      :maxlength="maxLength"
      :disabled="disabled"
      :autocomplete="autoComplete"
      @input="validateText"
      @blur="checkBlur"
    ></textarea>
    <div class="relative -mt-1">
      <div
        v-if="showErrorMessage && inputError"
        class="absolute top-0 left-0 text-xs text-red-default"
      >
        {{ errorText }}
      </div>
      <div
        :class="[
          'absolute',
          'top-0',
          'right-0',
          'text-xs',
          { 'text-red-default': inputError },
        ]"
      >
        {{ inputText.length }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    autoComplete: {
      type: String,
      default: 'off',
    },

    cols: {
      type: Number,
      default: 50,
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
      default: 'textarea',
    },

    inputValue: {
      type: String,
      default: '',
    },

    label: {
      type: String,
      default: 'Default Text Area',
    },

    maxLength: {
      type: Number,
      default: 300,
    },

    minLength: {
      type: Number,
      default: 0,
    },

    required: {
      type: Boolean,
      default: true,
    },

    rows: {
      type: Number,
      default: 3,
    },

    showErrorMessage: {
      type: Boolean,
      default: false,
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
        minLength: false,
        required: false,
      },
      errorText: '',
      inputError: false,
      inputText: '',
    };
  },

  watch: {
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

    checkMaxLength() {
      this.error.maxLength = this.inputText.length > this.maxLength;

      if (this.error.maxLength) {
        this.errorText = `${this.label} has a limit of ${this.maxLength} characters.`;
      }
    },

    checkMinLength() {
      if (this.minLength > 0) {
        this.error.minLength = !(this.inputText.length >= this.minLength);

        if (this.error.minLength) {
          this.errorText = `${this.label} must be at least ${this.minLength} characters.`;
        }
      }
    },

    checkRequired() {
      this.error.required = this.required && !(this.inputText.length > 0);

      if (this.error.required) {
        this.errorText = `${this.label} is required.`;
      }
    },

    checkValidation() {
      if (!this.disabled) {
        this.checkMaxLength();
        this.checkMinLength();
        this.checkRequired();

        this.inputError = Object.values(this.error).includes(true);

        this.$emit('valid', !this.inputError);
      }
    },

    validateText() {
      if (!this.disabled) {
        if (this.touchValidation) {
          this.$emit('reset-touch', false);
        }

        this.checkValidation();

        this.$emit('output', this.inputText);
      }
    },
  },
};
</script>

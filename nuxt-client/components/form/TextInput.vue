<template>
  <div :class="['input-group', { 'has-error': inputError }]">
    <label v-if="showLabel" :for="inputName" class="input-label">
      {{ label }}
    </label>
    <input
      :ref="inputName"
      v-model.trim="inputText"
      type="text"
      :autocomplete="autoComplete"
      :disabled="disabled"
      class="input-control"
      :minlength="maxLength"
      :name="inputName"
      :placeholder="placeholder"
      :spellcheck="spellcheck"
      @blur="checkBlur"
      @input="validateText"
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

    disabled: {
      type: Boolean,
      default: false,
    },

    focus: {
      type: Boolean,
      default: false,
    },

    forceValidation: {
      type: Boolean,
      default: false,
    },

    inputName: {
      type: String,
      default: 'text',
    },

    inputValue: {
      type: String,
      default: '',
    },

    label: {
      type: String,
      default: 'Text',
    },

    maxLength: {
      type: Number,
      default: 250,
    },

    minLength: {
      type: Number,
      default: 0,
    },

    placeholder: {
      type: String,
      default: 'Text',
    },

    required: {
      type: Boolean,
      default: true,
    },

    showErrorMessage: {
      type: Boolean,
      default: false,
    },

    showLabel: {
      type: Boolean,
      default: true,
    },

    spellcheck: {
      type: String,
      default: 'false',
    },

    touchValidation: {
      type: Boolean,
      default: false,
    },

    validateOnBlur: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      error: {
        minLength: false,
        required: false,
      },
      errorText: '',
      inputError: false,
      inputText: '',
    };
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

    touchValidation(newValue, oldValue) {
      if (newValue === true) {
        this.checkValidation();
      }
    },
  },

  methods: {
    checkBlur() {
      if (this.validateOnBlur) {
        this.checkValidation();
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
      if (!this.disabled || this.forceValidation) {
        this.checkMinLength();
        this.checkRequired();

        this.inputError = Object.values(this.error).includes(true);

        this.$emit('valid', !this.inputError);
      }
    },

    validateText() {
      if (!this.disabled || this.forceValidation) {
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

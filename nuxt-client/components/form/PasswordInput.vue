<template>
  <div :class="['input-group', { 'has-error': inputError || criteriaError }]">
    <label v-if="showLabel" :for="inputName" class="input-label">{{
      label
    }}</label>
    <input
      :ref="inputName"
      v-model.trim="inputText"
      type="password"
      :name="inputName"
      class="input-control"
      :placeholder="placeholder"
      :maxlength="maxLength"
      :disabled="disabled"
      :autocomplete="autoComplete"
      @input="validateText"
      @blur="checkBlur"
    />
    <div class="relative">
      <div
        v-if="showErrorMessage && inputError"
        class="absolute top-0.5 left-0 text-xs text-red-default"
      >
        {{ errorText }}
      </div>
      <div
        v-else-if="displayValidations && !suppressCriteria"
        class="box-border grid grid-cols-2 gap-x-1 sm:gap-x-4 p-1.5 sm:px-3 sm:pt-2 mt-3 text-xs text-gray-500 bg-gray-50 rounded border border-gray-200 border-opacity-50 transition-all"
      >
        <div
          v-for="(value, index) in password"
          :key="index"
          class="sm:mb-0.5 truncate"
          :class="{ 'text-gray-300 line-through': value.valid }"
        >
          {{ value.criteria }}
        </div>
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

    displayValidations: {
      type: Boolean,
      default: true,
    },

    existingPassword: {
      type: String,
      default: '',
    },

    focus: {
      type: Boolean,
      default: false,
    },

    inputName: {
      type: String,
      default: 'password',
    },

    inputValue: {
      type: String,
      default: '',
    },

    label: {
      type: String,
      default: 'Password',
    },

    maxLength: {
      type: Number,
      default: 128,
    },

    minLength: {
      type: Number,
      default: 8,
    },

    placeholder: {
      type: String,
      default: 'Password',
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

    suppressCriteria: {
      type: Boolean,
      default: false,
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
      criteriaError: false,
      error: {
        match: false,
        maxLength: false,
        minLength: false,
        required: false,
      },
      errorText: '',
      inputError: false,
      inputText: '',
      password: {
        lowercase: {
          criteria: 'One lowercase letter',
          valid: false,
        },
        min: {
          criteria: `At least ${this.minLength} characters`,
          valid: false,
        },
        number: {
          criteria: 'One number',
          valid: false,
        },
        special: {
          criteria: 'One special character',
          valid: false,
        },
        uppercase: {
          criteria: 'One uppercase letter',
          valid: false,
        },
      },
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
        this.criteriaError = this.setCriteriaError();
      }
    },
  },

  methods: {
    checkBlur() {
      if (this.validateBlur) {
        this.checkValidation();
      }
    },

    checkCriteria() {
      this.password.lowercase.valid = this.inputText.search(/[a-z]/) !== -1;

      this.password.min.valid = this.inputText.length >= this.minLength;

      this.password.number.valid = this.inputText.search(/\d/) !== -1;

      this.password.special.valid = this.inputText.search(/\W+/) !== -1;

      this.password.uppercase.valid = this.inputText.search(/[A-Z]/) !== -1;
    },

    checkMatch() {
      if (this.existingPassword.length > 0) {
        this.error.match = this.inputText === this.existingPassword;

        if (this.error.match) {
          this.errorText = 'Passwords are the same.';
        }
      }
    },

    checkMaxLength() {
      this.error.maxLength = this.inputText.length > this.maxLength;

      if (this.error.maxLength) {
        this.errorText = `${this.label} has a limit of ${this.maxLength} characters.`;
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
        this.checkMatch();
        this.checkRequired();
        this.checkCriteria();

        this.inputError = Object.values(this.error).includes(true);

        const invalidCriteria = this.setCriteriaError();

        if (this.criteriaError && !invalidCriteria) {
          this.criteriaError = false;
        }

        this.$emit('valid', !invalidCriteria && !this.inputError);
      }
    },

    setCriteriaError() {
      return this.suppressCriteria === true
        ? false
        : Object.values(this.password).some((c) => c.valid === false);
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

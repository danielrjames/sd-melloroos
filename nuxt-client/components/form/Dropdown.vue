<template>
  <div :class="['input-group', { 'has-error': inputError }]">
    <label v-if="showLabel" :for="inputName" class="input-label">
      {{ label }}
    </label>
    <select
      :ref="inputName"
      v-model="selectedItem"
      class="input-control"
      :name="inputName"
      :disabled="disabled"
      @change="validateSelect"
    >
      <option class="hidden" disabled selected value></option>
      <option v-if="emptyOption" :value="emptyOptionValue">
        {{ emptyOptionName }}
      </option>
      <option v-for="(item, index) in options" :key="index" :value="item.value">
        {{ item.name }}
      </option>
    </select>
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
    bypassDisabled: {
      type: Boolean,
      default: false,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    emptyOption: {
      type: Boolean,
      default: false,
    },

    emptyOptionName: {
      type: [String],
      default: '',
    },

    emptyOptionValue: {
      type: [Number],
      default: 0,
    },

    focus: {
      type: Boolean,
      default: false,
    },

    inputName: {
      type: String,
      default: 'defaultDropdown',
    },

    inputValue: {
      type: [String, Number],
      default: null,
    },

    label: {
      type: String,
      default: 'Default Dropdown',
    },

    options: {
      type: Array,
      default: () => [
        { name: 'Default Selection 1', value: 1 },
        { name: 'Default Selection 2', value: 2 },
      ],
    },

    required: {
      type: Boolean,
      default: true,
    },

    resetSelection: {
      type: Boolean,
      default: false,
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
  },

  data() {
    return {
      error: {
        required: false,
      },
      errorText: '',
      inputError: false,
      selectedItem: null,
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
        if (newValue !== this.selectedItem && this.options.length > 0) {
          const foundOption = this.options.find(
            (option) => option.value === newValue
          );

          if (foundOption) {
            this.selectedItem = foundOption.value;
            this.validateSelect();
          }
        }
      },
      immediate: true,
    },

    required(newValue, oldValue) {
      if (newValue === false && this.error.required === true) {
        this.error.required = false;
        // recheck error flag
        this.inputError = Object.values(this.error).includes(true);
      }
    },

    resetSelection(newValue, oldValue) {
      if (newValue === true) {
        this.selectedItem = null;
      }
    },

    touchValidation(newValue, oldValue) {
      if (newValue === true) {
        this.checkValidation();
      }
    },
  },

  methods: {
    checkRequired() {
      this.error.required = this.required && this.selectedItem === null;

      if (this.error.required) {
        this.errorText = `${this.label} is required.`;
      }
    },

    checkValidation() {
      if (!this.disabled || this.bypassDisabled) {
        this.checkRequired();

        this.inputError = Object.values(this.error).includes(true);

        this.$emit('valid', !this.inputError);
      }
    },

    validateSelect() {
      if (!this.disabled) {
        if (this.touchValidation) {
          this.$emit('reset-touch', false);
        }

        this.checkValidation();

        const outputValue = !this.inputError ? this.selectedItem : null;

        this.$emit('output', outputValue);
      }
    },
  },
};
</script>

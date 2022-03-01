<template>
  <div :class="['input-group', { 'has-error': inputError }]">
    <label v-if="showLabel" class="input-label">{{ label }}</label>
    <div
      v-for="(item, index) in options"
      :key="index"
      :class="[
        'flex',
        'items-center',
        'select-none',
        {
          'mb-1.5': index + 1 < options.length,
        },
      ]"
    >
      <input
        :id="inputName + '_' + index"
        v-model="checked"
        class="checkbox"
        type="checkbox"
        :name="inputName + '_' + index"
        :value="item.value"
        :disabled="disabled"
        @change="validateSelect"
      />
      <label
        :class="['checkbox-label', { 'font-semibold': isChecked(item) }]"
        :for="inputName + '_' + index"
      >
        <span v-if="customText">
          <slot></slot>
        </span>
        <span v-else :for="inputName + '_' + index">{{ item.name }}</span>
      </label>
      <div v-if="customLink" class="ml-auto text-xs sm:text-sm">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    customLink: {
      type: Boolean,
      default: false,
    },

    customText: {
      type: Boolean,
      default: false,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    initFilter: {
      type: Boolean,
      default: false,
    },

    inputName: {
      type: String,
      default: 'defaultCheckbox',
    },

    inputValue: {
      type: [Boolean, Array],
      default: null,
    },

    label: {
      type: String,
      default: 'Default Checkbox',
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
      default: false,
    },

    resetChecked: {
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
  },

  data() {
    return {
      checked: [],
      init: true,
      inputError: false,
    };
  },

  mounted() {
    if (this.inputValue && this.initFilter) {
      this.validateSelect();
    }
  },

  watch: {
    inputValue: {
      handler(newValue, oldValue) {
        if (newValue && this.options.length > 0) {
          this.checked = []; // clearing for new update

          if (
            this.options.length === 1 &&
            typeof newValue === 'boolean' &&
            this.checked.length <= 1
          ) {
            this.checked.push(this.options[0].value);
          } else if (Array.isArray(newValue) && newValue !== this.checked) {
            this.checked = this.options
              .filter((option) => newValue.includes(option.value))
              .map((option) => option.value);
          }

          this.checkValidation();
        }
      },
      immediate: true,
    },

    resetChecked(newValue, oldValue) {
      if (newValue === true) {
        this.checked = [];
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
      this.inputError = this.required && this.checked.length < 1;
    },

    checkValidation() {
      if (!this.disabled) {
        this.checkRequired();
        this.$emit('valid', !this.inputError);
      }
    },

    isChecked(item) {
      return !!this.checked.find((x) => x === item.value);
    },

    validateSelect() {
      if (!this.disabled) {
        const outputValue =
          this.options.length > 1 ? this.checked : !!(this.checked.length > 0);

        this.$emit('output', outputValue);

        this.checkValidation();
      }
    },
  },
};
</script>

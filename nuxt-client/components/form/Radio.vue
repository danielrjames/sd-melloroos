<template>
  <div :class="['input-group', { 'has-error': inputError }]">
    <label v-if="showLabel" class="input-label">{{ label }}</label>
    <div :class="{ 'flex items-center space-x-4': inline }">
      <div
        v-for="(item, index) in options"
        :key="index"
        :class="[
          'items-center',
          {
            'inline-flex': inline,
            flex: !inline,
            'mb-1.5': !inline && index + 1 < options.length,
          },
        ]"
      >
        <input
          :id="inputName + '_' + index"
          v-model="selected"
          class="radio"
          type="radio"
          :name="inputName + '_' + index"
          :value="item.value"
          :disabled="disabled"
          @change="validateSelect"
        />
        <label
          :class="['radio-label', { 'font-semibold': isChecked(item) }]"
          :for="inputName + '_' + index"
          >{{ item.name }}</label
        >
      </div>
      <div v-if="showErrorMessage && inputError" class="relative">
        <div class="absolute top-0.5 left-0 text-xs text-red-default">
          {{ errorText }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },

    inline: {
      type: Boolean,
      default: false,
    },

    inputName: {
      type: String,
      default: 'defaultRadio',
    },

    inputValue: {
      type: [String, Number, Boolean],
      default: null,
    },

    label: {
      type: String,
      default: 'Default Radio',
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
      errorText: '',
      inputError: false,
      requiredError: false,
      selected: null,
    };
  },

  watch: {
    inputValue: {
      handler(newValue, oldValue) {
        if (newValue !== this.selected && this.options.length > 0) {
          const foundOption = this.options.find(
            (option) => option.value === newValue
          );

          if (foundOption) {
            this.selected = foundOption.value;
            this.checkValidation();
          }
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
    checkRequired() {
      this.inputError = this.required && this.selected === null;

      if (this.inputError) {
        this.errorText = `${this.label} is required.`;
      }
    },

    checkValidation() {
      if (!this.disabled) {
        this.checkRequired();

        this.$emit('valid', !this.inputError);
      }
    },

    isChecked(item) {
      return item.value === this.selected;
    },

    validateSelect() {
      if (!this.disabled) {
        if (this.selected !== null) {
          this.$emit('output', this.selected);
        }

        this.checkValidation();
      }
    },
  },
};
</script>

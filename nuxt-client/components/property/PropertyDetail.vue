<template>
  <div class="text-sm">
    <div class="divide-y divide-gray-200">
      <div
        class="py-2"
        :class="{ 'cursor-pointer': toggleDetails }"
        @click="showDetails"
      >
        <div>
          <span class="font-medium text-gray-heading">Address:</span>
          <span>{{ result.address }}</span>
        </div>
        <div>
          <span class="font-medium text-gray-heading">Parcel #:</span>
          <span>{{ result.parcel }}</span>
        </div>
        <div>
          <span class="font-medium text-gray-heading">Owner:</span>
          <span>{{ result.owner }}</span>
        </div>
        <div v-if="showDate">
          <span class="font-medium text-gray-heading">Searched On:</span>
          <span>{{ result.lookupDate | localeTime }}</span>
        </div>
      </div>
      <div
        v-show="displayDetails"
        :class="{ 'cursor-pointer': toggleDetails }"
        class="py-2"
        @click="showDetails"
      >
        <div class="grid sm:grid-cols-2 sm:gap-x-10">
          <div>
            <div class="flex justify-between">
              <div class="font-medium text-gray-heading">Land Value:</div>
              <div>{{ result.tax.landValues | usd }}</div>
            </div>
            <div class="flex justify-between">
              <div class="font-medium text-gray-heading">
                Improvement Value:
              </div>
              <div>{{ result.tax.improvementValues | usd }}</div>
            </div>
            <div class="flex justify-between">
              <div class="font-medium text-gray-heading">Net Value:</div>
              <div>{{ result.tax.netValue | usd }}</div>
            </div>
          </div>

          <div>
            <div class="flex justify-between">
              <div class="font-medium text-gray-heading">Base Tax:</div>
              <div>{{ result.tax.baseTax | usd }}</div>
            </div>
            <div class="flex justify-between">
              <div class="font-medium text-gray-heading">Base Tax Rate:</div>
              <div>{{ result.tax.rate }}</div>
            </div>

            <div class="flex justify-between">
              <div class="font-medium text-gray-heading">
                <span class="md:hidden">Mello-Roos:</span>
                <span class="hidden md:inline"
                  >Mello-Roos (Special Assessment):</span
                >
              </div>
              <div>{{ result.tax.fixedCharges | usd }}</div>
            </div>
            <div
              class="flex justify-between pt-1 mt-1 border-t border-gray-200"
            >
              <div class="font-medium text-gray-heading">Total Tax:</div>
              <div>{{ result.tax.totalTax | usd }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="result.assessment !== null"
      v-show="displayDetails"
      :class="{ 'cursor-pointer': toggleDetails }"
      class="mt-3"
      @click="showDetails"
    >
      <div
        class="pb-2 mb-2 font-medium text-center border-b border-gray-200 text-gray-heading"
      >
        Special Assessment Breakdown
      </div>
      <div
        v-for="fund in result.assessment.funds"
        :key="fund.item"
        class="flex justify-between"
      >
        <div>
          {{ fund.description }}
        </div>
        <div>{{ fund.amount | usd }}</div>
      </div>
      <div class="flex justify-between pt-1 mt-1 border-t border-gray-200">
        <div class="font-medium text-gray-heading">
          Total Special Assessment:
        </div>
        <div>
          {{ result.assessment.total | usd }}
        </div>
      </div>
    </div>
    <div
      v-show="displayDetails"
      class="py-2 mt-3 text-xs italic text-center sm:text-right"
    >
      All information is public record.
    </div>
  </div>
</template>

<script>
export default {
  props: {
    result: {
      type: Object,
      default: () => null,
    },

    showDate: {
      type: Boolean,
      default: false,
    },

    toggleDetails: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      displayDetails: false,
    };
  },

  mounted() {
    if (!this.toggleDetails) {
      this.displayDetails = true;
    }
  },

  methods: {
    showDetails() {
      if (this.toggleDetails) {
        this.displayDetails = !this.displayDetails;
      }
    },
  },
};
</script>

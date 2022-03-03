<template>
  <div class="text-sm">
    <div class="divide-y divide-gray-200">
      <div class="py-2">
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
      </div>
      <div class="py-2">
        <div class="grid sm:grid-cols-2 sm:gap-x-10">
          <div>
            <div class="flex justify-between">
              <div class="font-medium text-gray-heading">Land Value:</div>
              <div>{{ result.taxes.landValues | usd }}</div>
            </div>
            <div class="flex justify-between">
              <div class="font-medium text-gray-heading">
                Improvement Values:
              </div>
              <div>{{ result.taxes.improvementValues | usd }}</div>
            </div>
            <div class="flex justify-between">
              <div class="font-medium text-gray-heading">Net Value:</div>
              <div>{{ result.taxes.netValue | usd }}</div>
            </div>
          </div>

          <div>
            <div class="flex justify-between">
              <div class="font-medium text-gray-heading">Base Tax:</div>
              <div>{{ result.taxes.baseTax | usd }}</div>
            </div>
            <div class="flex justify-between">
              <div class="font-medium text-gray-heading">Base Tax Rate:</div>
              <div>{{ result.taxes.rate }}</div>
            </div>

            <div class="flex justify-between">
              <div class="font-medium text-gray-heading">
                <span class="md:hidden">Mello Roos:</span>
                <span class="hidden md:inline"
                  >Mello Roos (Special Assessment):</span
                >
              </div>
              <div>{{ result.taxes.fixedCharges | usd }}</div>
            </div>
            <div
              class="flex justify-between pt-1 mt-1 border-t border-gray-200"
            >
              <div class="font-medium text-gray-heading">Total Tax:</div>
              <div>{{ result.taxes.totalTax | usd }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-3">
      <div
        class="pb-2 mb-2 font-medium text-center border-b border-gray-200 text-gray-heading"
      >
        Special Assessment Breakdown
      </div>
      <div
        v-for="fund in result.melloRoos.funds"
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
          {{ result.melloRoos.total | usd }}
        </div>
      </div>
    </div>
    <div class="mt-5 text-xs italic text-center sm:text-right">
      All information listed is public record.
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('property', {
      result: 'searchResult',
    }),
  },
};
</script>

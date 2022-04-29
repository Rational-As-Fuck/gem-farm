<template>
  <div>
    <div class="mb-2">Base rate: {{ Math.round((schedule.baseRate / 10000000) * 86400) }} tokens/NFT/day</div>
    <div class="mb-2" v-if="schedule.tier1">
      T1 reward rate:
      {{ schedule.tier1.rewardRate }} tokens/gem/s
    </div>
    <div class="mb-2" v-if="schedule.tier1">
      T1 required tenure:
      {{ schedule.tier1.requiredTenure }} sec
    </div>
    <!--tier 2-->
    <div class="mb-2" v-if="schedule.tier2">
      T2 reward rate:
      {{ schedule.tier2.rewardRate }} tokens/gem/s
    </div>
    <div class="mb-2" v-if="schedule.tier2">
      T2 required tenure:
      {{ schedule.tier2.requiredTenure }} sec
    </div>
    <!--tier 3-->
    <div class="mb-2" v-if="schedule.tier3">
      T3 reward rate:
      {{ schedule.tier3.rewardRate }} tokens/gem/s
    </div>
    <div class="mb-2" v-if="schedule.tier3">
      T3 required tenure:
      {{ schedule.tier3.requiredTenure }} sec
    </div>
    <!--
    // This isn't important to the end user.
    <div class="mb-2">
      Denominator:
      {{ schedule.denominator }}
    </div>
    -->
    <div class="mb-2">
      Please click Refresh account if you would like to update these numbers (for a small transaction fee less than 0.00001 SOL)
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    schedule: Object,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>

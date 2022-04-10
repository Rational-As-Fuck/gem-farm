<template>
  <div class="nes-container">
    <p class="title">{{ title }}</p>
    <div class="mb-2">You've earned about {{ Math.round(( reward.accruedReward / 1000000) * 100) / 100 }} $SPRING all time with this farm.</div>
    <div class="mb-2">You've claimed about {{ Math.round(( reward.paidOutReward / 1000000) * 100) / 100 }} $SPRING total.</div>
    <div v-if="parseRewardType(farmReward) === 'variable'">
      <div class="mb-2 w-full bg-black text-white">Variable reward:</div>
      <div class="mb-2">
        Last recorded accrued reward per gem:
        {{
          numeral(
            reward.variableRate.lastRecordedAccruedRewardPerRarityPoint.n / 10 ** 15
          ).format('0,0.0')
        }}
      </div>
    </div>
    <div v-else>
      <!-- 
      <div class="mb-2 w-full bg-black text-white">Fixed reward:</div>
      -->
      <div class="mb-2">
        You began staking {{ parseDate(reward.fixedRate.beginStakingTs) }}
      </div>
      <!--
      We don't want to show this because the above line is more meaningful
      "Schedule begins" is too technical for this.
      <div class="mb-2">
        Schedule begins: {{ parseDate(reward.fixedRate.beginScheduleTs) }}
      </div>
      -->
      <div class="mb-2">
        You last updated the farm: {{ parseDate(reward.fixedRate.lastUpdatedTs) }}
      </div>
      <!--
      //I don't even know what this means.  I think it's the remaining time for this
      //staking rate, but not sure.
      <div class="mb-2">
        Promised duration: {{ reward.fixedRate.promisedDuration }}
      </div>
      
      <div class="mb-2">Promised schedule:</div>
      -->
      <FixedScheduleDisplay
        :key="farmReward"
        class="ml-5"
        :schedule="reward.fixedRate.promisedSchedule"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FixedScheduleDisplay from '@/components/gem-farm/FixedScheduleDisplay.vue';
import { parseDate } from '@/common/util';
import numeral from 'numeral';

export default defineComponent({
  components: { FixedScheduleDisplay },
  props: {
    reward: Object,
    farmReward: Object,
    title: String,
  },
  setup() {
    const parseRewardType = (reward: any): string => {
      //returns "variable" or "fixed"
      return Object.keys(reward.rewardType)[0];
    };

    return {
      parseRewardType,
      parseDate,
      numeral,
    };
  },
});
</script>

<style scoped></style>

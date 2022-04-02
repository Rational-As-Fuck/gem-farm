<template>
  <div class="nes-container flex flex-wrap justify-center align-center">
    <!-- <div class="flex flex-row title pb-5 min-w-full justify-center">{{ title }}</div> -->
    <!-- <div class="flex flex-row title pb-5 min-w-full justify-end">Move Selected NFTs</div> -->
    <!-- <div class="border-2 border-imso-greena flex flex-wrap justify-center align-center"> -->
      
    <slot />
    <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 pt-8 pb-8">
      <NFTCard
        v-for="nft in nfts"
        :key="nft"
        :nft="nft"
        @selected="handleSelected"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NFTCard from '@/components/gem-bank/NFTCard.vue';

export default defineComponent({
  components: { NFTCard },
  emits: ['selected'],
  props: {
    title: String,
    nfts: Array,
  },
  setup(props, ctx) {
    const handleSelected = (e: any) => {
      ctx.emit('selected', e);
    };
    return {
      handleSelected,
    };
  },
});
</script>

<style scoped></style>

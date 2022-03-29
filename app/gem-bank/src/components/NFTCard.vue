<template>
  <div
    class="m-1 card"
    :class="{ 'card-selected': selected }"
    @click="toggleSelect"
  >
    <div class="px-6 py-10 container mx-auto">
      <div class="flex flex-wrap justify-center align-center">
      <img
        :src="nft.externalMetadata.image"
        :alt="nft.onchainMetadata.data.name"
      />
      </div>
      <div class="flex flex-wrap justify-center align-center pt-2">
            <div class="text-white text-base">{{ nft.onchainMetadata.data.name }}</div>
            <!-- <div class="text-white text-base">{{ nft.onchainMetadata.data.creators[0].address }}</div> -->
          </div>
          <div class="flex justify-center align-center pl-5 pt-2">
            <img
              class="h-8 w-8 pt-2"
              alt="IMSO logo"
              src="@/assets/token.png"
            />
            <span class="text-left pl-2 text-yellow-300 text-sm"
              >Earning 2000 OFF$PRING/Day</span
            >
          </div>
          <div class="flex flex-wrap justify-center align-center pt-5">
            <button
              class="h-8 px-4 m-0 text-sm text-white font-bold transition-colors duration-150 bg-imso-violet rounded-lg focus:shadow-outline hover:bg-imso-violet-hover"
            >
              Unstake
            </button>
          </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  props: {
    nft: { type: Object, required: true },
  },
  emits: ['selected'],
  setup(props, ctx) {
    const selected = ref<boolean>(false);

    const toggleSelect = () => {
      selected.value = !selected.value;
      console.log('selected', props.nft.mint.toBase58());
      ctx.emit('selected', {
        nft: props.nft,
        selected: selected.value,
      });
    };

    return {
      selected,
      toggleSelect,
    };
  },
});
</script>

<style scoped>
img {
  @apply object-contain;
  @apply border-double;
  @apply border-4;
  @apply border-gray-600;
  @apply rounded-lg;
}

.card {
  width: 150px;
  height: 150px;
  background-image: url("/images/NFT_card_bg.png");
  @apply bg-cover;
  @apply flex-none;
  @apply w-56 h-96;
}

.card:hover {
  @apply border-4 border-solid border-gray-200;
}

.card-selected {
  @apply border-4 border-solid;
  border-color: black !important;
}
</style>

<template>
  <div
    class="m-1 card"
    :class="{ 'card-selected': selected }"
    @click="toggleSelect"
  >
    <div class="relative px-6 py-10 container mx-auto h-full">
      <div class="nft flex flex-wrap justify-center align-center px-1">
      <img
        :src="nft.externalMetadata.image"
        :alt="nft.onchainMetadata.data.name"
      />
      </div>
      <div class="flex flex-wrap pt-2 px-2 h-10">
        <div class="text-white text-base text-left">
          {{ nft.onchainMetadata.data.name }}
        </div>
      </div>
      <div class="absolute bottom-10 flex flex-wrap h-max">
        <div>
          <div class="flex pt-2 px-2">
            <img class="h-5 w-5" alt="IMSO logo" src="@/assets/token.png" />
            <span class="text-left pl-2 text-yellow-300 text-sm"
              >Earning 2000 OFF$PRING/Day</span
            >
          </div>
          <div class="text-left pt-3 pl-8">
            <button
              class="h-8 px-4 m-0 text-sm text-white font-bold transition-colors duration-150 bg-imso-violet rounded-lg focus:shadow-outline hover:bg-imso-violet-hover"
            >
              Unstake
            </button>
          </div>
        </div>
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
.nft img {
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
  @apply border-2 border-solid border-gray-200;
}

.card-selected[data-v-6e7b8447] {
    border-style: solid;
    border-width: 2px;
    border-color: white !important;
}

</style>



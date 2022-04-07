<template>
  <div
    class="m-1 card"
    :class="{ 'card-selected': selected }"
    @click="toggleSelect"
  >
    <div class="relative pl-4 pr-6 lg:px-6 pt-5 lg:pt-10 pb-3 container mx-auto h-full">
      <div class="nft flex flex-wrap justify-center align-center px-1">
      <img
        :src="nft.externalMetadata.image"
        :alt="nft.onchainMetadata.data.name"
      />
      </div>
      <div class="flex flex-wrap pt-2 px-2 h-10">
        <div class="text-white text-xs lg:text-base text-left">
          {{ nft.onchainMetadata.data.name }}
        </div>
      </div>
      <div v-if="title == 'Your vault'" class="absolute bottom-6 lg:bottom-10 flex flex-wrap h-max">
        <div>
          <div class="flex pt-2 pr-3 lg:px-2">
            <img class="invisible lg:visible h-5 w-5" alt="IMSO logo" src="@/assets/token.png" />
            <span class="text-left pl-0 lg:pl-2 text-yellow-300 text-xs lg:text-sm"
              >{{ colRewards }}</span
            >
          </div>
          <!-- <div class="text-left pt-3 pl-5 lg:pl-8">
            <button
              class="h-8 px-4 m-0 text-sm text-white font-bold transition-colors duration-150 bg-imso-violet rounded-lg focus:shadow-outline hover:bg-imso-violet-hover"
            >
              Stake
            </button>
          </div> -->
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
    title: String
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
  methods: {
    changeRoute(e: any) {
      if (e.target.value == '9PJD3XVpq7fySsQKAMZEb97272U16GCngGqXRuYiktN4') {
        this.$router.push("/clones");
      } else if (e.target.value == 'GffFVEQHbuyvMZgZLAWYeqvDcTej8F3PzA4A2kFbqnMs') {
        this.$router.push("/uniques");
      } else if (e.target.value == '3owWkikZXpWGdmhQf3xhaYf8GMPRr2b9EjSmXQFZ2Vp4') {
        this.$router.push("/chimps");
      };
    }
  },
  computed: {
    colRewards() {
      if (this.$route.path == "/chimps") {
        return "Earning 800 OFF$PRING/Day"
      } else if (this.$route.path == "/clones") {
        return "Earning 1200 OFF$PRING/Day"
      } else if (this.$route.path == "/uniques") {
        return "Earning 2000 OFF$PRING/Day"
      }
    },
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
  background-image: url("/images/NFT_card_bg.png");
  @apply bg-cover;
  @apply flex-none;
  @apply w-56 h-96;
}

.card:hover {
  @apply border-2 border-solid border-gray-200;
}

.card-selected {
    border-style: solid;
    border-width: 2px;
    border-color: white !important;
}

@media screen and (max-width:1024px){
  .card{
    @apply w-40 h-64;
    }
}

@media screen and (min-width:1025px){
  .card{
    @apply w-56 h-96;
    }
}

</style>



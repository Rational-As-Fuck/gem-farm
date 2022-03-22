<script setup>
import TheStakeMeter from "@/components/TheStakeMeter.vue";
</script>

<template>
  <div class="home">
    <div>
      <p class="colheading capitalize">{{ $route.params.col }}</p>
    </div>
    <TheStakeMeter />
    <nav class="nested-routes">
      <router-link :to="{ name: 'staked', params: { id: $route.params.col } }"
        >Staked (8)</router-link
      >
      <router-link :to="{ name: 'unstaked', params: { id: $route.params.col } }"
        >Unstaked (0)</router-link
      >
    </nav>
  </div>
  <div v-if="colPage" class="flex flex-wrap justify-center align-center pt-12">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-x-4 gap-y-4">
      <div
        class="bg-[url('/src/assets/NFT_card_bg.png')] no-repeat bg-cover flex-none w-56 h-96"
      >
        <div class="px-6 py-10 container mx-auto">
          <p>Click above to see your staked or unstaked NFTs</p>
          <br />
          <p>or click <a href="#">HERE</a> to start a new farm</p>
        </div>
      </div>
    </div>
  </div>
  <router-view />
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.colheading {
    font-family: "Goldman Bold", sans-serif;
    @apply text-4xl;
}
</style>

<script>
export default {
  computed: {
    colPage() {
        if (
            this.$route.path == "/clones" ||
            this.$route.path == "/uniques" ||
            this.$route.path == "/chimps"
        ) {
            return true;
        } else {
            return false;
        }
    },
  },
};
</script>

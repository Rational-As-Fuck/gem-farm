<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import TheAppHeader from "@/components/gem-farm/TheAppHeader.vue";
import TheTitle from "@/components/gem-farm/TheTitle.vue";
// import TheStakeMeter from "@/components/gem-farm/TheStakeMeter.vue";
// import TheCollectionSelect from "@/components/gem-farm/TheCollectionSelect.vue";
</script>

<template>
  <div id="background" :class="$route.params.col">
      <TheAppHeader />
      <TheTitle />
      <div>
        <p class="colheading capitalize">{{ $route.params.col }}</p>
      </div>
      <!-- <TheStakeMeter /> -->
      <div>
        <router-view />
      </div>
</div>
</template>

<style>
#app {
  background-image: url("/images/bg.jpg");
  background-size: cover;
  min-height: 100vh;
  /* background-repeat: repeat-y; */
  font-family: "Exo 2", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  cursor: auto;
}

a {
  cursor:pointer;
}

#background {
  padding-bottom: 80px;
  background-size: cover;
  min-height: 100vh;
}

div.chimps {
  background-image: url("assets/staking_bg_chimps_2.jpg");
}

div.clones {
  background-image: url("assets/staking_bg_clones_2.jpg");
}

div.uniques {
  background-image: url("assets/staking_bg_uniques_2.jpg");
}

* {
  font-family: 'Exo 2', sans-serif;
}
input[type='radio']:checked + span {
  @apply text-black;
}

.colheading {
  font-family: "Goldman", sans-serif;
  @apply text-4xl;
}

</style>
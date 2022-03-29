<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import TheAppHeader from "@/components/TheAppHeader.vue";
import TheTitle from "@/components/TheTitle.vue";
</script>

<template>
  <div id="background" :class="$route.params.col">
    <!-- <TheNavBar /> -->
    <TheAppHeader />
    <TheTitle />
    <div class="p-10">
      <router-view />
    </div>
  </div>
</template>

<style>
#app {
  background-image: url("/images/bg.jpg");
  background-size: cover;
  min-height: 100vh;
  font-family: "Exo 2", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  padding-bottom: 80px;
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
</style>


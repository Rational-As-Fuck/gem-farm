<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import TheAppHeader from "@/components/gem-farm/TheAppHeader.vue";
import TheTitle from "@/components/gem-farm/TheTitle.vue";
</script>

<template>
  <div id="background" :class="$route.params.col">
      <TheAppHeader />
      <TheTitle />
    <div>
      <router-view />
    </div>
</div>
</template>

<style>
#app {
  background-image: url("/images/Moondusa_bg.jpeg");
  background-size: cover;
  min-height: 100vh;
  /* background-repeat: repeat-y; */
  font-family: 'polaris', "Exo 2", sans-serif;
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

@font-face {
  font-family: polaris;
  src: url('~@/assets/fonts/Polaris.otf');
}

div.appheader {
  color: #fab612;
  fill: #fab612;
  font-family: "polaris, Judson, sans-serif";
  font-size: 20px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .4px;
  padding-left: 13px;
  padding-right: 13px;
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
  font-family: 'polaris', 'Exo 2', sans-serif;
}
input[type='radio']:checked + span {
  @apply text-black;
}

.colheading {
  font-family: 'polaris', "Goldman", sans-serif;
  @apply text-4xl;
}

</style>
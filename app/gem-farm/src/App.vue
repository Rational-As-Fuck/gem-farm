<template>
  <div id="background" :class="$route.params.col">
    <div class="relative h-full min-h-screen">
      <TheAppHeader />
      <TheNavBar />
      <TheTitle />
      
      <div class="p-10">
        <router-view />
      </div>

      <div class="pt-10"></div>
      <TheCat />
      <TheFooter />
    </div>
</div>
</template>

<script lang="ts">
import TheNavBar from '@/components/TheNavBar';
import TheFooter from '@/components/gem-farm/TheFooter';
import TheCat from '@/components/gem-farm/TheCat';
import TheAppHeader from '@/components/gem-farm/TheAppHeader';
import TheTitle from '@/components/gem-farm/TheTitle';
export default {
  components: { TheCat, TheFooter, TheNavBar, TheAppHeader, TheTitle },
};
</script>

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
<template>
  <div class="relative h-full min-h-screen">
    <TheNavBar />
    <div class="pt-10 px-10 flex justify-center align-middle">
      <p class="text-4xl pt-3 px-1 mt-1 text-black underline">GEM</p>
      <img :width="50" :height="50" src="./assets/400x600.gif" />
      <p class="text-4xl pt-3 px-2 mt-1 text-black underline">FARM</p>
    </div>
    <div class="italic mt-5 text-center">by Gemworks</div>

    <div class="p-10">
      <router-view />
    </div>

    <div class="pt-10"></div>
    <TheCat />
    <TheFooter />
  </div>
</template>

<script>
import TheNavBar from '@/components/TheNavBar';
import TheFooter from '@/components/gem-farm/TheFooter';
import TheCat from '@/components/gem-farm/TheCat';
export default {
  components: { TheCat, TheFooter, TheNavBar },
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


* {
  font-family: 'Exo 2', sans-serif;
}
input[type='radio']:checked + span {
  @apply text-black;
}
</style>

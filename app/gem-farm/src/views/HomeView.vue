<template>
  <div class="flex flex-wrap justify-center align-center pt-2">
    <div
        class="flex-none w-6/12 max-w-5xl h-1 mt-6 mb-2 bg-imso-bg-gray rounded-md"
    ></div>
  </div>
  <div class="home object-fill pt-12">
    <HelloWorld msg="Welcome to the IMSO NFT Staking Hub" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/TheLanding.vue";

export default {
    name: "HomeView",
    components: {
        HelloWorld,
    },
};
</script>
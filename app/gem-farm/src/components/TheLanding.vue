<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p class="text-xs md:text-base pt-3 px-1 mt-1 pb-3 text-white">
      Please connect your wallet above.<br />
      Select the collection you would like to begin staking.<br />
    </p>
    <!-- <div class="flex items-center h-full">
      <nav class="main-routes">
        <router-link to="/clones">Overlord Clones</router-link>
        <router-link to="/uniques">Unique Overlords</router-link>
        <router-link to="/chimps">Chimps</router-link>
      </nav>
    </div> -->
    <div class="flex flex-wrap justify-center align-center pt-12">
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4"
      >
        <div
          class="bg-[url('/src/assets/NFT_card_bg.png')] no-repeat bg-cover flex-none w-56 h-96"
        >
          <div class="px-6 py-10 container mx-auto">
            <div class="flex flex-wrap justify-center align-center">
              <img
                class="object-contain border-double border-4 border-gray-600 rounded-lg"
                alt="Arweave Image"
                src="@/assets/clone_blue.jpeg"
              />
            </div>
            <div class="flex flex-wrap justify-center align-center pt-2">
              <div class="flex items-center h-full">
                <nav class="landing-routes">
                  <router-link to="/clones">Overlord Clones</router-link>
                </nav>
              </div>
              <div>
                <div class="flex items-center h-full pt-5">
                  1200 $SPRING / day
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="bg-[url('/src/assets/NFT_card_bg.png')] no-repeat bg-cover flex-none w-56 h-96"
        >
          <div class="px-6 py-10 container mx-auto">
            <div class="flex flex-wrap justify-center align-center">
              <img
                class="object-contain border-double border-4 border-gray-600 rounded-lg"
                alt="Arweave Image"
                src="@/assets/elon_Web2.jpeg"
              />
            </div>
            <div class="flex flex-wrap justify-center align-center pt-2">
              <div class="flex items-center h-full">
                <nav class="flex landing-routes">
                  <router-link to="/uniques">Unique Overlords</router-link>
                </nav>
              </div>
              <div>
                <div class="flex items-center h-full pt-5">
                  2000 $SPRING / day
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="bg-[url('/src/assets/NFT_card_bg.png')] no-repeat bg-cover flex-none w-56 h-96"
        >
          <div class="px-6 py-10 container mx-auto">
            <div class="flex flex-wrap justify-center align-center">
              <img
                class="object-contain border-double border-4 border-gray-600 rounded-lg"
                alt="Arweave Image"
                src="@/assets/chimp.png"
              />
            </div>
            <div class="flex flex-wrap justify-center align-center pt-2">
              <div class="flex items-center h-full">
                <nav class="landing-routes">
                  <router-link to="/chimps">Chimps</router-link>
                </nav>
              </div>
              <div>
                <div class="flex items-center h-full pt-5">
                  400 $SPRING / day
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheLanding",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

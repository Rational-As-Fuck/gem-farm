<template>
  <header>
    <div
      class="w-full bg-gray-800 text-white py-4 px-0 md:px-8 shadow-md dark:shadow-md sm:flex items-center border-b border-gray-400/50"
    >
      <div class="items-center h-full hidden sm:flex">
        <a href="https://imsonft.art/" target="_blank">
          <img
            class="object-contain w-28"
            alt="IMSO NFT logo"
            src="@/assets/IMSOnft_art_header_symb.png"
          />
        </a>
      </div>
      <div class="ml-auto flex items-center h-full">
        <nav class="main-routes">
          <router-link class="text-sm md:text-base" to="/clones"
            >Overlord Clones</router-link
          >
          <router-link class="text-sm md:text-base" to="/uniques"
            >Unique Overlords</router-link
          >
          <router-link class="text-sm md:text-base" to="/chimps"
            >Chimps</router-link
          >
        </nav>
      </div>
      <div class="ml-auto items-center h-full hidden sm:flex">
        <a href="https://discord.gg/4gRMm6mgHZ" target="_blank">
          <img
            class="w-4 md:w-7 m-1 md:m-2"
            alt="Discord logo"
            src="@/assets/discord.svg"
          />
        </a>
        <a href="https://twitter.com/ImSoNFTart" target="_blank">
          <img
            class="w-4 md:w-6 m-1 md:m-2"
            alt="Twitter logo"
            src="@/assets/twitter.svg"
          />
        </a>
        <a
          href="https://magiceden.io/marketplace/intergalactic_monkey_space_odyssey"
          target="_blank"
        >
          <img
            class="w-4 md:w-7 m-1 md:m-2"
            alt="Magic Edenlogo"
            src="@/assets/ME_logo.png"
          />
        </a>
      </div>
    </div>
  </header>
</template>

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
</style>

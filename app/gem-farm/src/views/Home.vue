<template>
  <div class="hello">
    <p class="font-bold text-lg">Welcome to the Moondusa NFT Staking Hub</p>
    <p class="text-xs md:text-base pt-3 px-1 mt-1 pb-3 text-white">
      Select the collection you would like to begin staking.<br />
    </p>
    <div class="flex flex-wrap justify-center align-center pt-12">
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4"
      >
        <div class="plain-card no-repeat bg-cover flex-none w-56 h-96">
          <div class="container mx-auto">
            <div class="flex flex-wrap justify-center align-center">
              <router-link to="/moondusa">
                <img
                  class="object-contain border-double border-4 border-gray-600 rounded-lg"
                  alt="Arweave Image"
                  src="@/assets/moondusa_r2.jpg"
                />
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<template>
  <div class="hello">
    <p class="font-bold text-lg">Welcome to the IMSO NFT Staking Hub</p>
    <p class="text-xs md:text-base pt-3 px-1 mt-1 pb-3 text-white">
      Please connect your wallet above.<br />
      Select the collection you would like to begin staking.<br />
    </p>
    <div class="flex flex-wrap justify-center align-center pt-12">
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4"
      >
        <div class="plain-card no-repeat bg-cover flex-none w-56 h-96">
          <div class="container mx-auto">
            <div class="flex flex-wrap justify-center align-center">
              <img
                class="object-contain border-double border-4 border-gray-600 rounded-lg"
                alt="Arweave Image"
                src="@/assets/clone_r2.jpg"
              />
            </div>
            <div class="flex flex-wrap justify-center align-center pt-2">
              <div class="flex items-center h-full">
                <nav class="landing-routes">
                  <router-link to="/clones">Meta Overlord Clones</router-link>
                </nav>
              </div>
              <div>
                <div class="items-center h-full pt-5">
                  <p>Staking Reward</p>
                  <P class="text-imso-yellow">1200 $SPRING per day</P>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="plain-card no-repeat bg-cover flex-none w-56 h-96">
          <div class="container mx-auto">
            <div class="flex flex-wrap justify-center align-center">
              <img
                class="object-contain border-double border-4 border-gray-600 rounded-lg"
                alt="Arweave Image"
                src="@/assets/elon_r2.jpeg"
              />
            </div>
            <div class="flex flex-wrap justify-center align-center pt-2">
              <div class="flex items-center h-full">
                <nav class="flex landing-routes">
                  <router-link to="/uniques">Unique Meta Overlords</router-link>
                </nav>
              </div>
              <div>
                <div class="items-center h-full pt-5">
                  <p>Staking Reward</p>
                  <P class="text-imso-yellow">2000 $SPRING per day</P>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="plain-card no-repeat bg-cover flex-none w-56 h-96">
          <div class="container mx-auto">
            <div class="flex flex-wrap justify-center align-center">
              <img
                class="object-contain border-double border-4 border-gray-600 rounded-lg"
                alt="Arweave Image"
                src="@/assets/metachimp_r2.jpg"
              />
            </div>
            <div class="flex flex-wrap justify-center align-center pt-2">
              <div class="flex items-center h-full">
                <nav class="landing-routes">
                  <router-link to="/chimps">Meta Chimp Champions</router-link>
                </nav>
              </div>
              <div>
                <div class="items-center h-full pt-5">
                  <p>Staking Reward</p>
                  <P class="line-through">400 $SPRING per day</P>
                  <P class="text-imso-yellow">800 $SPRING per day</P>
                  <P class="text-imso-yellow">until May 9th 2022</P>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

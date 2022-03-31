<template>
  <div class="flex flex-wrap justify-center align-center pb-12 pt-8">
    <div class="flex-initial w-48 sm:w-72 md:w-72 lg:w-96 h-auto pr-7">
      <a href="/">
        <img alt="IMSO logo" src="@/assets/IMSO_StakHub_logo.png" />
      </a>
    </div>
    <div
      class="invisible md:visible flex-none border-l border-l-white/50 mt-12 md:mt-20 lg:mt-28"
    ></div>
    <div class="relative flex-initial mt-12 md:mt-20 lg:mt-28 pl-7">
      <div
        class="text-xs sm:text-xs md:text-xs lg:text-sm text-white text-left pb-3"
      >
        <p class="mb-2.5">
          Stake your IMSO NFTs for OFFSPRING Token.<br />
          You may claim your $OFS at any time.
        </p>
        <p>
          Chimp NFT staking rewards: 400 OFS/ day <br />
          Clone NFTs staking rewards: 1200 OFS/ day <br />
          Unique Overlord NFT staking rewards: 2000 OFS / day
        </p>
      </div>
      <div
        class="absolute bottom-0 flex flex-row whitespace-nowrap"
      >
        <div class="basis-1/2 flex-initial">
          <button class="swv-button claim-button-trigger">Claim Rewards</button>
        </div>
      </div>
    </div>
  </div>
</template>


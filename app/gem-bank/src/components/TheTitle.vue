<template>
  <div class="flex flex-wrap justify-center align-center pb-12 pt-8">
    <div class="flex-initial w-48 sm:w-72 md:w-72 lg:w-96 h-auto pr-7">
      <a href="/">
        <img alt="Moondusa logo" src="@/assets/Moondusa_StakHub_logo.png" />
      </a>
    </div>
    <div
      class="invisible md:visible flex-none vl mt-12 md:mt-20 lg:mt-28"
    ></div>
    <div class="flex-initial mt-12 md:mt-20 lg:mt-28 pl-7">
      <div
        class="text-xs sm:text-xs md:text-xs lg:text-sm text-white text-left pb-3"
      >
        <p class="mb-2.5">
          Stake your Moondusa NFTs for MOONEY Token.<br />
          You may claim your $MONY at any time.
        </p>
        <p>
          Moondusa NFT staking rewards: 69 $MONY/ day <br />
        </p>
      </div>
      <div
        class="flex flex-row whitespace-nowrap"
      >
        <div class="basis-1/2 flex-initial pr-2.5">
          <wallet-multi-button></wallet-multi-button>
        </div>
        <div class="basis-1/2 flex-initial">
          <button class="swv-button claim-button-trigger">Claim Rewards</button>
        </div>
      </div>
    </div>
  </div>
</template>

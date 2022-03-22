<script setup>
import { WalletMultiButton } from "solana-wallets-vue";
</script>

<template>
  <div class="flex flex-wrap justify-center align-center py-12">
    <div class="flex-none w-64 h-48 pr-7">
      <a href="/">
        <img alt="IMSO logo" src="@/assets/IMSO_StakHub_logo.png" />
      </a>
    </div>
    <div class="flex-none w-7 border-l-2 invisible sm:visible"></div>
    <div class="flex-none">
      <p class="text-xs md:text-base pt-3 px-1 mt-1 pb-3 text-white text-left">
        Stake your IMSO NFTs for Off$PRING Token.<br />
        You may claim your $SPRING at any time. <br />
        Current Overlord Unique staking rewards: 2000 $SPRING / day <br />
        Current Overlord Clone staking rewards: 1200 $SPRING / day <br />
        Current Chimp staking rewards: 400 $SPRING / day
      </p>
      <div class="flex flex-wrap">
        <wallet-multi-button></wallet-multi-button>
        <div class="pl-8">
          <button class="swv-button swv-button-trigger">Claim Rewards</button>
        </div>
      </div>
    </div>
  </div>
</template>

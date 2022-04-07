<template>
  <div class="flex flex-row justify-end p-5">
      <select class="wallet-button wallet-button-trigger" required id="wallet" v-model="chosenWallet">
        <option class="text-gray-500" :value="null">Connect Wallet</option>
        <option :value="WalletName.Phantom">Phantom</option>
        <option :value="WalletName.Sollet">Sollet</option>
        <option :value="WalletName.SolletExtension">Sollet Extension</option>
        <option :value="WalletName.Solflare">Solflare</option>
        <option :value="WalletName.SolflareWeb">Solflare Web</option>
      </select>
  </div>
  <div class="flex flex-wrap justify-center align-center pb-12 pt-2">
    <div class="flex-initial w-48 sm:w-72 md:w-72 lg:w-96 h-auto pr-7">
      <a href="/farmer">
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
          You may claim your $SPRING at any time.
        </p>
        <p>
          Unique Overlord NFT staking rewards: 2000 $SPRING / day<br />
          Clone NFTs staking rewards: 1200 $SPRING / day <br />
          Chimp NFT staking rewards: <br />
          <span class="line-through">400 $SPRING / day</span>
          <span class="text-ims">   800 $SPRING / day*</span>
          <p class="text-imso-yellow relative md:absolute bottom-0 flex flex-row whitespace-nowrap">*until May 9th 2022</p>
        </p>
      </div>
      <!-- <div
        class="relative md:absolute bottom-0 flex flex-row whitespace-nowrap"
      >
        <div class="flex-1">
          <select class="wallet-button wallet-button-trigger" required id="wallet" v-model="chosenWallet">
            <option class="text-gray-500" :value="null">Choose wallet</option>
            <option :value="WalletName.Phantom">Phantom</option>
            <option :value="WalletName.Sollet">Sollet</option>
            <option :value="WalletName.SolletExtension">Sollet Extension</option>
            <option :value="WalletName.Solflare">Solflare</option>
            <option :value="WalletName.SolflareWeb">Solflare Web</option>
          </select>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { WalletName } from '@solana/wallet-adapter-wallets';
import useCluster, { Cluster } from '@/composables/cluster';
import useWallet from '@/composables/wallet';

export default defineComponent({
  setup() {
    // cluster
    const { cluster, setCluster, getClusterURL } = useCluster();
    const chosenCluster = computed({
      get() {
        return cluster.value;
      },
      set(newVal: Cluster) {
        setCluster(newVal);
      },
    });

    // wallet
    const { getWalletName, setWallet } = useWallet();
    const chosenWallet = computed({
      get() {
        return getWalletName();
      },
      set(newVal: WalletName | null) {
        setWallet(newVal, getClusterURL());
      },
    });

    return {
      Cluster,
      chosenCluster,
      WalletName,
      chosenWallet,
    };
  },
});
</script>

<style scoped></style>


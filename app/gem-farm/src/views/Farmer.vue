<template>
  <!-- <div v-if="!wallet" class="text-blue-400 text-center">Pls connect (burner) wallet</div> -->
  <div>
    <div class="grid grid-cols-5">
      <div/><div/>
      <div class="with-title mb-10">
        <div class="text-blue-400">Choose a staking farm</div>
        <select v-model="farm">
          <option v-for="option in options" :value="option.value">
            {{ option.text }} 
          </option>
        </select>     
      </div>

      <div class="with-title mb-10">
        <div class="text-blue-400">Choose your wallet</div>
        <select required id="wallet" v-model="chosenWallet">
          <option class="text-gray-500" :value="null">Choose wallet..</option>
          <option :value="WalletName.Phantom">Phantom</option>
          <option :value="WalletName.Sollet">Sollet</option>
          <option :value="WalletName.SolletExtension">Sollet Extension</option>
          <option :value="WalletName.Solflare">Solflare</option>
          <option :value="WalletName.SolflareWeb">Solflare Web</option>
        </select>
      </div>
    </div>
    <div v-if="farmerAcc">
      <FarmerDisplay
        :key="farmerAcc"
        :farm="farm"
        :farmAcc="farmAcc"
        :farmer="farmer"
        :farmerAcc="farmerAcc"
        class="mb-10"
        @refresh-farmer="handleRefreshFarmer"
      />
      <Vault
        :key="farmerAcc"
        class="mb-10"
        :vault="farmerAcc.vault.toBase58()"
        @selected-wallet-nft="handleNewSelectedNFT"
      >

        <button
          v-if="farmerState === 'staked' && selectedNFTs.length > 0"
          class="nes-btn is-primary mr-5"
          @click="addGems"
        >
          Add NFT (resets staking)
        </button>
        <button
          v-if="farmerState === 'unstaked'"
          class="nes-btn is-success mr-5"
          @click="beginStaking"
        >
          Begin staking
        </button>
        <button
          v-if="farmerState === 'staked'"
          class="nes-btn is-error mr-5"
          @click="endStaking"
        >
          End staking
        </button>
        <button
          v-if="farmerState === 'pendingCooldown'"
          class="nes-btn is-error mr-5"
          @click="endStaking"
        >
          End cooldown
        </button>
        <button class="nes-btn is-warning" @click="claim">
          Claim {{ availableA }}
        </button>
        <button
          class="nes-btn mr-5"
          @click="refreshNetwork"
        >
          Refresh Metadata
        </button>
      </Vault>
    </div>
    <div v-else>
      <div class="w-full text-center mb-5">
        Farmer account not found :( Create a new one?
      </div>
      <div class="w-full text-center">
        <button class="nes-btn is-primary" @click="initFarmer">
          New Farmer
        </button>
      </div>
    </div>
  </div>
 <!-- <ConfigPane /> -->
</template>

<script lang="ts">
import {computed, defineComponent, nextTick, onMounted, ref, watch } from 'vue';
import { WalletName } from '@solana/wallet-adapter-wallets';
import useWallet from '@/composables/wallet';
import useCluster, { Cluster }  from '@/composables/cluster';
import { initGemFarm } from '@/common/gem-farm';
import { PublicKey } from '@solana/web3.js';
import ConfigPane from '@/components/ConfigPane.vue';
import FarmerDisplay from '@/components/gem-farm/FarmerDisplay.vue';
import Vault from '@/components/gem-bank/Vault.vue';
import { INFT } from '@/common/web3/NFTget';
import { findFarmerPDA, stringifyPKsAndBNs } from '@gemworks/gem-farm-ts';

export default defineComponent({
  components: { Vault, FarmerDisplay, ConfigPane },
  setup() {
    const { wallet, getWallet } = useWallet();
    const { cluster, getConnection, setCluster, getClusterURL } = useCluster();

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


    let gf: any;
    watch([wallet, cluster], async () => {
      await freshStart();
    });

    //needed in case we switch in from another window
    onMounted(async () => {
      await freshStart();
    });

    // --------------------------------------- farmer details
    const farm = ref<string>();
    const farmAcc = ref<any>();

    const farmerIdentity = ref<string>();
    const farmerAcc = ref<any>();
    const farmerState = ref<string>();

    const availableA = ref<string>();
    const availableB = ref<string>();

    //auto loading for when farm changes
    watch(farm, async () => {
      await freshStart();
    });

    const updateAvailableRewards = async () => {
      availableA.value = farmerAcc.value.rewardA.accruedReward
        .sub(farmerAcc.value.rewardA.paidOutReward)
        .toString();
      availableB.value = farmerAcc.value.rewardB.accruedReward
        .sub(farmerAcc.value.rewardB.paidOutReward)
        .toString();
    };

    const fetchFarn = async () => {
      farmAcc.value = await gf.fetchFarmAcc(new PublicKey(farm.value!));
      console.log(
        `farm found at ${farm.value}:`,
        stringifyPKsAndBNs(farmAcc.value)
      );
    };

    const fetchFarmer = async () => {
      const [farmerPDA] = await findFarmerPDA(
        new PublicKey(farm.value!),
        getWallet()!.publicKey!
      );
      farmerIdentity.value = getWallet()!.publicKey?.toBase58();
      farmerAcc.value = await gf.fetchFarmerAcc(farmerPDA);
      farmerState.value = gf.parseFarmerState(farmerAcc.value);
      await updateAvailableRewards();
      console.log(
        `farmer found at ${farmerIdentity.value}:`,
        stringifyPKsAndBNs(farmerAcc.value)
      );
    };

    const freshStart = async () => {
      if (getWallet() && getConnection()) {
        gf = await initGemFarm(getConnection(), getWallet()!);
        farmerIdentity.value = getWallet()!.publicKey?.toBase58();

        //reset stuff
        farmAcc.value = undefined;
        farmerAcc.value = undefined;
        farmerState.value = undefined;
        availableA.value = undefined;
        availableB.value = undefined;

        try {
          await fetchFarn();
          await fetchFarmer();
        } catch (e) {
          console.log(`farm with PK ${farm.value} not found :(`);
        }
      }
    };

    const initFarmer = async () => {
      await gf.initFarmerWallet(new PublicKey(farm.value!));
      await fetchFarmer();
    };
    // --------------------------------------- refreshNetwork
    const refreshNetwork = async () => {
      setTimeout(setCluster, 500, Cluster.Devnet);
      setTimeout(setCluster, 500, Cluster.Mainnet);
    };


    // --------------------------------------- staking
    const beginStaking = async () => {
      await gf.stakeWallet(new PublicKey(farm.value!));
      await fetchFarmer();
      selectedNFTs.value = [];
    };

    const endStaking = async () => {
      await gf.unstakeWallet(new PublicKey(farm.value!));
      await fetchFarmer();
      selectedNFTs.value = [];
    };

    const claim = async () => {
      await gf.claimWallet(
        new PublicKey(farm.value!),
        new PublicKey(farmAcc.value.rewardA.rewardMint!),
        new PublicKey(farmAcc.value.rewardB.rewardMint!)
      );
      await fetchFarmer();
    };

    const handleRefreshFarmer = async () => {
      await fetchFarmer();
    };

    // --------------------------------------- adding extra gem
    const selectedNFTs = ref<INFT[]>([]);

    const handleNewSelectedNFT = (newSelectedNFTs: INFT[]) => {
      console.log(`selected ${newSelectedNFTs.length} NFTs`);
      selectedNFTs.value = newSelectedNFTs;
    };

    const addSingleGem = async (
      gemMint: PublicKey,
      gemSource: PublicKey,
      creator: PublicKey
    ) => {
      await gf.flashDepositWallet(
        new PublicKey(farm.value!),
        '1',
        gemMint,
        gemSource,
        creator
      );
      await fetchFarmer();
    };

    const addGems = async () => {
      await Promise.all(
        selectedNFTs.value.map((nft) => {
          const creator = new PublicKey(
            //todo currently simply taking the 1st creator
            (nft.onchainMetadata as any).data.creators[0].address
          );
          console.log('creator is', creator.toBase58());

          addSingleGem(nft.mint, nft.pubkey!, creator);
        })
      );
      console.log(
        `added another ${selectedNFTs.value.length} gems into staking vault`
      );
    };

    return {
      options: [
        {text: 'Overlord Clone', value: '9PJD3XVpq7fySsQKAMZEb97272U16GCngGqXRuYiktN4'},
        {text: 'Overlord Uniques', value: 'GffFVEQHbuyvMZgZLAWYeqvDcTej8F3PzA4A2kFbqnMs'}
      ],
      wallet,
      farm,
      farmAcc,
      farmer: farmerIdentity,
      farmerAcc,
      farmerState,
      availableA,
      availableB,
      initFarmer,
      beginStaking,
      endStaking,
      refreshNetwork,
      claim,
      handleRefreshFarmer,
      selectedNFTs,
      handleNewSelectedNFT,
      addGems,
      WalletName,
      chosenWallet,
    };
  },
});
</script>

<style scoped></style>

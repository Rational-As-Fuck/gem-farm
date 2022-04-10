<template>
  <div v-if="!wallet" class="text-sm md:text-base text-center">
    <p class="font-bold text-lg">Welcome to the Moondusa Staking Hub</p>
    <p>Please click on Connect Wallet above to connect your Solana wallet.</p>
    <p>Make sure this wallet is set to the same account that contains your Moondusa NFTs.</p>
    <p>You will also need a small amout of Solana in that wallet for gas to interact with the staking farms</p>
    <CollectionCards />
  </div>
  <div v-else>
    <!--farm address-->
    <!-- <div class="nes-container with-title mb-10">
      <p class="title">Connect to a Farm</p>
      <div class="nes-field mb-5">
        <label for="farm">Farm address:</label>
        <input id="farm" class="nes-input" v-model="farm" />
      </div>
    </div> -->
    <!--
    <div class="max-w-3xl flex flex-nowrap pl-5 pr-5 m-auto pt-2">
      <div class="flex-none w-full h-2 mt-6 mb-2 bg-imso-bg-gray rounded-md">
        <div class="bg-imso-bg-blue h-2 rounded-md" style="width: {{getStakedAmount(farmAcc.gemsStaked, $route.path)}}%"></div>
      </div>
    </div>
    -->
    <div v-if="farmAcc" class="flex flex-wrap justify-center align-center pb-5">
      <p class="text-lg text-imso-blue">Total Staked {{farmAcc.gemsStaked}} ({{getStakedAmount(farmAcc.gemsStaked, $route.path)}}%)</p>
    </div>
    <div v-if="farm">
      <div>
        <p class="colheading capitalize">{{ $route.params.col }}</p>
      </div>
    </div>
    <div class="m-auto">
      <p class="text-xs md:text-sm">Please choose the farm you would like to manage</p>
      <p class="text-xs md:text-sm">If your seelcted farm does not yet exist for your connected wallet, you can create a new one</p>
      <div class="with-title mb-10 mt-3">
        <select id="colsel" class="mx-auto swv-button farm-button-trigger" v-model="farm" v-on:change="changeRoute($event)">
          <option selected disabled value="">Select Farm</option>
          <option v-for="option in options" :value="option.value">
            {{ option.text }} 
          </option>
        </select>
      </div>
    </div>
    <div v-if="!farm">
      <CollectionCards />
    </div>

    <div v-if="farmerAcc">
      <button class="farm-button farm-button-trigger mb-7" @click="isHidden = !isHidden">Show/Hide farm Details</button>
      <div v-if="!isHidden">
        <FarmerDisplay
          :key="farmerAcc"
          :farm="farm"
          :farmAcc="farmAcc"
          :farmer="farmer"
          :farmerAcc="farmerAcc"
          class="mb-10"
          @refresh-farmer="handleRefreshFarmer"
        />
      </div>
      <Vault
        :key="farmerAcc"
        :vault="farmerAcc.vault.toBase58()"
        @selected-wallet-nft="handleNewSelectedNFT"
      >
        <button
          v-if="farmerState === 'staked' && selectedNFTs.length > 0"
          class="stake-button-trigger stake-btn is-primary mr-5"
          @click="addGems"
        >
          Add Gems (resets staking)
        </button>
        <button
          v-if="farmerState === 'unstaked'"
          class="stake-button-trigger stake-btn is-success mr-5"
          @click="beginStaking"
        >
          Begin staking
        </button>
        <button
          v-if="farmerState === 'staked'"
          class="stake-button-trigger stake-btn is-error mr-5"
          @click="endStaking"
        >
          End staking
        </button>
        <button
          v-if="farmerState === 'pendingCooldown'"
          class="stake-button-trigger stake-btn is-error mr-5"
          @click="endStaking"
        >
          End cooldown
        </button>
        <button class="stake-button-trigger stake-btn is-warning" @click="claim">
          Claim {{ availableA != 0 ? availableA : '' }}
        </button>
      </Vault>
    </div>

    <div v-else class="flex flex-wrap justify-center align-center pt-12">
      <div v-if="farm" class="flex">
        <div class="plain-card no-repeat bg-cover flex-none">
          <div class="container mx-auto">
            <p class="text-xs md:text-base">Farmer account not found for the <strong>{{ $route.params.col }} collection</strong></p>
          </div>
          <div class="container mx-auto">
            <button class="farm-button farm-button-trigger" @click="initFarmer">
              START A NEW FARM
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { RouterLink, RouterView } from "vue-router";
import {useRoute} from "vue-router";
import { defineComponent, nextTick, onMounted, ref, watch, computed } from 'vue';
import useWallet from '@/composables/wallet';
import useCluster from '@/composables/cluster';
import { initGemFarm } from '@/common/gem-farm';
import { PublicKey } from '@solana/web3.js';
import ConfigPane from '@/components/ConfigPane.vue';
import FarmerDisplay from '@/components/gem-farm/FarmerDisplay.vue';
import CollectionCards from '@/components/gem-farm/CollectionCards.vue';
import Vault from '@/components/gem-bank/Vault.vue';
import { INFT } from '@/common/web3/NFTget';
import { findFarmerPDA, stringifyPKsAndBNs } from '@gemworks/gem-farm-ts';
import { createToaster } from '@meforma/vue-toaster';

export default defineComponent({
  data() {
    return {
      isHidden: true,
      stakeWidth: 52,
    };
  },
  components: { Vault, FarmerDisplay, ConfigPane, CollectionCards },
  setup() {
    const { wallet, getWallet } = useWallet();
    const { cluster, getConnection } = useCluster();
    const toaster = createToaster({ "type":"success", "position":"top", "duration":"false" });

    let gf: any;
    watch([wallet, cluster], async () => {
      await freshStart();
    });
    //needed in case we switch in from another window
    onMounted(async () => {
      await freshStart();
    });
    const wait = (ms: number) => {
      let start = new Date().getTime();
      let end = start;
      while (end < start + ms) {
        end = new Date().getTime();
      }
    }
    const getStakedAmount = () => {
      return 15;
    }

    // --------------------------------------- farmer details
    const farm = ref<string>('');
    //const farm = farmid; // Overlord Clones
    //const farm = ref<string>('HJVe9iwgA4NEZT2MpHPCkPYpFXxJZXFSzNi3GTwabRx9'); // Overlord Clones
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
      availableA.value = (farmerAcc.value.rewardA.accruedReward)
        .sub(farmerAcc.value.rewardA.paidOutReward)
        .toString();
      let adjRewards: any =  availableA.value;
      let rewards: number =  (adjRewards / 1000000);
      availableA.value = rewards.toLocaleString("en-US");
      console.log('availableA: ' + availableA.value)
      availableB.value = farmerAcc.value.rewardB.accruedReward
        .sub(farmerAcc.value.rewardB.paidOutReward)
        .toString();
    };
    const fetchFarm = async () => {
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
          await fetchFarm();
          await fetchFarmer();
        } catch (e) {
          console.log(`farm with PK ${farm.value} not found :(`);
        }
      }
    };
    const initFarmer = async () => {
      await gf.initFarmerWallet(new PublicKey(farm.value!));
      await fetchFarmer();
      debugger;
    };
    // --------------------------------------- staking
    const beginStaking = async () => {
      toaster.show(`Please wait until the entire process is complete.  This message will expire when your NFTs are staked.`, {"type": "default", "position": "top", "duration": 30000, "dismissable": true, "pauseOnHover": true});
      const result = await gf.stakeWallet(new PublicKey(farm.value!));
      wait(10000);
      toaster.clear();
      toaster.show(`You are now staked`, {"type": "default", "position": "top", "duration": 3000, "dismissable": true, "pauseOnHover": true});
      await fetchFarmer();
      selectedNFTs.value = [];
    };
    const endStaking = async () => {
      toaster.show(`Please wait until the entire process is complete.  This message will expire when your NFTs are ready.`, {"type": "default", "position": "top", "duration": 30000, "dismissable": true, "pauseOnHover": true});
      const result = await gf.unstakeWallet(new PublicKey(farm.value!));
      wait(10000);
      console.log(result);
      toaster.clear();
      toaster.show(`You will need to approve one more transaction to get out of "cooldown" which is unnecessary for this farm.  This message will expire when you are unstaked.`, {"type": "default", "position": "top", "duration": 30000, "dismissable": true, "pauseOnHover": true});
      wait(3000);
      await fetchFarmer();
      //one more time to avoid cooldown
      const result2 = await gf.unstakeWallet(new PublicKey(farm.value!));
      toaster.clear();
      wait(3000);
      await fetchFarmer();
      selectedNFTs.value = [];
    };
    const claim = async () => {
      const result = await gf.claimWallet(
        new PublicKey(farm.value!),
        new PublicKey(farmAcc.value.rewardA.rewardMint!),
        new PublicKey(farmAcc.value.rewardB.rewardMint!)
      );
      wait(10000);
      toaster.clear();
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
        {text: 'Moondusa', value: 'AW2rHYXPeuBkcC5e41kKSzYGzQaiBW6STHjVaKNkNDad'},
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
      claim,
      handleRefreshFarmer,
      selectedNFTs,
      handleNewSelectedNFT,
      addGems,
      totalAvailable:{
        "/clones": 470,
        "/uniques": 35,
        "/chimps": 3334
      },
    };
  },
  methods: {
    changeRoute(e: any) {
      if (e.target.value == 'AW2rHYXPeuBkcC5e41kKSzYGzQaiBW6STHjVaKNkNDad') {
        this.$router.push("/moondusa");
      }
    },
    getStakedAmount(numGemsStaked:any, thePath:string) {
      console.log(numGemsStaked.toString());
      console.log(thePath);
      let stakePct, denom;
      let numStaked = parseInt(numGemsStaked.toString());
      if (thePath == "/moondusa") {
        denom = 4444;
      } else {
        denom = 0;
      }
      
      stakePct = Math.round((numStaked/denom) * 100);
      return stakePct;
    },
  },
});
</script>

<style scoped>
.nes-container {
  width: fit-content;
  margin:auto;
}
.stake-btn {
    background-color: transparent;
    border: none;
    color: var(--swv-button-text-color);
    cursor: pointer;
    display: flex;
    align-items: center;
    font-family: 'Goldman', 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 12px;
    font-weight: 600;
    height: 36px;
    line-height: initial;
    padding: 0 24px;
    border-radius: 5px;
}
  .stake-button-trigger {
      @apply bg-imso-greena justify-center !important;
  }
  
  .stake-button-trigger:hover {
      @apply bg-imso-greenb justify-center !important;
  }

</style>
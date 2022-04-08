import { Connection, PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import axios from 'axios';
import { programs } from '@metaplex/js';

const {
  metadata: { Metadata },
} = programs;

export interface INFT {
  pubkey?: PublicKey;
  mint: PublicKey;
  onchainMetadata: unknown;
  externalMetadata: unknown;
}

const UNIQUE_MINTS = ["GmXTnRbdeqnNBVXaQdhneLepJy4zV9ZCffJuFqjj4hKV",
  "HpiqAWsDTiMxHonAUfXmaLSZ9eBbzxMCyZgTJvrmnZzK",
  "93XP4DeZx1pexoCtdVFQcemHSfS8XHvrK1mZXiz4UjmR",
  "7SZax6nnrTNkiwUxsQejNCHTssrNJW4ucwJcKfZ1uDfW",
  "7DBaR2xJt4m5iJjgrk89p66P5NdchZHWMVHKmumDK3sg",
  "81xT6eo94P45V7C1T8CGn3sL3ctT9xqNoE7z4uwYLWar",
  "B9rx1kudc769tjkBHSJqm8n1TkKWaCRhGTkDZyYA6RVb",
  "9DkShKq1GqjseB8fYw8H52gNndW2V4nMEDkuZ8oeWURZ",
  "8s4wxKCnR8Py7oD5b97wY1E6XMzL6uJnDKEGRQ4zJbXP",
  "GnE1wyTzmpWm8E8DSWS4Zu2h7TX2abMusGmVXwXcrsd5",
  "AWEq2wvKE5rxmDU4aRgX4915V7dwJZbWgYbXYFSmEzND",
  "7uwSG9Laedhe2HDQ6Vi9bLFkhZ6pgtsh9cXL97JdeSmn",
  "FGHMkPBbnhoQbGdHMjMKw5V7L7RL5AuY9do3p7NjUwsw",
  "AV6a3sZHdQgXg8N9w8Jbhd5F47Ej5FENz64P7Vim8AE4",
  "6pM5B1ybbnHxEJuFQxcyimyn4578D3AYTMSNY3mSryf6",
  "AKPRXrz9ixvT4riocZXPdSH7fMJ6kBfWVDqD5rkx3GUE",
  "CK4E1VthHEHvbGTqjvbPDVkg3ccMYa3eL7uJReYeAZgU",
  "4nVuSMi4sjsGsUCJdEwtC2qC3ADGY5EdbnE5iGxK82Sr",
  "5YnCFEvjU1ba13bMPH9FjBjDsMCKdZg1tWqNojHkMu8M",
  "3ifSRWyDTx5R5ozvfxjLXKxE96Zj3ezGa2URT35QqoVr",
  "E7Urp5ZHJE5JCHobFpNgUYnmmDCNxdDWQEpah8W4cQD7",
  "HC1jYanVwuYuV518wLHNUnTamL2gtMZp96VynMiz1HF4",
  "2SeZHyUo8qgeMFfSMK58HY9YHRjCaQxxfNSUzNsNNv1m",
  "CquBD1kb83KAxPGbku4HwguL7qV7z9tGDkCeEC5B2v8e",
  "2sbRgG7zYDusvnDDgPpbwCCpKsfjas7Bbjh6PPL5Jnfq",
  "XnsBHQpcohVfxS53zJV5DNveyWYpRBHwQzeY4ti3mHR ",
  "Dh81czBipVkUgrF7K1M8zi4sirREbYw23N8NrUxZ3m2w",
  "HxjqcjSVKbNbZzmYaKWAoZchM15vZX2tCVCw5Rrf72ZE",
  "CwWw7LfzpA6qz5BSAFWjM7B42398XgAxEZf66qmgSCeG",
  "24R9ozDYbh6z3LZjDrsNybJ8MvjwEKU8g7KD2nuW9GXM",
  "CNqcZ1TmZaJ7h1Uc7zBmkTXBTZtZx1ZTRAZk8Rm6BoZo",
  "EYzsrQonscZ6cu8ogNk165SR535enjkdcaWtujoDKdz9",
  "FPBVHBZpdK6VddFF2viHwF9hFJo3jVoQ1Fh2fWVzx2fs",];

async function getTokensByOwner(owner: PublicKey, conn: Connection) {
  const tokens = await conn.getParsedTokenAccountsByOwner(owner, {
    programId: TOKEN_PROGRAM_ID,
  });
  console.log(tokens);


  // initial filter - only tokens with 0 decimals & of which 1 is present in the wallet
  return tokens.value
    .filter((t) => {
      const amount = t.account.data.parsed.info.tokenAmount;
            
      return amount.decimals === 0 && amount.uiAmount === 1;
    })
    .map((t) => {
      return { pubkey: t.pubkey, mint: t.account.data.parsed.info.mint };
    });
}

async function getNFTMetadata(
  mint: string,
  conn: Connection,
  pubkey?: string
): Promise<INFT | undefined> {
  // console.log('Pulling metadata for:', mint);
  try {
    const metadataPDA = await Metadata.getPDA(mint);
    const onchainMetadata = (await Metadata.load(conn, metadataPDA)).data;
    const externalMetadata = (await axios.get(onchainMetadata.data.uri)).data;
    return {
      pubkey: pubkey ? new PublicKey(pubkey) : undefined,
      mint: new PublicKey(mint),
      onchainMetadata,
      externalMetadata,
    };
  } catch (e) {
    console.log(`failed to pull metadata for token ${mint}`);
  }
}

export async function getNFTMetadataForMany(
  tokens: any[],
  conn: Connection
): Promise<INFT[]> {
  const promises: Promise<INFT | undefined>[] = [];
  tokens.forEach((t) => promises.push(getNFTMetadata(t.mint, conn, t.pubkey)));
  const nfts = (await Promise.all(promises)).filter((n) => !!n);
  console.log(`found ${nfts.length} metadatas`);
  const returnTheseNFTs = [];
  debugger;
  for (let i = 0; i < nfts.length; i++) {
    const ocm:any = nfts[i]?.onchainMetadata;
    const updAuth = ocm.updateAuthority;
    const farm = window.location.pathname;
    const mintId :any = nfts[i]?.mint.toString();
    if (((updAuth == "7tYpQaFUwueJaSeRmKX44HV8Ymrq4jvATCty6BzCt8CA") && (farm == "/clones")) || 
        ((UNIQUE_MINTS.includes(mintId) && (farm == "/uniques")) || 
        (updAuth == "CHMPmJUyeDufN5qD9vsu4TRNPnydzuWss2hgZ2QKQ7AJ" && farm == "/chimps"))) {
      returnTheseNFTs.push(nfts[i]);
    }
  };

  return returnTheseNFTs as INFT[];
}

export async function getNFTsByOwner(
  owner: PublicKey,
  conn: Connection
): Promise<INFT[]> {
  const tokens = await getTokensByOwner(owner, conn);
  console.log(`found ${tokens.length} tokens`);

  return await getNFTMetadataForMany(tokens, conn);
}

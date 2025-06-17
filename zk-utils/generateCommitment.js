import { AbiCoder } from "ethers";
import {
  rbigint,
  bigintToHex,
  leBigintToBuffer,
  hexToBigint,
} from "./utils/bigint.js";
import { pedersenHash } from "./utils/pedersen.js";
import { Buffer } from "buffer";
import * as snarkjs from "snarkjs";
import * as ethers from "ethers";

// Intended output: (bytes32 commitment, bytes32 nullifier, bytes32 secret)
////////////////////////////// MAIN ///////////////////////////////////////////
async function main(args = []) {
  // 1. Generate random nullifier and secret

  const abiCoder = new AbiCoder();
  const amountHex = args[0]; // Changed from process.argv[0]
  const nullifier = rbigint(31);
  const secret = rbigint(31);
  const amount = BigInt(amountHex);

  // 2. Get commitment
  const commitment = await pedersenHash(
    Buffer.concat([
      leBigintToBuffer(nullifier, 31),
      leBigintToBuffer(secret, 31),
      leBigintToBuffer(amount, 8),
    ])
  );

  // 3. Return abi encoded nullifier, secret, commitment
  const res = abiCoder.encode(
    ["bytes32", "bytes32", "bytes32", "bytes32"],
    [
      bigintToHex(commitment),
      bigintToHex(nullifier),
      bigintToHex(amount),
      bigintToHex(secret),
    ]
  );
  return res;
}

async function second(args = []) {
  // 1. Generate random nullifier and secret
  const abiCoder = new AbiCoder();
  const amountHex = args[0];
  const nullifier = rbigint(31);
  const secret = rbigint(31);
  const amount = BigInt(amountHex);

  // 2. Get commitment
  const commitment = await pedersenHash(
    Buffer.concat([
      leBigintToBuffer(nullifier, 31),
      leBigintToBuffer(secret, 31),
      leBigintToBuffer(amount, 8),
    ])
  );

  // 3. Return abi encoded nullifier, secret, commitment
  const res = abiCoder.encode(
    ["bytes32", "bytes32", "bytes32", "bytes32"],
    [
      bigintToHex(commitment),
      bigintToHex(nullifier),
      bigintToHex(amount),
      bigintToHex(secret),
    ]
  );

  const [commitment1, nullifier1, amount1, secret1] = abiCoder.decode(
    ["bytes32", "bytes32", "bytes32", "bytes32"],
    res
  );
  return [bigintToHex(commitment1), res];
}

// Export the functions
export { main, second };

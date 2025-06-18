// @ts-nocheck
// const path = require("path");
import path from "path";
// import { AbiCoder } from "ethers";
import {
  rbigint,
  bigintToHex,
  leBigintToBuffer,
  hexToBigint,
} from "./utils/bigint.js";
import { pedersenHash } from "./utils/pedersen.js";
import { Buffer } from "buffer";
import { mimicMerkleTree } from "./utils/mimcMerkleTree.js";
import { loadFromFile } from "../src/app/utils/readFile.js";
import * as snarkjs from "snarkjs";
import { AbiCoder, ethers } from "ethers";
import { encodeFunctionData } from "viem";
// const { mimicMerkleTree } = require("./utils/mimcMerkleTree.js");
// import mimicMerkleTree from "./utils/mimcMerkleTree.js";
// Intended output: (uint256[2] memory pA, uint256[2][2] memory pB, uint256[2] memory pC, bytes32 root, bytes32 nullifierHash)
////////////////////////////// MAIN ///////////////////////////////////////////
const abiCoder = new AbiCoder();

async function getCommitments(csvData) {
  // Split into lines and remove the header (first line)
  const lines = csvData.trim().split("\n").slice(1);

  // Extract the second column (commitment) from each line
  const commitments = lines.map((line) => {
    const columns = line.split(",");
    return columns[1]; // Second column (index 1) is the commitment
  });

  // Always return an array (even if empty or single item)
  return Array.isArray(commitments) ? commitments : [commitments];

  console.log(commitments);
}

async function main(args = []) {
  // const inputs = process.argv.slice(2, process.argv.length);

  const [commitment, nullifier, amount, secret] = abiCoder.decode(
    ["bytes32", "bytes32", "bytes32", "bytes32"],
    args[0]
  );

  const Rnullifier = hexToBigint(nullifier);
  const Rsecret = hexToBigint(secret);
  const Ramount = hexToBigint(amount);

  // 2. Get nullifier hash
  const nullifierHash = await pedersenHash(leBigintToBuffer(Rnullifier, 31));

  // 3. Loading.. the commitment from the csv file from the rindexer...

  const commitments = await loadFromFile();

  const leaves = commitments.map((l) => hexToBigint(l));

  const tree = await mimicMerkleTree(leaves);
  const merkleProof = tree.proof(hexToBigint(commitment));

  console.log("MerkleProof Good");

  // 4. Format witness input to exactly match circuit expectations

  const input = {
    // Public inputs  // check
    root: merkleProof.pathRoot,
    nullifierHash: nullifierHash,
    amount: Ramount,

    recipient: hexToBigint(args[1]),
    relayer: hexToBigint("0x0000000000000000000000000000000000000000"),
    fee: BigInt(args[2]),
    refund: BigInt(args[2]),

    // Private inputs // check
    nullifier: Rnullifier,
    secret: Rsecret,
    pathElements: merkleProof.pathElements.map((x) => x.toString()),
    pathIndices: merkleProof.pathIndices,
  };

  // 5. Create groth16 proof for witness
  const { proof } = await snarkjs.groth16.fullProve(
    input,
    "/zk/withdraw.wasm",
    "/zk/withdraw.zkey"
  );

  console.log("test2");

  const pA = proof.pi_a.slice(0, 2);
  const pB = proof.pi_b.slice(0, 2);
  const pC = proof.pi_c.slice(0, 2);

  console.log(bigintToHex(Ramount));
  console.log(bigintToHex(merkleProof.pathRoot));
  console.log(bigintToHex(nullifierHash));

  // 6. Return abi encoded witness
  const witness = abiCoder.encode(
    [
      "uint256[2]",
      "uint256[2][2]",
      "uint256[2]",
      "bytes32",
      "bytes32",
      "bytes32",
    ],
    [
      pA,
      // Swap x coordinates: this is for proof verification with the Solidity precompile for EC Pairings, and not required
      // for verification with e.g. snarkJS.
      [
        [pB[0][1], pB[0][0]],
        [pB[1][1], pB[1][0]],
      ],
      pC,
      bigintToHex(merkleProof.pathRoot),
      bigintToHex(nullifierHash),
      bigintToHex(hexToBigint(amount)),
    ]
  );

  console.log("test3");
  return witness;
}

export { main, getCommitments };

// main()
//   .then((wtns) => {
//     process.stdout.write(wtns);
//     process.exit(0);
//   })
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });

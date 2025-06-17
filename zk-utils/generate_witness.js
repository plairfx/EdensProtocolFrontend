// // @ts-nocheck
// // const path = require("path");
// import path from "path";
// import { AbiCoder } from "ethers";
// import { rbigint, bigintToHex, leBigintToBuffer } from "./utils/bigint.js";
// import { pedersenHash } from "./utils/pedersen.js";

// import { pedersenHash } from "./utils/pedersen.js";
// import { rbigint, bigintToHex, leBigintToBuffer } from "./utils/bigint.js";
// import { Buffer } from "buffer";
// import { mimicMerkleTree } from "./utils/mimcMerkleTree.js";
// import "/home/administrator/frontend-EP/edenfrontend/dwindexer/generated_csv/EdenPLLINK/edenpllink-deposited.csv";
// import "/home/administrator/frontend-EP/edenfrontend/dwindexer/generated_csv/EdenPL/edenpl-deposited.csv";

// // const { mimicMerkleTree } = require("./utils/mimcMerkleTree.js");
// // import mimicMerkleTree from "./utils/mimcMerkleTree.js";
// // Intended output: (uint256[2] memory pA, uint256[2][2] memory pB, uint256[2] memory pC, bytes32 root, bytes32 nullifierHash)
// ////////////////////////////// MAIN ///////////////////////////////////////////

// async function loadFromFile(String) {
//   const csvData = fs.readFileSync(
//     "./home/administrator/frontend-EP/edenfrontend/dwindexer/generated_csv/EdenPL/edenpl-deposited.csv"
//   );
//   const csvData2 = fs.readFileSync(
//     "./home/administrator/frontend-EP/edenfrontend/dwindexer/generated_csv/EdenPLLINK/edenpllink-deposited.csv",
//     "utf8"
//   );
//   if (string == "11155111") {
//     const commitments = getCommitments(csvData);
//     return commitments;
//   } else {
//     const commitments = getCommitments(csvData2);
//     return commitments;
//   }
// }

// function getCommitments(csvData) {
//   // Split into lines and remove the header (first line)
//   const lines = csvData.trim().split("\n").slice(1);

//   // Extract the second column (commitment) from each line
//   const commitments = lines.map((line) => {
//     const columns = line.split(",");
//     return columns[1]; // Second column (index 1) is the commitment
//   });

//   // Always return an array (even if empty or single item)
//   return Array.isArray(commitments) ? commitments : [commitments];

//   console.log(commitments);
// }

// async function main(String) {
//   // const inputs = process.argv.slice(2, process.argv.length);

//   const decodedProof = ([commitment, nullifier, amount, secret] =
//     abiCoder.decode(["bytes32", "bytes32", "bytes32", "bytes32"], args[0]));

//   // 2. Get nullifier hash
//   const nullifierHash = await pedersenHash(leBigintToBuffer(nullifier, 31));

//   // 3. Create merkle tree, insert leaves and get merkle proof for commitment

//   const commitments = await loadFromFile(String);

//   const leaves = commitments.map((l) => hexToBigint(l));

//   const tree = await mimicMerkleTree(leaves);

//   const merkleProof = tree.proof(commitment);

//   // 4. Format witness input to exactly match circuit expectations

//   const input = {
//     // Public inputs  // check
//     root: merkleProof.pathRoot,
//     nullifierHash: nullifierHash,
//     amount: amount,
//     recipient: hexToBigint(inputs[1]),
//     relayer: hexToBigint(inputs[2]),

//     fee: BigInt(inputs[2]),
//     refund: BigInt(inputs[2]),

//     // Private inputs // check
//     nullifier: nullifier,
//     secret: secret,
//     pathElements: merkleProof.pathElements.map((x) => x.toString()),
//     pathIndices: merkleProof.pathIndices,
//   };

//   // 5. Create groth16 proof for witness
//   const { proof } = await snarkjs.groth16.fullProve(
//     input,
//     path.join(__dirname, "../outputs/withdraw_js/withdraw.wasm"),
//     path.join(__dirname, "../outputs/withdraw.zkey")
//   );

//   const pA = proof.pi_a.slice(0, 2);
//   const pB = proof.pi_b.slice(0, 2);
//   const pC = proof.pi_c.slice(0, 2);

//   // 6. Return abi encoded witness
//   const witness = ethers.utils.defaultAbiCoder.encode(
//     [
//       "uint256[2]",
//       "uint256[2][2]",
//       "uint256[2]",
//       "bytes32",
//       "bytes32",
//       "bytes32",
//     ],
//     [
//       pA,
//       // Swap x coordinates: this is for proof verification with the Solidity precompile for EC Pairings, and not required
//       // for verification with e.g. snarkJS.
//       [
//         [pB[0][1], pB[0][0]],
//         [pB[1][1], pB[1][0]],
//       ],
//       pC,
//       bigintToHex(merkleProof.pathRoot),
//       bigintToHex(nullifierHash),
//       bigintToHex(amount),
//     ]
//   );

//   return witness;
// }

// export { main };

// main()
//   .then((wtns) => {
//     process.stdout.write(wtns);
//     process.exit(0);
//   })
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });

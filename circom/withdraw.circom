include "../node_modules/circomlib/circuits/bitify.circom";
include "../node_modules/circomlib/circuits/pedersen.circom";
include "merkleTree.circom";

// computes Pedersen(nullifier + secret)
template CommitmentHasher() {
    signal input nullifier;
    signal input secret;
    signal input amount;

    signal output commitment;
    signal output nullifierHash;

    // Adjust Pedersen hasher to include amount bits
    // Assuming amount requires 64 bits, adjust as needed for your use case
    component commitmentHasher = Pedersen(248 + 248 + 64);
    component nullifierHasher = Pedersen(248);
    
    component nullifierBits = Num2Bits(248);
    component secretBits = Num2Bits(248);
    component amountBits = Num2Bits(64);
    
    nullifierBits.in <== nullifier;
    secretBits.in <== secret;
    amountBits.in <== amount;
    
    for (var i = 0; i < 248; i++) {
        nullifierHasher.in[i] <== nullifierBits.out[i];
        commitmentHasher.in[i] <== nullifierBits.out[i];
        commitmentHasher.in[i + 248] <== secretBits.out[i];
    }
    
    // Add amount bits to commitment hash
    for (var i = 0; i < 64; i++) {
        commitmentHasher.in[i + 496] <== amountBits.out[i];
    }
    
    commitment <== commitmentHasher.out[0];
    nullifierHash <== nullifierHasher.out[0];
}

// Verifies that commitment that corresponds to given secret and nullifier is included in the merkle tree of deposits
template Withdraw(levels) {
    signal input root;
    signal input nullifierHash;
    signal input amount;


    signal input recipient; // not taking part in any computations
    signal input relayer; // not taking part in any computations
    signal input fee; // not taking part in any computations
    signal input refund; // not taking part in any computations
    
    // Private inputs
    signal input nullifier;
    signal  input secret;
    signal input pathElements[levels];
    signal input pathIndices[levels];

    component hasher = CommitmentHasher();
    hasher.nullifier <== nullifier;
    hasher.secret <== secret;
    hasher.amount <== amount;


    hasher.nullifierHash === nullifierHash;
   

    component tree = MerkleTreeChecker(levels);
    tree.leaf <== hasher.commitment;
    tree.root <== root;

    for (var i = 0; i < levels; i++) {
        tree.pathElements[i] <== pathElements[i];
        tree.pathIndices[i] <== pathIndices[i];
    }

    // Add hidden signals to make sure that tampering with recipient or fee will invalidate the snark proof
    // Most likely it is not required, but it's better to stay on the safe side and it only takes 2 constraints
    // Squares are used to prevent optimizer from removing those constraints
    signal recipientSquare;
    signal feeSquare;
    signal relayerSquare;
    signal refundSquare;

    recipientSquare <== recipient * recipient;
    feeSquare <== fee * fee;
    relayerSquare <== relayer * relayer;
    refundSquare <== refund * refund;
}


component main {public [root, nullifierHash, amount, recipient, relayer, fee, refund]} = Withdraw(20);
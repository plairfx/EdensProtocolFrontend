## Eden's Protocol Frontend

This is the frontend of Eden’s Protocol which makes the front of the privacy protocol,


Which uses multiple scripts to generate commitment and create a merkleTree to help verify the Zero Knowledge Proof.

Note: The deployed website on finaledp.vercel.app has not a working withdraw function as i had problems collecting the commitments to mimic the merkleTree for the proof verification.
Local hosted project will work so you can actually withdraw correctly! with the rindexer getting the commitments and them being used to verify the proof.

### How does it work?

#### Deposit Path -> 

##### BASE DEPOSIT EdenEVM.sol
Frontend generates commitment with [generate_commitment](https://github.com/plairfx/EdensProtocolFrontend/blob/main/zk-utils/generateCommitment.js) 
Deposit goes through **Chainlink's CCIP** and inserts the commitment into the `MerkleTreeWithHistory.sol' deployed on the Mainnet. (ETHEREUM)
It sends a message back with the outcome of the insertion, if it reverts user will get their money back, else they get their deposit proof!


##### WITHDRAW  
Frontend rebuilds the MerkleTreeWithHistory.sol with [generate_witness](https://github.com/plairfx/EdensProtocolFrontend/blob/main/zk-utils/generate_witness.js)
Converts the deposit proof into the expected inputs to make sure it fits the verifier.sol
If the proof is invalid for some reason it will emit WithdrawFailed() on the origin chain.

(EdenPL.sol deposit and withdraws are without CCIP involved as the MerkleTreeWithHistory.sol and verifier.sol are already on the same chain.)

## Frontend LINK:
finaledenp.vercel.app
or
https://edens-protocol.vercel.app


Please visit the website and try to deploy the website yourself,

![image](https://github.com/user-attachments/assets/32603ae5-7acb-4413-bc2e-766f12420d16)


![image](https://github.com/user-attachments/assets/b0ad75aa-f85b-40ce-8b25-b9b34d8644a6)


## Deploy the website yourself!

### Install the dependencies
``pnpm install``
### Launch the server:
``pnpm run dev —turbo (visit the website to compile the pages!)``


Edens Protocol: https://github.com/plairfx/EdensProtocol-F

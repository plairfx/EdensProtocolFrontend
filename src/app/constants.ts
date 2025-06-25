interface ContractsConfig {
    [chainId: number]: {
        EdenPLETH: string | null
        EdenEVMETH: string | null
        EdenPLLINK: string | null
        EdenEVMLINK: string | null
        Link: string | null
        EdenVaultETH: string | null
      EdenVaultLINK: string | null

    }
}

export const chainsForEden: ContractsConfig = {
    84532: {
        EdenEVMLINK: "0xCCAda501AC392DB699aA85432eabc03abe403f30",
        EdenEVMETH: "0xA17Dd3Cc59951b0ED78D3bC9f6Ee944fF53FD1f2",
        Link: "0xE4aB69C077896252FAFBD49EFD26B5D171A32410",
        EdenPLETH: null,
        EdenPLLINK: null,
      EdenVaultETH:  "0x4418Ba6d81b2C3C031A969203d26A49bB8055d20",
      EdenVaultLINK: "0x9680df0A8C755916cc42Afe686E718c67468EbC7",
    },
    31337: {
        EdenPLETH: null,
        EdenPLLINK: null,
        EdenEVMLINK: null,
        EdenEVMETH: null,
        Link: null,
        EdenVaultETH: null,
        EdenVaultLINK: null,
    },
    11155111: {
        EdenEVMLINK: null,
        Link: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
        EdenEVMETH: null,
        EdenPLETH: "0x4418Ba6d81b2C3C031A969203d26A49bB8055d20",
        EdenPLLINK: "0xD90f34B559C7b964cb705c5cadaCb682950324f9",
        EdenVaultETH:  "0xa75f35ed47fC32EFAf2513B1c19194130e41002D",
        EdenVaultLINK: "0x62ea0C3001daf56fe7642F07FA23785639887e8e",
    },
    43113: {
    EdenEVMLINK: "0xD90f34B559C7b964cb705c5cadaCb682950324f9",
    Link: "0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846",
    EdenEVMETH: null,
    EdenPLETH: null,
    EdenPLLINK: null,
    EdenVaultETH:  null,
    EdenVaultLINK: "0x9680df0A8C755916cc42Afe686E718c67468EbC7",
    }



}

export const EdenVaultAbi = [
    {
      "type": "constructor",
      "inputs": [
        {
          "name": "depositAsset",
          "type": "address",
          "internalType": "address"
        },
        { "name": "_pool", "type": "address", "internalType": "address" }
      ],
      "stateMutability": "nonpayable"
    },
    { "type": "receive", "stateMutability": "payable" },
    {
      "type": "function",
      "name": "allowance",
      "inputs": [
        { "name": "owner", "type": "address", "internalType": "address" },
        { "name": "spender", "type": "address", "internalType": "address" }
      ],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "approve",
      "inputs": [
        { "name": "spender", "type": "address", "internalType": "address" },
        { "name": "amount", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "balanceOf",
      "inputs": [
        { "name": "account", "type": "address", "internalType": "address" }
      ],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "convertToAssets",
      "inputs": [
        { "name": "shares", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [
        { "name": "assets", "type": "uint256", "internalType": "uint256" }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "convertToShares",
      "inputs": [
        { "name": "assets", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [
        { "name": "shares", "type": "uint256", "internalType": "uint256" }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "decimals",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint8", "internalType": "uint8" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "decreaseAllowance",
      "inputs": [
        { "name": "spender", "type": "address", "internalType": "address" },
        {
          "name": "subtractedValue",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "deposit",
      "inputs": [
        { "name": "amount", "type": "uint256", "internalType": "uint256" },
        { "name": "minAmount", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [
        { "name": "shares", "type": "uint256", "internalType": "uint256" }
      ],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "getAsset",
      "inputs": [],
      "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "increaseAllowance",
      "inputs": [
        { "name": "spender", "type": "address", "internalType": "address" },
        { "name": "addedValue", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "name",
      "inputs": [],
      "outputs": [{ "name": "", "type": "string", "internalType": "string" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "symbol",
      "inputs": [],
      "outputs": [{ "name": "", "type": "string", "internalType": "string" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "totalAssets",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "totalSupply",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "transfer",
      "inputs": [
        { "name": "to", "type": "address", "internalType": "address" },
        { "name": "amount", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "transferFrom",
      "inputs": [
        { "name": "from", "type": "address", "internalType": "address" },
        { "name": "to", "type": "address", "internalType": "address" },
        { "name": "amount", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "useLiq",
      "inputs": [
        { "name": "amount", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "withdraw",
      "inputs": [
        { "name": "amount", "type": "uint256", "internalType": "uint256" },
        { "name": "minAmount", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [
        { "name": "assets", "type": "uint256", "internalType": "uint256" }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "event",
      "name": "Approval",
      "inputs": [
        {
          "name": "owner",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "spender",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "value",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Deposited",
      "inputs": [
        {
          "name": "amount",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Transfer",
      "inputs": [
        {
          "name": "from",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "to",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "value",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Withdrawn",
      "inputs": [
        {
          "name": "amount",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    { "type": "error", "name": "AmountIsNotEqualDepositedETH", "inputs": [] },
    { "type": "error", "name": "SharesOrAssetsLessThanExpected", "inputs": [] }
  ]

export const erc20Abi = [
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "address", name: "owner", type: "address" },
            { indexed: true, internalType: "address", name: "spender", type: "address" },
            { indexed: false, internalType: "uint256", name: "value", type: "uint256" },
        ],
        name: "Approval",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "address", name: "authorizer", type: "address" },
            { indexed: true, internalType: "bytes32", name: "nonce", type: "bytes32" },
        ],
        name: "AuthorizationCanceled",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "address", name: "authorizer", type: "address" },
            { indexed: true, internalType: "bytes32", name: "nonce", type: "bytes32" },
        ],
        name: "AuthorizationUsed",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [{ indexed: true, internalType: "address", name: "_account", type: "address" }],
        name: "Blacklisted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "address", name: "newBlacklister", type: "address" },
        ],
        name: "BlacklisterChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "address", name: "burner", type: "address" },
            { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "Burn",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "address", name: "newMasterMinter", type: "address" },
        ],
        name: "MasterMinterChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "address", name: "minter", type: "address" },
            { indexed: true, internalType: "address", name: "to", type: "address" },
            { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "Mint",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "address", name: "minter", type: "address" },
            {
                indexed: false,
                internalType: "uint256",
                name: "minterAllowedAmount",
                type: "uint256",
            },
        ],
        name: "MinterConfigured",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [{ indexed: true, internalType: "address", name: "oldMinter", type: "address" }],
        name: "MinterRemoved",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: false, internalType: "address", name: "previousOwner", type: "address" },
            { indexed: false, internalType: "address", name: "newOwner", type: "address" },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    { anonymous: false, inputs: [], name: "Pause", type: "event" },
    {
        anonymous: false,
        inputs: [{ indexed: true, internalType: "address", name: "newAddress", type: "address" }],
        name: "PauserChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [{ indexed: true, internalType: "address", name: "newRescuer", type: "address" }],
        name: "RescuerChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "address", name: "from", type: "address" },
            { indexed: true, internalType: "address", name: "to", type: "address" },
            { indexed: false, internalType: "uint256", name: "value", type: "uint256" },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [{ indexed: true, internalType: "address", name: "_account", type: "address" }],
        name: "UnBlacklisted",
        type: "event",
    },
    { anonymous: false, inputs: [], name: "Unpause", type: "event" },
    {
        inputs: [],
        name: "CANCEL_AUTHORIZATION_TYPEHASH",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "DOMAIN_SEPARATOR",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "PERMIT_TYPEHASH",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "RECEIVE_WITH_AUTHORIZATION_TYPEHASH",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "TRANSFER_WITH_AUTHORIZATION_TYPEHASH",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "owner", type: "address" },
            { internalType: "address", name: "spender", type: "address" },
        ],
        name: "allowance",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "spender", type: "address" },
            { internalType: "uint256", name: "value", type: "uint256" },
        ],
        name: "approve",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "authorizer", type: "address" },
            { internalType: "bytes32", name: "nonce", type: "bytes32" },
        ],
        name: "authorizationState",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "_account", type: "address" }],
        name: "blacklist",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "blacklister",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
        name: "burn",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "authorizer", type: "address" },
            { internalType: "bytes32", name: "nonce", type: "bytes32" },
            { internalType: "uint8", name: "v", type: "uint8" },
            { internalType: "bytes32", name: "r", type: "bytes32" },
            { internalType: "bytes32", name: "s", type: "bytes32" },
        ],
        name: "cancelAuthorization",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "authorizer", type: "address" },
            { internalType: "bytes32", name: "nonce", type: "bytes32" },
            { internalType: "bytes", name: "signature", type: "bytes" },
        ],
        name: "cancelAuthorization",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "minter", type: "address" },
            { internalType: "uint256", name: "minterAllowedAmount", type: "uint256" },
        ],
        name: "configureMinter",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "currency",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "decimals",
        outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "spender", type: "address" },
            { internalType: "uint256", name: "decrement", type: "uint256" },
        ],
        name: "decreaseAllowance",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "spender", type: "address" },
            { internalType: "uint256", name: "increment", type: "uint256" },
        ],
        name: "increaseAllowance",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "string", name: "tokenName", type: "string" },
            { internalType: "string", name: "tokenSymbol", type: "string" },
            { internalType: "string", name: "tokenCurrency", type: "string" },
            { internalType: "uint8", name: "tokenDecimals", type: "uint8" },
            { internalType: "address", name: "newMasterMinter", type: "address" },
            { internalType: "address", name: "newPauser", type: "address" },
            { internalType: "address", name: "newBlacklister", type: "address" },
            { internalType: "address", name: "newOwner", type: "address" },
        ],
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "string", name: "newName", type: "string" }],
        name: "initializeV2",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "lostAndFound", type: "address" }],
        name: "initializeV2_1",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address[]", name: "accountsToBlacklist", type: "address[]" },
            { internalType: "string", name: "newSymbol", type: "string" },
        ],
        name: "initializeV2_2",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "_account", type: "address" }],
        name: "isBlacklisted",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "isMinter",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "masterMinter",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "_to", type: "address" },
            { internalType: "uint256", name: "_amount", type: "uint256" },
        ],
        name: "mint",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "minter", type: "address" }],
        name: "minterAllowance",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "name",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "owner", type: "address" }],
        name: "nonces",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
    { inputs: [], name: "pause", outputs: [], stateMutability: "nonpayable", type: "function" },
    {
        inputs: [],
        name: "paused",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "pauser",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "owner", type: "address" },
            { internalType: "address", name: "spender", type: "address" },
            { internalType: "uint256", name: "value", type: "uint256" },
            { internalType: "uint256", name: "deadline", type: "uint256" },
            { internalType: "bytes", name: "signature", type: "bytes" },
        ],
        name: "permit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "owner", type: "address" },
            { internalType: "address", name: "spender", type: "address" },
            { internalType: "uint256", name: "value", type: "uint256" },
            { internalType: "uint256", name: "deadline", type: "uint256" },
            { internalType: "uint8", name: "v", type: "uint8" },
            { internalType: "bytes32", name: "r", type: "bytes32" },
            { internalType: "bytes32", name: "s", type: "bytes32" },
        ],
        name: "permit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "value", type: "uint256" },
            { internalType: "uint256", name: "validAfter", type: "uint256" },
            { internalType: "uint256", name: "validBefore", type: "uint256" },
            { internalType: "bytes32", name: "nonce", type: "bytes32" },
            { internalType: "bytes", name: "signature", type: "bytes" },
        ],
        name: "receiveWithAuthorization",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "value", type: "uint256" },
            { internalType: "uint256", name: "validAfter", type: "uint256" },
            { internalType: "uint256", name: "validBefore", type: "uint256" },
            { internalType: "bytes32", name: "nonce", type: "bytes32" },
            { internalType: "uint8", name: "v", type: "uint8" },
            { internalType: "bytes32", name: "r", type: "bytes32" },
            { internalType: "bytes32", name: "s", type: "bytes32" },
        ],
        name: "receiveWithAuthorization",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "minter", type: "address" }],
        name: "removeMinter",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "contract IERC20", name: "tokenContract", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "rescueERC20",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "rescuer",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "symbol",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "totalSupply",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "value", type: "uint256" },
        ],
        name: "transfer",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "value", type: "uint256" },
        ],
        name: "transferFrom",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "value", type: "uint256" },
            { internalType: "uint256", name: "validAfter", type: "uint256" },
            { internalType: "uint256", name: "validBefore", type: "uint256" },
            { internalType: "bytes32", name: "nonce", type: "bytes32" },
            { internalType: "bytes", name: "signature", type: "bytes" },
        ],
        name: "transferWithAuthorization",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "value", type: "uint256" },
            { internalType: "uint256", name: "validAfter", type: "uint256" },
            { internalType: "uint256", name: "validBefore", type: "uint256" },
            { internalType: "bytes32", name: "nonce", type: "bytes32" },
            { internalType: "uint8", name: "v", type: "uint8" },
            { internalType: "bytes32", name: "r", type: "bytes32" },
            { internalType: "bytes32", name: "s", type: "bytes32" },
        ],
        name: "transferWithAuthorization",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "_account", type: "address" }],
        name: "unBlacklist",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    { inputs: [], name: "unpause", outputs: [], stateMutability: "nonpayable", type: "function" },
    {
        inputs: [{ internalType: "address", name: "_newBlacklister", type: "address" }],
        name: "updateBlacklister",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "_newMasterMinter", type: "address" }],
        name: "updateMasterMinter",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "_newPauser", type: "address" }],
        name: "updatePauser",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "newRescuer", type: "address" }],
        name: "updateRescuer",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "version",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "pure",
        type: "function",
    },
]

export const EdenPLAbi = [
    {
      "type": "constructor",
      "inputs": [
        {
          "name": "_verifier",
          "type": "address",
          "internalType": "contract IVerifier"
        },
        {
          "name": "_hasher",
          "type": "address",
          "internalType": "contract IHasher"
        },
        { "name": "_asset", "type": "address", "internalType": "address" },
        {
          "name": "merkleTreeHeight",
          "type": "uint32",
          "internalType": "uint32"
        },
        { "name": "_router", "type": "address", "internalType": "address" }
      ],
      "stateMutability": "nonpayable"
    },
    { "type": "receive", "stateMutability": "payable" },
    {
      "type": "function",
      "name": "FIELD_SIZE",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "ROOT_HISTORY_SIZE",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint32", "internalType": "uint32" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "ZERO_VALUE",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "_checkDestinationDomain",
      "inputs": [
        {
          "name": "_destinationChain",
          "type": "uint64",
          "internalType": "uint64"
        }
      ],
      "outputs": [
        { "name": "", "type": "address", "internalType": "address" },
        { "name": "", "type": "bool", "internalType": "bool" }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "addDestinationChain",
      "inputs": [
        {
          "name": "_destinationChain",
          "type": "uint64",
          "internalType": "uint64"
        },
        { "name": "dest_address", "type": "address", "internalType": "address" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "asset",
      "inputs": [],
      "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "ccipReceive",
      "inputs": [
        {
          "name": "message",
          "type": "tuple",
          "internalType": "struct Client.Any2EVMMessage",
          "components": [
            {
              "name": "messageId",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "sourceChainSelector",
              "type": "uint64",
              "internalType": "uint64"
            },
            { "name": "sender", "type": "bytes", "internalType": "bytes" },
            { "name": "data", "type": "bytes", "internalType": "bytes" },
            {
              "name": "destTokenAmounts",
              "type": "tuple[]",
              "internalType": "struct Client.EVMTokenAmount[]",
              "components": [
                {
                  "name": "token",
                  "type": "address",
                  "internalType": "address"
                },
                {
                  "name": "amount",
                  "type": "uint256",
                  "internalType": "uint256"
                }
              ]
            }
          ]
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "commitments",
      "inputs": [
        { "name": "hashie", "type": "bytes32", "internalType": "bytes32" }
      ],
      "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "currentRootIndex",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint32", "internalType": "uint32" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "deposit",
      "inputs": [
        { "name": "_commitment", "type": "bytes32", "internalType": "bytes32" },
        { "name": "amount", "type": "uint256", "internalType": "uint256" },
        { "name": "fee", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [
        { "name": "index", "type": "uint256", "internalType": "uint256" }
      ],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "depositFees",
      "inputs": [],
      "outputs": [
        { "name": "feeAccum", "type": "uint256", "internalType": "uint256" }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "filledSubtrees",
      "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "outputs": [{ "name": "", "type": "bytes32", "internalType": "bytes32" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getFeesAccumulated",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getLastRoot",
      "inputs": [],
      "outputs": [{ "name": "", "type": "bytes32", "internalType": "bytes32" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getRouter",
      "inputs": [],
      "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getVault",
      "inputs": [],
      "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "hashLeftRight",
      "inputs": [
        {
          "name": "_hasher",
          "type": "address",
          "internalType": "contract IHasher"
        },
        { "name": "_left", "type": "bytes32", "internalType": "bytes32" },
        { "name": "_right", "type": "bytes32", "internalType": "bytes32" }
      ],
      "outputs": [{ "name": "", "type": "bytes32", "internalType": "bytes32" }],
      "stateMutability": "pure"
    },
    {
      "type": "function",
      "name": "hasher",
      "inputs": [],
      "outputs": [
        { "name": "", "type": "address", "internalType": "contract IHasher" }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "isKnownRoot",
      "inputs": [
        { "name": "_root", "type": "bytes32", "internalType": "bytes32" }
      ],
      "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "levels",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint32", "internalType": "uint32" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "nextIndex",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint32", "internalType": "uint32" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "nullifierHashes",
      "inputs": [{ "name": "", "type": "bytes32", "internalType": "bytes32" }],
      "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "owner",
      "inputs": [],
      "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "renounceOwnership",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "roots",
      "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "outputs": [{ "name": "", "type": "bytes32", "internalType": "bytes32" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "setVault",
      "inputs": [
        { "name": "_vault", "type": "address", "internalType": "address" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "supportsInterface",
      "inputs": [
        { "name": "interfaceId", "type": "bytes4", "internalType": "bytes4" }
      ],
      "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "transferOwnership",
      "inputs": [
        { "name": "newOwner", "type": "address", "internalType": "address" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "verifier",
      "inputs": [],
      "outputs": [
        { "name": "", "type": "address", "internalType": "contract IVerifier" }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "withdraw",
      "inputs": [
        { "name": "_pA", "type": "uint256[2]", "internalType": "uint256[2]" },
        {
          "name": "_pB",
          "type": "uint256[2][2]",
          "internalType": "uint256[2][2]"
        },
        { "name": "_pC", "type": "uint256[2]", "internalType": "uint256[2]" },
        {
          "name": "nullifierHash",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        { "name": "receiver", "type": "address", "internalType": "address" },
        { "name": "root", "type": "bytes32", "internalType": "bytes32" },
        { "name": "fee", "type": "uint256", "internalType": "uint256" },
        { "name": "relayer", "type": "address", "internalType": "address" },
        { "name": "amount", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "zeros",
      "inputs": [{ "name": "i", "type": "uint256", "internalType": "uint256" }],
      "outputs": [{ "name": "", "type": "bytes32", "internalType": "bytes32" }],
      "stateMutability": "pure"
    },
    {
      "type": "event",
      "name": "DepositFailed",
      "inputs": [
        {
          "name": "refundReceiver",
          "type": "address",
          "indexed": false,
          "internalType": "address"
        },
        {
          "name": "amount",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "name": "MessageID",
          "type": "bytes32",
          "indexed": false,
          "internalType": "bytes32"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Deposited",
      "inputs": [
        {
          "name": "commitment",
          "type": "bytes32",
          "indexed": false,
          "internalType": "bytes32"
        },
        {
          "name": "amount",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "name": "index",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "name": "chain",
          "type": "uint64",
          "indexed": false,
          "internalType": "uint64"
        },
        {
          "name": "MessageId",
          "type": "bytes32",
          "indexed": false,
          "internalType": "bytes32"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "OwnershipTransferred",
      "inputs": [
        {
          "name": "previousOwner",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "newOwner",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "WithdrawFailed",
      "inputs": [
        {
          "name": "receiver",
          "type": "address",
          "indexed": false,
          "internalType": "address"
        },
        {
          "name": "amount",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "name": "MessageID",
          "type": "bytes32",
          "indexed": false,
          "internalType": "bytes32"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Withdrawn",
      "inputs": [
        {
          "name": "receiver",
          "type": "address",
          "indexed": false,
          "internalType": "address"
        },
        {
          "name": "amount",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "name": "chain",
          "type": "uint64",
          "indexed": false,
          "internalType": "uint64"
        },
        {
          "name": "MessageId",
          "type": "bytes32",
          "indexed": false,
          "internalType": "bytes32"
        }
      ],
      "anonymous": false
    },
    { "type": "error", "name": "InvalidProof", "inputs": [] },
    {
      "type": "error",
      "name": "InvalidRouter",
      "inputs": [
        { "name": "router", "type": "address", "internalType": "address" }
      ]
    },
    { "type": "error", "name": "UninitializedChain", "inputs": [] }
  ]

export const EdenEVMAbi = [

    {
      "type": "constructor",
      "inputs": [
        { "name": "_asset", "type": "address", "internalType": "address" },
        { "name": "_router", "type": "address", "internalType": "address" },
        { "name": "_destChain", "type": "uint64", "internalType": "uint64" },
        { "name": "_destAddr", "type": "address", "internalType": "address" }
      ],
      "stateMutability": "nonpayable"
    },
    { "type": "receive", "stateMutability": "payable" },
    {
      "type": "function",
      "name": "ccipReceive",
      "inputs": [
        {
          "name": "message",
          "type": "tuple",
          "internalType": "struct Client.Any2EVMMessage",
          "components": [
            {
              "name": "messageId",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "sourceChainSelector",
              "type": "uint64",
              "internalType": "uint64"
            },
            { "name": "sender", "type": "bytes", "internalType": "bytes" },
            { "name": "data", "type": "bytes", "internalType": "bytes" },
            {
              "name": "destTokenAmounts",
              "type": "tuple[]",
              "internalType": "struct Client.EVMTokenAmount[]",
              "components": [
                {
                  "name": "token",
                  "type": "address",
                  "internalType": "address"
                },
                {
                  "name": "amount",
                  "type": "uint256",
                  "internalType": "uint256"
                }
              ]
            }
          ]
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "deposit",
      "inputs": [
        { "name": "_commitment", "type": "bytes32", "internalType": "bytes32" },
        { "name": "amount", "type": "uint256", "internalType": "uint256" },
        { "name": "fee", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [
        { "name": "index", "type": "uint256", "internalType": "uint256" }
      ],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "depositFees",
      "inputs": [],
      "outputs": [
        { "name": "feeAccum", "type": "uint256", "internalType": "uint256" }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "getFeesAccumulated",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getRouter",
      "inputs": [],
      "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getVault",
      "inputs": [],
      "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "owner",
      "inputs": [],
      "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "renounceOwnership",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "setVault",
      "inputs": [
        { "name": "_vault", "type": "address", "internalType": "address" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "supportsInterface",
      "inputs": [
        { "name": "interfaceId", "type": "bytes4", "internalType": "bytes4" }
      ],
      "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "transferOwnership",
      "inputs": [
        { "name": "newOwner", "type": "address", "internalType": "address" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "withdraw",
      "inputs": [
        { "name": "_pA", "type": "uint256[2]", "internalType": "uint256[2]" },
        {
          "name": "_pB",
          "type": "uint256[2][2]",
          "internalType": "uint256[2][2]"
        },
        { "name": "_pC", "type": "uint256[2]", "internalType": "uint256[2]" },
        {
          "name": "_nullifierHash",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        { "name": "_receiver", "type": "address", "internalType": "address" },
        { "name": "_root", "type": "bytes32", "internalType": "bytes32" },
        { "name": "_fee", "type": "uint256", "internalType": "uint256" },
        { "name": "_relayer", "type": "address", "internalType": "address" },
        { "name": "_amount", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    { "type": "event", "name": "Deposit", "inputs": [], "anonymous": false },
    {
      "type": "event",
      "name": "DepositFailed",
      "inputs": [
        {
          "name": "amount",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "name": "fee",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "OwnershipTransferred",
      "inputs": [
        {
          "name": "previousOwner",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "newOwner",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    { "type": "event", "name": "Withdraw", "inputs": [], "anonymous": false },
    {
      "type": "event",
      "name": "WithdrawFailed",
      "inputs": [],
      "anonymous": false
    },
    { "type": "error", "name": "InvalidProof", "inputs": [] },
    {
      "type": "error",
      "name": "InvalidRouter",
      "inputs": [
        { "name": "router", "type": "address", "internalType": "address" }
      ]
    }
  
    
]
export const VERIFIED_ISSUER_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export const WORKPROOF_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

export const VERIFIED_ISSUER_ABI = [
    { "type": "constructor", "inputs": [], "stateMutability": "nonpayable" },
                {
                    "type": "function",
                    "name": "getIssuers",
                    "inputs": [],
                    "outputs": [{ "name": "", "type": "address[]", "internalType": "address[]" }],
                    "stateMutability": "view"
                },
                {
                    "type": "function",
                    "name": "getRemovedAsAnIssuer",
                    "inputs": [{ "name": "_issuer", "type": "address", "internalType": "address" }],
                    "outputs": [],
                    "stateMutability": "nonpayable"
                },
                {
                    "type": "function",
                    "name": "getVerifiedAsAnIssuer",
                    "inputs": [{ "name": "_issuer", "type": "address", "internalType": "address" }],
                    "outputs": [],
                    "stateMutability": "nonpayable"
                },
                {
                    "type": "function",
                    "name": "isVerifiedIssuer",
                    "inputs": [{ "name": "_issuer", "type": "address", "internalType": "address" }],
                    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
                    "stateMutability": "view"
                },
                {
                    "type": "function",
                    "name": "issuers",
                    "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
                    "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
                    "stateMutability": "view"
                },
                {
                    "type": "function",
                    "name": "verifiedIssuers",
                    "inputs": [{ "name": "issuer", "type": "address", "internalType": "address" }],
                    "outputs": [{ "name": "isVerified", "type": "bool", "internalType": "bool" }],
                    "stateMutability": "view"
                },
                {
                    "type": "event",
                    "name": "IssuerAdded",
                    "inputs": [{ "name": "issuer", "type": "address", "indexed": true, "internalType": "address" }],
                    "anonymous": false
                },
                {
                    "type": "event",
                    "name": "IssuerRemoved",
                    "inputs": [{ "name": "issuer", "type": "address", "indexed": true, "internalType": "address" }],
                    "anonymous": false
                },
                { "type": "error", "name": "VerifiedIssuer_AlreadyVerified", "inputs": [] },
                { "type": "error", "name": "VerifiedIssuer_InvalidAddress", "inputs": [] },
                { "type": "error", "name": "VerifiedIssuer_InvalidIssuer", "inputs": [] }
];

export const WORKPROOF_ABI = [
        {
        "type": "constructor",
        "inputs": [
        {
            "name": "_issuerRegistry",
            "type": "address",
            "internalType": "address"
        }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "approve",
        "inputs": [
        {
            "name": "to",
            "type": "address",
            "internalType": "address"
        },
        {
            "name": "tokenId",
            "type": "uint256",
            "internalType": "uint256"
        }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "balanceOf",
        "inputs": [
        {
            "name": "owner",
            "type": "address",
            "internalType": "address"
        }
        ],
        "outputs": [
        {
            "name": "",
            "type": "uint256",
            "internalType": "uint256"
        }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getApproved",
        "inputs": [
        {
            "name": "tokenId",
            "type": "uint256",
            "internalType": "uint256"
        }
        ],
        "outputs": [
        {
            "name": "",
            "type": "address",
            "internalType": "address"
        }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getCredentials",
        "inputs": [
        {
            "name": "_worker",
            "type": "address",
            "internalType": "address"
        }
        ],
        "outputs": [
        {
            "name": "",
            "type": "uint256[]",
            "internalType": "uint256[]"
        }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getCredentialsDetail",
        "inputs": [
        {
            "name": "_tokenId",
            "type": "uint256",
            "internalType": "uint256"
        }
        ],
        "outputs": [
        {
            "name": "",
            "type": "tuple",
            "internalType": "struct WorkProof.Credential",
            "components": [
            {
                "name": "issuer",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "worker",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "platform",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "jobTitle",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "rating",
                "type": "uint8",
                "internalType": "uint8"
            },
            {
                "name": "issuedAt",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "ipfsHash",
                "type": "string",
                "internalType": "string"
            }
            ]
        }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "isApprovedForAll",
        "inputs": [
        {
            "name": "owner",
            "type": "address",
            "internalType": "address"
        },
        {
            "name": "operator",
            "type": "address",
            "internalType": "address"
        }
        ],
        "outputs": [
        {
            "name": "",
            "type": "bool",
            "internalType": "bool"
        }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "issueCredentials",
        "inputs": [
        {
            "name": "_worker",
            "type": "address",
            "internalType": "address"
        },
        {
            "name": "_platform",
            "type": "string",
            "internalType": "string"
        },
        {
            "name": "_jobTitle",
            "type": "string",
            "internalType": "string"
        },
        {
            "name": "_rating",
            "type": "uint8",
            "internalType": "uint8"
        },
        {
            "name": "_ipfsHash",
            "type": "string",
            "internalType": "string"
        }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "issuerRegistry",
        "inputs": [],
        "outputs": [
        {
            "name": "",
            "type": "address",
            "internalType": "contract VerifiedIssuer"
        }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "name",
        "inputs": [],
        "outputs": [
        {
            "name": "",
            "type": "string",
            "internalType": "string"
        }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "ownerOf",
        "inputs": [
        {
            "name": "tokenId",
            "type": "uint256",
            "internalType": "uint256"
        }
        ],
        "outputs": [
        {
            "name": "",
            "type": "address",
            "internalType": "address"
        }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "revokeCredentials",
        "inputs": [
        {
            "name": "_tokenId",
            "type": "uint256",
            "internalType": "uint256"
        }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "safeTransferFrom",
        "inputs": [
        {
            "name": "from",
            "type": "address",
            "internalType": "address"
        },
        {
            "name": "to",
            "type": "address",
            "internalType": "address"
        },
        {
            "name": "tokenId",
            "type": "uint256",
            "internalType": "uint256"
        }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "safeTransferFrom",
        "inputs": [
        {
            "name": "",
            "type": "address",
            "internalType": "address"
        },
        {
            "name": "",
            "type": "address",
            "internalType": "address"
        },
        {
            "name": "",
            "type": "uint256",
            "internalType": "uint256"
        },
        {
            "name": "",
            "type": "bytes",
            "internalType": "bytes"
        }
        ],
        "outputs": [],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "setApprovalForAll",
        "inputs": [
        {
            "name": "operator",
            "type": "address",
            "internalType": "address"
        },
        {
            "name": "approved",
            "type": "bool",
            "internalType": "bool"
        }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "supportsInterface",
        "inputs": [
        {
            "name": "interfaceId",
            "type": "bytes4",
            "internalType": "bytes4"
        }
        ],
        "outputs": [
        {
            "name": "",
            "type": "bool",
            "internalType": "bool"
        }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "symbol",
        "inputs": [],
        "outputs": [
        {
            "name": "",
            "type": "string",
            "internalType": "string"
        }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "tokenURI",
        "inputs": [
        {
            "name": "tokenId",
            "type": "uint256",
            "internalType": "uint256"
        }
        ],
        "outputs": [
        {
            "name": "",
            "type": "string",
            "internalType": "string"
        }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "totalSupply",
        "inputs": [],
        "outputs": [
        {
            "name": "",
            "type": "uint256",
            "internalType": "uint256"
        }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "transferFrom",
        "inputs": [
        {
            "name": "",
            "type": "address",
            "internalType": "address"
        },
        {
            "name": "",
            "type": "address",
            "internalType": "address"
        },
        {
            "name": "",
            "type": "uint256",
            "internalType": "uint256"
        }
        ],
        "outputs": [],
        "stateMutability": "pure"
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
            "name": "approved",
            "type": "address",
            "indexed": true,
            "internalType": "address"
        },
        {
            "name": "tokenId",
            "type": "uint256",
            "indexed": true,
            "internalType": "uint256"
        }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ApprovalForAll",
        "inputs": [
        {
            "name": "owner",
            "type": "address",
            "indexed": true,
            "internalType": "address"
        },
        {
            "name": "operator",
            "type": "address",
            "indexed": true,
            "internalType": "address"
        },
        {
            "name": "approved",
            "type": "bool",
            "indexed": false,
            "internalType": "bool"
        }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "CredentialsIssued",
        "inputs": [
        {
            "name": "tokenId",
            "type": "uint256",
            "indexed": false,
            "internalType": "uint256"
        },
        {
            "name": "issuer",
            "type": "address",
            "indexed": false,
            "internalType": "address"
        },
        {
            "name": "worker",
            "type": "address",
            "indexed": false,
            "internalType": "address"
        },
        {
            "name": "issuedAt",
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
            "name": "tokenId",
            "type": "uint256",
            "indexed": true,
            "internalType": "uint256"
        }
        ],
        "anonymous": false
    },
    {
        "type": "error",
        "name": "ERC721IncorrectOwner",
        "inputs": [
        {
            "name": "sender",
            "type": "address",
            "internalType": "address"
        },
        {
            "name": "tokenId",
            "type": "uint256",
            "internalType": "uint256"
        },
        {
            "name": "owner",
            "type": "address",
            "internalType": "address"
        }
        ]
    },
    {
        "type": "error",
        "name": "ERC721InsufficientApproval",
        "inputs": [
        {
            "name": "operator",
            "type": "address",
            "internalType": "address"
        },
        {
            "name": "tokenId",
            "type": "uint256",
            "internalType": "uint256"
        }
        ]
    },
    {
        "type": "error",
        "name": "ERC721InvalidApprover",
        "inputs": [
        {
            "name": "approver",
            "type": "address",
            "internalType": "address"
        }
        ]
    },
    {
        "type": "error",
        "name": "ERC721InvalidOperator",
        "inputs": [
        {
            "name": "operator",
            "type": "address",
            "internalType": "address"
        }
        ]
    },
    {
        "type": "error",
        "name": "ERC721InvalidOwner",
        "inputs": [
        {
            "name": "owner",
            "type": "address",
            "internalType": "address"
        }
        ]
    },
    {
        "type": "error",
        "name": "ERC721InvalidReceiver",
        "inputs": [
        {
            "name": "receiver",
            "type": "address",
            "internalType": "address"
        }
        ]
    },
    {
        "type": "error",
        "name": "ERC721InvalidSender",
        "inputs": [
        {
            "name": "sender",
            "type": "address",
            "internalType": "address"
        }
        ]
    },
    {
        "type": "error",
        "name": "ERC721NonexistentToken",
        "inputs": [
        {
            "name": "tokenId",
            "type": "uint256",
            "internalType": "uint256"
        }
        ]
    },
    {
        "type": "error",
        "name": "StringsInsufficientHexLength",
        "inputs": [
        {
            "name": "value",
            "type": "uint256",
            "internalType": "uint256"
        },
        {
            "name": "length",
            "type": "uint256",
            "internalType": "uint256"
        }
        ]
    },
    {
        "type": "error",
        "name": "WorkProof_CannotIssueSelf",
        "inputs": []
    },
    {
        "type": "error",
        "name": "WorkProof_InvalidAddress",
        "inputs": []
    },
    {
        "type": "error",
        "name": "WorkProof_InvalidRating",
        "inputs": []
    },
    {
        "type": "error",
        "name": "WorkProof_NotVerifiedIssuer",
        "inputs": []
    },
    {
        "type": "error",
        "name": "WorkProof_Soulbound",
        "inputs": []
    },
    {
        "type": "error",
        "name": "WorkProof_TokenDoesNotExist",
        "inputs": []
    }
];
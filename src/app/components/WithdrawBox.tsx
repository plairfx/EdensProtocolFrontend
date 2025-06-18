"use client"
import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography'
import * as generate_witness from '../../../zk-utils/generate_witness.js';
import { AbiCoder, ethers } from 'ethers';


import SelectCustomOption from './Tokens';
import { useState, useMemo, useRef, useEffect } from "react"
import { chainsForEden, EdenEVMAbi, EdenPLAbi, erc20Abi } from "../constants.ts"
import { useReadContract, useChainId, useConfig, useAccount, useWriteContract } from 'wagmi'
import { readContract, waitForTransactionReceipt } from "@wagmi/core"
import { parseEther } from 'viem'
import BasicModal from "./DepositModal.tsx";
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import Divider from '@mui/joy/Divider';
import { pbkdf2 } from 'crypto';



export default function BoxSystemProps2() {

    // Input values..
    const abiCoder = new AbiCoder();
    const [recipients, setRecipients] = useState("")
    const [tokens, setTokens] = useState("1")
    const [proof, setProof] = useState("");

    const buttonie = useRef<HTMLButtonElement>(null)

    const { data: hash, isPending, writeContractAsync } = useWriteContract()

    const chainId = useChainId()
    const config = useConfig()
    const account = useAccount()
    const inputStyles = {
        height: 20,
        width: 240,
    };


    async function handleSubmit() {
        const Link = chainsForEden[chainId]["Link"]

        const args = [proof, recipients, 0]
        console.log(recipients)


        const witness = await generate_witness.main(args);

        const [pA, pB, pC, root, nullifierHash, WithdrawAmount] = abiCoder.decode(
            [
                "uint256[2]",
                "uint256[2][2]",
                "uint256[2]",
                "bytes32",
                "bytes32",
                "bytes32",
            ], witness
        );


        if (chainId == 11155111) {

            const EdenPLAddressLINK = chainsForEden[chainId]["EdenPLLINK"]

            const pAClean = [pA[0], pA[1]];
            const pBClean = [[pB[0][0], pB[0][1]], [pB[1][0], pB[1][1]]];
            const pCClean = [pC[0], pC[1]];

            await writeContractAsync({
                abi: EdenPLAbi,
                address: EdenPLAddressLINK as `0x${string}`,
                functionName: "withdraw",
                args: [
                    pAClean,
                    pBClean,
                    pCClean,
                    nullifierHash,
                    recipients as `0x${string}`,
                    root,
                    BigInt(0),
                    "0x0000000000000000000000000000000000000000" as `0x${string}`,
                    BigInt(WithdrawAmount)
                ],
            })
            console.log("WITHDRAW COMPLETE!")

            if (tokens != "1") {
                await writeContractAsync({
                    abi: EdenPLAbi,
                    address: EdenPLAddressLINK as `0x${string}`,
                    functionName: "withdraw",
                    args: [
                        pAClean,
                        pBClean,
                        pCClean,
                        nullifierHash,
                        recipients as `0x${string}`,
                        root,
                        BigInt(0),
                        "0xd2135CfB216b74109775236E36d4b433F1DF507B" as `0x${string}`,
                        BigInt(WithdrawAmount)
                    ],
                })

            } else {
                const EdenPLAddressETH = chainsForEden[chainId]["EdenPLETH"]


                await writeContractAsync({
                    abi: EdenPLAbi,
                    address: EdenPLAddressETH as `0x${string}`,
                    functionName: "withdraw",
                    args: [
                        pA,
                        pB,
                        pC,
                        nullifierHash,
                        recipients as `0x${string}`,
                        root,
                        "0",
                        "0",
                        WithdrawAmount
                    ],
                })

            }
        } else {
            const EdenEVMLINK = chainsForEden[chainId]["EdenEVMLINK"]
            const EdenEVMETH = chainsForEden[chainId]["EdenEVMETH"]
            const Link = chainsForEden[chainId]["Link"]

            if (tokens != "1") {

                await writeContractAsync({
                    abi: EdenPLAbi,
                    address: EdenEVMLINK as `0x${string}`,
                    functionName: "withdraw",
                    args: [
                        pA,
                        pB,
                        pC,
                        nullifierHash,
                        recipients as `0x${string}`,
                        root,
                        "0",
                        "0",
                        WithdrawAmount
                    ],
                })


            } else {

                await writeContractAsync({
                    abi: EdenPLAbi,
                    address: EdenEVMLINK as `0x${string}`,
                    functionName: "withdraw",
                    args: [
                        pA,
                        pB,
                        pC,
                        nullifierHash,
                        recipients as `0x${string}`,
                        root,
                        "0",
                        "0",
                        WithdrawAmount
                    ],
                })

            }

        }


    }

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 0,
            padding: 0,
            height: 600,
        }}>

            <Box
                sx={{
                    bgcolor: '#fff',
                    height: 500,
                    width: 500,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 4,
                    p: 2,
                    borderRadius: '10px',
                    flexDirection: 'column',

                }}
            >

                <h1 style={{
                    fontSize: '25px',
                    fontWeight: 'bolder',
                    color: 'black'
                }}>
                    Withdraw
                </h1>
                <div><SelectCustomOption onChange={setTokens} /></div>

                <div><Input
                    sx={inputStyles} placeholder="Enter receiver...." value={recipients} onChange={(e) => setRecipients(e.target.value)} /></div>
                <div><Input
                    sx={inputStyles} placeholder="Enter deposit note....." value={proof} onChange={(e) => setProof(e.target.value)} /></div>

                <Divider>

                </Divider>

                <div><Button ref={buttonie} onClick={handleSubmit} sx={{

                    color: 'white',
                    backgroundColor: 'blue',
                    borderRadius: '10px',
                    width: 150,
                }} >Withdraw</Button></div>

                {/* <BasicModal WithdrawProof={proof} /> */}
            </Box>
        </div>
    );
}
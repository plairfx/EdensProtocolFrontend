"use client"
import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import * as generateCommitment from '../../../zk-utils/generateCommitment.js';
import Typography from '@mui/joy/Typography'
import * as generate_witness from '../../../zk-utils/generate_witness.js';


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

        const args = [proof, recipients, "0"]

        const [pA, pB, pC, root, nullifierHash, WithdrawAmount] = await generate_witness.main(args);


        if (chainId == 11155111) {

            const EdenPLAddressLINK = chainsForEden[chainId]["EdenPLLINK"]

            if (tokens != "1") {
                await writeContractAsync({
                    abi: EdenPLAbi,
                    address: EdenPLAddressLINK as `0x${string}`,
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
"use client"
import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { main, second } from '../../../zk-utils/generateCommitment.js';
import Typography from '@mui/joy/Typography'
import ButtonGroup from '@mui/joy/ButtonGroup';

import SelectCustomOption from './Tokens';
import { useState, useMemo, useRef, useEffect } from "react"
import { chainsForEden, EdenEVMAbi, EdenPLAbi, erc20Abi } from "../constants.ts"
import { useReadContract, useChainId, useConfig, useAccount, useWriteContract } from 'wagmi'
import { readContract, waitForTransactionReceipt } from "@wagmi/core"
import { parseEther } from 'viem'
import BasicModal from "./DepositModal.tsx";
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import Divider from '@mui/joy/Divider';
import Chip from '@mui/joy/Chip';


export default function BoxSystemProps() {

    const [tokens, setTokens] = useState("1")
    const [amounts, setAmounts] = useState("")
    const buttonie = useRef<HTMLButtonElement>(null)
    const { data: hash, isPending, writeContractAsync } = useWriteContract()
    const [proof, setProof] = useState("");

    const chainId = useChainId()
    const config = useConfig()
    const account = useAccount()
    const inputStyles = {
        height: 20,
        width: 240,
    };

    async function getApprovedAmount(EdenAddress: string | null): Promise<number> {
        if (!EdenAddress) {
            alert("No address found, use a supported chain")
            return 0
        }

        buttonie.current && (buttonie.current.innerText = "Loading...")

        const Link = chainsForEden[chainId]["Link"]
        const response = await readContract(config, {

            abi: erc20Abi,
            address: Link as `0x${string}`,
            functionName: `allowance`,
            args: [account.address, EdenAddress as `0x${string}`]
        })

        return response as number
    }

    async function handleSubmit() {
        console.log(amounts)
        console.log(tokens)

        // We need to fine-tune the error handling, 


        const Link = chainsForEden[chainId]["Link"]

        const realAmount = parseEther(amounts)
        const args = [realAmount];

        buttonie.current && (buttonie.current.innerText = "Processing...")

        if (chainId == 11155111) {

            const EdenPLAddressLINK = chainsForEden[chainId]["EdenPLLINK"]

            if (tokens != "1") {
                const approvedAmount = await getApprovedAmount(EdenPLAddressLINK)

                if (Number(realAmount) > approvedAmount) {
                    await writeContractAsync({
                        abi: erc20Abi,
                        address: Link as `0x${string}`,
                        functionName: "approve",
                        args: [
                            EdenPLAddressLINK as `0x${string}`,
                            realAmount,
                        ],
                    })
                }
                const [commitment, note] = await second(args);
                const cleanCommitment = String(commitment).slice(2)
                console.log(cleanCommitment, commitment)
                const fee = parseEther("0.01")


                await writeContractAsync({
                    abi: EdenPLAbi,
                    address: EdenPLAddressLINK as `0x${string}`,
                    functionName: "deposit",
                    args: [
                        cleanCommitment,
                        realAmount,
                        0,
                    ],
                })
                setProof(note)
            } else {
                const EdenPLAddressETH = chainsForEden[chainId]["EdenPLETH"]
                const [commitment, note] = await second(args);
                const cleanCommitment = String(commitment).slice(2);
                const fee = parseEther("0.01");
                console.log(commitment)

                await writeContractAsync({
                    abi: EdenPLAbi,
                    address: EdenPLAddressETH as `0x${string}`,
                    functionName: "deposit",
                    value: realAmount,
                    args: [
                        cleanCommitment,
                        realAmount,
                        0,
                    ],
                })
                setProof(note)
            }
        } else {
            const EdenEVMLINK = chainsForEden[chainId]["EdenEVMLINK"]
            const EdenEVMETH = chainsForEden[chainId]["EdenEVMETH"]
            const Link = chainsForEden[chainId]["Link"]

            if (tokens != "1") {

                const approvedAmount = await getApprovedAmount(EdenEVMLINK)

                if (Number(amounts) > approvedAmount) {
                    await writeContractAsync({
                        abi: erc20Abi,
                        address: Link as `0x${string}`,
                        functionName: "approve",
                        args: [
                            EdenEVMLINK as `0x${string}`,
                            realAmount,
                        ],
                    })

                }
                const [commitment, note] = await second(args);
                const cleanCommitment = String(commitment).slice(2);

                const fee = parseEther("0.01")
                await writeContractAsync({
                    abi: EdenEVMAbi,
                    address: EdenEVMLINK as `0x${string}`,
                    functionName: "deposit",
                    value: (fee),
                    args: [
                        cleanCommitment,
                        realAmount,
                        0,
                    ],
                })
                setProof(note)

            } else {
                const [commitment, note] = await second(args);
                const cleanCommitment = String(commitment).slice(2);

                const fee = parseEther("0.01")
                await writeContractAsync({
                    abi: EdenEVMAbi,
                    address: EdenEVMETH as `0x${string}`,
                    functionName: "deposit",
                    value: realAmount + fee,
                    args: [
                        cleanCommitment,
                        parseEther(amounts),
                        0,
                    ],
                })
                setProof(note)
            }

        }
        buttonie.current && (buttonie.current.innerText = "Completed!")

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
                    Deposit
                </h1>
                <div><SelectCustomOption onChange={setTokens} /></div>

                <div><Input
                    sx={inputStyles} placeholder="Enter token amount..." value={amounts} onChange={(e) => setAmounts(e.target.value)} /></div>
                <Divider>

                </Divider>
                <div><Button ref={buttonie} onClick={handleSubmit} sx={{
                    color: 'white',
                    backgroundColor: 'blue',
                    borderRadius: '40px',
                    width: 150,
                }} >Deposit</Button></div>

                <BasicModal WithdrawProof={proof} />
            </Box>
        </div>
    );
}
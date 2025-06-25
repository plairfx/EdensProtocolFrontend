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



import SelectCustomOption from './Tokens.tsx';
import { useState, useMemo, useRef, useEffect } from "react"
import { chainsForEden, EdenEVMAbi, EdenPLAbi, erc20Abi } from "../constants"
import { useReadContract, useChainId, useConfig, useAccount, useWriteContract } from 'wagmi'
import { readContract, waitForTransactionReceipt, type WriteContractReturnType, getBalance } from "@wagmi/core"
import { parseEther, formatEther } from 'viem'
import BasicModal from "./WithdrawModal.tsx";
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import Divider from '@mui/joy/Divider';
import { pbkdf2 } from 'crypto';
import { reset } from 'viem/actions';



export default function BoxSystemProps2() {
    const abiCoder = new AbiCoder();
    const [recipients, setRecipients] = useState("")
    const [tokens, setTokens] = useState("1")
    const [proof, setProof] = useState("");
    const [modalOpen, setModalOpen] = useState("")
    const buttonie = useRef<HTMLButtonElement>(null)
    const { data: hash, isPending, writeContractAsync } = useWriteContract()
    const [balance, setBalance] = useState("")

    const chainId = useChainId()
    const config = useConfig()
    const account = useAccount()
    const inputStyles = {
        height: 20,
        width: 240,
    };


    useEffect(() => {
        getPoolBalance();
    }, [chainId, tokens]);


    async function handleSubmit() {

        const Link = chainsForEden[chainId]["Link"]
        const argsie = [proof, recipients, 0, tokens]

        buttonie.current && (buttonie.current.innerText = "Processing Proof...")

        const witness = await generate_witness.main(argsie)

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

        const pAClean = [pA[0], pA[1]];
        const pBClean = [[pB[0][0], pB[0][1]], [pB[1][0], pB[1][1]]];
        const pCClean = [pC[0], pC[1]];

        if (chainId == 11155111) {

            if (tokens != "1") {
                const EdenPLAddressLINK = chainsForEden[chainId]["EdenPLLINK"]

                buttonie.current && (buttonie.current.innerText = "Submitting Withdraw...")
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

            } else {
                const EdenPLAddressETH = chainsForEden[chainId]["EdenPLETH"]
                await writeContractAsync({
                    abi: EdenPLAbi,
                    address: EdenPLAddressETH as `0x${string}`,
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

            }
        } else {
            const EdenEVMLINK = chainsForEden[chainId]["EdenEVMLINK"]
            const EdenEVMETH = chainsForEden[chainId]["EdenEVMETH"]
            const Link = chainsForEden[chainId]["Link"]

            if (tokens != "1") {

                await writeContractAsync({
                    abi: EdenEVMAbi,
                    address: EdenEVMLINK as `0x${string}`,
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


            } else {

                await writeContractAsync({
                    abi: EdenEVMAbi,
                    address: EdenEVMLINK as `0x${string}`,
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

            }

        }
        buttonie.current && (buttonie.current.innerText = "Submit!")

        setModalOpen("Withdraw completed successfully!")
    }



    async function getPoolBalance(): Promise<Number> {
        if (chainId == 11155111) {

            const Link = chainsForEden[chainId]["Link"]

            if (tokens == "1") {
                const EdenPLAddressETH = chainsForEden[chainId]["EdenPLETH"]
                const balance = await getBalance(config, {
                    address: EdenPLAddressETH as `0x${string}`,
                    chainId: chainId,
                })
                setBalance(formatEther(balance.value));
                return Number(balance)
            } else {
                const EdenPLAddressLINK = chainsForEden[chainId]["EdenPLLINK"]
                const balance = await readContract(config, {

                    abi: erc20Abi,
                    address: Link as `0x${string}`,
                    functionName: `balanceOf`,
                    args: [EdenPLAddressLINK as `0x${string}`]
                })
                setBalance(formatEther(balance));
                return Number(balance)

            }
        } else if (chainId == 84532) {
            const Link = chainsForEden[chainId]["Link"]

            if (tokens == "1") {
                const EdenEVMAddressETH = chainsForEden[chainId]["EdenEVMETH"]
                const balance = await getBalance(config, {
                    address: EdenEVMAddressETH as `0x${string}`,
                    chainId: chainId,
                })
                setBalance(formatEther(balance.value));
                return Number(balance)

            } else {
                const EdenEVMAddressLINK = chainsForEden[chainId]["EdenEVMLINK"]
                const balance = await readContract(config, {

                    abi: erc20Abi,
                    address: Link as `0x${string}`,
                    functionName: `balanceOf`,
                    args: [EdenEVMAddressLINK as `0x${string}`]
                })
                setBalance(formatEther(balance));
                return Number(balance)

            }
        } else {
            // avalanche has only LINK!
            const Link = chainsForEden[chainId]["Link"]
            const EdenEVMAddressLINK = chainsForEden[chainId]["EdenEVMLINK"]
            const balance = await readContract(config, {

                abi: erc20Abi,
                address: Link as `0x${string}`,
                functionName: `balanceOf`,
                args: [EdenEVMAddressLINK as `0x${string}`]
            })

            setBalance(formatEther(balance));
            return Number(balance)

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
                <div>
                    <FormLabel>Token</FormLabel>
                    <SelectCustomOption onChange={setTokens} /></div>

                <div>
                    <FormLabel>Receiver Address</FormLabel>
                    <Input
                        sx={inputStyles} placeholder="Enter receiver...." value={recipients} onChange={(e) => setRecipients(e.target.value)} /></div>
                <div>
                    <FormLabel>Deposit Proof</FormLabel>
                    <Input
                        sx={inputStyles} placeholder="Enter deposit note....." value={proof} onChange={(e) => setProof(e.target.value)} /></div>


                <Typography>Pool Balance:{balance}</Typography>
                <div><Button ref={buttonie} onClick={handleSubmit} sx={{
                    color: 'white',
                    backgroundColor: 'blue',
                    borderRadius: '10px',
                    width: 150,
                }} >Withdraw</Button></div>

                <BasicModal Message={modalOpen} />




            </Box>
        </div>
    );
}

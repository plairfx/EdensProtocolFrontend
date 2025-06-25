"use client"
import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { main, second } from '../../../zk-utils/generateCommitment.js';
import Typography from '@mui/joy/Typography'
import ButtonGroup from '@mui/joy/ButtonGroup';

import SelectCustomOption from './Tokens';
import { useState, useMemo, useRef, useEffect } from "react"
import { chainsForEden, EdenEVMAbi, EdenPLAbi, erc20Abi } from "../constants"
import { useReadContract, useChainId, useConfig, useAccount, useWriteContract } from 'wagmi'
import { readContract, waitForTransactionReceipt, getBalance } from "@wagmi/core"
import { parseEther, weiUnits, formatEther } from 'viem'
import BasicModal from "./DepositModal";
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import Divider from '@mui/joy/Divider';
import Chip from '@mui/joy/Chip';
import { error } from 'console';
import RecentlyDepositedAndWithdrawn from './RecentlyDepositedBox';


export default function BoxSystemProps() {

    const [tokens, setTokens] = useState("1")
    const [error, setError] = useState("")
    const [amounts, setAmounts] = useState("")
    const buttonie = useRef<HTMLButtonElement>(null)
    const errorMessage = useRef<HTMLTextAreaElement>(null)
    const { data: hash, isPending, writeContractAsync } = useWriteContract()
    const [proof, setProof] = useState("");

    const chainId = useChainId()
    const config = useConfig()
    const account = useAccount()
    const inputStyles = {
        height: 20,
        width: 240,
    };
    const [balance, setBalance] = useState("")

    useEffect(() => {
        getPoolBalance();
    }, [chainId, tokens]);



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


    async function getBalanceUser(tokenAmount: number): Promise<boolean> {
        const Link = chainsForEden[chainId]["Link"]

        if (tokens == "1") {
            const balance = await getBalance(config, {
                address: account.address as `0x${string}`,
                chainId: chainId,
            })

            const ethBalance = parseEther(tokenAmount.toString())


            if (tokenAmount > (balance.value)) {
                errorMessage.current && (errorMessage.current.innerText = "Your ETH balance is too low!")

                return true
            }

        } else {
            const response = await readContract(config, {

                abi: erc20Abi,
                address: Link as `0x${string}`,
                functionName: `balanceOf`,
                args: [account.address]
            })

            if (tokenAmount > Number(response)) {
                setError("Your balance is too low!")

                setTimeout(() => {
                    setError("")
                }, 5000)
                errorMessage.current && (errorMessage.current.innerText = "Your LINK Balance is too low!")
                return true
            }

            return false

        }
        return false;

    }

    async function getPoolBalance(): Promise<Number> {
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
    }

    async function handleSubmit() {

        const Link = chainsForEden[chainId]["Link"]

        const realAmount = parseEther(amounts)
        const args = [realAmount];


        buttonie.current && (buttonie.current.innerText = "Processing...")

        if (chainId == 11155111) {

            const EdenPLAddressLINK = chainsForEden[chainId]["EdenPLLINK"]

            if (tokens != "1") {

                const amount = await getBalanceUser(Number(realAmount))
                if (amount == true) {
                    buttonie.current && (buttonie.current.innerText = "Deposit")
                    throw new Error("Insufficient balance");

                }
                const approvedAmount = await getApprovedAmount(EdenPLAddressLINK)

                if (Number(realAmount) > approvedAmount) {
                    buttonie.current && (buttonie.current.innerText = "Approving...!")
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

                buttonie.current && (buttonie.current.innerText = "Sending...!")
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

                const amount = await getBalanceUser(Number(realAmount))

                if (amount == true) {
                    buttonie.current && (buttonie.current.innerText = "Deposit")
                    throw new Error("Insufficient balance");
                }

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
                const amount = await getBalanceUser(Number(realAmount))
                if (amount == true) {
                    buttonie.current && (buttonie.current.innerText = "Deposit")
                    throw new Error("Insufficient balance");
                }
                const approvedAmount = await getApprovedAmount(EdenEVMLINK)
                console.log("Hello", formatEther(approvedAmount))
                console.log(realAmount)

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
                const Low = await writeContractAsync({
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

                console.log(Low)
                setProof(note)

            } else {
                const [commitment, note] = await second(args);
                const cleanCommitment = String(commitment).slice(2);

                const amount = await getBalanceUser(Number(realAmount))
                if (amount == true) {
                    buttonie.current && (buttonie.current.innerText = "Deposit")
                    throw new Error("Insufficient balance");
                }

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
                    {error && <div>{error}</div>}
                    Deposit
                </h1>
                <div>
                    <FormLabel>Token</FormLabel>
                    <SelectCustomOption onChange={setTokens} /></div>

                <div>
                    <FormLabel>Token Amount</FormLabel>
                    <Input
                        sx={inputStyles} placeholder="Enter token amount..." value={amounts} onChange={(e) => setAmounts(e.target.value)} /></div>
                <Typography>Pool Balance:{balance}</Typography>

                <Divider>
                    <Typography ref={errorMessage}> </Typography>
                </Divider>
                <div><Button ref={buttonie} onClick={handleSubmit} sx={{
                    color: 'white',
                    backgroundColor: 'blue',
                    borderRadius: '40px',
                    width: 150,
                }} >Deposit</Button></div>

                <BasicModal WithdrawProof={proof} />

            </Box >

        </div >

    );
}
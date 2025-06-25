"use client"
import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography'
import * as generate_witness from '../../../zk-utils/generate_witness.js';



import SelectCustomOption from './Tokens';
import { useState, useMemo, useRef, useEffect } from "react"
import { chainsForEden, EdenEVMAbi, EdenPLAbi, EdenVaultAbi, erc20Abi } from "../constants"
import { useReadContract, useChainId, useConfig, useAccount, useWriteContract } from 'wagmi'
import { readContract, waitForTransactionReceipt, type WriteContractReturnType, getBalance } from "@wagmi/core"
import { parseEther, formatEther } from 'viem'
import BasicModal from "./WithdrawModal";
import Divider from '@mui/joy/Divider';
import { pbkdf2 } from 'crypto';
import { reset } from 'viem/actions';
import { error } from 'console';
import { N } from 'ethers';



export default function BoxSystemProps2() {
    const [tokens, setTokens] = useState("1")
    const [amounts, setAmounts] = useState("");
    const [minAmount, setMinAmount] = useState("")


    const buttonie = useRef<HTMLButtonElement>(null)
    const { data: hash, isPending, writeContractAsync } = useWriteContract()
    const [balance, setBalance] = useState("")
    const errorMessage = useRef<HTMLTextAreaElement>(null)
    const [error, setError] = useState("")
    const [Assets, setAssets] = useState("")

    const chainId = useChainId()
    const config = useConfig()
    const account = useAccount()
    const inputStyles = {
        height: 20,
        width: 240,
    };

    useEffect(() => {
        getVaultBalance();
    }, [chainId, tokens]);

    useEffect(() => {
        getConvertedToAssets();
    }, [chainId, tokens, amounts]);

    async function getBalanceUser(tokenAmount: number): Promise<Number> {

        if (tokens == "1") {
            const EdenVaultETH = chainsForEden[chainId]["EdenVaultETH"]
            const response = await readContract(config, {

                abi: EdenVaultAbi,
                address: EdenVaultETH as `0x${string}`,
                functionName: `balanceOf`,
                args: [account.address]
            })
            console.log("Shares User", Number(response))

            if (tokenAmount > Number(response)) {
                setError("Your balance is too low!")

                setTimeout(() => {
                    setError("")
                }, 5000)
                errorMessage.current && (errorMessage.current.innerText = "Your Shares Balance is too low!")
                return Number(response)
            }
            return Number(response)


        } else {
            const EdenVaultLINK = chainsForEden[chainId]["EdenVaultLINK"]
            const response = await readContract(config, {

                abi: EdenVaultAbi,
                address: EdenVaultLINK as `0x${string}`,
                functionName: `balanceOf`,
                args: [account.address]
            })

            if (tokenAmount > Number(response)) {
                setError("Your balance is too low!")

                setTimeout(() => {
                    setError("")
                }, 5000)
                errorMessage.current && (errorMessage.current.innerText = "Your Shares Balance is too low!")
                return Number(response)
            }
            return Number(response)

        }
    }

    async function getConvertedToAssets(): Promise<number> {
        const EdenETHVault = chainsForEden[chainId]["EdenVaultETH"]
        const EdenLinkVault = chainsForEden[chainId]["EdenVaultLINK"]

        if (tokens == "1") {
            const response = await readContract(config, {
                abi: EdenVaultAbi,
                address: EdenETHVault as `0x${string}`,
                functionName: `convertToAssets`,
                args: [parseEther(amounts)]
            })
            setAssets(formatEther(response));
            return Number(response)
        } else {
            const response = await readContract(config, {
                abi: EdenVaultAbi,
                address: EdenLinkVault as `0x${string}`,
                functionName: `convertToAssets`,
                args: [parseEther(amounts)]
            })
            setAssets(formatEther(response));
            return Number(response)

        }
    }

    async function handleSubmit() {

        const Link = chainsForEden[chainId]["Link"]

        buttonie.current && (buttonie.current.innerText = "Withdrawing Assets...")

        const balanceUser = await getBalanceUser(Number(amounts))

        if (balanceUser == 0) {
            errorMessage.current && (errorMessage.current.innerText = "Your don't own any shares!")
            throw new Error("You don't own any shares!");
        }

        if (Number(amounts) > Number(balanceUser)) {
            buttonie.current && (buttonie.current.innerText = "Withdraw")
            throw new Error("Insufficient balance");
        }

        if (tokens != "1") {
            const EdenLinkVault = chainsForEden[chainId]["EdenVaultLINK"]

            buttonie.current && (buttonie.current.innerText = "Submitting Withdraw...")
            await writeContractAsync({
                abi: EdenVaultAbi,
                address: EdenLinkVault as `0x${string}`,
                functionName: "withdraw",
                args: [
                    parseEther(amounts),
                    parseEther(minAmount)
                ],
            })
        } else {
            const EdenETHVault = chainsForEden[chainId]["EdenVaultETH"]

            await writeContractAsync({
                abi: EdenVaultAbi,
                address: EdenETHVault as `0x${string}`,
                functionName: "withdraw",
                args: [
                    parseEther(amounts),
                    parseEther(minAmount)
                ],
            })

        }
        errorMessage.current && (errorMessage.current.innerText = "Withdraw Completed!")
        buttonie.current && (buttonie.current.innerText = "Withdraw")
    }

    async function getVaultBalance(): Promise<Number> {
        const Link = chainsForEden[chainId]["Link"]
        if (tokens == "1") {
            const EdenETHVault = chainsForEden[chainId]["EdenVaultETH"]
            const balance = await readContract(config, {

                abi: EdenVaultAbi,
                address: EdenETHVault as `0x${string}`,
                functionName: `totalAssets`,

            })
            setBalance(formatEther(balance));
            return Number(balance)
        } else {
            const EdenLinkVault = chainsForEden[chainId]["EdenVaultLINK"]
            const balance = await readContract(config, {

                abi: EdenVaultAbi,
                address: EdenLinkVault as `0x${string}`,
                functionName: `totalAssets`,

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
                    height: 600,
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
                    Withdraw Liquidity
                </h1>
                <div>
                    <FormLabel>Token</FormLabel>
                    <SelectCustomOption onChange={setTokens} /></div>

                <div>
                    <FormLabel>Amount</FormLabel>
                    <Input
                        sx={inputStyles} placeholder="Enter amount...." value={amounts} onChange={(e) => setAmounts(e.target.value)} /></div>
                <div>
                    <FormLabel>Minimum Shares To Receive</FormLabel>
                    <Input
                        sx={inputStyles} placeholder="Enter min shares...." value={minAmount} onChange={(e) => setMinAmount(e.target.value)} /></div>



                <Typography>Expected Assets:{Assets}</Typography>
                <Typography>Vault Balance:{balance} </Typography>

                <Divider>
                    <Typography ref={errorMessage}> </Typography>
                </Divider>
                <div><Button ref={buttonie} onClick={handleSubmit} sx={{
                    color: 'white',
                    backgroundColor: 'blue',
                    borderRadius: '10px',
                    width: 150,
                }} >Withdraw</Button></div>

            </Box>

        </div>
    );
}
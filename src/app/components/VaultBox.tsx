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
import { chainsForEden, EdenEVMAbi, EdenPLAbi, EdenVaultAbi, erc20Abi } from "../constants"
import { useReadContract, useChainId, useConfig, useAccount, useWriteContract } from 'wagmi'
import { readContract, waitForTransactionReceipt, type WriteContractReturnType, getBalance } from "@wagmi/core"
import { parseEther, formatEther } from 'viem'
import BasicModal from "./WithdrawModal";
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import Divider from '@mui/joy/Divider';
import { pbkdf2 } from 'crypto';
import { reset } from 'viem/actions';
import { error } from 'console';



export default function BoxSystemProps2() {
    const abiCoder = new AbiCoder();
    const [tokens, setTokens] = useState("1")
    const [amounts, setAmounts] = useState("");
    const [minAmount, setMinAmount] = useState("")

    const [shares, setShares] = useState("")

    const [modalOpen, setModalOpen] = useState("")
    const buttonie = useRef<HTMLButtonElement>(null)
    const { data: hash, isPending, writeContractAsync } = useWriteContract()
    const [balance, setBalance] = useState("")
    const errorMessage = useRef<HTMLTextAreaElement>(null)
    const [error, setError] = useState("")

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
        getConvertedShares();
    }, [chainId, tokens, amounts]);


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


    async function getConvertedShares(): Promise<number> {
        const EdenETHVault = chainsForEden[chainId]["EdenVaultETH"]
        const EdenLinkVault = chainsForEden[chainId]["EdenVaultLINK"]

        if (tokens == "1") {
            const response = await readContract(config, {
                abi: EdenVaultAbi,
                address: EdenETHVault as `0x${string}`,
                functionName: `convertToShares`,
                args: [parseEther(amounts)]
            })
            setShares(response)
            return Number(response)
        } else {
            const response = await readContract(config, {
                abi: EdenVaultAbi,
                address: EdenLinkVault as `0x${string}`,
                functionName: `convertToShares`,
                args: [parseEther(amounts)]
            })
            setShares(Number(response))
            return Number(response)
        }
    }



    async function handleSubmit() {

        const Link = chainsForEden[chainId]["Link"]

        buttonie.current && (buttonie.current.innerText = "Deposting tokens...")

        if (tokens != "1") {
            const EdenLinkVault = chainsForEden[chainId]["EdenVaultLINK"]

            const amount = await getBalanceUser(Number(parseEther(amounts)))
            if (amount == true) {
                buttonie.current && (buttonie.current.innerText = "Deposit")
                throw new Error("Insufficient balance");
            }

            const approvedAmount = await getApprovedAmount(EdenLinkVault)

            if (Number(amounts) > approvedAmount) {

                await writeContractAsync({
                    abi: erc20Abi,
                    address: Link as `0x${string}`,
                    functionName: "approve",
                    args: [
                        EdenLinkVault as `0x${string}`,
                        parseEther(amounts),
                    ],
                })

            }

            buttonie.current && (buttonie.current.innerText = "Submitting Deposit...")
            await writeContractAsync({
                abi: EdenVaultAbi,
                address: EdenLinkVault as `0x${string}`,
                functionName: "deposit",
                args: [
                    parseEther(amounts),
                    parseEther(minAmount)
                ],
            })

        } else {
            const EdenETHVault = chainsForEden[chainId]["EdenVaultETH"]

            const amount = await getBalanceUser(Number(parseEther(amounts)))

            if (amount == true) {
                buttonie.current && (buttonie.current.innerText = "Deposit")
                throw new Error("Insufficient balance");
            }
            await writeContractAsync({
                abi: EdenVaultAbi,
                address: EdenETHVault as `0x${string}`,
                functionName: "deposit",
                value: parseEther(amounts),
                args: [
                    parseEther(amounts),
                    parseEther(minAmount)
                ],
            })

        }
        buttonie.current && (buttonie.current.innerText = "Deposit")
    }

    async function getVaultBalance(): Promise<Number> {
        const Link = chainsForEden[chainId]["Link"]
        if (tokens == "1") {
            const EdenETHVault = chainsForEden[chainId]["EdenVaultETH"]
            const balance = await getBalance(config, {
                address: EdenETHVault as `0x${string}`,
                chainId: chainId,
            })
            setBalance(formatEther(balance.value));
            return Number(balance)
        } else {
            const EdenLinkVault = chainsForEden[chainId]["EdenVaultLINK"]
            const balance = await readContract(config, {

                abi: erc20Abi,
                address: Link as `0x${string}`,
                functionName: `balanceOf`,
                args: [EdenLinkVault as `0x${string}`]
            })
            setBalance(formatEther(balance));
            return Number(balance)

        }
    }

    async function getBalanceUser(tokenAmount: number): Promise<boolean> {
        const Link = chainsForEden[chainId]["Link"]

        if (tokens == "1") {
            const balance = await getBalance(config, {
                address: account.address as `0x${string}`,
                chainId: chainId,
            })

            const ethBalance = parseEther(tokenAmount.toString())


            if (tokenAmount > (Number(balance.value))) {
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
                    Deposit Liquidity
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


                <Typography sx={{
                    justifyContent: 'left'
                }}>Vault Balance:{balance} </Typography>
                <Typography>Expected Shares:{formatEther(shares)} Shares</Typography>

                <Divider>
                    <Typography ref={errorMessage}> </Typography>
                </Divider>
                <div><Button ref={buttonie} onClick={handleSubmit} sx={{
                    color: 'white',
                    backgroundColor: 'blue',
                    borderRadius: '10px',
                    width: 150,
                }} >Deposit</Button></div>



                <BasicModal Message={modalOpen} />




            </Box>

        </div>
    );
}
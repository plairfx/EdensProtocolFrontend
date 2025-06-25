"use client"
import { useAccount } from "wagmi"
import BoxSystemProps2 from "../../components/VaultWithdrawBox.tsx";
import ButtonGroup from '@mui/joy/ButtonGroup';
import Button from '@mui/joy/Button';
import Link from 'next/link'


export default function Withdraw() {
    const { isConnected } = useAccount()

    return (
        <main>
            {!isConnected ? (
                <div className="flex items-center justify-center p-4 md:p-6 xl:p-8">
                    <h1>Please connect a wallet</h1>
                </div>
            ) : (



                <div>
                    <ButtonGroup
                        variant="soft"
                        aria-label="outlined primary button group"
                        buttonFlex="0 1 200px"
                        sx={{ width: '100%', justifyContent: 'center', bgcolor: 'light-blue', my: 3, gap: 2, }}

                    >
                        <Link href="/"><Button sx={{
                            bgcolor: 'white',
                            color: 'black',
                            hover: 'gray',
                            borderRadius: "10px"
                        }}>Deposit</Button></Link>
                        <Link href="/withdraw"><Button sx={{
                            bgcolor: 'white',
                            color: 'black',
                            hover: 'gray',
                            borderRadius: "10px"
                        }}>Withdraw</Button></Link>
                        <Link href="/vault"><Button sx={{
                            bgcolor: 'white',
                            color: 'black',
                            hover: 'gray',
                            borderRadius: "10px"
                        }}>Deposit Vault</Button></Link>
                    </ButtonGroup>

                    <BoxSystemProps2></BoxSystemProps2>
                </div>


            )}
        </main>
    )

}
"use client"
import { useAccount } from "wagmi"
import BoxSystemProps2 from "../components/WithdrawBox.tsx";
import ButtonGroup from '@mui/joy/ButtonGroup';
import Button from '@mui/joy/Button';
import Link from 'next/link'
import RecentlyDepositedAndWithdrawn from "../components/RecentlyDepositedBox.tsx"


export default function Withdraw() {
    const { isConnected } = useAccount()

    return (
        <main>
            {!isConnected ? (
                <div className="flex items-center justify-center p-4 md:p-6 xl:p-8">
                    Please connect a wallet
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
                        <Button sx={{
                            bgcolor: 'gray',
                            color: 'black',
                            borderRadius: "10px"
                        }}>Withdraw</Button>
                    </ButtonGroup>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <BoxSystemProps2 />
                        <RecentlyDepositedAndWithdrawn></RecentlyDepositedAndWithdrawn>

                    </div>
                </div>
            )}
        </main>
    )

}
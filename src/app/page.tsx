"use client"
// import HomeContent from "./components/HomeContent"
import { useAccount } from "wagmi"
import Header from "./components/Header.tsx"
import '@fontsource/inter';
import BoxSystemProps from "./components/DepositBox.tsx"
import MinWidthButtonGroup from "./components/AboveSection.tsx"
import ButtonGroup from '@mui/joy/ButtonGroup';
import Button from '@mui/joy/Button'
import Link from 'next/link'


export default function Home() {

  const { isConnected } = useAccount()

  return (
    <main>
      <ButtonGroup
        variant="soft"
        aria-label="outlined primary button group"
        buttonFlex="0 1 200px"
        sx={{ width: '100%', justifyContent: 'center', bgcolor: 'light-blue', my: 3, gap: 2, }}

      >
        <Button sx={{
          bgcolor: 'gray',
          color: 'black',
          borderRadius: "10px"
        }}>Deposit</Button>
        <Link href="/withdraw"><Button sx={{
          bgcolor: 'white',
          color: 'black',
          hover: 'gray',
          borderRadius: "10px"
        }}>Withdraw</Button></Link>
      </ButtonGroup>
      <BoxSystemProps />
    </main>



  );
}


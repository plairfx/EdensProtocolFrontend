import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react"
import { Providers } from "./providers"
import Header from "./components/Header.tsx"
import '@fontsource/inter';
import BoxSystemProps from "./components/DepositBox.tsx"
import MinWidthButtonGroup from "./components/AboveSection.tsx"
import ButtonGroup from '@mui/joy/ButtonGroup';
import Button from '@mui/joy/Button'

export const metadata: Metadata = {
  title: "EdenProtocol",

};

export default function RootLayout(props: { children: ReactNode }) {


  return (
    <html lang="en">
      <body>
        <Providers>

          <Header />

          {props.children}
        </Providers>
      </body>
    </html >
  );
}

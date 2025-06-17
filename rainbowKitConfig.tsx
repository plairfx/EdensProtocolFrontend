"use client"

import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import { anvil, zksync, mainnet, sepolia, avalancheFuji, baseSepolia } from "wagmi/chains"

export default getDefaultConfig({
    appName: "myApp",
    projectId: "fa11144471794a72965c5c60158f9d51",
    chains: [sepolia, anvil, avalancheFuji, baseSepolia],
    ssr: false
})


import { useQuery } from "@tanstack/react-query"
import { useMemo, useState } from "react"
import { parseEther, formatEther } from 'viem'


interface DW {
  rindexerId: number
  chain: number
  blockNumber: string
  amount: string
  _asset: string
}

interface DepositAndWithdrawResponse {
  data: {
    allEdenPllinkDepositeds: {
      nodes: DW[]
    }
    allEdenPllinkWithdrawns: {
      nodes: DW[]
    }
    allEdenPlDepositeds: {
      nodes: DW[]
    }
    allEdenPlWithdrawns: {
      nodes: DW[]
    }
  }
}

const GET_RECENT_DEPOSITS_AND_WITHDRAWS = `query GetRecentDepositsAndWithdraws {
  allEdenPllinkDepositeds(first: 20, orderBy: [BLOCK_NUMBER_DESC, TX_INDEX_DESC]) {
    nodes {
      rindexerId
      chain
      blockNumber
      amount
      _asset
    }
  }
  allEdenPllinkWithdrawns(first: 20, orderBy: [BLOCK_NUMBER_DESC, TX_INDEX_DESC]) {
    nodes {
      rindexerId
      chain
      blockNumber
      amount
      _asset
    }
  }
  allEdenPlDepositeds {
    nodes {
      chain
      blockNumber
      amount
      _asset
    }
  }
  allEdenPlWithdrawns {
    nodes {
      chain
      blockNumber
      amount
      _asset
    }
  }
}`

function getToken(params): Promise<String> {

  if (params == "0x0000000000000000000000000000000000000000") {
    return "ETH"
  } else {
    return "LINK"
  }

}

async function fetchDW(): Promise<DepositAndWithdrawResponse> {
  try {
    const response = await fetch("/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: GET_RECENT_DEPOSITS_AND_WITHDRAWS,
      }),
    })

    const data = await response.json()

    // Check for GraphQL errors
    if (data.errors) {
      console.error('GraphQL errors:', data.errors)
      throw new Error(data.errors[0]?.message || 'GraphQL error occurred')
    }

    // Check if data structure is correct
    if (!data.data?.allEdenPllinkDepositeds || !data.data?.allEdenPllinkWithdrawns) {
      console.error('Unexpected response structure:', data)
      throw new Error('Invalid response structure from GraphQL')
    }

    return data
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}

interface ProcessedItem {
  type: 'deposit' | 'withdraw'
  amount: string
  chain: number
  blockNumber: string
  _asset: string
  rindexerId: number
}

function useDepositsAndWithdraws(token: string) {
  const { data, isLoading, error } = useQuery<DepositAndWithdrawResponse>({
    queryKey: ["DepositsAndWithdraws"],
    queryFn: fetchDW,
    retry: 2,
    retryDelay: 1000,
  })

  if (token == "1") {
    const processedData = useMemo(() => {
      if (!data?.data) return []

      // Create a set of withdrawn items for filtering
      const withdrawnKeys = new Set<string>()
      const withdrawnKeysETH = new Set<string>()
      data.data.allEdenPlWithdrawns.nodes.forEach((item) => {
        withdrawnKeys.add(`${item.chain}-${item.blockNumber}-${item.amount}-${item._asset}`)
      })


      const activeDeposits2 = data.data.allEdenPlDepositeds.nodes.filter(item => {
        const key = `${item.chain}-${item.blockNumber}-${item.amount}-${item._asset}`
        return !withdrawnKeys.has(key)
      })


      const allItems2: ProcessedItem[] = [
        ...activeDeposits2.map(item => ({
          type: 'deposit' as const,
          amount: item.amount,
          chain: item.chain,
          blockNumber: item.blockNumber,
          _asset: item._asset,
          rindexerId: item.rindexerId
        })),
        ...data.data.allEdenPlWithdrawns.nodes.map(item => ({
          type: 'withdraw' as const,
          amount: item.amount,
          chain: item.chain,
          _asset: item._asset,
          blockNumber: item.blockNumber,
          rindexerId: item.rindexerId
        }))
      ]

      allItems2.sort((a, b) => {
        const blockA = parseInt(a.blockNumber)
        const blockB = parseInt(b.blockNumber)
        return blockB - blockA
      })


      // Return the most recent items
      return allItems2.slice(0, 30)
    }, [data])

    return { isLoading, error, data: processedData }
  } else {
    const processedData = useMemo(() => {
      if (!data?.data) return []

      // Create a set of withdrawn items for filtering
      const withdrawnKeys = new Set<string>()
      data.data.allEdenPllinkWithdrawns.nodes.forEach((item) => {
        withdrawnKeys.add(`${item.chain}-${item.blockNumber}-${item.amount}`)
      })

      data.data.allEdenPlWithdrawns.nodes.forEach((item) => {
        withdrawnKeys.add(`${item.chain}-${item.blockNumber}-${item.amount}`)
      })


      // Filter deposits that haven't been withdrawn
      const activeDeposits = data.data.allEdenPllinkDepositeds.nodes.filter(item => {
        const key = `${item.chain}-${item.blockNumber}-${item.amount}`
        return !withdrawnKeys.has(key)
      })

      const activeDeposits2 = data.data.allEdenPlDepositeds.nodes.filter(item => {
        const key = `${item.chain}-${item.blockNumber}-${item.amount}`
        return !withdrawnKeys.has(key)
      })


      // Combine active deposits and withdrawals with type labels
      const allItems: ProcessedItem[] = [
        ...activeDeposits.map(item => ({
          type: 'deposit' as const,
          amount: item.amount,
          chain: item.chain,

          blockNumber: item.blockNumber,
          _asset: item._asset,
          rindexerId: item.rindexerId
        })),
        ...data.data.allEdenPllinkWithdrawns.nodes.map(item => ({
          type: 'withdraw' as const,
          amount: item.amount,
          chain: item.chain,
          blockNumber: item.blockNumber,
          rindexerId: item.rindexerId
        })),
        ...activeDeposits2.map(item => ({
          type: 'deposit' as const,
          amount: item.amount,
          chain: item.chain,
          blockNumber: item.blockNumber,
          _asset: item._asset,
          rindexerId: item.rindexerId
        })),
        ...data.data.allEdenPlWithdrawns.nodes.map(item => ({
          type: 'withdraw' as const,
          amount: item.amount,
          chain: item.chain,
          blockNumber: item.blockNumber,
          _asset: item._asset,
          rindexerId: item.rindexerId
        }))

      ]


      // Sort by block number (descending)
      allItems.sort((a, b) => {
        const blockA = parseInt(a.blockNumber)
        const blockB = parseInt(b.blockNumber)
        return blockB - blockA
      })


      // Return the most recent items
      return allItems.slice(0, 20)
    }, [data])

    return { isLoading, error, data: processedData }
  }
}

function getChainName(chainId: string): string {
  const chainid = chainId.toString()

  const chains: { [key: string]: string } = {
    '0': 'Ethereum',
    '10344971235874465080': 'Base',
    '14767482510784806043': 'Avalanche',
  }
  return chains[chainId] || `${chainid}`
}



export default function RecentlyDepositedAndWithdrawn(tokens: string) {
  const { isLoading, error, data } = useDepositsAndWithdraws(tokens)

  if (isLoading) {
    return (

      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <h3 className="text-red-800 font-semibold mb-2">Error Loading Data</h3>
        <p className="text-red-600 text-sm">{error.message}</p>
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-gray-500 p-4">
        No recent deposits or withdrawals
      </div>
    )
  }

  return (


    <div className="space-y-1 p-0" style={{ width: 600, maxWidth: 600 }}>
      <h2 className="text-xl font-bold mb-4">Recent Deposits & Withdrawals</h2>
      <div className="space-y-2" >
        {data.map((item, index) => (
          <div
            key={`${item.type}-${item.rindexerId}-${index}`}
            className={`p-1 rounded-lg border ${item.type === 'deposit'
              ? 'bg-white'
              : 'bg-white'
              }`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <span className="text-gray-600 text-sm">
                  <b> {getChainName(item.chain)}</b>
                </span>
                <span className={` ${item.type === 'deposit' ? 'text-black' : 'text-black'
                  }`}>
                  {item.type === 'deposit'} {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                </span>

              </div>
              <div className="text-right">
                <div className=" text-black" >{formatEther(item.amount)} {getToken(item._asset)}</div>
                <div className="font-semibold text-gray-500">Block: #{item.blockNumber}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"


interface DW {
    rindexerid: string
    chain: string
    blockNumber: string
    amount: string
}



interface DepositAndWithdrawResponse {
    data: {
        allEdenPllinkDepositeds: {
            nodes: DW[]
        }
        allEdenPllinkWithdrawns: {
            nodes: DW[]
        }
    }
}

const GET_RECENT_DEPOSITS_AND_WITHDRAWS`query Query {
  allEdenPllinkDepositeds(first:20, orderBy: [BLOCK_NUMBER_DESC, TX_INDEX_DESC]) {
    nodes {
      chain
      blockNumber
      amount
    }
  }
  allEdenPllinkWithdrawns {
    nodes {
      chain
      blockNumber
      amount
    }
  }
}`


async function fetchDW(); Promise < DepositAndWithdrawResponse > {
    const response = await fetch("/api/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",

        },
        body: JSON.stringify({
            query: GET_RECENT_DEPOSITS_AND_WITHDRAWS,
        }),

    })
         return response.json();
}




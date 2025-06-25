"use client"
import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListDivider from '@mui/joy/ListDivider';
import Select, { SelectOption } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { useState, useMemo, useRef, useEffect } from "react"
import { chainsForEden, EdenEVMAbi, EdenPLAbi, erc20Abi } from "../constants"
import { useReadContract, useChainId, useConfig, useAccount, useWriteContract } from 'wagmi'
import { readContract, waitForTransactionReceipt } from "@wagmi/core"

const optionsEthereum = [
    { value: '1', label: 'Ethereum', src: '/static/images/avatar/1.jpg' },
    { value: '2', label: 'Link', src: '/static/images/avatar/2.jpg' }
];

const optionsBase = [
    { value: '1', label: 'Ethereum', src: '../assets/Ethereum.svg' },
    { value: '2', label: 'Link', src: '/static/images/avatar/2.jpg' }
];

const optionsAvax = [
    { value: '2', label: 'Link', src: '/static/images/avatar/2.jpg' }
]



export default function SelectCustomOption({ onChange }) {
    const [mounted, setMounted] = useState(false);
    const chainId = useChainId();

    useEffect(() => {
        setMounted(true);
    }, []);

    // // Create renderValue function inside component to access chainId
    // function renderValue(option: SelectOption<string> | null) {
    //     if (!option) {
    //         return null;
    //     }

    //     if (chainId == 11155111) {
    //         return (
    //             <React.Fragment>
    //                 <ListItemDecorator>
    //                     <Avatar size="sm" src={optionsEthereum.find((o) => o.value === option.value)?.src} />
    //                 </ListItemDecorator>
    //                 {option.label}
    //             </React.Fragment>
    //         );
    //     } else {
    //         return (
    //             <React.Fragment>
    //                 <ListItemDecorator>
    //                     <Avatar size="sm" src={optionsBase.find((o) => o.value === option.value)?.src} />
    //                 </ListItemDecorator>
    //                 {option.label}
    //             </React.Fragment>
    //         );
    //     }
    // }

    if (!mounted) {
        return (
            <Select defaultValue="1" sx={{ '--ListItemDecorator-size': '44px', minWidth: 240 }}>
                <Option value="1" label="Loading...">Loading...</Option>
            </Select>
        );
    }

    if (chainId == 11155111) {
        return (
            <Select
                defaultValue="1"
                onChange={(event, newValue) => onChange && onChange(newValue)}
                slotProps={{
                    listbox: {
                        sx: {
                            '--ListItemDecorator-size': '44px',
                        },
                    },
                }}
                sx={{ '--ListItemDecorator-size': '44px', minWidth: 240, color: 'Black' }}
            // renderValue={renderValue}
            >
                {optionsEthereum.map((option, index) => (
                    <React.Fragment key={option.value}>
                        {index !== 0 ? <ListDivider role="none" inset="startContent" /> : null}
                        <Option value={option.value} label={option.label}>
                            <ListItemDecorator></ListItemDecorator>
                            {option.label}
                        </Option>
                    </React.Fragment>
                ))}
            </Select>
        );
    } else if (chainId == 84532) {
        // Same structure but with optionsBase
        return (
            <Select
                defaultValue="1"
                onChange={(event, newValue) => onChange && onChange(newValue)}
                slotProps={{
                    listbox: {
                        sx: {
                            '--ListItemDecorator-size': '44px',
                        },
                    },
                }}
                sx={{ '--ListItemDecorator-size': '44px', minWidth: 240, color: 'blue' }}
            // renderValue={renderValue}
            >
                {optionsBase.map((option, index) => (
                    <React.Fragment key={option.value}>
                        {index !== 0 ? <ListDivider role="none" inset="startContent" /> : null}
                        <Option value={option.value} label={option.label}>
                            <ListItemDecorator></ListItemDecorator>
                            {option.label}
                        </Option>
                    </React.Fragment>
                ))}
            </Select>
        );
    } else {
        return (
            <Select
                defaultValue="2"
                onChange={(event, newValue) => onChange && onChange(newValue)}
                slotProps={{
                    listbox: {
                        sx: {
                            '--ListItemDecorator-size': '44px',
                        },
                    },
                }}
                sx={{ '--ListItemDecorator-size': '44px', minWidth: 240, color: 'blue' }}
            // renderValue={renderValue}
            >
                {optionsAvax.map((option, index) => (
                    <React.Fragment key={option.value}>
                        {index !== 0 ? <ListDivider role="none" inset="startContent" /> : null}
                        <Option value={option.value} label={option.label}>
                            <ListItemDecorator></ListItemDecorator>
                            {option.label}
                        </Option>
                    </React.Fragment>
                ))}
            </Select>
        );

    }
}

import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import SelectCustomOption from "./Chains"
import SelectCustomOption2 from './Tokens';

export default function BoxSystemProps2() {
    const inputStyles = {
        height: 20,
        width: 240,
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 0,
            padding: 0
        }}>

            <Box
                sx={{
                    height: 600,
                    width: 500,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 4,
                    p: 2,
                    border: '2px solid grey',
                    borderRadius: '10px',
                    flexDirection: 'column'
                }}
            >
            </Box>
        </div>
    );
}
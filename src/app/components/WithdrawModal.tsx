import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

export default function BasicModal({ Message }: { Message?: string }) {
    const [open, setOpen] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (Message) {
            setOpen(true);
        }
    }, [Message]);


    return (
        <React.Fragment>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={() => setOpen(false)}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Sheet
                    variant="outlined"
                    sx={{ maxWidth: 900, borderRadius: 'md', p: 3, boxShadow: 'lg' }}
                >
                    <ModalClose variant="plain" sx={{ m: 1 }} />
                    <Typography
                        component="h2"
                        id="modal-title"
                        level="h4"
                        textColor="inherit"
                        sx={{ fontWeight: 'lg', mb: 1, textAlign: 'center' }}
                    >
                        Withdraw Completed!
                    </Typography>
                    <Typography id="modal-desc" textColor="text.tertiary" width={"600px"}>
                        Please Note: with transactions from EVM-chains the Transaction-time depends on the CCIP,
                        (Ethereum Sepolia is instant..)
                        <div style={{ marginTop: '30px', justifyContent: 'center' }}>
                            <div
                                style={{
                                    wordBreak: 'break-all',
                                    overflowWrap: 'break-word',
                                    marginTop: '4px',
                                    padding: '10px',
                                    backgroundColor: 'rgba(0,0,0,0.05)',
                                    borderRadius: '10px',
                                    fontFamily: 'monospace',
                                    fontSize: '0.9em'
                                }}
                            >

                            </div>
                        </div>
                    </Typography>
                </Sheet>
            </Modal >
        </React.Fragment >
    );
}
import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

export default function BasicModal({ WithdrawProof }: { WithdrawProof?: string }) {
    const [open, setOpen] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (WithdrawProof) {
            setOpen(true);
        }
    }, [WithdrawProof]);

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
                        Deposit Completed!
                    </Typography>
                    <Typography id="modal-desc" textColor="text.tertiary">
                        Make sure to save your <b>NOTE!</b> this is the proof that allows you to withdraw your funds!
                        <div style={{ marginTop: '8px' }}>
                            <b>Withdraw Note:</b>
                            <div
                                style={{
                                    wordBreak: 'break-all',
                                    overflowWrap: 'break-word',
                                    marginTop: '4px',
                                    padding: '8px',
                                    backgroundColor: 'rgba(0,0,0,0.05)',
                                    borderRadius: '10px',
                                    fontFamily: 'monospace',
                                    fontSize: '0.9em'
                                }}
                            >
                                <b>{WithdrawProof}</b>
                            </div>
                        </div>
                    </Typography>
                </Sheet>
            </Modal>
        </React.Fragment>
    );
}
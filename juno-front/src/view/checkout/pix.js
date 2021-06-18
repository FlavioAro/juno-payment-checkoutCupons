import React from 'react'
import { Dialog, DialogActions, DialogTitle, Button, DialogContent } from '@material-ui/core'

export default function Pix(props) {
    const { open, onClose, pix } = props;
    return (
        <Dialog
            open={open}
            onClose={() => onClose() }
        >
            <DialogTitle disableTypography><h6>{'Utilize o QR Code para pagar via PIX'}</h6></DialogTitle>
            <DialogContent>
                <img alt="Pix" className="img-fluid" style={{width: '100%'}} src={'data:image/png;base64, '+pix.imageInBase64} />
            </DialogContent>
            <DialogActions className="justify-content-center mb-2">
                <Button onClick={() => onClose() }>
                    Fechar
                </Button>
            </DialogActions>

        </Dialog>
    )
}

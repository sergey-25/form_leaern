import React from 'react'
import {Snackbar} from "@mui/material";
import Alert from "@mui/material/Alert";




export default function Notification(props) {

    const { notify, setNotify } = props;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            event.stopPropagation()
            return;
        }
        setNotify({
            ...notify,
            isOpen: false
        })
    }

    return (
        <Snackbar
            open={notify.isOpen}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            onClose={handleClose}>
            <Alert
                severity={notify.type}
                onClose={handleClose}>
                {notify.message}
            </Alert>
        </Snackbar>
    )
}

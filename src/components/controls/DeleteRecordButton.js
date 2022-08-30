import React from 'react'
import {IconButton} from "@mui/material";


export default function DeleteRecordButton({children, onClick, color}) {



    return (
        <IconButton
            color={color}
            onClick={onClick}>
            {children}
        </IconButton>
    )
}

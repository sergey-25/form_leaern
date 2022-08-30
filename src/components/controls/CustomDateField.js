import React from 'react'
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {uk} from 'date-fns/locale';


export default function CustomDateField(props) {

    const {name, value, onChange, renderInput, InputProps, disabled} = props


    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <LocalizationProvider
            dateAdapter={AdapterDateFns}
            locale={uk}>
            <DesktopDatePicker
                mask="__/__/____"
                disablePast='true'
                InputProps={InputProps}
                value={value}
                disabled={disabled}
                onChange={date => onChange(convertToDefEventPara(name, date))}
                renderInput={renderInput}
            />
        </LocalizationProvider>
    )
}

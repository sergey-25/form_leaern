import React from 'react'
import {FormControl, Select as MuiSelect, MenuItem} from '@mui/material';

export default function FormSelect(props) {

    const {
        name, label, value,
        onChange, options, defaultValue,
        SelectDisplayProps, disableUnderline, disabled
    } = props;

    return (
        <FormControl variant="standard" fullWidth>
            <MuiSelect
                disabled={disabled}
                disableUnderline={disableUnderline}
                SelectDisplayProps={SelectDisplayProps}
                defaultValue={defaultValue}
                label={label}
                name={name}
                value={value}
                onChange={onChange}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
            >
                {/*<MenuItem value="">None</MenuItem>*/}
                {
                    options.map(
                        item => (<MenuItem
                            style={{
                                fontSize: '14px',
                                justifyContent: 'center',
                            }}
                            divider={true}
                            key={item.id}
                            value={item.title}>
                            {item.title}
                        </MenuItem>)
                    )
                }
            </MuiSelect>
        </FormControl>
    )
}

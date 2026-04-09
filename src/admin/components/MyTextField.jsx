import { TextField } from '@mui/material';
import { useField } from 'formik';
import React from 'react';

function MyTextField({ type = "text", data = [], ...props }) {

    const [field, meta] = useField(props);
    console.log(field, meta)

    console.log(props)
    return (
        <>
            <TextField
                {...field}
                {...props}
                variant="standard"
                type={type}
                margin="dense"
                fullWidth
                error={meta.error && meta.touched}
                helperText={meta.error && meta.touched ? meta.error : ''}
            >
            {
                data.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
            ))
            }
            </TextField>
        </>
    )
}

export default MyTextField;
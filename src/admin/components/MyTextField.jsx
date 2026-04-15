import { TextField } from '@mui/material';
import { useField } from 'formik';
import React from 'react';

function MyTextField({ type = "text", data = [], multiple = false, ...props }) {

    const [field, meta, helpers] = useField(props);
    console.log(field, meta)

    console.log(props)

    const handleChange = (e) => {
        let value = e.target.value;

        // ✅ handle multiple select
        if (multiple) {
            value = typeof value === "string" ? value.split(",") : value;
        }

        helpers.setValue(value);
    };


    return (
        <>
            <TextField
                {...field}
                {...props}
                variant="standard"
                type={type} 
                SelectProps={{
                    multiple: multiple
                }}
                onChange={handleChange}
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
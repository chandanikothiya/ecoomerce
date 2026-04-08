import { TextField } from '@mui/material';
import React from 'react';

function MyTextField({ type = "text", data = [], ...props }) {
    console.log(props)
    return (
        <TextField
            {...props}
          
            variant="standard" 
            type={type}
            />
    )
}

export default MyTextField;
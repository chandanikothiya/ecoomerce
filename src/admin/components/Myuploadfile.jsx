import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useField } from "formik";
import { IMG_URL } from "../../utility/url";
import { Box, IconButton } from "@mui/material";
import { IoMdClose } from "react-icons/io";

function Myuploadfile(props) {

    const [field, meta, helpers] = useField(props);
    const { setValue } = helpers;
    console.log(field, meta)
    const [images, setImages] = useState([])

    console.log("helpers", helpers)

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    let fileurl = ''

    console.log(fileurl)

    // setImages((prev) => [...prev,])
    const handlechange = (e) => {
        const files = Array.from(e.target.files)
        console.log(e.target.files[0])

        const updated = [...(field.value || []), ...files];
        setValue(updated)
    }
    console.log(images)


    if (Array.isArray(field.value)) {
        fileurl =  field.value.map((v) => {
            if (typeof v === 'string') {
                return IMG_URL + v
            } else if (typeof v === 'object' && field.value) {
                return URL.createObjectURL(v)
            }
        })
    } else {
        if (typeof field.value === 'string' && field.value) {
            fileurl = IMG_URL + field.value
        } else if (typeof field.value === 'object' && field.value) {
            fileurl = URL.createObjectURL(field.value)
        }
    }

    console.log(fileurl)

    return (
        <>
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                sx={{ marginTop: 3 }}
            >
                Upload files
                <VisuallyHiddenInput
                    {...props}
                    type="file"
                    onChange={handlechange}
                    multiple
                />
            </Button>

            {
                fileurl.length > 0 &&
                fileurl?.map((v,index) => (
                    <Box key={index} sx={{ display: 'inline-block', position: 'relative', height: '70px', width: '70px', marginTop: '24px', marginLeft: '10px', }}>
                        <img src={v} alt="product_image" style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
                        <IconButton
                            sx={{
                                backgroundColor: 'rgb(182, 37, 37)', width: '15px', height: "15px",
                                borderRadius: '3px', position: 'absolute', top: 0, right: 0, padding: '2px',
                                "&:hover": {
                                    backgroundColor: 'rgb(182, 37, 37)'
                                }
                            }}
                            onClick={() => {
                                const removeid = field.value.filter((_,i) => i !== index); 
                                setValue(removeid)
                            }}
                        >
                            <IoMdClose color="#fff" />
                        </IconButton>
                    </Box>
                ))
            }


            {meta.error && meta.touched ?
                <p style={{ color: 'red' }}>{meta.error}</p> : ""}
        </>
    )
}

export default Myuploadfile;
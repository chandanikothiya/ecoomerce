import React, { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Form, Formik } from "formik";
import { object, string, mixed } from 'yup';
import MyTextField from "../../components/MyTextField";
import { Margin } from "@mui/icons-material";
import { useAddCategoryMutation, useDeleteCategoryMutation, useGetCategoryQuery, useUpdateCategoryMutation } from "../../../redux/api/category.api";
import { DataGrid } from '@mui/x-data-grid';
import { Box, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { CiEdit } from "react-icons/ci";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import Myuploadfile from "../../components/Myuploadfile";
import { useDeleteContactMutation, useGetContactQuery } from "../../../redux/api/contact.api";


function Contact() {

    const [open, setOpen] = React.useState(false);

    const { data, error, isLoading } = useGetContactQuery();
    console.log(data)
    const [deletecontact] = useDeleteContactMutation();

    const theme = useTheme();

    const isMobile = useMediaQuery("(max-width:576px)");
    const isTablet = useMediaQuery("(max-width:768px)");
    const isLarge = useMediaQuery("(min-width:1200px)");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const formData = new FormData(event.currentTarget);
    //     const formJson = Object.fromEntries(formData.entries());
    //     const email = formJson.email;
    //     console.log(email);
    //     handleClose();
    // };

    const categorySchema = object({
        name: string().required(),
        description: string().required(),

    })

    let pdata = [
        { value: '', label: 'Select Parent Category' }
    ]


    data?.data?.map((v, i) => {
        console.log(v?._id)
        pdata.push({ value: v?._id, label: v?.name })
    })

    const handlesubmit = (values) => {
        console.log("values", values)
        if (Object.keys(updatedata).length > 0) {
            console.log("updateval", values)
            updateCategory(values)
        } else {
            addcategory(values)
        }

    }



    const handledelete = (id) => {
        console.log("id", id)
        deletecontact(id);
    }

    const columns = [
        { field: 'name', headerName: 'name', flex: 1, minWidth: isMobile ? 220 : 150, },
        {
            field: 'email',
            headerName: 'email',
            flex: 1,
            minWidth: isMobile ? 250 : 150,
            editable: true,
        },
        {
            field: 'phone',
            headerName: 'phone No',
            flex: 1,
            minWidth: isMobile ? 220 : 150,
            editable: true,

        },
        {
            field: 'message',
            headerName: 'message',
            flex: 1,
            minWidth: isMobile ? 120 : 100,
            editable: true,

        },
        {
            field: '',
            headerName: 'Action',
            flex: 1,
            minWidth: isMobile ? 120 : 100,
            editable: true,
            renderCell: (params) => (
                <>
                    {/* <IconButton aria-label="edit" onClick={(e) => handleedit(params.row)}>
                        <MdOutlineModeEdit />
                    </IconButton> */}

                    <IconButton aria-label="delete" onClick={(e) => handledelete(params.row._id)}>
                        <MdDeleteOutline />
                    </IconButton>
                </>
            )
        }
    ];


    return (
        <>
            <div className="container">

                <Typography variant="h5" sx={{ marginLeft: '-20px', fontSize: '30px' }}>Users Message</Typography>

                <Box
                    sx={{
                        width: '100%',
                        overflowX: isMobile ? 'auto' : 'hidden',
                    }}
                >
                    <Box
                        sx={{
                            width: isMobile ? 900 : '100%',
                        }}
                    >
                        <DataGrid
                            rows={data?.data}
                            columns={columns}
                            getRowId={(rows) => rows?._id || Math.random()}
                            sx={{
                                mt: 2,
                                mb: 1,

                                '& .MuiDataGrid-columnSeparator': {
                                    display: 'none',
                                },

                                '& .MuiDataGrid-menuIcon, & .MuiDataGrid-iconButtonContainer': {
                                    display: 'none',
                                },

                                '& .MuiDataGrid-main': {
                                    overflow: 'hidden',
                                },
                            }}
                        />
                    </Box>
                </Box>
            </div>

        </>
    )
}

export default Contact;
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
import { IconButton } from "@mui/material";
import { CiEdit } from "react-icons/ci";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import Myuploadfile from "../../components/Myuploadfile";
import { useGetContactQuery } from "../../../redux/api/contact.api";


function Contact() {

    const [open, setOpen] = React.useState(false);
    const [updatedata, setUpdatedata] = useState({});

    const { data, error, isLoading } = useGetContactQuery();
    console.log(data)
   
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
            console.log("updateval",values)
            updateCategory(values)
        } else {
            addcategory(values)
        }

    }

    const handleedit = (values) => {
        setUpdatedata(values)
        handleClickOpen()
    }
    console.log(updatedata)

    const handledelete = (_id) => {
        deletecategory(_id);
    }

    const columns = [
        { field: 'name', headerName: 'name', width: 250 },
        {
            field: 'email',
            headerName: 'email',
            width: 200,
            editable: true,
        },
        {
            field: 'phone',
            headerName: 'phone No',
            width: 300,
            editable: true,
           
        },
         {
            field: 'message',
            headerName: 'message',
            width: 350,
            editable: true,
           
        },
        {
            field: '',
            headerName: 'Action',
            width: 150,
            editable: true,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="edit" onClick={(e) => handleedit(params.row)}>
                        <MdOutlineModeEdit />
                    </IconButton>

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


                <DataGrid
                    rows={data?.data}
                    getRowId={(rows) => rows?._id || Math.random()}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize:10,
                            },
                        },
                    }}
                    pageSizeOptions={[5,10,15,20]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    sx={{
                        marginTop: 2,marginBottom:1,
                        '& .MuiDataGrid-columnSeparator': {
                            display: 'none',
                        },
                        '& .MuiDataGrid-menuIcon, & .MuiDataGrid-iconButtonContainer': { display: 'none' },
                    }}
                />
            </div>
        </>
    )
}

export default Contact;
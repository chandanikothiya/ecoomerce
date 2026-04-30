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
import { IconButton, Typography } from "@mui/material";
import { CiEdit } from "react-icons/ci";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import Myuploadfile from "../../components/Myuploadfile";
import { useDeleteContactMutation, useGetContactQuery } from "../../../redux/api/contact.api";
import { useGetAllOrderQuery } from "../../../redux/api/order.api";
import { useGetUserQuery } from "../../../redux/api/user.api";
import { useAddProductMutation, useGetProductQuery } from "../../../redux/api/product.api";


function Order() {

    const [open, setOpen] = React.useState(false);

    const { data, error, isLoading } = useGetAllOrderQuery();
    //const {data:udata,error:uerror,isLoading:uisloading} = useGetUserQuery(data?.data?.user_id)
    const { data: pdata, error: perror, isLoading: pislaoding } = useGetProductQuery();
    console.log("pdata", data, pdata)
    const [deletecontact] = useDeleteContactMutation();

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

    // let pdata = [
    //     { value: '', label: 'Select Parent Category' }
    // ]


    // data?.data?.map((v, i) => {
    //     console.log(v?._id)
    //     pdata.push({ value: v?._id, label: v?.name })
    // })

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
        { field: 'name', headerName: 'name', width: 250 },
        {
            headerName: 'products',
            width: 300,
            editable: true,
            renderCell: (params) => (
                <>
                    {
                        params?.row?.products?.map((v) => {
                            console.log(v)
                            const name = pdata?.data?.filter((v1) => v1._id === v.product_id)
                            console.log("name", name[0].name)
                            return (
                                <Typography sx={{margin:'auto 0'}}>{name[0].name}</Typography>
                            )
                        })
                    }
                </>
            )
        },
        {
            field: 'products',
            headerName: 'price',
            width: 300,
            editable: true,
            renderCell: (params) => (
                <>
                    {
                        params?.row?.products?.map((v) => {
                            
                            return (
                                <Typography>{v.price}</Typography>
                            )
                        })
                    }
                </>
            )
        },
        {
            field: 'totalamount',
            headerName: 'totalamount',
            width: 300,
            editable: true,
           
        },
        // {
        //     field: 'phone',
        //     headerName: 'phone No',
        //     width: 200,
        //     editable: true,

        // },
        // {
        //     field: 'message',
        //     headerName: 'message',
        //     width: 350,
        //     editable: true,

        // },
        {
            field: '',
            headerName: 'Action',
            width: 100,
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
                <DataGrid
                    rows={data?.data}
                    getRowId={(rows) => rows?._id || Math.random()}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[5, 10, 15, 20]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    sx={{
                        marginTop: 2, marginBottom: 1,
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

export default Order;
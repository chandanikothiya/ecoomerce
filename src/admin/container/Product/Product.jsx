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


function Product() {

    const [open, setOpen] = React.useState(false);
    const [updatedata, setUpdatedata] = useState({});

    const { data, error, isLoading } = useGetCategoryQuery();
    console.log(data)
    const [addcategory] = useAddCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const [deletecategory] = useDeleteCategoryMutation();

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
        category_id: string().required(),
        name: string().required(),
        price: string().required(),
        product_img:mixed().required(),
        discount:string().required()

    })

    let pdata = [
        { value: '', label: 'Select Category' }
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

    const handleedit = (values) => {
        setUpdatedata(values)
        handleClickOpen()
    }
    console.log(updatedata)

    const handledelete = (_id) => {
        deletecategory(_id);
    }

    const columns = [
        { field: 'name', headerName: 'name', width: 350 },
        {
            field: 'description',
            headerName: 'description',
            width: 350,
            editable: true,
        },
        {
            field: 'parentcategory_id',
            headerName: 'parent Category',
            width: 350,
            editable: true,
            renderCell: (params) => (
                <>
                    {
                        params.row.parentcategory_id !== null ? data?.data?.find((v) => v._id === params.row.parentcategory_id)?.name : '-'
                    }
                </>
            )
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
                <React.Fragment>
                    <Button variant="outlined" onClick={handleClickOpen}>
                        Add Product
                    </Button>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Add Category</DialogTitle>
                        <DialogContent>
                            <Formik
                                initialValues={Object.keys(updatedata).length > 0 ? updatedata : {
                                    name: '',
                                    price: '',
                                    category_id: "",
                                    product_img:"",
                                    discount:''
                                }}
                                validationSchema={categorySchema}
                                onSubmit={(values) => {
                                    console.log(values)
                                    handlesubmit(values)
                                    handleClose();
                                }}
                            >
                                <Form id="subscription-form">

                                    <MyTextField
                                        name="category_id"
                                        id="category_id"
                                        label="category"
                                        select
                                        data={pdata}
                                        slotProps={{
                                            select: {
                                                native: true,
                                            },
                                        }}
                                        InputLabelProps={{ shrink: true }}
                                    />

                                    <MyTextField
                                        name="name"
                                        id="name"
                                        label="Product Name"
                                    />

                                    <MyTextField
                                        name="price"
                                        id="price"
                                        label="Price"
                                    />

                                    <MyTextField
                                        name="discount"
                                        id="discount"
                                        label="Discount"
                                    />
                                    <Myuploadfile
                                        name='product_img'
                                    />

                                </Form>
                            </Formik>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit" form="subscription-form">
                                Add Category
                            </Button>
                        </DialogActions>
                    </Dialog>
                </React.Fragment>


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

export default Product;
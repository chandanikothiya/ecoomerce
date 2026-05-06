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
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { CiEdit } from "react-icons/ci";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import Myuploadfile from "../../components/Myuploadfile";


function Category() {

    const [open, setOpen] = React.useState(false);
    const [updatedata, setUpdatedata] = useState({});

    const { data, error, isLoading } = useGetCategoryQuery();
    console.log(data)
    const [addcategory] = useAddCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const [deletecategory] = useDeleteCategoryMutation();

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

    const handleedit = (values) => {
        setUpdatedata(values)
        handleClickOpen()
    }
    console.log(updatedata)

    const handledelete = (_id) => {
        deletecategory(_id);
    }

    const columns = [
        {
            field: 'name', headerName: 'name', flex: 1.5, headerClassName: 'first-header',
            renderCell: (params) => (
                <Box sx={{ ml: 3 }}>{params.row.name}</Box>
            ),
            minWidth: isMobile ? 220 : 150,
            // minWidth: isLarge ? 350 : isTablet ? 120 : 200,
        },
        {
            field: 'description',
            headerName: 'description',
            flex: 1,
            minWidth: isMobile ? 250 : 150,
            // minWidth: isLarge ? 350 : isTablet ? 120 : 200,
            editable: true,
        },
        {
            field: 'parentcategory_id',
            headerName: 'parent Category',
            flex: 1,
            minWidth: isMobile ? 220 : 150,
            //minWidth: isLarge ? 350 : isTablet ? 120 : 200,
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
            field: ' ',
            headerName: 'Action',
            flex: 1,
            minWidth: isMobile ? 120 : 80,
            //minWidth: isLarge ? 150 : isTablet ? 80 : 100,
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
                        Add Category
                    </Button>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Add Category</DialogTitle>
                        <DialogContent>
                            <Formik
                                initialValues={Object.keys(updatedata).length > 0 ? updatedata : {
                                    name: '',
                                    description: '',
                                    parentcategory_id: ""
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
                                        name="parentcategory_id"
                                        id="parentcategory_id"
                                        label="parent category"
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
                                        label="Category Name"
                                    />

                                    <MyTextField
                                        name="description"
                                        id="description"
                                        label="Description"
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

                <Box
                    sx={{
                        width: '100%',
                        overflowX: isMobile ? 'auto' : 'hidden',
                    }}
                >
                    <Box
                        sx={{
                            minWidth: isMobile ? 900 : '100%',
                        }}
                    >
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
                            disableRowSelectionOnClick
                            sx={{
                                marginTop: 2, marginBottom: 1,
                                '& .MuiDataGrid-columnSeparator': {
                                    display: 'none',
                                },
                                '& .MuiDataGrid-menuIcon, & .MuiDataGrid-iconButtonContainer': { display: 'none' },
                                '& .first-header .MuiDataGrid-columnHeaderTitleContainer': {
                                    marginLeft: 3,
                                },
                            }}
                        />
                    </Box>
                </Box>



            </div>
        </>
    )
}

export default Category;
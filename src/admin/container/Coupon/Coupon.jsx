import React, { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Form, Formik } from "formik";
import { object, string, mixed, date } from 'yup';
import MyTextField from "../../components/MyTextField";
import { Margin } from "@mui/icons-material";
import { DataGrid } from '@mui/x-data-grid';
import { Box, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { CiEdit } from "react-icons/ci";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import Myuploadfile from "../../components/Myuploadfile";
import { useAddCouponMutation, useChangeactiveMutation, useDeleteCouponMutation, useGetAllCouponQuery, useGetCouponQuery, useUpdateCouponMutation } from "../../../redux/api/coupon.api";
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffOutlinedIcon from '@mui/icons-material/ToggleOffOutlined';

function Coupon() {

    const [open, setOpen] = React.useState(false);
    const [updatedata, setUpdatedata] = useState({});
    const { data, error, isLoading } = useGetAllCouponQuery();
    console.log(data)

    const [addcoupon] = useAddCouponMutation();
    const [updatecoupon] = useUpdateCouponMutation();
    const [deletecoupon] = useDeleteCouponMutation();
    const [changeactive] = useChangeactiveMutation();

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

    const categorySchema = object({
        title: string().required(),
        code: string().required(),
        discount: string().required(),
        startdate: date().required(),
        enddate: date().required(),
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
            updatecoupon(values)
        } else {
            addcoupon(values)
        }

    }

    const handleedit = (values) => {
        setUpdatedata(values)
        handleClickOpen()
    }
    console.log("updatedata", updatedata)

    const handledelete = (_id) => {
        deletecoupon(_id);
    }

    const handleactive = (value) => {
        console.log(value)

       changeactive({ id: value._id, isActive: !value.isActive })
    }

    const columns = [
        {
            field: 'title', headerName: 'Title', flex: 1.5, headerClassName: 'first-header',
            renderCell: (params) => (
                <Box sx={{ ml: 3 }}>{params.row.title}</Box>
            ),
            minWidth: isMobile ? 220 : 150,
            // minWidth: isLarge ? 350 : isTablet ? 120 : 200,
        },
        {
            field: 'code',
            headerName: 'Code',
            flex: 1,
            minWidth: isMobile ? 250 : 150,
            // minWidth: isLarge ? 350 : isTablet ? 120 : 200,
            editable: true,
        },
        {
            field: 'discount',
            headerName: 'Discount',
            flex: 1,
            minWidth: isMobile ? 220 : 130,

            //minWidth: isLarge ? 350 : isTablet ? 120 : 200,
            editable: true,
        },
        {
            field: 'startdate',
            headerName: 'Startdate',
            flex: 1,
            minWidth: isMobile ? 250 : 150,
            // minWidth: isLarge ? 350 : isTablet ? 120 : 200,
            renderCell: (params) => {

                const sdata = params.row.startdate;
                const cdate = sdata ? new Date(sdata) : null;
                console.log(cdate?.toLocaleString?.());

                return (
                    cdate?.toLocaleDateString()
                )
            },
            editable: true,
        },
        {
            field: 'enddate',
            headerName: 'Enddate',
            flex: 1,
            minWidth: isMobile ? 250 : 150,
            renderCell: (params) => {

                const sdata = params.row.enddate;
                const cdate = sdata ? new Date(sdata) : null;
                console.log(cdate?.toLocaleString?.());

                return (
                    cdate?.toLocaleDateString()
                )
            },
            // minWidth: isLarge ? 350 : isTablet ? 120 : 200,
            editable: true,
        },
        {
            field: 'isActive',
            headerName: 'Active',
            flex: 1,
            minWidth: isMobile ? 120 : 80,
            renderCell: (params) => {
                return (
                    <IconButton onClick={() => handleactive(params.row)}>
                        {
                            params?.row?.isActive ? 
                            <ToggleOnIcon sx={{ fontSize: '30px', color: 'blue' }} /> :
                             <ToggleOffOutlinedIcon style={{ fontSize: '30px', color: 'blue'}} />
                        }
                       
                    </IconButton>
                )
            },
            // minWidth: isLarge ? 350 : isTablet ? 120 : 200,
            editable: true,
        },
        {
            field: ' ',
            headerName: 'Action',
            flex: 1,
            minWidth: isMobile ? 120 : 100,
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
                        Add Coupon
                    </Button>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Add Coupon</DialogTitle>
                        <DialogContent>
                            <Formik
                                initialValues={Object.keys(updatedata).length > 0 ? updatedata : {
                                    title: '',
                                    code: '',
                                    discount: '',
                                    startdate: '',
                                    enddate: '',
                                }}
                                enableReinitialize={true}
                                validationSchema={categorySchema}
                                onSubmit={(values) => {
                                    console.log(values)
                                    handlesubmit(values)
                                    handleClose();
                                }}
                            >
                                <Form id="subscription-form">

                                    <MyTextField
                                        name="title"
                                        id="title"
                                        label="Enter Titlte"
                                    />

                                    <MyTextField
                                        name="code"
                                        id="code"
                                        label="Enter Code"
                                    />

                                    <MyTextField
                                        name="discount"
                                        id="discount"
                                        label="Discount"
                                    />

                                    <MyTextField
                                        name="startdate"
                                        id="startdate"
                                        label="Startdate"
                                        type="date"
                                        InputLabelProps={{ shrink: true }}
                                    />

                                    <MyTextField
                                        name="enddate"
                                        id="enddate"
                                        label="Enddate"
                                        type="date"
                                        InputLabelProps={{ shrink: true }}
                                    />

                                </Form>
                            </Formik>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit" form="subscription-form">
                                Add Coupon
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

export default Coupon;
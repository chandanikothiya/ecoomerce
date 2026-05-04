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
import { Box, Divider, Drawer, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { CiEdit } from "react-icons/ci";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import Myuploadfile from "../../components/Myuploadfile";
import { useDeleteContactMutation, useGetContactQuery } from "../../../redux/api/contact.api";
import { useGetAllOrderQuery } from "../../../redux/api/order.api";
import { useGetUserQuery } from "../../../redux/api/user.api";
import { useAddProductMutation, useGetProductQuery } from "../../../redux/api/product.api";
import { useGetPaymentOnOrderQuery } from "../../../redux/api/payment.api";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { SlEye } from "react-icons/sl";
import { RiCloseLargeFill } from "react-icons/ri";
import { IMG_URL } from "../../../utility/url";


function createData(name, calories, fat) {
    return { name, calories, fat };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0),
    createData('Ice cream sandwich', 237, 9.0),
    createData('Eclair', 262, 16.0),
];


function Order() {

    const { data, error, isLoading } = useGetAllOrderQuery();

    const { data: pdata, error: perror, isLoading: pislaoding } = useGetProductQuery();
    console.log("pdata", data, pdata)
    const [deletecontact] = useDeleteContactMutation();

    const [open, setOpen] = React.useState(false);
    const [orderdata, setOrderdata] = useState();

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
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

    const Username = ({ user_id }) => {
        console.log(user_id)
        const { data: udata, error: uerror, isLoading: uisloading } = useGetUserQuery(user_id)
        if (uisloading) return <>Loading...</>;
        if (uerror) return <>Error</>;

        return <>{udata?.data?.name}</>;
    }

    const Payment = ({ id }) => {
        const { data: paydata, error: payerror, isLoading: payisloading } = useGetPaymentOnOrderQuery(id)
        if (payisloading) return <>Loading...</>;
        if (payerror) return <>Error</>;

        const paymentMethod = paydata?.data?.[0]?.paymentmethod;

        let formattedPaymentMethod = paymentMethod
            ?.replace(/_/g, ' ')
            ?.replace(/\b\w/g, (char) => char.toUpperCase());

        if (formattedPaymentMethod === 'Cod') {
            formattedPaymentMethod = 'Cash on Delivery'
        }

        console.log("formattedPaymentMethod", formattedPaymentMethod)

        return <>{formattedPaymentMethod}</>;
    }

    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered':
                return {
                    backgroundColor: '#d1fae5',
                    color: '#059669'
                };

            case 'shipped':
                return {
                    backgroundColor: '#EDEFF1',
                    color: '#111827'
                };

            case 'placed':
                return {
                    backgroundColor: '#FFF1D6',
                    color: '#b66509'
                };

            case 'cancelled':
                return {
                    backgroundColor: '#fee2e2',
                    color: '#dc2626'
                };

            default:
                return {
                    backgroundColor: '#e5e7eb',
                    color: '#374151'
                };
        }
    };

    const columns = [
        {
            field: 'createdAt', headerName: 'Order', width: 350, headerClassName: 'order-header',
            renderCell: (params) => {
                const date = new Date(params.row.createdAt);
                const month = date.toLocaleString('default', { month: 'short' });
                console.log(date.getDate(), date.getMonth(), month)

                return (
                    <>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 5, height: '100%', marginLeft: 3 }}>
                            <Box>
                                <Typography sx={{ letterSpacing: '1px', fontSize: '14px' }}>{month}</Typography>
                                <Typography variant="h6" sx={{ letterSpacing: '1px' }}>{date.getDate()}</Typography>
                            </Box>

                            <Box>
                                <Typography sx={{ letterSpacing: '1px' }}>{(params.row._id).substring(0, 8)}</Typography>
                                <Typography sx={{ color: 'rgb(128, 128, 128)', letterSpacing: '1px' }}>{params.row.products.length + " products"}</Typography>
                            </Box>
                        </Box>

                    </>
                )
            }
        },
        {
            field: 'user_id', headerName: 'Customer', width: 250,
            renderCell: (params) => (
                //console.log(params)
                <Username user_id={params.row.user_id} />
            )
        },
        {
            headerName: 'Payment', width: 250,
            renderCell: (params) => (
                <Payment id={params.row._id} />
            )
        },
        {
            field: 'orderstatus', headerName: 'Status', width: 250,
            renderCell: (params) => {

                const status = params.row.orderstatus;
                const style = getStatusStyle(status);

                return (
                    <Box sx={{ display: "flex", alignItems: 'center', height: '100%' }}>
                        <Box sx={{
                            backgroundColor: style.backgroundColor,
                            color: style.color, padding: '5px 15px', borderRadius: '20px'
                        }}>
                            <Typography variant="body2">{params.row.orderstatus}</Typography>
                        </Box>
                    </Box>
                )
            }
        },
        {
            field: ' ',
            headerName: 'Action',
            width: 100,
            editable: true,
            renderCell: (params) => (
                <>
                    {/* <IconButton aria-label="edit" onClick={(e) => handleedit(params.row)}>
                        <MdOutlineModeEdit />
                    </IconButton> */}

                    <IconButton aria-label="see" onClick={() => {
                        toggleDrawer(true)();
                        setOrderdata(params.row);
                    }}>
                        {/* <RemoveRedEyeOutlinedIcon sx={{color:'black'}}/> */}
                        <SlEye style={{ color: 'black' }} />
                    </IconButton>
                </>
            )
        }
    ];
    console.log("orderid", orderdata)


    const {
        data: paymentdata,
        error: paymenterror,
        isLoading: paymentdataisloading
    } = useGetPaymentOnOrderQuery(orderdata?._id, {
        skip: !orderdata?._id
    });

    console.log("paymentdata", paymentdata)

    return (
        <>
            <div className="container">

                <Typography variant="h5" sx={{ marginLeft: '-20px', fontSize: '30px' }}>Orders</Typography>
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
                    rowHeight={75}
                    pageSizeOptions={[5, 10, 15, 20]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    sx={{
                        marginTop: 2, marginBottom: 1,
                        '& .MuiDataGrid-columnSeparator': {
                            display: 'none',
                        },
                        '& .MuiDataGrid-menuIcon, & .MuiDataGrid-iconButtonContainer': { display: 'none' },
                        '& .order-header': {
                            paddingLeft: '30px'
                        },
                        '& .MuiDataGrid-columnHeaderTitle': {
                            fontSize: '16px',
                            color: 'rgb(128, 128, 128)'
                        }
                    }}
                />
                <Drawer
                    open={open}
                    onClose={toggleDrawer(false)}
                    anchor="right"
                    sx={{
                        '& .MuiPaper-root': {
                            position: 'fixed',
                            top: '10%',
                            // bottom: 'auto',
                            right: '20px',
                            transform: 'translateY(-50%)',

                            width: '600px',
                            height: '800px',

                            borderRadius: '16px',
                            overflow: 'hidden'
                        }
                    }}
                >
                    <Box sx={{ padding: 4 }}>
                        <Box sx={{ textAlign: 'end' }}>
                            <IconButton aria-label="see" onClick={toggleDrawer(false)} >
                                {/* <RemoveRedEyeOutlinedIcon sx={{color:'black'}}/> */}
                                <RiCloseLargeFill />
                            </IconButton>
                        </Box>

                        <Typography variant="h6" sx={{ mt: 3 }}>Details</Typography>

                        <Box sx={{ border: 1, borderColor: 'rgb(206, 199, 199)', borderRadius: 2, mt: 2 }}>
                            <Grid container>

                                <Grid container size={12} sx={{ padding: '10px 22px' }}>
                                    <Grid size={4}>
                                        <Typography className="orderdata">Customer</Typography>
                                    </Grid>
                                    <Grid size={8}>
                                        <Typography sx={{ color: 'blue' }}><Username user_id={orderdata?.user_id} /></Typography>
                                    </Grid>
                                </Grid>


                                <Grid size={12}>
                                    <Divider />
                                </Grid>

                                <Grid container size={12} sx={{ padding: '10px 22px' }}>
                                    <Grid size={4}>
                                        <Typography className="orderdata">Address</Typography>
                                    </Grid>
                                    <Grid size={8}>
                                        <Typography>{
                                            orderdata?.address?.streetaddress + "," +
                                            orderdata?.address?.city + "," +
                                            orderdata?.address?.state + "," + 125678
                                        }</Typography>
                                    </Grid>
                                </Grid>

                                <Grid size={12}>
                                    <Divider />
                                </Grid>

                                <Grid container size={12} sx={{ padding: '10px 22px' }}>
                                    <Grid size={4}>
                                        <Typography className="orderdata">Date</Typography>
                                    </Grid>
                                    <Grid size={8}>
                                        {
                                            (() => {
                                                const date = new Date(orderdata?.createdAt);

                                                return (<Typography>{date.toLocaleString()}</Typography>)

                                            })()

                                        }
                                    </Grid>
                                </Grid>

                                <Grid size={12}>
                                    <Divider />
                                </Grid>

                                <Grid container size={12} sx={{ padding: '10px 22px' }}>
                                    <Grid size={4}>
                                        <Typography className="orderdata">Status</Typography>
                                    </Grid>
                                    <Grid size={8}>
                                        {
                                            (() => {
                                                const status = orderdata?.orderstatus;
                                                const style = getStatusStyle(status);

                                                return (
                                                    <Box
                                                        sx={{
                                                            backgroundColor: style.backgroundColor,
                                                            color: style.color,
                                                            padding: '5px 15px',
                                                            borderRadius: '20px',
                                                            display: 'inline-block'
                                                        }}
                                                    >
                                                        <Typography variant="body2">
                                                            {orderdata?.orderstatus}
                                                        </Typography>
                                                    </Box>
                                                );
                                            })()
                                        }

                                    </Grid>
                                </Grid>

                                <Grid size={12}>
                                    <Divider />
                                </Grid>

                                <Grid container size={12} sx={{ padding: '10px 22px' }}>
                                    <Grid size={4}>
                                        <Typography className="orderdata">Payment method</Typography>
                                    </Grid>
                                    <Grid size={8}>
                                        <Typography variant="body2">{paymentdata?.data?.[0]?.paymentmethod}</Typography>
                                    </Grid>
                                </Grid>

                                <Grid size={12}>
                                    <Divider />
                                </Grid>

                                <Grid container size={12} sx={{ padding: '10px 22px' }}>
                                    <Grid size={4}>
                                        <Typography className="orderdata">Payment Status</Typography>
                                    </Grid>
                                    <Grid size={8}>
                                        <Typography variant="body2">{paymentdata?.data?.[0]?.paymentstatus}</Typography>
                                    </Grid>
                                </Grid>

                            </Grid>
                        </Box>

                        <Typography variant="h6" sx={{ mt: 3 }}>Products</Typography>
                        <TableContainer sx={{
                            border: 1,
                            borderColor: 'rgb(206, 199, 199)',
                            borderRadius: 3,
                            overflow: 'hidden',
                            mt: 2
                        }}>
                            <Table aria-label="simple table" >
                                <TableHead>
                                    <TableRow>
                                        <TableCell> Product</TableCell>
                                        <TableCell>unit Price</TableCell>
                                        <TableCell> Price</TableCell>
                                        <TableCell>qty</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {
                                        orderdata?.products?.map((v) => {

                                            const product = pdata?.data?.find(
                                                (p) => p._id === v.product_id
                                            );

                                            const variant = product?.variants?.find(
                                                (vr) => vr._id === v.variant_id
                                            );

                                            console.log("product", product, variant, v)
                                            return (
                                                <TableRow key={v.product_id}>
                                                    <TableCell scope="row">
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                            <img src={IMG_URL + variant?.images?.[0]} width={50} />
                                                            <Typography>{product?.name}</Typography>
                                                        </Box>

                                                    </TableCell>

                                                    <TableCell >
                                                        <Typography>{product?.price}</Typography>
                                                    </TableCell>

                                                    <TableCell >
                                                        <Typography>{variant?.isFlashSale ? variant?.flashPrice : product?.price}</Typography>
                                                    </TableCell>

                                                    <TableCell >
                                                        <Typography>{v.quantity}</Typography>
                                                    </TableCell>
                                                </TableRow>
                                            );

                                            // return (
                                            //     <Typography key={v.product_id}>
                                            //         {product?.name}
                                            //     </Typography>
                                            // );
                                        })
                                    }
                                </TableBody>
                            </Table>
                            <Box sx={{
                                display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'flex-end', mt: 2, mr: 2, mb: 2
                            }}>
                                <Typography sx={{ fontSize: "18px" }}>Total</Typography>
                                <Typography sx={{ fontSize: "19px" }}>₹{orderdata?.totalamount}</Typography>
                            </Box>
                        </TableContainer>


                    </Box>

                    {/* <Box sx={{ width: 350, p: 2 }}>
                        <Typography variant="h6" sx={{ color: 'black' }}>
                            hello
                        </Typography>
                    </Box> */}
                </Drawer>
            </div >
        </>
    )
}

export default Order;
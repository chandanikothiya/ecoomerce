import { Box, Breadcrumbs, Button, Divider, Grid, IconButton, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IoChevronUp } from "react-icons/io5";
import { IoChevronDownSharp } from "react-icons/io5";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";



function Cart() {

    const [cart, setCart] = useState([]);
    const [allproduct, setAllproduct] = useState([])
    const [quantity, setQuantity] = useState({});


    useEffect(() => {
        fetch("http://localhost:3000/cart")
            .then(reponse => reponse.json())
            .then(data => setCart(data))

        fetch("http://localhost:3000/flashsale")
            .then(reponse => reponse.json())
            .then(data => setAllproduct(data))
    }, [])

    const cartdata = allproduct.filter((v) => cart.some(v1 => v.id === v1.product_id))
    console.log(cart, allproduct)

    const columns = [

        {
            field: 'sname',
            headerName: 'Product',
            width: 400,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, height: '100%' }}>
                    <img src={params.row.img} alt="" width='50' height='50' style={{ objectFit: 'contain' }}></img>
                    <Typography variant="subtitle2">{params.row.sname}</Typography>
                </Box>
            ),
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 350,
        },
        {

            headerName: 'quantity',
            headerAlign: 'left',
            type: 'number',
            width: 350,
            editable: true,
            renderCell: (params) => (
                <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid rgb(172, 167, 167)', padding: '4px 15px', width: 'fit-content', gap: 2 }}>
                        <Typography>
                            {quantity[params.row.id] || 1}
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <IconButton aria-label="up" className="icone-btn"
                                onClick={() =>
                                    setQuantity(prev => ({ ...prev, [params.row.id]: (prev[params.row.id] || 1) + 1 }))}>
                                <IoChevronUp />
                            </IconButton>

                            <IconButton aria-label="down" className="icone-btn" onClick={(event) =>
                                setQuantity(prev => ({
                                    ...prev,
                                    [params.row.id]: Math.max((prev[params.row.id] || 1) - 1, 1),

                                }))
                            }>
                                <IoChevronDownSharp />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            ),
        },
        {
            field: 'discoutprice',
            headerName: 'sub Total',
            headerAlign: 'rigth',
            width: 150,
            renderCell: (params) => (
                <Typography sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>{params.row.price * (quantity[params.row.id] || 1)}</Typography>
            ),
        },
    ];

    return (
        <main>
            <section id="cart">
                <div className="container">
                    {/* <Typography><span style={{ color: 'grey' }}>Home / </span> Contact</Typography> */}

                    <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">

                        <Link
                            underline="hover"
                            color="error"
                            href="/material-ui/getting-started/installation/"
                        >
                            Home
                        </Link>
                        <Typography sx={{ color: 'text.primary' }}>Cart</Typography>
                    </Breadcrumbs>


                    <DataGrid
                        rows={cartdata}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        hideFooterPagination
                        rowHeight={80}
                        pageSizeOptions={[5]}
                        disableRowSelectionOnClick
                        checkboxSelection={false}
                        sx={{
                            '&, [class^=MuiDataGrid]': { border: 'none' }, mt: 5,
                            '  & .MuiDataGrid-columnHeaders': {
                                borderBottom: 'none',
                                '& .MuiDataGrid-columnSeparator': {
                                    display: 'none',
                                }
                            },
                            '& .MuiDataGrid-menuIcon, & .MuiDataGrid-iconButtonContainer': { display: 'none' }
                        }} //target every grid's child element with a class attribute that starts with MuiDataGrid
                    />

                    <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
                        <button className="my-custome-button">Return To Shope</button>
                        <button className="my-custome-button">Update Cart</button>
                    </Box>



                    <Grid container id="coupon" sx={{ mt: 10 }} spacing={{xs:0,sm:10,md:4,lg:10,xl:6}} rowSpacing={5}>
                        <Grid size={{xs:12,sm:6}}>
                            <form>
                                <Box sx={{ display: 'flex', gap: 3}} className="cart-coupon-box">
                                    <TextField id="outlined-basic" className="coupon-text" label="Outlined" variant="outlined" sx={{ width: {xs:'56%',lg:'280px',xl:'350px'}}} />
                                    <button className="my-custome-button cart-coupon-box-btn">Apply Coupon</button>
                                </Box>
                            </form>
                        </Grid>

                        <Grid size={{xs:12,sm:6}}>
                            <Box sx={{ border: 'solid 1px black', padding: '28px 24px',
                                 maxWidth: {xs:'100%',sm:'550px'}, marginLeft: 'auto' }} >
                                <Typography variant="h6">Cart Total</Typography>

                                <Box className='cart-total'>
                                    <Typography>Subtotal:</Typography>
                                    <Typography>$1750</Typography>
                                </Box>

                                <Divider />

                                <Box className='cart-total'>
                                    <Typography>Shipping:</Typography>
                                    <Typography>Free</Typography>
                                </Box>

                                <Divider />

                                <Box className='cart-total'>
                                    <Typography>Total:</Typography>
                                    <Typography>$1750</Typography>
                                </Box>

                                <button className="my-custome-button cardototal-btn" style={{ margin: '32px auto 0 auto ' }}>Procees to checkout</button>
                            </Box>
                        </Grid>
                    </Grid>
                </div>
            </section>
        </main>
    )
}

export default Cart;
import { Box, Button, Divider, Grid, IconButton, TextField, Typography } from "@mui/material";
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



function Cart() {

    const [cart, setCart] = useState([]);
    const [allproduct, setAllproduct] = useState([])
    const [quantity, setQuantity] = useState(1);


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
            editable: true,
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
            editable: true,
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
                        <Typography>{quantity}</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <IconButton aria-label="up" className="icone-btn" onClick={() => setQuantity(quantity + 1)}>
                                <IoChevronUp />
                            </IconButton>
                            <IconButton aria-label="down" className="icone-btn" onClick={() => setQuantity(quantity - 1)}>
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
            editable: true,
        },
    ];

    return (
        <main>
            <section id="cart">
                <div className="container">
                    <Typography><span style={{ color: 'grey' }}>Home / </span> Contact</Typography>

                    {/* <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Product</TableCell>
                                    <TableCell align="center">Price</TableCell>
                                    <TableCell align="center">Quantity</TableCell>
                                    <TableCell align="center">Subtotal</TableCell>
                                </TableRow>
                            </TableHead>
                            {
                                cart.map((v) => {
                                    const c = allproduct.find((v1) => v1.id === v.product_id)

                                    return (
                                        <TableBody>
                                            <TableRow
                                                key={c.name}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" className="tabelcell" scope="row" sx={{display: "flex", gap: 3, alignItems: 'center' }}>
                                                    <img src={c.img} alt="" width='54' />
                                                    <Typography variant="subtitle1"> {c.sname}</Typography>
                                                </TableCell>
                                                <TableCell className="tabelcell" align="center">${c.price}</TableCell>
                                                <TableCell className="tabelcell" align="center">
                                                    <Box sx={{ display:'flex',justifyContent:'center'}}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid rgb(172, 167, 167)', padding: '4px 15px', width: 'fit-content', gap: 2 }}>
                                                            <Typography>{quantity}</Typography>
                                                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                                <IconButton aria-label="up" className="icone-btn" onClick={() => setQuantity(quantity + 1)}>
                                                                    <IoChevronUp />
                                                                </IconButton>
                                                                <IconButton aria-label="down" className="icone-btn" onClick={() => setQuantity(quantity - 1)}>
                                                                    <IoChevronDownSharp />
                                                                </IconButton>
                                                            </Box>
                                                        </Box>
                                                    </Box>

                                                </TableCell>
                                                <TableCell className="tabelcell" align="center">{c.price}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    )
                                })
                            }

                        </Table>
                    </TableContainer> */}
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
                        sx={{ '&, [class^=MuiDataGrid]': { border: 'none' }, mt: 5 }} //target every grid's child element with a class attribute that starts with MuiDataGrid
                    />

                    <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
                        <button className="my-custome-button">Return To Shope</button>
                        <button className="my-custome-button">Update Cart</button>
                    </Box>



                    <Grid container id="coupon" sx={{ mt: 10 }} spacing={10}>
                        <Grid size={6}>
                            <form>
                                <Box sx={{ display: 'flex', gap: 3 }}>
                                    <TextField id="outlined-basic" label="Outlined" variant="outlined" sx={{ width: '300px' }} />
                                    <button className="my-custome-button">Apply Coupon</button>
                                </Box>

                            </form>
                        </Grid>

                        <Grid size={6}>
                            <Box sx={{ border: 'solid 1px black', padding: '28px 24px', maxWidth: '470px',marginLeft:'auto' }} >
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

                                <button className="my-custome-button" style={{margin:'32px auto 0 auto '}}>Procees to checkout</button>
                            </Box>
                        </Grid>
                    </Grid>
                </div>
            </section>
        </main>
    )
}

export default Cart;
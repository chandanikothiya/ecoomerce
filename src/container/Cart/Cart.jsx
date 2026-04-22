import { Box, Breadcrumbs, Button, Card, CardActions, CardContent, CardMedia, Divider, Grid, IconButton, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
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
import { Link, NavLink } from "react-router-dom";
import { useDeleteCartMutation, useGetCartQuery } from "../../redux/api/cart.api";
import { useGetProductQuery } from "../../redux/api/product.api";
import { IMG_URL } from "../../utility/url";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { vars } from "@mui/x-data-grid/internals";
import { IoCloseSharp } from "react-icons/io5";


function Cart() {

    const [cart, setCart] = useState([]);
    const [allproduct, setAllproduct] = useState([])
    const [cartquan, setCartquan] = useState({})
    const [mobilecartdelete, setMobilecartdelete] = useState(false);
    const theme = useTheme();
    const [gridKey, setGridKey] = useState(0);
    const [deletecartdisplay, setDeletecartdisplay] = useState(false);

    const isMobile = useMediaQuery("(max-width:320px)");

    const id = localStorage.getItem('loginid');
    console.log(id)

    const { data, error, isLoading } = useGetCartQuery(id);
    console.log({ data, error, isLoading })

    const [deletecart] = useDeleteCartMutation();

    const { data: pdata, error: perror, isLoading: ploading } = useGetProductQuery();
    console.log(pdata?.data)

    // const cartp = pdata?.data?.filter((v) => data?.body?.products?.some((v1) => v1.product_id.toString() === v._id.toString()));
    // console.log(cartp)

    const cartp = data?.body?.products?.map((cartItem) => {
        const product = pdata?.data?.find(
            (p) => p._id === cartItem.product_id
        );

        if (!product) return null;

        const variant = product?.variants?.find(
            (v) => v._id === cartItem.variant_id
        );

        const selectedVariant = variant || product?.variants?.[0];
        const variantId = selectedVariant?._id;

        return {
            ...product,
            selectedVariant,
            qty: cartquan?.[variantId] ?? 1
        };
    }).filter(Boolean); // remove null
    console.log("cartp", cartp, cartp?.selectedVariant?._id)
    // console.log("cartpp",cartpp)

    let displaycart = ''

    useEffect(() => {
        fetch("http://localhost:3000/cart")
            .then(reponse => reponse.json())
            .then(data => setCart(data))

        fetch("http://localhost:3000/flashsale")
            .then(reponse => reponse.json())
            .then(data => setAllproduct(data))

        // displaycart = getcart();
    }, [])



    console.log(displaycart)

    const cartdata = allproduct.filter((v) => cart.some(v1 => v.id === v1.product_id))
    console.log(cart, allproduct)

    const handledeltecart = async (data) => {
        console.log("deletedata", data)

        const res = await deletecart({ variant_id: data?.selectedVariant?._id, id: localStorage.getItem('loginid') })
        console.log("res", res)
    }

    const columns = [

        {
            field: 'sname',
            headerName: 'Product',
            // width: 400,
            flex: 2,
            minWidth: 200,
            renderCell: (params) => {
                console.log(params?.row, params?.row?.selectedVariant, data?.body?.products)


                return (<Box sx={{ display: 'flex', alignItems: 'center', gap: 2, height: '100%' }}>
                    <img src={IMG_URL + params.row.selectedVariant?.images?.[0]} alt="" width='50' height='50' style={{ objectFit: 'contain', mixBlendMode: "multiply" }}></img>
                    <Typography variant="subtitle2">{params.row.name}</Typography>
                    {deletecartdisplay && (
                        <IconButton
                            sx={{
                                p: 0,
                                position: 'absolute',
                                top: '20%',
                                left: '-1%'
                            }}
                            onClick={() => { handledeltecart(params.row) }}
                        >
                            <IoCloseSharp
                                style={{
                                    backgroundColor: '#DB4444',
                                    padding: '3px',
                                    borderRadius: '50%',
                                    color: '#fff',
                                    width: '18px',
                                    height: '18px'
                                }}

                            />
                        </IconButton>
                    )}

                </Box>)
            },
        },
        {
            field: 'price',
            headerName: 'Price',
            // width: 350,
            flex: 1,
            minWidth: 100,
            renderCell: (params) => {
                console.log(params?.row, params?.row?.selectedVariant, data?.body?.products)

                return (
                    <>
                        <Typography variant="">{params?.row?.selectedVariant.isFlashSale ? params?.row?.selectedVariant.flashPrice : params?.row?.price}</Typography>
                    </>
                )
            },
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            headerAlign: 'left',
            type: 'number',
            flex: 1,
            minWidth: 120,

            renderCell: (params) => {
                // const id = params?.row?.selectedVariant?._id;
                // console.log("target", cartquan[params.row.selectedVariant?._id])
                const id1 = params.row.selectedVariant?._id;
                console.log("target", id1)
                const qty = cartquan?.[id1] ?? 1;
                return (
                    <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid rgb(172, 167, 167)', padding: '4px 15px', width: 'fit-content', gap: 2 }}>

                            <Typography>
                                {params.row.qty}
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <IconButton aria-label="up" className="icone-btn"
                                    onClick={() => {
                                        const id = params.row.selectedVariant?._id;

                                        if (!id) return;

                                        setCartquan((prev) => ({
                                            ...prev,
                                            [id]: (prev[id] ?? 1) + 1
                                        }));
                                    }}
                                >
                                    <IoChevronUp />
                                </IconButton>

                                <IconButton aria-label="down" className="icone-btn"
                                    onClick={() => {
                                        const id = params.row.selectedVariant?._id;

                                        if (!id) return;

                                        setCartquan((prev) => ({
                                            ...prev,
                                            [id]: Math.max((prev[id] ?? 1) - 1, 1)
                                        }));
                                    }}
                                >
                                    <IoChevronDownSharp />
                                </IconButton>
                            </Box>
                        </Box>
                    </Box>
                )
            },
        },
        {
            field: '',
            headerName: 'sub Total',
            headerAlign: 'rigth',
            // width: 150,
            flex: 1,
            minWidth: 120,
            renderCell: (params) => (
                <Typography variant="" sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>{(params?.row?.selectedVariant.isFlashSale ? params?.row?.selectedVariant.flashPrice : params?.row?.price) * (params.row.qty || 1)}</Typography>
            ),
        },
    ];

    console.log("target", cartquan)

    function handleupdatecart() {
        console.log("ok")

        if (isMobile) {
            setMobilecartdelete(!mobilecartdelete)
        } else {
            setDeletecartdisplay(prev => !prev);
        }
        // columns = [
        //     ...prev,
        //     {
        //         field: '',
        //         headerName: 'Action',
        //         width: 120,
        //         editable: true,
        //         renderCell: (params) => (
        //             <>
        //                 <IconButton aria-label="edit" >
        //                     <MdOutlineModeEdit />
        //                 </IconButton>

        //                 <IconButton aria-label="delete">
        //                     <MdDeleteOutline />
        //                 </IconButton>
        //             </>
        //         )
        //     }
        // ]
    }

    console.log("deletecartdisplay", deletecartdisplay)


    const totalprice = cartp.reduce((acc, v) => {
        const price = v?.selectedVariant?.isFlashSale ? v?.selectedVariant?.flashPrice : v.price;

        return (price) * v.qty + acc
    }, 0)
    console.log('totalprice', totalprice, cartquan)

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
                        <Typography sx={{ color: 'text.primary' }} className="breadcrumbs-typo">Cart</Typography>
                    </Breadcrumbs>

                    {isMobile ? (
                        // ✅ MOBILE VIEW (CARD)

                        <Grid container sx={{ mt: 3, mb: 3 }} spacing={{ xs: 1, sm: 3, lg: 4 }} rowSpacing={2}>
                            {
                                cartp?.map((v) => (
                                    <Grid size={{ xs: 6, sm: 4, md: 3, lg: 3 }}>
                                        <Card sx={{ maxWidth: 310, position: 'relative', boxShadow: 0, overflow: 'visible' }}>
                                            <Box
                                                className="carttop"
                                                sx={{
                                                    bgcolor: '#eef0f3', display: 'flex', justifyContent: 'center',
                                                    alignItems: 'center', padding: '20px  0 0', borderRadius: 1,
                                                    height: {
                                                        xs: '120px',
                                                        sm: '160px',
                                                        lg: '250px'
                                                    },
                                                    position: 'relative'
                                                }}>
                                                <CardMedia
                                                    component="img"
                                                    className="cardimg"
                                                    sx={{ objectFit: "contain" }}
                                                    image={IMG_URL + v?.selectedVariant?.images?.[0]}
                                                    title="green iguana"

                                                />

                                            </Box>


                                            <CardContent sx={{ outline: 0, pl: 0, pb: 0 }}>
                                                <Typography gutterBottom variant="h6" component="div" className="cart-name">
                                                    {v.name}
                                                </Typography>
                                                <Box sx={{ display: 'flex', columnGap: 2, mb: 1 }}>

                                                    <Typography variant="body1" sx={{ fontWeight: 500, color: 'black' }}>
                                                        ₹{v.price}
                                                    </Typography>


                                                </Box>
                                            </CardContent>

                                            <CardActions sx={{ padding: 0, pb: 1 }}>
                                                <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid rgb(172, 167, 167)', padding: '1px 15px', width: 'fit-content', gap: 2 }}>
                                                        <Typography>
                                                            {cartquan[v.selectedVariant._id] || 1}
                                                        </Typography>
                                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                            <IconButton aria-label="up" className="icone-btn"
                                                                onClick={() =>
                                                                    setCartquan(prev => ({ ...prev, [v.selectedVariant._id]: (prev[v.selectedVariant._id] || 1) + 1 }))}>
                                                                <IoChevronUp />
                                                            </IconButton>

                                                            <IconButton aria-label="down" className="icone-btn" onClick={(event) =>
                                                                setCartquan(prev => ({
                                                                    ...prev,
                                                                    [v.selectedVariant._id]: Math.max((prev[v.selectedVariant._id] || 1) - 1, 1),

                                                                }))
                                                            }>
                                                                <IoChevronDownSharp />
                                                            </IconButton>


                                                        </Box>
                                                    </Box>
                                                </Box>

                                                {/* <IconButton className="deletemobilecart" sx={{ display: mobilecartdelete ? 'block' : 'none' }}>
                                                    <MdDeleteOutline onClick={() => { handledeltecart(v) }} />
                                                </IconButton> */}


                                            </CardActions>
                                            <Typography variant="body1" sx={{ fontWeight: 500, color: 'black' }}>
                                                <Typography variant="body2" sx={{ display: 'inline' }}> total Price : </Typography>₹{cartquan.hasOwnProperty(v.selectedVariant._id) ? (cartquan[v.selectedVariant._id] * (v?.price)) : v?.price}
                                            </Typography>

                                            {
                                                mobilecartdelete &&
                                                <IconButton
                                                    sx={{
                                                        p: 0,
                                                        position: 'absolute',
                                                        top: '-2%',
                                                        left: '-1%',

                                                    }}
                                                    onClick={() => { handledeltecart(v) }}
                                                >
                                                    <IoCloseSharp
                                                        style={{
                                                            backgroundColor: '#DB4444',
                                                            padding: '3px',
                                                            borderRadius: '50%',
                                                            color: '#fff',
                                                            width: '18px',
                                                            height: '18px'
                                                        }}

                                                    />
                                                </IconButton>
                                            }
                                        </Card>
                                    </Grid>
                                ))
                            }

                        </Grid>

                    ) : (
                        <DataGrid
                            rows={cartp}
                            getRowId={(row) => row.selectedVariant?._id + "_" + row._id}
                            key={gridKey}
                            // getRowId={cartp?._id || Math.random()}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 15,
                                    },
                                },
                            }}
                            hideFooterPagination
                            rowHeight={80}
                            pageSizeOptions={[10]}
                            disableRowSelectionOnClick
                            checkboxSelection={false}
                            sx={{
                                '&, [class^=MuiDataGrid]': { border: 'none' }, mt: 3,
                                '  & .MuiDataGrid-columnHeaders': {
                                    borderBottom: 'none',
                                    '& .MuiDataGrid-columnSeparator': {
                                        display: 'none',
                                    }
                                },
                                '& .MuiDataGrid-menuIcon, & .MuiDataGrid-iconButtonContainer': { display: 'none' },
                                '& .MuiDataGrid-row': { display: 'flex', justifyContent: 'space-between' },
                                '& .MuiDataGrid-cell:focus-within': { outline: 0 }
                            }} //target every grid's child element with a class attribute that starts with MuiDataGrid
                        />
                    )}



                    <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
                        <NavLink to='/'><button className="my-custome-button carts-btn">Return To Shope</button></NavLink>
                        <button className="my-custome-button carts-btn" onClick={handleupdatecart}>Update Cart</button>
                    </Box>



                    <Grid container id="coupon" sx={{ mt: { xs: 5, sm: 7, lg: 10 } }} spacing={{ xs: 0, sm: 5, md: 4, lg: 10, xl: 6 }} rowSpacing={4}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <form>
                                <Box sx={{ display: 'flex', gap: { xs: 3, md: 0, lg: 3 } }} className="cart-coupon-box">
                                    <TextField id="outlined-basic" className="coupon-text" label="Coupon Code" variant="outlined" sx={{ width: { xs: '56%', lg: '280px', xl: '350px' } }} />
                                    <button className="my-custome-button cart-coupon-box-btn">Apply Coupon</button>
                                </Box>
                            </form>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Box sx={{
                                border: 'solid 1px black', padding: '28px 24px',
                                maxWidth: { xs: '100%', sm: '550px' }, marginLeft: 'auto'
                            }} >
                                <Typography variant="h6">Cart Total</Typography>

                                <Box className='cart-total'>
                                    <Typography>Subtotal:</Typography>
                                    <Typography variant="">₹{totalprice}</Typography>
                                </Box>

                                <Divider />

                                <Box className='cart-total'>
                                    <Typography>Shipping:</Typography>
                                    <Typography>Free</Typography>
                                </Box>

                                <Divider />

                                <Box className='cart-total'>
                                    <Typography>Total:</Typography>
                                    <Typography variant="">₹{totalprice}</Typography>
                                </Box>

                                <button className="my-custome-button cardototal-btn" >Procees to checkout</button>
                            </Box>
                        </Grid>
                    </Grid>
                </div>
            </section>
        </main>
    )
}

export default Cart;
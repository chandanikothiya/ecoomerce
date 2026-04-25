import { Box, Breadcrumbs, Checkbox, Divider, FormControl, FormControlLabel, FormLabel, OutlinedInput, Radio, RadioGroup, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useGetProductQuery } from "../../redux/api/product.api";
import { IMG_URL } from "../../utility/url";
import { useGetUserQuery } from "../../redux/api/user.api";
import { useGetallCartQuery, useGetCartQuery } from "../../redux/api/cart.api";
import { useGetallWishlistQuery } from "../../redux/api/wishlist.api";
import { useGetCategoryQuery } from "../../redux/api/category.api";
import { number, object, string } from "yup";
import { useFormik } from "formik";

function Checkout() {

    const [cart, setCart] = useState([]);
    const [allproduct, setAllproduct] = useState([])
    const [poption, setPoption] = useState('cashondelivery');
    const [cartquan, setCartquan] = useState({})

    const { id, vid, cid } = useParams();
    console.log(id, vid)

    const quantity = {};
    const [searchParams, setSearchParams] = useSearchParams();
    //const getquery = searchParams
    searchParams.forEach((v, k) => quantity[k] = Number(v))
    console.log(quantity)


    useEffect(() => {
        fetch("http://localhost:3000/cart")
            .then(reponse => reponse.json())
            .then(data => setCart(data))

        fetch("http://localhost:3000/flashsale")
            .then(reponse => reponse.json())
            .then(data => setAllproduct(data))
    }, [])

    const cartdata = allproduct.filter((v) => cart.some(v1 => v.id === v1.product_id))
    console.log(cartdata)

    const handleChangeo = (e) => {
        setPoption(e.target.value)
    }
    console.log(poption)

    const { data, error, isLoading } = useGetProductQuery();
    console.log(data?.data);
    const uid = localStorage.getItem('loginid')

    const { data: cdata, error: cerror, isLoading: cisloading } = useGetallCartQuery();
    console.log(cdata);
    const cartdatafilter = cdata?.body?.find((v) => v._id?.toString() === cid?.toString())
    console.log(cartdatafilter)

    let detailproduct = '';
    let varient = '';
    let cartp = [];
    let totalprice = '';

    if (id && vid) {
        detailproduct = data?.data?.find((v) => v._id === id)
        console.log(detailproduct)

        const uvarient = detailproduct?.variants?.find((v) => v._id === vid)

        if (!uvarient) return;

        varient = {
            ...uvarient,
            qty:quantity[uvarient._id]
        }
        console.log(varient)
    } else if (cid) {
        cartp = cartdatafilter?.products?.map((cartItem) => {
            console.log(cartItem)
            const product = data?.data?.find(
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
                qty: quantity?.[variantId] ?? 1
            };
        }).filter(Boolean);
        console.log("cartp", cartp)

        totalprice = cartp?.reduce((acc, v) => {
            const price = v?.selectedVariant?.isFlashSale ? v?.selectedVariant?.flashPrice : v.price;

            return (price) * v.qty + acc
        }, 0)

    }


    const { data: udata, error: uerror, isLoading: uisloading } = useGetUserQuery(uid)
    console.log(udata?.data)

    const contactschema = object({
        fname: string().required(),
        comname: string(),
        address: string().required(),
        secondaddress: string(),
        pincode:string().matches(/^\d+$/, "pincode only in numbers").length(6, "Pincode must be exactly 6 digits").required(),
        city: string().required(),
        state:string().required(),
        email: string().required(),
        phoneno: number().max(10, 'Phone number must be 10 digit').min(10, 'Phone number must be 10 digit').required(),
        // message: string().required()
    })

    const formik = useFormik({
        initialValues: {
            fname: udata?.data?.name || '',
            comname: '',
            address: udata?.data?.address || '',
            secondaddress: '',
            pincode:'',
            city: '',
            state:'',
            email: udata?.data?.email || '',
            phoneno: ''
        },
        enableReinitialize: true,
        validationSchema: contactschema,
        onSubmit: async (values, { resetForm }) => {
            console.log("values", values)

            resetForm();
        },
    });

    const { handleSubmit, handleChange, handleBlur, errors, touched, values } = formik;
    console.log(errors, touched)

    return (
        <main>
            <section id="billing">
                <div className="container">
                    {/* <Typography><span style={{ color: 'grey' }}>Home / My Account / Product / View Cart /</span> Contact</Typography> */}

                    <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">
                        <Link underline="hover" color="inherit" href="/">
                            Home
                        </Link>
                        <Link
                            underline="hover"
                            color="error"
                            href="/material-ui/getting-started/installation/"
                        >
                            {vid ? 'productdetail' : 'cart'}
                        </Link>
                        {/* <Link
                            underline="hover"
                            color="error"
                            href="/material-ui/getting-started/installation/"
                        >
                            Product
                        </Link> */}
                        {/* <Link
                            underline="hover"
                            color="error"
                            href="/material-ui/getting-started/installation/"
                        >
                            View Cart
                        </Link> */}
                        <Typography sx={{ color: 'text.primary' }}>CheckOut</Typography>
                    </Breadcrumbs>

                    <Typography variant="h4" sx={{ fontSize: { xs: '25px', sm: "28px", md: '36px' }, mt: 8, mb: 2 }} >Billing Details</Typography>

                    <Grid container columnSpacing={{ xs: 0, sm: 5, md: 5, lg: 10, xl: 18 }} justifyContent='center'>
                        <Grid size={{ xs: 12, sm: 10, md: 6 }}>
                            <form >

                                <FormControl className="billing-textfiled">
                                    <FormLabel htmlFor="component-outlined" className="input-label">First Name<span>*</span></FormLabel>
                                    <TextField
                                        id="fname"
                                        name="fname"
                                        value={udata?.data?.name}
                                        variant="filled"
                                        InputProps={{ disableUnderline: true }}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.fname && touched.fname ? <span>**{errors.fname}</span> : ""}
                                </FormControl>

                                <FormControl className="billing-textfiled">
                                    <FormLabel htmlFor="component-outlined" className="input-label">Company Name</FormLabel>
                                    <TextField
                                        id="comname"
                                        name="comname"
                                        variant="filled"
                                        InputProps={{ disableUnderline: true }}
                                    />
                                </FormControl>


                                <FormControl className="billing-textfiled">
                                    <FormLabel htmlFor="component-outlined" className="input-label">Street Address<span>*</span></FormLabel>
                                    <TextField
                                        id="address"
                                        name="address"
                                        value={udata?.data?.address}
                                        variant="filled"
                                        InputProps={{ disableUnderline: true }}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.address && touched.address ? <span>**{errors.address}</span> : ""}
                                </FormControl>


                                <FormControl className="billing-textfiled">
                                    <FormLabel htmlFor="component-outlined" className="input-label">Apartment, floor, etc. (optional)</FormLabel>
                                    <TextField
                                        id="secondaddress"
                                        name="secondaddress"
                                        variant="filled"
                                        InputProps={{ disableUnderline: true }}
                                    />
                                </FormControl>

                                <FormControl className="billing-textfiled">
                                    <FormLabel htmlFor="component-outlined" className="input-label">Pincode<span>*</span></FormLabel>
                                    <TextField
                                        id="pincode"
                                        name="pincode"
                                        variant="filled"
                                        InputProps={{ disableUnderline: true }}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.pincode && touched.pincode ? <span>**{errors.pincode}</span> : ""}
                                </FormControl>

                                <FormControl className="billing-textfiled">
                                    <FormLabel htmlFor="component-outlined" className="input-label">Town/City<span>*</span></FormLabel>
                                    <TextField
                                        id="city"
                                        name="city"
                                        variant="filled"
                                        InputProps={{ disableUnderline: true }}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.city && touched.city ? <span>**{errors.city}</span> : ""}
                                </FormControl>

                                
                                <FormControl className="billing-textfiled">
                                    <FormLabel htmlFor="component-outlined" className="input-label">State<span>*</span></FormLabel>
                                    <TextField
                                        id="state"
                                        name="state"
                                        variant="filled"
                                        InputProps={{ disableUnderline: true }}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.state && touched.state ? <span>**{errors.state}</span> : ""}
                                </FormControl>

                                <FormControl className="billing-textfiled">
                                    <FormLabel htmlFor="component-outlined" className="input-label">Phone Number<span>*</span></FormLabel>
                                    <TextField
                                        id="phoneno"
                                        name="phoneno"
                                        variant="filled"
                                        InputProps={{ disableUnderline: true }}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.phoneno && touched.phoneno ? <span>**{errors.phoneno}</span> : ""}
                                </FormControl>

                                <FormControl className="billing-textfiled">
                                    <FormLabel htmlFor="component-outlined" className="input-label">Email Address<span>*</span></FormLabel>
                                    <TextField
                                        id="email"
                                        name="email"
                                        value={udata?.data?.email}
                                        variant="filled"
                                        InputProps={{ disableUnderline: true }}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.email && touched.email ? <span>**{errors.email}</span> : ""}
                                </FormControl>


                                <FormControlLabel
                                    control={<Checkbox defaultChecked color="error" />}
                                    label="Save this information for faster check-out next time"
                                    sx={{ mt: 3 }}
                                />
                            </form>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 10, md: 6 }} sx={{ marginTop:'50px' }}>
                            <Box >
                                <Box sx={{ maxWidth: '425px' }} className="checkout-box">
                                    {
                                        varient ? (
                                            <Box sx={{ display: 'flex', alignItems: "center", justifyContent: 'space-between', mt: 4 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                                    <img src={IMG_URL + varient.images?.[0]} alt="" width='50' />
                                                    <Typography className="checkout-typo">{detailproduct.name}</Typography>
                                                </Box>
                                                <Typography className="checkout-typo">₹{(varient.isFlashSale ? varient.flashPrice : detailproduct.price) * varient.qty}</Typography>
                                            </Box>)
                                            :
                                            cartp?.length > 0 &&
                                            cartp?.map((v) => {
                                                console.log(v)
                                                return (
                                                    <Box sx={{ display: 'flex', alignItems: "center", justifyContent: 'space-between', mt: 4 }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                                            <img src={IMG_URL + v?.selectedVariant.images?.[0]} alt="" width='50' />
                                                            <Typography className="checkout-typo">{v?.name}</Typography>
                                                        </Box>
                                                        <Typography className="checkout-typo">₹{(v?.selectedVariant?.isFlashSale ? v.selectedVariant?.flashPrice : v.price)*v.qty }</Typography>
                                                    </Box>
                                                )
                                            })

                                    }

                                </Box>

                                <Box sx={{ mt: '32px', maxWidth: '550px' }} className="checkout-box">

                                    <Box className='cart-total'>
                                        <Typography className="checkout-typo">Subtotal:</Typography>
                                        <Typography className="checkout-typo">
                                            ₹{
                                                varient !== '' ?
                                                    (varient?.isFlashSale ? varient?.flashPrice : detailproduct?.price) * varient.qty
                                                    : cartp !== '' &&
                                                    totalprice
                                            }

                                        </Typography>
                                    </Box>

                                    <Divider />

                                    <Box className='cart-total'>
                                        <Typography className="checkout-typo">Shipping:</Typography>
                                        <Typography className="checkout-typo">Free</Typography>
                                    </Box>

                                    <Divider />

                                    <Box className='cart-total'>
                                        <Typography className="checkout-typo">Total:</Typography>
                                        <Typography className="checkout-typo">₹{
                                            varient !== '' ?
                                                (varient?.isFlashSale ? varient?.flashPrice : detailproduct?.price) * varient.qty
                                                : cartp !== '' &&
                                                totalprice
                                        }</Typography>
                                    </Box>
                                </Box>

                                <FormControl sx={{ width: '425px' }} className="checkout-box">
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="cashondelivery"
                                        name="radio-buttons-group"
                                        value={poption}
                                        onChange={handleChangeo}
                                        sx={{
                                            '& .MuiRadio-root': {
                                                color: 'black !important',
                                            },
                                            '& .MuiRadio-root.Mui-checked': {
                                                color: 'black !important',
                                            },
                                        }}
                                    >

                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", width: '100%' }} >
                                            <FormControlLabel value="bank"
                                                control={<Radio />} label="Bank" />
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} className="bank-card">
                                                <img src="../../../public/assets/images/payment_cards/image32.png" alt="" />
                                                <img src="../../../public/assets/images/payment_cards/Visa.png" alt="" />
                                                <img src="../../../public/assets/images/payment_cards/Mastercard.png" alt="" />
                                                <img src="../../../public/assets/images/payment_cards/Nagad.png" alt="" />
                                            </Box>
                                        </Box>

                                        <FormControlLabel value="cashondelivery" control={<Radio />} label="Cash on delivery" />

                                    </RadioGroup>
                                </FormControl>

                                <form style={{ margin: '32px 0' }} className="checkout-box">
                                    <Box sx={{ display: 'flex', gap: 3 }} className="cart-coupon-box">
                                        <TextField id="outlined-basic" className="coupon-textc" label="Outlined" variant="outlined" sx={{ width: { xs: '56%', lg: '280px', xl: '350px' } }} />
                                        <button className="my-custome-button cart-coupon-box-btn">Apply Coupon</button>
                                    </Box>
                                </form>

                                <button className="my-custome-button place-order-btn" onClick={handleSubmit}>Place Order</button>
                            </Box>

                        </Grid>
                    </Grid>

                </div>
            </section>
        </main>
    )
}

export default Checkout;
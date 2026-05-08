import { Box, Breadcrumbs, Checkbox, Divider, FormControl, FormControlLabel, FormLabel, IconButton, OutlinedInput, Radio, RadioGroup, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useGetProductQuery } from "../../redux/api/product.api";
import { IMG_URL } from "../../utility/url";
import { useGetUserQuery } from "../../redux/api/user.api";
import { useGetallCartQuery, useGetCartQuery } from "../../redux/api/cart.api";
import { useGetallWishlistQuery } from "../../redux/api/wishlist.api";
import { useGetCategoryQuery } from "../../redux/api/category.api";
import { number, object, string } from "yup";
import { useFormik } from "formik";
import { useAddOrderMutation } from "../../redux/api/order.api";
import { useAddAddressMutation, useGetAddressQuery, useUpdateAddressMutation } from "../../redux/api/address.api";
import { useAddPaymentMutation, useCreatePaymentMutation } from "../../redux/api/payment.api";
import { load } from "@cashfreepayments/cashfree-js";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';
import CheckIcon from '@mui/icons-material/Check';
import { useCheckCouponMutation } from "../../redux/api/coupon.api";

function Checkout() {

    const [coupon, setCoupon] = useState('');
    const [cart, setCart] = useState([]);
    const [sessionid, setSessionId] = useState();
    const [allproduct, setAllproduct] = useState([])
    const [poption, setPoption] = useState('cashondelivery');
    const [cartquan, setCartquan] = useState({});
    const { id, vid, cid } = useParams();
    const [cashonsuccess, setCashonsuccess] = useState(false);
    const navigate = useNavigate();
    console.log(id, vid)
    const [addpayment] = useAddPaymentMutation();
    const [finalprice, setFinalprice] = useState();

    const quantity = {};
    const [searchParams, setSearchParams] = useSearchParams();
    //const getquery = searchParams
    searchParams.forEach((v, k) => {
        if (k !== 'couponprice') {
            quantity[k] = Number(v);
        }
    }
    )
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
    console.log("poption", poption)

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

        if (uvarient) {
            varient = {
                ...uvarient,
                qty: quantity[uvarient._id]
            };
        }
        console.log(varient)

        totalprice = (varient?.isFlashSale ? varient?.flashPrice : detailproduct?.price) * varient.qty;

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

    useEffect(() => {

        const couponPrice = searchParams.get('couponprice');

        if (couponPrice) {
            setFinalprice(Number(couponPrice));
        } else if (totalprice) {
            setFinalprice(totalprice);
        }

    }, [searchParams, totalprice]);



    const { data: udata, error: uerror, isLoading: uisloading } = useGetUserQuery(uid)
    console.log(udata?.data)
    const [addorder] = useAddOrderMutation();
    const [addaddress] = useAddAddressMutation();
    const [updateaddress] = useUpdateAddressMutation();
    const { data: addressdata, error: addresserror, isLoading: addressisloading } = useGetAddressQuery(uid);
    console.log("addressdata", addressdata)
    const [checkcoupon] = useCheckCouponMutation();

    // cashfree start
    // let cashfree;
    const cashfree = useRef(null);
    var initializeSDK = async function () {
        cashfree.current = await load({
            mode: "sandbox",
        });
    };

    const [createpayemnt] = useCreatePaymentMutation();

    useEffect(() => {
        initializeSDK();
    }, [])
    console.log(sessionid)

    // useEffect(() => {
    //     if (totalprice) {
    //         setFinalprice(totalprice);
    //     }
    // }, [totalprice]);

    const doPayment = async (paymentSessionId) => {
        if (!cashfree.current || !paymentSessionId) {
            console.log("Cashfree not loaded");
            return;
        }
        console.log("ok")
        let checkoutOptions = {
            paymentSessionId: paymentSessionId,
            redirectTarget: "_self",
        };
        await cashfree.current.checkout(checkoutOptions);
    };
    // cashfree end

    const handleordersubmit = async (values) => {
        console.log("values", values, cartp, varient, detailproduct)

        const products = [];
        //let totalamount;

        if (cartp?.length > 0) {
            cartp?.forEach((v) => {
                products.push({
                    "product_id": v._id, "variant_id": v.selectedVariant._id, "quantity":
                        v.qty, "price": v.selectedVariant.isFlashSale ? v.selectedVariant.flashPrice : v.price
                })
            })
            // totalamount = totalprice;

        } else if (varient !== '') {
            products.push({
                "product_id": detailproduct._id, "variant_id": varient._id, "quantity":
                    varient.qty, "price": varient.isFlashSale ? varient.flashPrice : detailproduct.price
            })
            //totalamount = (products[0].price) * varient.qty;
        }

        // /(varient?.isFlashSale ? varient?.flashPrice : detailproduct?.price) * varient.qty
        console.log("values", products)
        const { fname, email, phoneno, ...address } = values;
        console.log("values", address)

        const obj = {
            "user_id": uid,
            "products": products,
            "totalamount": totalprice,
            "address": { ...address, "streetaddress": address.address },
            "phoneno": phoneno
        }
        console.log("values", obj)
        const orderresponse = await addorder(obj);
        console.log("orderresponse", orderresponse)


        const paymentObject = {
            order_id: orderresponse?.data?.data?._id,
            orderamt: finalprice,
            customer_id: udata?.data?._id,
            customer_name: udata?.data?.name,
            customer_email: udata?.data?.email,
            customer_phone: "9999999999"
        };

        const response = await createpayemnt(paymentObject).unwrap();

        console.log("createresponse", response);

        setSessionId(response?.payment_session_id);

        if (poption === 'bank') {
            await doPayment(response?.payment_session_id);
        } else if (poption === 'cashondelivery') {
            const obj = {
                user_id: uid,
                order_id: orderresponse?.data?.data?._id,
                amount: totalprice,
                paymentstatus: "PENDING"
            }

            console.log('cashondelivery', obj)

            addpayment(obj)

            setCashonsuccess(true)

            setTimeout(() => {
                setCashonsuccess(false)
            }, 1000);

            navigate('/')
        }

        console.log("isAddressExist")

        const isAddressExist = addressdata?.data?.streetaddress === values.address &&
            addressdata?.data?.city === values.city &&
            addressdata?.data?.state === values.state &&
            addressdata?.data?.pincode === values.pincode


        console.log("isAddressExist", isAddressExist)

        if (!isAddressExist) {
            addaddress({ ...address, "user_id": uid, "streetaddress": address.address })
        } else {
            const needupdate = addressdata?.data?.companyname !== values.comname || addressdata?.data?.aptfloor !== values.aptfloor
            console.log("needupdate", needupdate)
            if (needupdate) {
                console.log("address", addressdata?.data?._id)
                updateaddress({ data: address, id: addressdata?.data?._id })
            }
        }

        //console.log("poption", poption)

    }

    const contactschema = object({
        fname: string().required(),
        comname: string(),
        address: string().required(),
        secondaddress: string(),
        pincode: string().matches(/^\d+$/, "pincode only in numbers").length(6, "Pincode must be exactly 6 digits").required(),
        city: string().required(),
        state: string().required(),
        email: string().required(),
        phoneno: string().required().matches(/^\+?[1-9]\d{9,14}$/, 'invalid phone'),
        // message: string().required()
    })

    const formik = useFormik({
        initialValues: {
            fname: udata?.data?.name || '',
            companyname: addressdata?.data?.companyname || '',
            address: addressdata?.data?.streetaddress || '',
            aptfloor: addressdata?.data?.aptfloor || '',
            pincode: addressdata?.data?.pincode || '',
            city: addressdata?.data?.city || '',
            state: addressdata?.data?.state || '',
            email: udata?.data?.email || '',
            phoneno: ''
        },
        enableReinitialize: true,
        validationSchema: contactschema,
        onSubmit: async (values, { resetForm }) => {
            console.log("values", values)
            handleordersubmit(values);
            resetForm();
        },
    });

    const { handleSubmit, handleChange, handleBlur, errors, touched, values } = formik;
    console.log(errors, touched)


    const handlecoupon = async (e) => {
        e.preventDefault();
        console.log("coupon", coupon)

        const res = await checkcoupon({ code: coupon })
        console.log("response", res)

        const discount = res?.data?.data?.discount;

        const updatedPrice =
            totalprice - ((totalprice * discount) / 100);

        setFinalprice(updatedPrice);
        console.log("response", totalprice)

    }

    console.log("response", finalprice)

    return (
        <main>
            <section id="billing" style={{ position: 'relative' }}>
                {
                    cashonsuccess && <Stack sx={{ width: '350px', position: 'absolute', top: '-6%', right: 0, height: '150px' }} spacing={2}>
                        <Alert variant="filled" icon={false} severity="success"
                            sx={{
                                minWidth: '100%', height: '100%', textAlign: 'center',
                                '& .MuiAlert-message': { width: '100%' }
                            }}>
                            <Box sx={{ backgroundColor: ' rgba(255, 255, 255, 0.356)', borderRadius: '50%', p: 1, width: 'fit-content', margin: '0 auto' }}>
                                <IconButton aria-label="deleLocalShipping" sx={{ backgroundColor: 'white' }}>
                                    <CheckIcon sx={{}} />
                                </IconButton>
                            </Box>
                            <Typography variant="h5" sx={{ mt: 2 }}>Your Order confirm</Typography>
                        </Alert>
                    </Stack>
                }

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
                                        id="companyname"
                                        name="companyname"
                                        value={values.companyname}
                                        variant="filled"
                                        InputProps={{ disableUnderline: true }}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </FormControl>


                                <FormControl className="billing-textfiled">
                                    <FormLabel htmlFor="component-outlined" className="input-label">Street Address<span>*</span></FormLabel>
                                    <TextField
                                        id="address"
                                        name="address"
                                        value={values.address}
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
                                        value={values.aptfloor}
                                        variant="filled"
                                        InputProps={{ disableUnderline: true }}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </FormControl>

                                <FormControl className="billing-textfiled">
                                    <FormLabel htmlFor="component-outlined" className="input-label">Pincode<span>*</span></FormLabel>
                                    <TextField
                                        id="pincode"
                                        name="pincode"
                                        value={values.pincode}
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
                                        value={values.city}
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
                                        value={values.state}
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
                                        value={values.phoneno}
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
                                    sx={{ mt: 3, mr: 0, '& .css-rizt0-MuiTypography-root': { fontSize: { xs: '11.5px', sm: '16px' } } }}
                                />
                            </form>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 10, md: 6 }} sx={{ marginTop: '0px' }}>
                            <Box >
                                <Box sx={{ maxWidth: { xs: '100%', sm: '425px' } }} className="checkout-box">
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
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0, sm: 3 } }}>
                                                            <img src={IMG_URL + v?.selectedVariant.images?.[0]} alt="" width='50' />
                                                            <Typography className="checkout-typo">{v?.name}</Typography>
                                                        </Box>
                                                        <Typography className="checkout-typo">₹{(v?.selectedVariant?.isFlashSale ? v.selectedVariant?.flashPrice : v.price) * v.qty}</Typography>
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
                                                finalprice
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
                                            // varient !== '' ?
                                            //     (varient?.isFlashSale ? varient?.flashPrice : detailproduct?.price) * varient.qty
                                            //     : cartp !== '' &&
                                            //     totalprice
                                            finalprice
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

                                <form style={{ margin: '32px 0' }} className="checkout-box" onSubmit={handlecoupon}>
                                    <Box sx={{ display: 'flex', columnGap: { sm: 0, md: 3 }, rowGap: { xs: 3, sm: 0 } }} className="cart-coupon-box">
                                        <TextField id="coupon-code" name="coupon-code" className="coupon-textc"
                                            label="Coupon Code" variant="outlined"
                                            //sx={{ width: { xs: '56%', lg: '300px', xl: '300px' }}} 
                                            onChange={(e) => setCoupon(e.target.value)}
                                            sx={{
                                                '& .MuiOutlinedInput-input': {
                                                    padding: {
                                                        xs: '12px 14px',
                                                        md: '12px 14px',
                                                        lg: '14px 14px'
                                                    }
                                                },
                                                '& .MuiInputLabel-root': {
                                                    top: {
                                                        xs: -3,
                                                        md: 0
                                                    }
                                                }
                                            }}
                                        />
                                        <button className="my-custome-button cart-coupon-box-btn" type="submit">Apply Coupon</button>
                                    </Box>
                                </form>

                                <button type="submit" className="my-custome-button place-order-btn" onClick={handleSubmit}>Place Order</button>
                            </Box>

                        </Grid>
                    </Grid>
                </div>
            </section>
        </main>
    )
}

export default Checkout;
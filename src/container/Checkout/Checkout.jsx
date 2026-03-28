import { Box, Breadcrumbs, Checkbox, Divider, FormControl, FormControlLabel, FormLabel, OutlinedInput, Radio, RadioGroup, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Checkout() {

    const [cart, setCart] = useState([]);
    const [allproduct, setAllproduct] = useState([])
    const [poption, setPoption] = useState('cashondelivery')


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

    const handleChange = (e) => {
        setPoption(e.target.value)
    }
    console.log(poption)

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
                            My Account
                        </Link>
                        <Link
                            underline="hover"
                            color="error"
                            href="/material-ui/getting-started/installation/"
                        >
                            Product
                        </Link>
                        <Link
                            underline="hover"
                            color="error"
                            href="/material-ui/getting-started/installation/"
                        >
                            View Cart
                        </Link>
                        <Typography sx={{ color: 'text.primary' }}>CheckOut</Typography>
                    </Breadcrumbs>

                    <Typography variant="h4" sx={{ fontSize: '36px', mt: 8, mb: 2 }} >Billing Details</Typography>

                    <Grid container columnSpacing={{xs:0,sm:5,md:5, lg: 10, xl: 18 }} justifyContent='center'>
                        <Grid size={{xs:12,sm:10,md:6}}>
                            <form>

                                <FormControl className="billing-textfiled">
                                    <FormLabel htmlFor="component-outlined" className="input-label">First Name<span>*</span></FormLabel>
                                    <TextField
                                        id="fname"
                                        name="fname"
                                        variant="filled"
                                        InputProps={{ disableUnderline: true }}
                                    />
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
                                        variant="filled"
                                        InputProps={{ disableUnderline: true }}
                                    />
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
                                    <FormLabel htmlFor="component-outlined" className="input-label">Town/City<span>*</span></FormLabel>
                                    <TextField
                                        id="city"
                                        name="city"
                                        variant="filled"
                                        InputProps={{ disableUnderline: true }}
                                    />
                                </FormControl>

                                <FormControl className="billing-textfiled">
                                    <FormLabel htmlFor="component-outlined" className="input-label">Phone Number<span>*</span></FormLabel>
                                    <TextField
                                        id="phoneno"
                                        name="phoneno"
                                        variant="filled"
                                        InputProps={{ disableUnderline: true }}
                                    />
                                </FormControl>

                                <FormControl className="billing-textfiled">
                                    <FormLabel htmlFor="component-outlined" className="input-label">Email Address<span>*</span></FormLabel>
                                    <TextField
                                        id="email"
                                        name="email"
                                        variant="filled"
                                        InputProps={{ disableUnderline: true }}
                                    />
                                </FormControl>


                                <FormControlLabel
                                    control={<Checkbox defaultChecked color="error" />}
                                    label="Save this information for faster check-out next time"
                                    sx={{ mt: 3 }}
                                />
                            </form>
                        </Grid>

                        <Grid size={{xs:12,sm:10,md:6}} sx={{ display: 'flex', alignItems: 'center'}}>
                            <Box >
                                <Box sx={{ maxWidth: '425px' }} className="checkout-box">
                                    {
                                        cartdata.map((v) => (
                                            <Box sx={{ display: 'flex', alignItems: "center", justifyContent: 'space-between', mt: 4 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                                    <img src={v.img} alt="" width='50' />
                                                    <Typography className="checkout-typo">{v.sname}</Typography>
                                                </Box>
                                                <Typography className="checkout-typo">${v.price}</Typography>
                                            </Box>
                                        ))
                                    }

                                </Box>

                                <Box sx={{ mt: '32px', maxWidth:'550px'}} className="checkout-box">

                                    <Box className='cart-total'>
                                        <Typography className="checkout-typo">Subtotal:</Typography>
                                        <Typography className="checkout-typo">$1750</Typography>
                                    </Box>

                                    <Divider />

                                    <Box className='cart-total'>
                                        <Typography className="checkout-typo">Shipping:</Typography>
                                        <Typography className="checkout-typo">Free</Typography>
                                    </Box>

                                    <Divider />

                                    <Box className='cart-total'>
                                        <Typography className="checkout-typo">Total:</Typography>
                                        <Typography className="checkout-typo">$1750</Typography>
                                    </Box>
                                </Box>

                                <FormControl sx={{ width: '425px' }}>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="cashondelivery"
                                        name="radio-buttons-group"
                                        value={poption}
                                        onChange={handleChange}
                                    >

                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", width: '100%' }}>
                                            <FormControlLabel value="bank" control={<Radio />} label="Bank" />
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <img src="../../../public/assets/images/payment_cards/image32.png" alt="" />
                                                <img src="../../../public/assets/images/payment_cards/Visa.png" alt="" />
                                                <img src="../../../public/assets/images/payment_cards/Mastercard.png" alt="" />
                                                <img src="../../../public/assets/images/payment_cards/Nagad.png" alt="" />
                                            </Box>
                                        </Box>

                                        <FormControlLabel value="cashondelivery" control={<Radio />} label="Cash on delivery" />

                                    </RadioGroup>
                                </FormControl>

                                <form style={{ margin: '32px 0' }}>
                                    <Box sx={{ display: 'flex', gap: 3 }} className="cart-coupon-box">
                                        <TextField id="outlined-basic" className="coupon-textw" label="Outlined" variant="outlined" sx={{ width: { xs: '50%', lg: '280px', xl: '350px' } }} />
                                        <button className="my-custome-button cart-coupon-box-btn">Apply Coupon</button>
                                    </Box>
                                </form>

                                <button className="my-custome-button place-order-btn" >Place Order</button>
                            </Box>

                        </Grid>
                    </Grid>

                </div>
            </section>
        </main>
    )
}

export default Checkout;
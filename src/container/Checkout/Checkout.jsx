import { Box, Checkbox, Divider, FormControl, FormControlLabel, FormLabel, OutlinedInput, Radio, RadioGroup, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";

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
                    <Typography><span style={{ color: 'grey' }}>Home / My Account / Product / View Cart /</span> Contact</Typography>

                    <Typography variant="h4" sx={{ fontSize: '36px', mt: 8, mb: 2 }} >Billing Details</Typography>

                    <Grid container spacing={21}>
                        <Grid size={6}>
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

                        <Grid size={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Box >
                                <Box sx={{ maxWidth: '425px' }}>
                                    {
                                        cartdata.map((v) => (
                                            <Box sx={{ display: 'flex', alignItems: "center", justifyContent: 'space-between', mt: 4 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                                    <img src={v.img} alt="" width='50' />
                                                    <Typography>{v.sname}</Typography>
                                                </Box>
                                                <Typography>${v.price}</Typography>
                                            </Box>
                                        ))
                                    }

                                </Box>

                                <Box sx={{ mt: '32px', maxWidth: '425px' }} >

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
                                    <Box sx={{ display: 'flex', gap: 3 }}>
                                        <TextField id="outlined-basic" label="Outlined" variant="outlined" sx={{ width: '300px' }} />
                                        <button className="my-custome-button coupon-button">Apply Coupon</button>
                                    </Box>
                                </form>

                                <button className="my-custome-button">Place Order</button>
                            </Box>

                        </Grid>
                    </Grid>

                </div>
            </section>
        </main>
    )
}

export default Checkout;
import React, { useEffect, useState } from "react";
import { Box, Breadcrumbs, Button, Card, CardActions, CardContent, CardMedia, FormControlLabel, Grid, IconButton, Radio, RadioGroup, Rating, Stack, Typography } from "@mui/material";
import { PiLineVerticalThin } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";
import { LuTruck } from "react-icons/lu";
import { MdAutorenew } from "react-icons/md";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from "react-router-dom";

function Productdetail() {

    const [counter, setCounter] = useState(1)
    const [active, setActive] = useState()
    const [allproducts, setAllproducts] = useState([]);


    useEffect(() => {
        fetch("http://localhost:3000/flashsale")
            .then(response => response.json())
            .then(data => setAllproducts(data))
    }, [])

    console.log(allproducts)


    const handleIncrese = () => {
        setCounter(counter + 1)
        setActive("increse")
    }

    const handleDecrese = () => {
        if (counter > 0) {
            setCounter(counter - 1)
            setActive("decrese")
        }
    }

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const availableColors = [
        { value: '#E07575', label: 'red' },
        { value: '#8aa8d4', label: 'blue' },
    ];
    const [selectedValue, setSelectedValue] = React.useState(availableColors[0].label);


    const Size = ['XS', 'S', 'M', 'L', 'XL']

    return (
        <main>
            <section id="product-detail">
                <div className="container">
                    {/* <Typography><span style={{ color: 'grey' }}>Home / Gaming / </span>Havic HV G-92 Gamepad</Typography> */}

                    <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">
                        <Link underline="hover" color="inherit" href="/">
                            Home
                        </Link>
                        <Link
                            underline="hover"
                            color="error"
                            href="/material-ui/getting-started/installation/"
                        >
                            Gaming
                        </Link>
                        <Typography sx={{ color: 'text.primary' }}>Havic HV G-92 Gamepad</Typography>
                    </Breadcrumbs>

                    <Grid container sx={{ mt: 10 }} spacing={15}>
                        <Grid size={7} container spacing={3} alignItems="stretch">
                            <Grid size={3} container direction='column' spacing={4} display="flex">
                                <Grid>
                                    <Box className="detailimg-box">
                                        <img src="../../../public/assets/images/productdetail/image 57.png" alt="" />
                                    </Box>
                                </Grid>
                                <Grid>
                                    <Box className="detailimg-box">
                                        <img src="../../../public/assets/images/productdetail/image 58.png" alt="" />
                                    </Box>
                                </Grid>
                                <Grid>
                                    <Box className="detailimg-box">
                                        <img src="../../../public/assets/images/productdetail/image 59.png" alt="" />
                                    </Box>
                                </Grid>
                                <Grid>
                                    <Box className="detailimg-box">
                                        <img src="../../../public/assets/images/productdetail/image 61.png" alt="" />
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid size={9} display="flex">
                                <Box className="detailimg-box deatail-main-img">
                                    <img src="../../../public/assets/images/productdetail/image 63.png" alt="" width='100%' />
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid size={5}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Havic HV G-92 Gamepad</Typography>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                                <Rating name="read-only" value={3} readOnly />
                                <Typography>(150 Reviews) </Typography>
                                <Typography> <PiLineVerticalThin sx={{ bgcolor: 'black' }} /> <span style={{ color: '#00FF66' }}> In Stock</span></Typography>
                            </Box>

                            <Typography variant="h5" sx={{ mt: 2, mb: 3 }}>$192.00</Typography>

                            <Typography sx={{ fontSize: '14px', maxWidth: '373px', mb: 3 }}>
                                PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.
                            </Typography>

                            <hr />

                            <Box sx={{ mt: 3, display: "flex", alignItems: 'center',columnGap:2 }}>
                                <Typography sx={{ fontSize: '20px' }}>Colours :</Typography>
                                <RadioGroup
                                    name="dynamic-radio-buttons-group"
                                    value={selectedValue}
                                    onChange={handleChange}
                                   
                                >
                                    <div>
                                        {
                                            availableColors.map((v) => (
                                                <FormControlLabel
                                                    key={v.value}
                                                    value={v.label}
                                                   
                                                    label={v.label}
                                                    control={
                                                        <Radio
                                                            sx={{
                                                                color:v.value,
                                                                '&.Mui-checked': {
                                                                    color:v.value,
                                                                },
                                                            }}
                                                        />
                                                    }
                                                    // sx={{
                                                    //     '& .css-9oxshb-MuiRadioButtonIcon-root': { color: v.value }
                                                    // }}
                                                />

                                            ))
                                        }

                                    </div>
                                </RadioGroup>
                            </Box>
                            {/* size */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 3 }}>
                                <Typography sx={{ fontSize: '20px' }}>Size :</Typography>

                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    {
                                        Size.map((v) => (
                                            <Typography className="sizebox">{v}</Typography>

                                        ))
                                    }
                                </Box>

                            </Box>

                            {/* counter */}
                            <Box sx={{ display: 'flex', mt: 3, gap: 4 }}>
                                <Box className='countbox'>
                                    <button className="count-btn" style={{ borderRight: 'solid 1px rgb(172, 167, 167)', backgroundColor: active === 'decrese' ? '#DB4444' : 'white', color: active === 'decrese' ? 'white' : 'black' }} onClick={handleDecrese}>-</button>
                                    <Typography sx={{ padding: '0 35px' }}>{counter}</Typography>
                                    <button className="count-btn" style={{ borderLeft: 'solid 1px rgb(172, 167, 167)', backgroundColor: active === 'increse' ? '#DB4444' : 'white', color: active === 'increse' ? 'white' : 'black' }} onClick={handleIncrese}>+</button>
                                </Box>

                                <buton className="my-custome-button">Buy Now</buton>

                                <button className="wishlist-deatil">
                                    <CiHeart />
                                </button>
                            </Box>

                            <Box sx={{ border: 1, borderColor: 'rgb(172, 167, 167)', borderRadius: 1, padding: '24px 0', mt: 5 }}>
                                <Box className="delivery-box">
                                    <LuTruck className="delivery-icone" />
                                    <Box>
                                        <Typography>Free Delivery</Typography>
                                        <Typography sx={{ fontSize: '12px' }}><a href="#">Enter your postal code for Delivery Availability</a></Typography>
                                    </Box>
                                </Box>

                                <hr style={{ margin: '20px 0' }} />

                                <Box className="delivery-box">
                                    <MdAutorenew className="delivery-icone" />
                                    <Box>
                                        <Typography>Return Delivery</Typography>
                                        <Typography sx={{ fontSize: '12px' }}><a href="#">Free 30 Days Delivery Returns. Details</a></Typography>
                                    </Box>
                                </Box>
                            </Box>

                        </Grid>
                    </Grid>

                </div>
            </section>

            <section id="related-item">
                <div className="container">
                    <Box className="related-title">
                        <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1, color: '#DB4444' }}>
                            <i className="fa-solid fa-square" style={{ fontSize: '30px' }}></i>
                            <Typography variant="h6" sx={{ fontWeight: '400' }}>Related Item</Typography>
                        </Box>
                    </Box>

                    <Grid container sx={{ mt: 7 }} spacing={4}>
                        {
                            allproducts.slice(0, 4).map((v) => {
                                const r = v.rating.reduce((acc, v) => acc + v, 0)
                                // console.log(r)
                                const rate = r / v.rating.length;
                                // console.log(rate)
                                return (
                                    <Grid size={3}>
                                        <Card sx={{ maxWidth: 310, position: 'relative', boxShadow: 0 }}>
                                            <Box
                                                className="carttop"
                                                sx={{
                                                    bgcolor: '#eef0f3', display: 'flex', justifyContent: 'center',
                                                    alignItems: 'center', padding: '20px  0 0', borderRadius: 1, height: '250px', position: 'relative'
                                                }}>
                                                <CardMedia
                                                    component="img"
                                                    height="140"
                                                    className="cardimg"
                                                    sx={{ objectFit: "contain" }}
                                                    image={v.img}
                                                    title="green iguana"

                                                />


                                                <Typography
                                                    className="addcart"
                                                    sx={{
                                                        bgcolor: 'black', width: "100%", color: 'white', display: 'none',
                                                        textAlign: 'center', justifySelf: 'flex-end', position: 'absolute',
                                                        bottom: '10%', padding: '8px 0', borderRadius: '0 0 5px 5px'
                                                    }}
                                                >
                                                    <ShoppingCartOutlinedIcon /> Add To Cart
                                                </Typography>
                                            </Box>


                                            <CardContent sx={{ outline: 0 }}>
                                                <Typography gutterBottom variant="h6" component="div">
                                                    {v.name}
                                                </Typography>
                                                <Box sx={{ display: 'flex', columnGap: 2, mb: 1 }}>
                                                    <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500, color: '#DB4444' }}>
                                                        {v.discoutprice}
                                                    </Typography>
                                                    <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500, textDecoration: 'line-through', color: 'grey' }}>
                                                        {v.price}
                                                    </Typography>
                                                </Box>

                                                <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}>
                                                    <Typography sx={{ color: '#FFAD33' }}>
                                                        <Stack spacing={1}>
                                                            <Rating name="half-rating" defaultValue={rate} precision={0.5} sx={{ fontSize: '20px' }} />
                                                        </Stack>
                                                    </Typography>
                                                    <Typography sx={{ color: 'grey', fontWeight: '600' }}>
                                                        {`(${r})`}
                                                    </Typography>
                                                </Box>

                                                {
                                                    v.discount ?
                                                        <Box sx={{ bgcolor: '#DB4444', color: 'white', width: 'fit-content', padding: '2px 12px', borderRadius: 1, position: 'absolute', top: '3%' }}>
                                                            <Typography variant="body2">{v.discount}</Typography>
                                                        </Box>
                                                        : ""
                                                }

                                                {
                                                    v.new ?
                                                        <Box sx={{ bgcolor: '#00FF66', color: 'white', width: 'fit-content', padding: '2px 12px', borderRadius: 1, position: 'absolute', top: '3%' }}>
                                                            <Typography variant="body2">NEW</Typography>
                                                        </Box> :
                                                        ""
                                                }

                                            </CardContent>

                                            <CardActions
                                                sx={{
                                                    flexDirection: 'column', rowGap: 1, position: "absolute", top: '5px', right: '0',
                                                    '& .MuiIconButton-root': {
                                                        marginLeft: 0
                                                    }
                                                }}
                                            >
                                                <IconButton sx={{ bgcolor: 'white', boxShadow: 1, }} size="small">
                                                    <FavoriteBorderIcon />
                                                </IconButton>
                                                <IconButton sx={{ bgcolor: 'white', boxShadow: 1 }} size="small">
                                                    <RemoveRedEyeOutlinedIcon />
                                                </IconButton>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </div>
            </section>
        </main>
    )
}

export default Productdetail
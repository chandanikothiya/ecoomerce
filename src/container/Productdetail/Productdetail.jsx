import React, { useEffect, useState } from "react";
import { Box, Breadcrumbs, Button, Card, CardActions, CardContent, CardMedia, createTheme, FormControlLabel, Grid, IconButton, Radio, RadioGroup, Rating, Stack, ThemeProvider, Typography } from "@mui/material";
import { PiLineVerticalThin } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";
import { LuTruck } from "react-icons/lu";
import { MdAutorenew } from "react-icons/md";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link, useParams } from "react-router-dom";
import Divider from '@mui/material/Divider';
import { useGetProductQuery } from "../../redux/api/product.api";
import { IMG_URL } from "../../utility/url";

function Productdetail() {

    const [counter, setCounter] = useState(1)
    const [active, setActive] = useState()
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedVariant, setSelectedVariant] = useState("");
    const [allproducts, setAllproducts] = useState([]);
    const [selectedColor, setSelectedColor] = useState("");

    const { id } = useParams()
    console.log(id)

    const { data, error, isLoading } = useGetProductQuery();
    console.log(data?.data)

    const detailproduct = data?.data?.find((v) => v._id === id)
    console.log(detailproduct)


    useEffect(() => {
        fetch("http://localhost:3000/flashsale")
            .then(response => response.json())
            .then(data => setAllproducts(data))
    }, [])

    console.log(allproducts)

    useEffect(() => {
        if (detailproduct?.variants?.[0]?.images?.length) {
            setSelectedImage(detailproduct?.variants[0]?.images[0]);
        }

        if (detailproduct?.variants?.length) {
            setSelectedVariant(detailproduct?.variants[0])
            setSelectedColor(detailproduct?.variants[0]?.color);
        }

    }, [detailproduct]);

    useEffect(() => {
        const v = detailproduct?.variants?.find((v) => v?.color === selectedColor)
        console.log(v)

        setSelectedVariant(v)
        setSelectedImage(v?.images[0])
    }, [selectedColor]);

    console.log(selectedVariant, selectedImage)


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


    const Size = ['XS', 'S', 'M', 'L', 'XL']
    const theme = createTheme({
        breakpoints: {
            values: {
                xs: 0,
                sm: 576,
                md: 900,
                lg: 1200,
                xl: 1536,
            },
        },
    });
    console.log(selectedColor, selectedVariant)

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
                        <Typography sx={{ color: 'text.primary' }} className="breadcrumbs-typo">Havic HV G-92 Gamepad</Typography>
                    </Breadcrumbs>

                    <Grid container sx={{ mt: { xs: 3, sm: 5, lg: 10 } }} spacing={{ xs: 3, sm: 5, lg: 6 }}>
                        <Grid size={{ xs: 12, sm: 6, lg: 7 }} container spacing={{ xs: 2, sm: 3, xl: 3 }} alignItems="stretch">
                            <Grid size={{ xs: 3, sm: 4, md: 3 }} sx={{
                                // flexDirection: {
                                //     xs: 'row',     // mobile → row
                                //     md: 'column'   // desktop → column
                                // }
                            }} container spacing={{ sm: 2, md: 4 }} alignSelf="flex-start">
                                {
                                    selectedVariant?.images?.map((v) => (
                                        <Grid size={12}>
                                            <Box
                                                className="detailimg-box"
                                                sx={{ width: '100%', height: '97px', border: selectedImage === v ? "2px solid black" : "1px solid #ccc", }}
                                                onClick={() => setSelectedImage(v)}
                                            >
                                                <img src={IMG_URL + v} alt="no" className="demoimg" />
                                            </Box>
                                        </Grid>
                                    ))
                                }
                                {/* <Grid size={12}>
                                    <Box className="detailimg-box" sx={{ width: '100%', height: '97px' }}>
                                        <img src="../../../public/assets/images/new/ww6.avif" alt="" className="demoimg" />
                                    </Box>
                                </Grid>
                                <Grid size={12}>
                                    <Box className="detailimg-box" sx={{ width: '100%', height: '97px' }}>
                                        <img src="../../../public/assets/images/productdetail/image 58.png" alt="" className="demoimg" />
                                    </Box>
                                </Grid>
                                <Grid >
                                    <Box className="detailimg-box">
                                        <img src="../../../public/assets/images/productdetail/image 59.png" alt="" />
                                    </Box>
                                </Grid>
                                <Grid >
                                    <Box className="detailimg-box">
                                        <img src="../../../public/assets/images/productdetail/image 61.png" alt="" />
                                    </Box>
                                </Grid> */}
                            </Grid>
                            <Grid size={{ xs: 9, sm: 8, md: 9 }} display="flex" flexDirection='column'>
                                <Box className="detailimg-box deatail-main-img" sx={{ height: detailproduct?.variants?.length > 1 ? '600px' : '100%' }}>
                                    {/* <img src="../../../public/assets/images/productdetail/image 63.png" alt="" width='100%' /> */}
                                    <img
                                        src={
                                            selectedImage
                                                ? IMG_URL + selectedImage
                                                : IMG_URL + selectedVariant?.images?.[0]
                                        }
                                        alt=""
                                        width="100%"
                                        className="demoimg"
                                    />
                                </Box>

                                {
                                    detailproduct?.variants?.length > 1 &&
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            columnGap: 2
                                        }}
                                        marginTop={3}
                                    >
                                        {
                                            detailproduct?.variants?.map((v) => (
                                                <Box
                                                    sx={{
                                                        width: '70px', padding: '10px', backgroundColor: '#ffffff', border: 1,
                                                        border: selectedVariant?._id === v._id
                                                            ? "2px solid black"
                                                            : "1px solid #ccc",
                                                    }}
                                                    onClick={() => {
                                                        setSelectedVariant(v);
                                                        setSelectedImage(v.images[0]);
                                                    }}
                                                >
                                                    <img src={IMG_URL + v?.images[0]} alt="" width='100%' />
                                                </Box>
                                            ))
                                        }

                                    </Box>
                                }

                            </Grid>


                        </Grid>

                        <Grid size={{ xs: 12, sm: 6, lg: 5 }}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: { xs: '18px', sm: '20px', md: '24px' } }}>{detailproduct?.name}</Typography>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                                <Rating name="read-only" value={3} readOnly sx={{ fontSize: { xs: '20px', md: '24px' } }} />
                                <Typography className="rate-detail">(150 Reviews) </Typography>
                                <Typography className="rate-detail"> <PiLineVerticalThin sx={{ bgcolor: 'black' }} /> <span style={{ color: '#00FF66' }}> In Stock</span></Typography>
                            </Box>

                            <Typography variant="h5" sx={{ mt: { xs: 2, sm: 1, md: 2 }, mb: { xs: 2, sm: 1, md: 3 }, fontSize: { xs: '20px', sm: '20px', md: '24px' } }}>₹{detailproduct?.price}</Typography>

                            <Typography sx={{ fontSize: '14px', maxWidth: '373px', mb: { xs: 3, sm: 2, md: 3 } }}>
                                PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.
                            </Typography>

                            <hr />

                            <Box sx={{ mt: { xs: 3, sm: 1, md: 3 }, display: "flex", alignItems: 'center', columnGap: 2 }}>
                                <Typography sx={{ fontSize: { sm: '18px', md: '20px' } }}>Colours :</Typography>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    {
                                        detailproduct?.variants?.map((v) => (
                                            <label key={v.color} style={{ cursor: "pointer" }}>
                                                <input
                                                    type="radio"
                                                    // name={`color-${v._id}`} // 👈 unique per product
                                                    value={v.color}
                                                    checked={selectedColor === v.color}
                                                    onChange={() => setSelectedColor(v.color)}
                                                    style={{ display: "none" }}
                                                />

                                                <span
                                                    style={{
                                                        width: "15px",
                                                        height: "15px",
                                                        borderRadius: "50%",
                                                        backgroundColor: v.color,
                                                        display: "inline-block",
                                                        border: "1px solid #ccc",
                                                        outline:
                                                            selectedColor === v.color
                                                                ? "2px solid black"
                                                                : "none",
                                                        outlineOffset: "2px",
                                                    }}
                                                />
                                            </label>

                                        ))
                                    }

                                </Box>

                            </Box>

                            {/* <label key={v1.color} style={{ cursor: "pointer" }}>
                                <input
                                    type="radio"
                                    name={`color-${v._id}`} // 👈 unique per product
                                    value={v1.color}
                                    checked={selectedColor === v1.color}
                                    onChange={() =>
                                        setSelectedColors((prev) => ({
                                            ...prev,
                                            [v._id]: v1.color, // 👈 store per product
                                        }))
                                    }
                                    style={{ display: "none" }}
                                />

                                <span
                                    style={{
                                        width: "15px",
                                        height: "15px",
                                        borderRadius: "50%",
                                        backgroundColor: v1.color,
                                        display: "inline-block",
                                        border: "1px solid #ccc",
                                        outline:
                                            selectedColor === v1.color
                                                ? "2px solid black"
                                                : "none",
                                        outlineOffset: "3px",
                                    }}
                                />
                            </label> */}

                            {/* size */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: { xs: 3, sm: 1, md: 3 } }}>
                                <Typography sx={{ fontSize: { sm: '18px', md: '20px' } }}>Size :</Typography>

                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    {
                                        selectedVariant?.size?.map((v) => {

                                          return ( v === 'Free_Size' ? <Typography className="fsizebox">{v}</Typography> : <Typography className="sizebox">{v}</Typography> )
                                        }
                                       )
                                    }
                                </Box>
                            </Box>

                            {/* counter */}
                            <Box sx={{ display: 'flex', mt: { xs: 3, sm: 2, md: 3 }, gap: { xs: 3, sm: 2, lg: 4 } }} className="counter-box">
                                <Box className='countbox'>
                                    <button className="count-btn" style={{ borderRight: 'solid 1px rgb(172, 167, 167)', backgroundColor: active === 'decrese' ? '#DB4444' : 'white', color: active === 'decrese' ? 'white' : 'black' }} onClick={handleDecrese}>-</button>
                                    <Typography sx={{ padding: { xs: '0 35px', sm: '0 15px', lg: '0 35px' } }} className="counter-no">{counter}</Typography>
                                    <button className="count-btn" style={{ borderLeft: 'solid 1px rgb(172, 167, 167)', backgroundColor: active === 'increse' ? '#DB4444' : 'white', color: active === 'increse' ? 'white' : 'black' }} onClick={handleIncrese}>+</button>
                                </Box>

                                <buton className="my-custome-button">Buy Now</buton>

                                <button className="wishlist-deatil">
                                    <CiHeart />
                                </button>
                            </Box>

                            <Box sx={{
                                border: 1, borderColor: 'rgb(172, 167, 167)', borderRadius: 1, padding: { xs: '20px 0', sm: '12px 0', md: '20px 0' }, mt: { xs: 4, sm: 3, md: 5 },
                                width: {
                                    md: '100%',
                                    lg: '100%'
                                }

                            }}>
                                <Box className="delivery-box">
                                    <LuTruck className="delivery-icone" />
                                    <Box>
                                        <Typography>Free Delivery</Typography>
                                        <Typography sx={{ fontSize: '12px' }}><a href="#">Enter your postal code for Delivery Availability</a></Typography>
                                    </Box>
                                </Box>

                                {/* <hr style={{ margin: '20px 0' }} /> */}
                                <Divider sx={{ margin: { xs: '20px 0', sm: '10px 0', md: '20px 0' } }} />

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

            <ThemeProvider theme={theme}>
                <section id="related-item">
                    <div className="container">
                        <Box className="sub-title">
                            <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1, color: '#DB4444' }}>
                                <i className="fa-solid fa-square"></i>
                                <Typography sx={{ fontWeight: '600' }}>Related Item</Typography>
                            </Box>
                        </Box>

                        <Grid container sx={{ marginTop: { xs: '20px', sm: '23px', md: '35px' } }} spacing={{ xs: 1, sm: 3, lg: 4 }}>
                            {
                                allproducts.slice(0, 4).map((v) => {
                                    const r = v.rating.reduce((acc, v) => acc + v, 0)
                                    // console.log(r)
                                    const rate = r / v.rating.length;
                                    // console.log(rate)
                                    return (
                                        <Grid size={{ xs: 6, sm: 4, md: 3, lg: 3 }}>
                                            <Card sx={{ maxWidth: 310, position: 'relative', boxShadow: 0 }}>
                                                <Box
                                                    className="carttop"
                                                    sx={{
                                                        bgcolor: '#eef0f3', display: 'flex', justifyContent: 'center',
                                                        alignItems: 'center', padding: '20px  0 0', borderRadius: 1, height: {
                                                            xs: '150px',
                                                            sm: '200px',
                                                            lg: '250px'
                                                        }, position: 'relative'
                                                    }}>
                                                    <CardMedia
                                                        component="img"
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
                                                    <Typography gutterBottom variant="h6" component="div" className="cart-name">
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
                                                                <Rating name="half-rating" defaultValue={rate} precision={0.5} sx={{
                                                                    fontSize: {
                                                                        xs: '15px',
                                                                        sm: '18px',
                                                                        md: '20px'
                                                                    }
                                                                }} />
                                                            </Stack>
                                                        </Typography>
                                                        <Typography sx={{ color: 'grey', fontWeight: '600' }}>
                                                            {`(${r})`}
                                                        </Typography>
                                                    </Box>

                                                    {
                                                        v.discount ?
                                                            <Box sx={{
                                                                bgcolor: '#DB4444', color: 'white', width: 'fit-content', padding: {
                                                                    xs: '2px 8px',
                                                                    sm: '2px 12px'
                                                                }, borderRadius: 1, position: 'absolute', top: '3%'
                                                            }}>
                                                                <Typography variant="body2" sx={{
                                                                    fontSize: {
                                                                        xs: '10px',
                                                                        sm: '14px'
                                                                    }
                                                                }}>{v.discount}</Typography>
                                                            </Box>
                                                            : ""
                                                    }

                                                    {
                                                        v.new ?
                                                            <Box sx={{
                                                                bgcolor: '#00FF66', color: 'white', width: 'fit-content', padding: {
                                                                    xs: '2px 8px',
                                                                    sm: '2px 12px'
                                                                }, borderRadius: 1, position: 'absolute', top: '3%'
                                                            }}>
                                                                <Typography variant="body2" sx={{
                                                                    fontSize: {
                                                                        xs: '10px',
                                                                        sm: '14px'
                                                                    }
                                                                }}>NEW</Typography>
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
                                                        <FavoriteBorderIcon sx={{
                                                            fontSize: {
                                                                xs: '12px',
                                                                sm: '18px',
                                                                md: '20px',
                                                                lg: '24px'
                                                            }, color: 'black'
                                                        }} />
                                                    </IconButton>
                                                    <IconButton sx={{ bgcolor: 'white', boxShadow: 1 }} size="small">
                                                        <RemoveRedEyeOutlinedIcon sx={{
                                                            fontSize: {
                                                                xs: '12px',
                                                                sm: '18px',
                                                                md: '20px',
                                                                lg: '24px'
                                                            }, color: 'black'
                                                        }} />
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
            </ThemeProvider>
        </main>
    )
}

export default Productdetail
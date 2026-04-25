import React, { useEffect, useRef, useState } from "react";
import { Box, Breadcrumbs, Button, Card, CardActions, CardContent, CardMedia, createTheme, FormControlLabel, Grid, IconButton, Radio, RadioGroup, Rating, Stack, ThemeProvider, Typography } from "@mui/material";
import { PiLineVerticalThin } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";
import { LuTruck } from "react-icons/lu";
import { MdAutorenew } from "react-icons/md";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import Divider from '@mui/material/Divider';
import { useGetProductQuery } from "../../redux/api/product.api";
import { IMG_URL } from "../../utility/url";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from "swiper/modules";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useTheme, useMediaQuery } from "@mui/material";
import { useGetCategoryQuery } from "../../redux/api/category.api";
import { useAddWishlistMutation, useDeleteWishlistMutation, useGetWishlistQuery } from "../../redux/api/wishlist.api";
import { useAddCartMutation } from "../../redux/api/cart.api";
import { setalert } from "../../redux/slice/Alert.slice";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch } from "react-redux";

function Productdetail() {

    const [counter, setCounter] = useState(1)
    const [active, setActive] = useState()
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedVariant, setSelectedVariant] = useState("");
    const [allproducts, setAllproducts] = useState([]);
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedColors, setSelectedColors] = useState({});
    const navigate = useNavigate();
    const theme1 = useTheme();
    const dispatch = useDispatch();

    const { id } = useParams()
    console.log(id)

    const { data, error, isLoading } = useGetProductQuery();
    console.log(data?.data)

    const detailproduct = data?.data?.find((v) => v._id === id)
    console.log(detailproduct)

    const { data: catdata, error: caterror, isLoading: catisLoading } = useGetCategoryQuery();
    console.log(selectedVariant, detailproduct)

    const categoryname = catdata?.data?.find((v) => v._id === detailproduct.category_id).name;
    console.log(categoryname, catdata)

    const relateditem = data?.data?.filter((v) => v.category_id === detailproduct.category_id)
    console.log(relateditem)


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

    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const [swiperInstance, setSwiperInstance] = useState(null);

    useEffect(() => {
        if (!swiperInstance) return;

        if (selectedVariant?.images?.length > 4) {
            setTimeout(() => {
                swiperInstance.params.navigation.prevEl = prevRef.current;
                swiperInstance.params.navigation.nextEl = nextRef.current;

                swiperInstance.navigation.destroy();
                swiperInstance.navigation.init();
                swiperInstance.navigation.update();
            });
        }
    }, [selectedVariant, swiperInstance]);

    console.log("swiperInstance", swiperInstance)

    const isMobile = useMediaQuery("(max-width:768px)");
    console.log("isMobile", isMobile)

    let uid;
    if (localStorage.getItem('loginid')) {
        uid = localStorage.getItem('loginid');
        console.log(uid)
    }

    const { data: wdata, error: werror, isLoading: wisLoading, refetch } = useGetWishlistQuery(uid, {
        skip: !uid,
    });


    const [addcart] = useAddCartMutation();
    const [addwishlist] = useAddWishlistMutation();
    const [deletewishlist] = useDeleteWishlistMutation();

    const handleCartClick = async (id, vid) => {
        console.log("click", id, vid)

        if (localStorage.getItem('loginid')) {
            const response = await addcart({ user_id: localStorage.getItem('loginid'), product_id: id, variant_id: vid })
            console.log("cartres", response)
            if (response?.data?.success) {
                dispatch(setalert({ text: response.data.message, variant: 'success' }))
            } else if (response.error) {
                dispatch(setalert({ text: response.error.data?.message, variant: 'error' }))
            }
        } else {
            navigate('/signup')
        }

    }

    const handleWishlistClick = async (id, vid) => {
        console.log("click", id, vid)
        if (localStorage.getItem('loginid')) {
            const response = await addwishlist({ user_id: localStorage.getItem('loginid'), product_id: id, variant_id: vid })
            console.log("cartres", response)
            if (response.data.success) {
                dispatch(setalert({ text: response.data.message, variant: 'success' }))
            } else {
                dispatch(setalert({ text: response.data.message, variant: 'error' }))
            }
            refetch();
        } else {
            navigate('/signup')
        }

    }

    const handledelWishlistClick = async (id, vid) => {
        console.log("ok")
        if (localStorage.getItem('loginid')) {
            deletewishlist({ variant_id: vid, id: localStorage.getItem('loginid') })
            refetch();
            // setInwhishlist(false)
        } else {
            navigate('/signup')
        }
    }

    const wishlistselect1 = uid ? (wdata?.body?.products?.filter((v1) => v1?.product_id === detailproduct?._id)) : ''
    console.log("wishlistselect", wishlistselect1);

    const isInWishlist1 = uid ? wishlistselect1?.some(
        (v1) => v1?.variant_id === selectedVariant?._id
    ) : '';

    console.log("isInWishlist1", isInWishlist1)

    const handlepProduct = (id) => {
        navigate(`/productdetail/${id}`)
    }


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
                            {categoryname}
                        </Link>
                        <Typography sx={{ color: 'text.primary' }} className="breadcrumbs-typo">{detailproduct.name}</Typography>
                    </Breadcrumbs>

                    <Grid container sx={{ mt: { xs: 3, sm: 5, lg: 10 } }} spacing={{ xs: 3, sm: 3, md: 5, lg: 6 }}>
                        <Grid size={{ xs: 12, sm: 6, lg: 7 }} container spacing={{ xs: 2, sm: 2, md: 3, lg: 3.5, xl: 4 }} alignItems="stretch">
                            <Grid size={{ xs: 12, sm: 12, md: 3 }} sx={{
                                // flexDirection: {
                                //     xs: 'row',     // mobile → row
                                //     sm: 'column'   // desktop → column
                                // },
                                order: { xs: 2, md: 1 }
                            }} container spacing={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 4 }} alignSelf="flex-start">
                                {
                                    <Box sx={{ marginTop: 0, height: { xs: '90px', sm: '100px', md: '450px', lg: '595px', xl: '595px' }, width: '100%', position: 'relative', paddingTop: selectedVariant?.images?.length > 4 ? { xs: '0', md: '20px' } : '0' }}>
                                        <Swiper
                                            // install Swiper modules
                                            modules={[Navigation]}
                                            className="productswiper"

                                            style={{ height: '100%', }}
                                            onSwiper={(swiper) => setSwiperInstance(swiper)}
                                            onSlideChange={() => console.log('slide change')}
                                            direction={isMobile ? "horizontal" : "vertical"}
                                            onBeforeInit={(swiper) => {
                                                swiper.params.navigation.prevEl = prevRef.current;
                                                swiper.params.navigation.nextEl = nextRef.current;
                                            }}
                                            navigation={{
                                                prevEl: prevRef.current,
                                                nextEl: nextRef.current,
                                            }}
                                            breakpoints={{
                                                320: {
                                                    slidesPerView: 4,
                                                    spaceBetween: 10
                                                },
                                                576: {
                                                    slidesPerView: 4,
                                                    spaceBetween: 20
                                                },
                                                768: {
                                                    slidesPerView: 3,
                                                    spaceBetween: 15
                                                },
                                                992: {
                                                    slidesPerView: 4,
                                                },

                                            }}
                                        >
                                            {
                                                selectedVariant?.images?.map((v) => (
                                                    <SwiperSlide >
                                                        <Grid size={{ xs: 12, sm: 12 }}>
                                                            <Box
                                                                className="detailimg-box"
                                                                sx={{
                                                                    width: '100%',
                                                                    height: { xs: '75px', sm: '80px', md: '90px', lg: '120px', xl: '120px' }, border: selectedImage === v ? "2px solid black" : "",
                                                                    borderRadius: '5px',
                                                                    padding: { xs: '5px', sm: '8px', md: '12px' }
                                                                }}
                                                                onClick={() => setSelectedImage(v)}
                                                            >
                                                                <img src={IMG_URL + v} alt="no" className="demoimg" />
                                                            </Box>
                                                        </Grid>
                                                    </SwiperSlide>
                                                ))
                                            }


                                        </Swiper>
                                        {selectedVariant?.images?.length > 4 &&
                                            <Box sx={{
                                                width: '100%', backgroundColor: 'red',
                                                flexDirection: { xs: 'row', md: 'column' },
                                                alignItems: 'center',
                                                justifyContent: 'center',

                                            }} className="productdetail-swiperbtn">

                                                <button ref={prevRef} className="pbtn-prev">
                                                    <IoIosArrowUp style={{ fontSize: '22px' }} />
                                                </button>

                                                <button ref={nextRef} className="pbtn-next">
                                                    <IoIosArrowDown style={{ fontSize: '22px' }} />
                                                </button>
                                            </Box>
                                        }
                                    </Box>
                                }

                            </Grid>
                            <Grid size={{ xs: 12, sm: 12, md: 9 }} display="flex" flexDirection='column' sx={{
                                order: { xs: 1, md: 2 } // 👈 mobile में पहले
                            }}>
                                <Box className="detailimg-box deatail-main-img" sx={{ height: { xs: '300px', sm: '380px', md: '75%', lg: '100%' } }}>
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

                            <Typography sx={{ fontSize: '14px', mb: { xs: 3, sm: 2, md: 3 } }}>
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

                            {/* size */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: { xs: 3, sm: 2, md: 3 } }}>
                                <Typography sx={{ fontSize: { sm: '18px', md: '20px' } }}>Size :</Typography>

                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    {
                                        selectedVariant?.size?.map((v) => {

                                            return (v === 'Free_Size' ? <Typography className="fsizebox">{v}</Typography> : <Typography className="sizebox">{v}</Typography>)
                                        }
                                        )
                                    }
                                </Box>
                            </Box>

                            {/* counter */}
                            <Box sx={{ display: 'flex', mt: { xs: 3, sm: 2, md: 3 }, gap: { xs: 3, sm: 2, lg: 3, xl: 4 } }} className="counter-box">
                                <Box className='countbox'>
                                    <button className="count-btn" style={{ borderRight: 'solid 1px rgb(172, 167, 167)', backgroundColor: active === 'decrese' ? '#DB4444' : 'white', color: active === 'decrese' ? 'white' : 'black' }} onClick={handleDecrese}>-</button>
                                    <Typography sx={{ padding: { xs: '0 35px', sm: '0 20px', md: '0 32px', lg: '0 30px', xl: '0 35px' } }} className="counter-no">{counter}</Typography>
                                    <button className="count-btn" style={{ borderLeft: 'solid 1px rgb(172, 167, 167)', backgroundColor: active === 'increse' ? '#DB4444' : 'white', color: active === 'increse' ? 'white' : 'black' }} onClick={handleIncrese}>+</button>
                                </Box>

                                <NavLink to={uid ? `/checkout/${detailproduct?._id}/${selectedVariant?._id}/?${selectedVariant?._id}=${counter}` : '/signup'}> <buton className="my-custome-button">Buy Now</buton></NavLink>

                                {
                                    isInWishlist1 ?
                                        <button className="wishlist-deatil" onClick={(e) => { handledelWishlistClick(detailproduct?._id, selectedVariant?._id) }}>
                                            <FavoriteIcon sx={{ color: 'red' }} />
                                        </button>
                                        :
                                        <button className="wishlist-deatil" onClick={(e) => { handleWishlistClick(detailproduct?._id, selectedVariant?._id) }}>
                                            <CiHeart />
                                        </button>
                                }

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
                            {/* {
                                relateditem.slice(0, 4).map((v) => {
                                   // const r = v.rating.reduce((acc, v) => acc + v, 0)
                                    // console.log(r)
                                   // const rate = r / v.rating.length;
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
                                                                <Rating name="half-rating" defaultValue={4} precision={0.5} sx={{
                                                                    fontSize: {
                                                                        xs: '15px',
                                                                        sm: '18px',
                                                                        md: '20px'
                                                                    }
                                                                }} />
                                                            </Stack>
                                                        </Typography>
                                                        <Typography sx={{ color: 'grey', fontWeight: '600' }}>
                                                            (4)
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
                            } */}
                            {
                                relateditem?.slice(0, 4)?.map((v, i) => {
                                    const validVariants = v?.variants?.filter(
                                        (x) => x?.color && x.color.trim() !== ""
                                    );
                                    let selectedVariant;

                                    if (validVariants.length > 0) {
                                        const selectedColor =
                                            selectedColors[v._id] || validVariants[0]?.color;

                                        selectedVariant = v?.variants?.find(
                                            (x) => x.color === selectedColor
                                        );
                                    } else {
                                        // ✅ fallback when no color exists
                                        selectedVariant = v?.variants?.[0];
                                    }
                                    console.log(selectedVariant)


                                    // const r = v.rating.reduce((acc, v) => acc + v, 0)
                                    // console.log(r)
                                    // const rate = r / v.rating.length;
                                    // console.log(rate)

                                    const wishlistselect = uid ? (wdata?.body?.products?.filter((v1) => v1?.product_id === v._id)) : ""
                                    console.log("wishlistselect", wishlistselect);

                                    const isInWishlist = uid ? wishlistselect?.some(
                                        (v1) => v1.variant_id === selectedVariant._id
                                    ) : "";
                                    console.log("wishlistvarient", isInWishlist)

                                    let discount;
                                    if (selectedVariant.isFlashSale) {
                                        discount = ((v.price - selectedVariant.flashPrice) / v.price) * 100;
                                    }
                                    return (
                                        <Grid size={{ xs: 6, sm: 4, md: 3, lg: 3 }}>
                                            <Card sx={{ maxWidth: '100%', position: 'relative', boxShadow: 0 }}>
                                                <Box
                                                    className="carttop"
                                                    sx={{
                                                        bgcolor: '#eef0f3', display: 'flex', justifyContent: 'center',
                                                        alignItems: 'center', padding: '20px  0 0', borderRadius: 1,
                                                        height: {
                                                            xs: '120px',
                                                            sm: '160px',
                                                            lg: '250px'
                                                        }, position: 'relative'
                                                    }}>
                                                    {
                                                        (() => {


                                                            return (
                                                                <>
                                                                    <CardMedia
                                                                        component="img"
                                                                        className="cardimg"
                                                                        sx={{ objectFit: "contain", mixBlendMode: "multiply" }}
                                                                        image={
                                                                            selectedVariant?.images?.[0]
                                                                                ? IMG_URL + selectedVariant.images[0]
                                                                                : IMG_URL + v.variants[0]?.images?.[0]
                                                                        }
                                                                        title={v.name}
                                                                        onClick={() => handlepProduct(v._id)}
                                                                        alt={v.name}
                                                                    />


                                                                    <Typography
                                                                        className="addcart"
                                                                        sx={{
                                                                            bgcolor: 'black', width: "100%", color: 'white', display: 'none',
                                                                            textAlign: 'center', justifySelf: 'flex-end', position: 'absolute',
                                                                            bottom: '10%', padding: { xs: '3px 0', md: '8px 0' }, borderRadius: '0 0 5px 5px',
                                                                            fontSize: {
                                                                                xs: '12px',
                                                                                sm: '14px',
                                                                                md: '16px'
                                                                            },
                                                                            cursor: 'default'
                                                                        }}
                                                                        onClick={(e) => handleCartClick(v?._id, selectedVariant?._id)}
                                                                    >
                                                                        <ShoppingCartOutlinedIcon /> Add To Cart
                                                                    </Typography>
                                                                </>

                                                            );
                                                        })()}



                                                </Box>


                                                <CardContent sx={{ outline: 0, pl: 0, pb: '0px !important' }}>
                                                    <Typography gutterBottom variant="h6" component="div" className="product-name">
                                                        {v.name}
                                                    </Typography>
                                                    <Box sx={{ display: 'flex', columnGap: 2, mb: 1, alignItems: 'center', flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
                                                        <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500, color: '#DB4444' }}>
                                                            ₹{selectedVariant.isFlashSale ? selectedVariant.flashPrice : v.price}
                                                        </Typography>
                                                        {
                                                            selectedVariant.isFlashSale &&
                                                            <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500, textDecoration: 'line-through', color: 'grey' }}>
                                                                ₹{v.price}
                                                            </Typography>
                                                        }



                                                        <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}>
                                                            <Typography sx={{ color: '#FFAD33' }}>
                                                                <Stack spacing={1}>
                                                                    <Rating name="half-rating" defaultValue={4} precision={0.5} sx={{
                                                                        fontSize: {
                                                                            xs: '15px',
                                                                            sm: '18px',
                                                                            md: '20px'
                                                                        }
                                                                    }} />
                                                                </Stack>
                                                            </Typography>
                                                            <Typography sx={{
                                                                color: 'grey', fontWeight: '600',
                                                                fontSize: {
                                                                    xs: '12px',
                                                                    sm: '16px'
                                                                }
                                                            }}>
                                                                (4)
                                                                {/* {`(${r})`} */}
                                                            </Typography>
                                                        </Box>
                                                    </Box>

                                                    {
                                                        selectedVariant.isFlashSale &&
                                                        <Box sx={{
                                                            bgcolor: '#DB4444', color: 'white', width: 'fit-content',
                                                            padding: {
                                                                xs: '2px 8px',
                                                                sm: '2px 8px',
                                                                md: '2px 12px'
                                                            }, borderRadius: 1, position: 'absolute', top: '3%', left: '6%'
                                                        }}>
                                                            <Typography variant="body2" sx={{
                                                                fontSize: {
                                                                    xs: '10px',
                                                                    sm: '12',
                                                                    md: '14px'
                                                                }
                                                            }}>-{parseInt(discount)}%</Typography>
                                                        </Box>
                                                    }



                                                    {
                                                        v.new ?
                                                            <Box sx={{
                                                                bgcolor: '#00FF66', color: 'white', width: 'fit-content', padding: {
                                                                    xs: '2px 8px',
                                                                    sm: '2px 12px'
                                                                }, borderRadius: 1, position: 'absolute', top: '3%', left: '4%'
                                                            }}>
                                                                <Typography variant="body2" sx={{
                                                                    fontSize: {
                                                                        xs: '10px',
                                                                        sm: '12px',
                                                                        md: '14px'
                                                                    }
                                                                }}>NEW</Typography>
                                                            </Box> :
                                                            ""
                                                    }

                                                    {
                                                        v?.variants?.length > 1 && (() => {

                                                            const validVariants = v?.variants?.filter(
                                                                (x) => x?.color && x.color.trim() !== ""
                                                            )

                                                            const selectedColor =
                                                                selectedColors[v._id] || validVariants[0]?.color;


                                                            // const selectedColor =
                                                            //     selectedColors[v._id] ??
                                                            //     v?.variants?.find((x) => x?.color && x.color.trim() !== "")?.color;
                                                            // console.log(selectedColor, selectedColors)
                                                            // const [selectedColors, setSelectedColors] = useState({});

                                                            return (
                                                                <Box sx={{ display: "flex", gap: "10px", mt: 1, pl: '5px' }}>
                                                                    {
                                                                        validVariants?.map((v1) => {
                                                                            if (!v1?.color || v1.color.trim() === "") return null;


                                                                            return (
                                                                                <label key={v1.color} style={{ cursor: "pointer" }}>
                                                                                    <input
                                                                                        type="radio"
                                                                                        name={`color-${v._id}`}
                                                                                        value={v1.color}
                                                                                        checked={selectedColor === v1.color}
                                                                                        onChange={() =>
                                                                                            setSelectedColors((prev) => ({
                                                                                                ...prev,
                                                                                                [v._id]: v1.color,
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
                                                                                </label>
                                                                            )
                                                                        }

                                                                        )
                                                                    }
                                                                </Box>
                                                            )
                                                        })()
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
                                                    {isInWishlist ?
                                                        <IconButton sx={{ bgcolor: 'white', boxShadow: 1, }} size="small" onClick={(e) => { handledelWishlistClick(v?._id, selectedVariant?._id) }}>
                                                            <FavoriteIcon sx={{
                                                                fontSize: {
                                                                    xs: '12px',
                                                                    sm: '18px',
                                                                    md: '20px',
                                                                    lg: '22px'
                                                                },
                                                                color: 'red'
                                                            }} />
                                                        </IconButton>
                                                        : <IconButton sx={{ bgcolor: 'white', boxShadow: 1, }} size="small" onClick={(e) => { handleWishlistClick(v?._id, selectedVariant?._id) }}>
                                                            <FavoriteBorderIcon sx={{
                                                                fontSize: {
                                                                    xs: '12px',
                                                                    sm: '18px',
                                                                    md: '20px',
                                                                    lg: '22px'
                                                                }
                                                            }} />
                                                        </IconButton>
                                                    }
                                                    <IconButton sx={{ bgcolor: 'white', boxShadow: 1 }} size="small" onClick={() => handlepProduct(v._id)}>
                                                        <RemoveRedEyeOutlinedIcon sx={{
                                                            fontSize: {
                                                                xs: '12px',
                                                                sm: '18px',
                                                                md: '20px',
                                                                lg: '22px'
                                                            }
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
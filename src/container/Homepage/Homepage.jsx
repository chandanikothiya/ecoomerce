import React, { useEffect, useRef, useState } from "react";
import { AppBar, Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Container, createTheme, Drawer, Grid, IconButton, ListItemText, Menu, MenuItem, MenuList, Pagination, ThemeProvider, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import '../../../public/assets/style/headerfooter.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AppleIcon from '@mui/icons-material/Apple';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid as SwiperGrid } from 'swiper/modules';
import 'swiper/css';
import { Autoplay, Navigation } from "swiper/modules";
import { Pagination as Swiperpagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import DesktopMacOutlinedIcon from '@mui/icons-material/DesktopMacOutlined';
import WatchOutlinedIcon from '@mui/icons-material/WatchOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined';
import VideogameAssetOutlinedIcon from '@mui/icons-material/VideogameAssetOutlined';
import LaptopMacOutlinedIcon from '@mui/icons-material/LaptopMacOutlined';
import { green } from "@mui/material/colors";
import MenuIcon from "@mui/icons-material/Menu";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { MdOutlineHeadphones } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setalert } from "../../redux/slice/Alert.slice";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetCategoryQuery } from "../../redux/api/category.api";
import { useGetProductQuery } from "../../redux/api/product.api";
import { IMG_URL } from "../../utility/url";
import { useAddCartMutation, useGetCartQuery } from "../../redux/api/cart.api";
import { useAddWishlistMutation, useDeleteWishlistMutation, useGetWishlistQuery } from "../../redux/api/wishlist.api";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';


function Homepage() {

    const [fsale, setFsale] = useState([])
    const [bestsellp, setBestsellp] = useState([])
    const [elecategory, setElecategory] = useState([])
    const [products, setProducts] = useState([]);
    const [showButton, setShowButton] = useState(false);
    const dispatch = useDispatch();
    const [selectedSubcategories, setSelectedSubcategories] = React.useState([]);

    const location = useLocation();
    const navigate = useNavigate();

    // const [isMobile, setIsMobile] = useState(false);
    //console.log("mobile", isMobile)
    const theme1 = useTheme();

    // ✅ Use MUI breakpoint (BEST PRACTICE)
    const isMobile = useMediaQuery(theme1.breakpoints.down("md"));
    const [selectedColors, setSelectedColors] = useState({});
    const [selectedColorsfalsh, setSelectedColorsfalsh] = useState({});
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [activeIndex, setActiveIndex] = React.useState(null);
    const { data, error, isLoading } = useGetCategoryQuery();
    console.log("dislaydata", data?.data)

    //const {data:cartdata,error:carterror,isLoading:cartisLoading} = useGetCartQuery();

    const [addcart] = useAddCartMutation();
    const [addwishlist] = useAddWishlistMutation();
    const [deletewishlist] = useDeleteWishlistMutation();

    const { data: pdata,
        error: perror,
        isLoading: pisLoading } = useGetProductQuery();
    console.log("productdata", pdata?.data, pdata?.data[0]?.variants)


    const flashsaleproduct = pdata?.data
        ?.map(v => ({
            ...v,
            variants: v.variants.filter(v1 => v1.isFlashSale)
        })).filter(v => v.variants.length > 0);
    console.log("flashsaleproduct", flashsaleproduct)

    const categorymenu = data?.data?.filter((v) => v.parentcategory_id === null)
    console.log("catemenu", categorymenu)

    const open = Boolean(anchorEl);

    const handleClick = (event, index) => {
        console.log("yyyyyy")
        setAnchorEl(event.currentTarget);
        setActiveIndex(index);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setActiveIndex(null);
    };


    const [showNavigation, setShowNavigation] = useState(false);

    const obj = [
        {
            image: '../../../public/assets/images/hero/hero1.png',
            subtitle1: 'iPhone 14 Series',
            title3: 'Up to 10% off Voucher',
        },
        {
            image: '../../../public/assets/images/hero/hero2.png',
            subtitle1: 'Samsung Q90R 4K QLED',
            title3: 'Up to 10% off Voucher',
        },
        {
            image: '../../../public/assets/images/hero/hero1.png',
            subtitle1: 'iPhone 14 Series',
            title3: 'Up to 10% off Voucher',
        },

    ]

    const prevRef1 = useRef(null);
    const nextRef1 = useRef(null);

    const prevRef2 = useRef(null);
    const nextRef2 = useRef(null);

    const prevRef3 = useRef(null);
    const nextRef3 = useRef(null);

    const [swiperInstance, setSwiperInstance] = useState(null);


    useEffect(() => {
        fetch('http://localhost:3000/flashsale')
            .then(response => response.json())
            .then(data => setFsale(data))


        fetch('http://localhost:3000/bestproduct')
            .then(response => response.json())
            .then(data => setBestsellp(data))

        fetch('http://localhost:3000/elecategory')
            .then(response => response.json())
            .then(data => setElecategory(data))

        fetch('http://localhost:3000/products')
            .then(response => response.json())
            .then(data => setProducts(data))

        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    useEffect(() => {
        if (swiperInstance && prevRef3.current && nextRef3.current) {
            swiperInstance.params.navigation.prevEl = prevRef3.current;
            swiperInstance.params.navigation.nextEl = nextRef3.current;

            swiperInstance.navigation.init();
            swiperInstance.navigation.update();
        }

        const params = new URLSearchParams(location.search)

        if (params.get("login") === "success") {
            dispatch(setalert({ text: 'Login sucessfully', variant: 'success' }))
            navigate("/", { replace: true });
        }



    }, [swiperInstance, location]);

    useEffect(() => {
        if (pdata?.data?.length) {
            const initialColors = {};

            pdata?.data?.forEach((v) => {
                const firstValidColor = v?.variants?.find(
                    (x) => x?.color && x.color.trim() !== ""
                )?.color;

                if (firstValidColor) {
                    initialColors[v.id] = firstValidColor;
                }
            });

            setSelectedColors(initialColors);
        }
    }, [pdata]); // ✅ ONLY pdata


    const caticone = {
        "phone": <PhoneIphoneOutlinedIcon className="caticone" />,
        "computer": <DesktopMacOutlinedIcon className="caticone" />,
        "smartwatch": <WatchOutlinedIcon className="caticone" />,
        "camera": <CameraAltOutlinedIcon className="caticone" />,
        "headphone": <MdOutlineHeadphones className="caticone" />,
        "gaming": <VideogameAssetOutlinedIcon className="caticone" />,
        "laptop": <LaptopMacOutlinedIcon className="caticone" />
    }

    console.log(elecategory)

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

    const colors = [
        { name: "Red", value: "#ff0000" },
        { name: "Blue", value: "#0000ff" },
        { name: "Black", value: "#000000" },
        { name: "White", value: "#ffffff" },
    ];

    const handleScrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // smooth scrolling
        });
    };


    console.log("selectedSubcategories", selectedSubcategories)

    //console.log(menuItems.name)
    const handlepProduct = (id) => {
        navigate(`/productdetail/${id}`)
    }

    let uid;
    if (localStorage.getItem('loginid')) {
        uid = localStorage.getItem('loginid');
        console.log(uid)
    }

    const { data: wdata, error: werror, isLoading: wisLoading, refetch } = useGetWishlistQuery(uid, {
        skip: !uid,
    });

    console.log(wdata?.body)


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
            // setInwhishlist(false)
        } else {
            navigate('/signup')
        }
    }

    const handledelWishlistClick = async (id, vid) => {
        if (localStorage.getItem('loginid')) {
            deletewishlist({ variant_id: vid, id: localStorage.getItem('loginid') })
            refetch();
            // setInwhishlist(false)
        } else {
            navigate('/signup')
        }
    }

    return (
        <>
            <main>
                <section className="hero">
                    <div className="container">
                        <ThemeProvider theme={theme}>
                            <Grid container alignItems="stretch" rowSpacing={3}>
                                <Grid size={{ xs: 12, sm: 12, md: 3, lg: 2 }}>

                                    <Box className="hero-left" sx={{ p: { xs: '25px 0 0 0', md: "25px 20px 0 0" }, borderRight: { xs: 'none', md: 'solid 1px rgb(224, 222, 224)' } }}>
                                        {/* ================= MOBILE (SWIPER) ================= */}
                                        {isMobile ? (
                                            <>
                                                <Swiper key="mobile-swiper" slidesPerView="auto" spaceBetween={10} freeMode={true}>
                                                    {categorymenu?.map((item, index) => {
                                                        const subcategories = data?.data.filter((v) => v.parentcategory_id === item._id)
                                                        return (
                                                            <SwiperSlide key={index} style={{ width: "auto" }}>
                                                                <Box
                                                                    sx={{
                                                                        p: { xs: '5px', sm: 1 },
                                                                        border: "1px solid #ddd",
                                                                        borderRadius: 1,
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        justifyContent: "space-between",
                                                                        minWidth: "120px"
                                                                    }}
                                                                >
                                                                    {subcategories.length > 0 ? (
                                                                        <Typography
                                                                            onClick={(e) => {
                                                                                if (subcategories.length > 0) {
                                                                                    setSelectedSubcategories(subcategories);
                                                                                    handleClick(e, index);
                                                                                }
                                                                            }}
                                                                            sx={{ fontSize: { xs: "13px", sm: '16px' }, cursor: "pointer" }}
                                                                        >
                                                                            {item.name}
                                                                        </Typography>
                                                                    ) : (
                                                                        <Typography variant="body2" sx={{ fontSize: { xs: "13px", sm: '16px' } }}>
                                                                            {item.name}
                                                                        </Typography>
                                                                    )}

                                                                    {subcategories.length > 0 && (
                                                                        <IconButton
                                                                            sx={{ p: 0, ml: 1 }}
                                                                            onClick={(e) => {
                                                                                if (subcategories.length > 0) {
                                                                                    setSelectedSubcategories(subcategories);
                                                                                    handleClick(e, index);
                                                                                }
                                                                            }}
                                                                        >
                                                                            <ArrowForwardIosIcon sx={{ fontSize: { xs: 12, sm: 16 } }} />
                                                                        </IconButton>
                                                                    )}
                                                                </Box>
                                                            </SwiperSlide>
                                                        )
                                                    })}
                                                </Swiper>

                                                {/* ✅ Mobile Submenu */}
                                                <Menu
                                                    anchorEl={anchorEl}
                                                    open={open}
                                                    onClose={handleClose}
                                                    anchorOrigin={{
                                                        vertical: "bottom",
                                                        horizontal: "left"
                                                    }}
                                                    transformOrigin={{
                                                        vertical: "top",
                                                        horizontal: "left"
                                                    }}
                                                >
                                                    {selectedSubcategories.length > 0 &&
                                                        selectedSubcategories.map((sub, i) => (
                                                            <MenuItem key={i} onClick={handleClose}>
                                                                {typeof sub === "string" ? sub : sub.name}
                                                            </MenuItem>
                                                        ))}
                                                </Menu>
                                            </>
                                        ) : (
                                            /* ================= DESKTOP ================= */
                                            <>
                                                <MenuList className="heroleft-menu">
                                                    {categorymenu?.map((item, index) => {
                                                        const subcategories = data?.data.filter((v) => v.parentcategory_id === item._id)
                                                        console.log("subcat", subcategories)
                                                        return (
                                                            <MenuItem
                                                                key={index}
                                                                className="my-custome-list"
                                                                onClick={(e) => {
                                                                    if (subcategories.length > 0) {
                                                                        setSelectedSubcategories(subcategories);
                                                                        handleClick(e, index);
                                                                    }
                                                                }

                                                                    // subcategories.length > 0 &&
                                                                    // handleClick(e, index)
                                                                }

                                                            >
                                                                <Box
                                                                    sx={{
                                                                        width: "100%",
                                                                        display: "flex",
                                                                        justifyContent: "space-between",
                                                                        alignItems: "center"
                                                                    }}
                                                                >
                                                                    <Typography variant="body2" sx={{ fontSize: { sm: "14px", md: '16px' }, cursor: "pointer" }}  >
                                                                        {item.name}
                                                                    </Typography>

                                                                    {subcategories.length > 0 && (
                                                                        <IconButton sx={{ p: 0, ml: 2 }}>
                                                                            <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
                                                                        </IconButton>
                                                                    )}
                                                                </Box>
                                                            </MenuItem>
                                                        )
                                                    })}
                                                </MenuList>

                                                {/* ✅ Desktop Submenu */}
                                                <Menu
                                                    anchorEl={anchorEl}
                                                    open={open}
                                                    onClose={handleClose}
                                                    anchorOrigin={{
                                                        vertical: "top",
                                                        horizontal: "right"
                                                    }}
                                                    transformOrigin={{
                                                        vertical: "top",
                                                        horizontal: "left"
                                                    }}
                                                    PaperProps={{
                                                        sx: {
                                                            minWidth: 180
                                                        }
                                                    }}
                                                >
                                                    {selectedSubcategories.length > 0 &&
                                                        selectedSubcategories.map((sub, i) => (
                                                            <MenuItem key={i} onClick={handleClose} sx={{
                                                                fontSize: '14px',
                                                                '&:hover': {
                                                                    fontSize: '14px' // keeps same on hover
                                                                }
                                                            }}>
                                                                {typeof sub === "string" ? sub : sub.name}
                                                            </MenuItem>
                                                        ))}
                                                </Menu>
                                            </>
                                        )}
                                    </Box>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 12, md: 9, lg: 10 }} className="gridhero-rigth">
                                    <Box className="hero-rigth" sx={{
                                        height: '100%',
                                        "& .swiper-pagination-bullet": {
                                            width: { xs: "6px", sm: "8px", md: "10px" },
                                            height: { xs: "6px", sm: "8px", md: "10px" },
                                            gap: { xs: '8px', md: '10px' }
                                        },



                                    }}>
                                        <Swiper
                                            onSlideChange={() => console.log('slide change')}
                                            onSwiper={(swiper) => console.log(swiper)}
                                            autoplay={{
                                                delay: 2500,
                                                disableOnInteraction: false,
                                            }}
                                            pagination={{
                                                clickable: true,
                                            }}
                                            modules={[Autoplay, Swiperpagination]}
                                            style={{
                                                "--swiper-pagination-color": "#DB4444",
                                                "--swiper-pagination-bullet-inactive-color": "#999999",
                                                "--swiper-pagination-bullet-inactive-opacity": "1",

                                            }}
                                        >
                                            {
                                                obj.map((v, i) => (
                                                    <SwiperSlide key={i} sx={{ height: '100%' }}>
                                                        <Box
                                                            sx={{
                                                                minHeight: {
                                                                    lg: '380px',
                                                                    md: '380px',
                                                                    sm: '250px',
                                                                    xs: '150px'
                                                                },
                                                                bgcolor: 'black',
                                                                color: 'white',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'space-between',
                                                                padding: { xs: '10px 15px', sm: '20px 50px', md: '16px 20px', lg: '16px 50px' },
                                                                gap: { xs: 2, sm: 3 }
                                                            }}
                                                        >
                                                            {/* <img src={v.image} alt="" className="heroimage img2hero" /> */}

                                                            <Box className="hero-text" sx={{ flex: 1 }}>
                                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                    {v.subtitle1.includes('iPhone') ? <AppleIcon sx={{ fontSize: { xs: '20px', sm: '30px', md: '35px' } }} /> : ''}
                                                                    <Typography variant="subtitle1" sx={{ fontSize: { xs: '10px', sm: '14px', md: '16px' } }}>{v.subtitle1}</Typography>
                                                                </Box>

                                                                <Typography variant="h3" sx={{
                                                                    margin: {
                                                                        sm: '20px 0 20px 0',
                                                                        xs: '10px 0 10px 0'
                                                                    }, letterSpacing: 2,
                                                                    fontSize: {
                                                                        xl: '42px',
                                                                        lg: '38px',
                                                                        md: '28px',
                                                                        sm: '25px',
                                                                        xs: '13px'
                                                                    }
                                                                }}>
                                                                    {v.title3}
                                                                </Typography>

                                                                <a href="#" className="hero-shop">Shop Now </a><ArrowForwardIcon sx={{ fontSize: { xs: '15px', sm: '20px' }, ml: { sm: 0, md: 0.5 } }} />
                                                            </Box>
                                                            <Box sx={{ maxWidth: { xs: '50%', sm: '50%', md: '55%', lg: '55%', xl: '90%' }, height: '100%' }}>
                                                                <img src={v.image} alt="" className="hero-main-img" style={{
                                                                    width: '100%',
                                                                    height: 'auto',
                                                                    objectFit: 'contain'
                                                                }} />
                                                            </Box>

                                                        </Box>
                                                    </SwiperSlide>
                                                ))
                                            }
                                        </Swiper>
                                    </Box>
                                </Grid>

                            </Grid>
                        </ThemeProvider>
                    </div>

                </section>

                {/* flash selling */}
                <ThemeProvider theme={theme}>
                    <section className="todays" style={{ position: 'relative' }}>
                        <div className="container">
                            <Box className="sub-title">
                                <i className="fa-solid fa-square"></i>
                                <Typography sx={{ fontWeight: 600 }} className="subtitle">Todays's</Typography>
                            </Box>

                            <Box sx={{
                                display: 'flex', alignItems: 'end', justifyContent: 'space-between'
                            }}>
                                <Box sx={{
                                    display: 'flex', alignItems: 'end', mt: { xs: 2, md: 2 }, columnGap: { xs: 5, md: 5, lg: 10 }, position: 'relative',
                                    flexWrap: {
                                        xs: 'wrap',
                                        sm: 'nowrap'
                                    },
                                    rowGap: 1
                                }}>
                                    <Typography variant="h4" sx={{ fontWeight: 600 }} className="title">Flash Sales</Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}>
                                        <Box>
                                            <Typography variant="subtitle2" className="my-time-typo1">Days</Typography>
                                            <Typography variant="h5" className="my-time-typo2">03</Typography>
                                        </Box>
                                        <Typography variant="h5" className="time-colun">:</Typography>
                                        <Box>
                                            <Typography variant="subtitle2" className="my-time-typo1">Hours</Typography>
                                            <Typography variant="h5" className="my-time-typo2">23</Typography>
                                        </Box>
                                        <Typography variant="h5" className="time-colun">:</Typography>
                                        <Box>
                                            <Typography variant="subtitle2" className="my-time-typo1">Minutes</Typography>
                                            <Typography variant="h5" className="my-time-typo2">19</Typography>
                                        </Box>
                                        <Typography variant="h5" className="time-colun">:</Typography>
                                        <Box>
                                            <Typography variant="subtitle2" className="my-time-typo1">Seconds</Typography>
                                            <Typography variant="h5" className="my-time-typo2" >56</Typography>
                                        </Box>

                                    </Box>
                                </Box>

                                <Box>
                                    <button ref={prevRef1} className="custom-prev swiper-button-prev" style={{ border: 'none', position: "relative", marginRight: '15px' }}>
                                        <FaArrowLeftLong />
                                    </button>

                                    <button ref={nextRef1} className="custom-next swiper-button-next" style={{ border: 'none', position: "relative" }}>
                                        <FaArrowRightLong />
                                    </button>
                                </Box>
                            </Box>
                        </div>

                        {/* style={{ maxWidth: '1480px', marginLeft: "auto", marginTop: '40px', marginRight: 0 }} */}
                        <Box className="container" sx={{
                            marginTop: { xs: '20px', sm: '23px', md: '35px' },

                        }}>
                            <Swiper
                                modules={[Navigation]}
                                // navigation={true}
                                navigation={{
                                    prevEl: prevRef1.current,
                                    nextEl: nextRef1.current,
                                }}
                                onBeforeInit={(swiper) => {
                                    swiper.params.navigation.prevEl = prevRef1.current;
                                    swiper.params.navigation.nextEl = nextRef1.current;
                                }}
                                // slidesPerView="auto"   // 🔥 KEY
                                // spaceBetween={20}

                                className="mySwiper"
                                loop={true}
                                breakpoints={{
                                    0: {
                                        slidesPerView: 2,
                                        spaceBetween: 20,
                                    },
                                    576: {
                                        slidesPerView: 3,
                                        spaceBetween: 30,
                                    },
                                    768: {
                                        slidesPerView: 3,
                                        spaceBetween: 30,
                                    },
                                    992: {
                                        slidesPerView: 4,
                                        spaceBetween: 30,
                                    },
                                }}
                            >
                                {
                                    flashsaleproduct?.slice(0, 6)?.map((v, i) => {
                                        //const r = v.rating.reduce((acc, v) => acc + v, 0)
                                        // console.log(r)
                                        //const rate = r / v.rating.length;
                                        console.log(v)

                                        const validVariants = v?.variants?.filter(
                                            (x) => x?.color && x.color.trim() !== ""
                                        );
                                        let selectedVariant;

                                        if (validVariants.length > 0) {
                                            const selectedColor =
                                                selectedColorsfalsh[v._id] || validVariants[0]?.color;

                                            selectedVariant = v?.variants?.find(
                                                (x) => x.color === selectedColor
                                            );
                                        } else {
                                            // ✅ fallback when no color exists
                                            selectedVariant = v?.variants?.[0];
                                        }
                                        console.log(selectedVariant)

                                        const discount = ((v.price - selectedVariant.flashPrice) / v.price) * 100;

                                        const wishlistselect = uid ? (wdata?.body?.products?.filter((v1) => v1?.product_id === v._id)) : ''
                                        console.log("wishlistselect", wishlistselect);

                                        const isInWishlist = uid ? wishlistselect?.some(
                                            (v1) => v1.variant_id === selectedVariant._id
                                        ) : '';

                                        return (
                                            <SwiperSlide>
                                                <Card sx={{ maxWidth: 310, position: 'relative', boxShadow: 0 }}>
                                                    <Box
                                                        className="carttop"
                                                        sx={{
                                                            bgcolor: '#eef0f3', display: 'flex', justifyContent: 'center',
                                                            alignItems: 'center', padding: '20px  0 0', borderRadius: 1, height: {
                                                                xs: '120px',
                                                                sm: '160px',
                                                                lg: '250px'
                                                            }, position: 'relative'
                                                        }}>
                                                        <CardMedia
                                                            component="img"

                                                            className=" cardimg"
                                                            sx={{ objectFit: "contain", mixBlendMode: "multiply" }}
                                                            image={
                                                                selectedVariant?.images?.[0]
                                                                    ? IMG_URL + selectedVariant.images[0]
                                                                    : IMG_URL + v.variants[0]?.images?.[0]
                                                            }
                                                            title={v.name}
                                                            onClick={() => handlepProduct(v._id)}
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
                                                    </Box>

                                                    <CardContent sx={{ outline: 0, padding: 0, pt: { xs: 3.5, md: 3 } }}>
                                                        <Typography gutterBottom variant="h5" component="div" className="bestseal-name">
                                                            {v.name}
                                                        </Typography>
                                                        <Box sx={{ display: 'flex', columnGap: 2, mb: 1 }}>
                                                            <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500, color: '#DB4444' }}>
                                                                ₹{selectedVariant.flashPrice}
                                                            </Typography>
                                                            <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500, textDecoration: 'line-through', color: 'grey' }}>
                                                                ₹{v.price}
                                                            </Typography>
                                                        </Box>

                                                        <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}>
                                                            <Typography sx={{ color: '#FFAD33' }}>
                                                                <Stack spacing={1}>
                                                                    <Rating name="half-rating" defaultValue={3} precision={0.5} sx={{
                                                                        fontSize: {
                                                                            xs: '15px',
                                                                            sm: '18px',
                                                                            md: '20px'
                                                                        }
                                                                    }} readOnly />
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
                                                            </Typography>
                                                        </Box>

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

                                                    </CardContent>

                                                    {
                                                        v?.variants?.length > 1 && (() => {

                                                            const validVariants = v?.variants?.filter(
                                                                (x) => x?.color && x.color.trim() !== ""
                                                            )

                                                            const selectedColor =
                                                                selectedColorsfalsh[v._id] || validVariants[0]?.color;


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
                                                                                            setSelectedColorsfalsh((prev) => ({
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
                                                                },
                                                            }} />
                                                        </IconButton>
                                                    </CardActions>
                                                </Card>
                                            </SwiperSlide>
                                        )
                                    })
                                }

                            </Swiper>

                        </Box>

                        <a href="#" className="my-custome-button" onClick={}>View More Product</a>
                    </section>
                </ThemeProvider>
                <hr />

                {/* category section */}
                <ThemeProvider theme={theme}>
                    <section id="category">
                        <div className="container" >
                            <Box className="sub-title">
                                <i className="fa-solid fa-square"></i>
                                <Typography sx={{ fontWeight: 600 }} className="subtitle">Categories</Typography>
                            </Box>

                            <Box sx={{ position: 'relative', mt: { xs: 1, sm: 2 } }}>
                                <Typography variant="h4" sx={{ fontWeight: 600 }} className="title">Browse By Category</Typography>


                                <Box sx={{ marginTop: { xs: '20px', sm: '23px', md: '35px' } }}>
                                    <Swiper

                                        modules={[Navigation]}
                                        navigation={{
                                            prevEl: prevRef2.current,
                                            nextEl: nextRef2.current,
                                        }}
                                        onBeforeInit={(swiper) => {
                                            swiper.params.navigation.prevEl = prevRef2.current;
                                            swiper.params.navigation.nextEl = nextRef2.current;
                                        }}
                                        className="mySwiper"
                                        loop={true}
                                        breakpoints={{
                                            320: {
                                                slidesPerView: 2,
                                                spaceBetween: 30,
                                            },
                                            576: {
                                                slidesPerView: 3,
                                                spaceBetween: 30,
                                            },
                                            768: {
                                                slidesPerView: 4,
                                                spaceBetween: 30,
                                            },
                                            992: {
                                                slidesPerView: 5,
                                                spaceBetween: 45,
                                            },
                                            1200: {
                                                slidesPerView: 6,
                                                spaceBetween: 45,
                                            }
                                        }}
                                    >
                                        {
                                            elecategory?.map((v, i) => (
                                                <SwiperSlide>
                                                    <Box sx={{ border: 'solid 2px rgb(224, 222, 224)', borderRadius: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }} className="category-title">
                                                        {caticone[v.name]}
                                                        {/* <Box className="caticone">{caticone[v.name]}</Box> */}
                                                        <Typography variant="h6" sx={{
                                                            fontWeight: '500', marginTop: 1, fontSize: {
                                                                xs: '18px',
                                                                md: '20px'
                                                            }
                                                        }}>{v.name}</Typography>
                                                    </Box>
                                                </SwiperSlide>
                                            ))
                                        }
                                    </Swiper>

                                    <button ref={prevRef2} className="custom-prev swiper-button-prev" style={{ border: 'none' }}>
                                        <FaArrowLeftLong />
                                    </button>

                                    <button ref={nextRef2} className="custom-next swiper-button-next" style={{ border: 'none' }}>
                                        <FaArrowRightLong />
                                    </button>
                                </Box>
                            </Box>

                        </div>
                    </section>
                </ThemeProvider>
                <hr />

                <ThemeProvider theme={theme}>
                    {/* best selling product */}
                    <section id="bestsellingproduct">
                        <div className="container">
                            <Box className="sub-title">
                                <i className="fa-solid fa-square"></i>
                                <Typography sx={{ fontWeight: 600 }} className="subtitle">This Month</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', mt: 1, columnGap: 10, position: 'relative' }}>
                                <Typography variant="h4" sx={{ fontWeight: 600 }} className="title">Best Selling Products</Typography>
                                <a href="#" className="bsleft-btn my-custome-button">View All</a>
                            </Box>

                            <Grid container columnSpacing={{ xs: 1, sm: 3, lg: 4 }} rowSpacing={0}
                                sx={{
                                    marginTop: { xs: '20px', sm: '23px', md: '35px' }
                                }}>
                                {
                                    bestsellp.map((v) => {
                                        const r = v.rating.reduce((acc, v) => acc + v, 0)
                                        // console.log(r)
                                        const rate = r / v.rating.length;
                                        console.log(rate)

                                        return (
                                            <Grid size={{ xs: 6, sm: 4, md: 3, lg: 3 }}>
                                                <Card sx={{ maxWidth: 310, position: 'relative', boxShadow: 0 }}>
                                                    <Box
                                                        className="carttop"
                                                        sx={{
                                                            bgcolor: '#eef0f3', display: 'flex', justifyContent: 'center',
                                                            alignItems: 'center', padding: '20px  0 0', borderRadius: 1,
                                                            height: {
                                                                xs: '120px',
                                                                sm: '150px',
                                                                lg: '250px'
                                                            }, position: 'relative'
                                                        }}>
                                                        <CardMedia
                                                            component="img"
                                                            className="cardimg"
                                                            sx={{ objectFit: "contain" }}
                                                            image={v.img}
                                                        />

                                                    </Box>


                                                    <CardContent sx={{ outline: 0, pl: 0 }}>
                                                        <Typography gutterBottom variant="h5" component="div" className="bestseal-name">
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
                                                            <Typography sx={{
                                                                color: 'grey', fontWeight: '600',
                                                                fontSize: {
                                                                    xs: '12px',
                                                                    sm: '16px'
                                                                }
                                                            }}>
                                                                {`(${r})`}
                                                            </Typography>
                                                        </Box>

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
                                                                    lg: '22px'
                                                                },
                                                            }} />
                                                        </IconButton>
                                                        <IconButton sx={{ bgcolor: 'white', boxShadow: 1 }} size="small">
                                                            <RemoveRedEyeOutlinedIcon sx={{
                                                                fontSize: {
                                                                    xs: '12px',
                                                                    sm: '18px',
                                                                    md: '20px',
                                                                    lg: '22px'
                                                                },
                                                            }} />
                                                        </IconButton>
                                                    </CardActions>
                                                </Card>
                                            </Grid>
                                        )
                                    })
                                }
                            </Grid>

                            <a href="#" className="best-seal-btn my-custome-button">View All</a>

                        </div>

                    </section>
                </ThemeProvider>

                {/* Enhance Your Music Experience section */}
                <section id="musicexp">
                    <div className="container">
                        <Box className="musix-main-box" sx={{ bgcolor: 'black', padding: '60px 66px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                                <Typography variant="h6" sx={{ color: '#00FF66' }}>Categories</Typography>
                                <Typography variant="h3" sx={{ letterSpacing: 1, mt: 3 }} className="musixexp-title">Enhance Your <br /> Music Experience</Typography>

                                <Box sx={{ display: 'flex', columnGap: 3, mt: 4, flexWrap: 'wrap', rowGap: '20px' }}>
                                    <Box className="musixexp-timebox">
                                        <Typography variant="body1" sx={{ fontWeight: '600' }}>23</Typography>
                                        <Typography variant="caption" sx={{ mt: '-1px' }}>Hours</Typography>
                                    </Box>

                                    <Box className="musixexp-timebox">
                                        <Typography variant="body1" sx={{ fontWeight: '600' }}>05</Typography>
                                        <Typography variant="caption" sx={{ mt: '-1px' }}>Days</Typography>
                                    </Box>

                                    <Box className="musixexp-timebox">
                                        <Typography variant="body1" sx={{ fontWeight: '600' }}>59</Typography>
                                        <Typography variant="caption" sx={{ mt: '-1px' }}>Minutes</Typography>
                                    </Box>

                                    <Box className="musixexp-timebox">
                                        <Typography variant="body1" sx={{ fontWeight: '600' }}>35</Typography>
                                        <Typography variant="caption" sx={{ mt: '-1px' }}>Seconds</Typography>
                                    </Box>
                                </Box>

                                <a href="#" className="my-custome-button">Buy Now!</a>
                            </Box>

                            <Box className="musicexp-imgbox">
                                <img src="../../../public/assets/images/musicexp.png" alt="musicexp" width='100%' />
                            </Box>
                        </Box>
                    </div>
                </section>

                {/* explore our product */}
                <ThemeProvider theme={theme}>
                    <section id="allproducts">
                        <div className="container" >
                            <Box className="sub-title">
                                <i className="fa-solid fa-square"></i>
                                <Typography sx={{ fontWeight: 600 }} className="subtitle">Our Products</Typography>
                            </Box>

                            <Box sx={{ position: 'relative', mt: 2 }}>
                                <Typography variant="h4" sx={{ fontWeight: 600 }} className="title">Explore Our Products</Typography>

                                <Box sx={{ width: '100%', marginTop: { xs: '20px', sm: '23px', md: '35px' } }}>
                                    <Swiper
                                        // slidesPerView={4}
                                        // grid={{ rows: 2, fill: "row" }}

                                        pagination={{
                                            clickable: true,
                                        }}
                                        modules={[Navigation, SwiperGrid, Pagination]}
                                        onSwiper={setSwiperInstance}
                                        navigation={{
                                            prevEl: prevRef3.current,
                                            nextEl: nextRef3.current,
                                        }}
                                        onBeforeInit={(swiper) => {
                                            swiper.params.navigation.prevEl = prevRef3.current;
                                            swiper.params.navigation.nextEl = nextRef3.current;
                                        }}

                                        className="mySwiper"
                                        breakpoints={{
                                            0: {
                                                slidesPerView: 2,
                                                grid: {
                                                    rows: 1,
                                                    fill: "row"
                                                },
                                                spaceBetween: 20
                                            },
                                            576: {
                                                slidesPerView: 3,
                                                grid: {
                                                    rows: 2,
                                                    fill: "row"
                                                },
                                                spaceBetween: 20
                                            },
                                            768: {
                                                slidesPerView: 3,
                                                grid: {
                                                    rows: 2,
                                                    fill: "row"
                                                },
                                                spaceBetween: 20
                                            },
                                            992: {
                                                slidesPerView: 4,
                                                grid: {
                                                    rows: 2,
                                                    fill: "row"
                                                },
                                                spaceBetween: 20
                                            },
                                            1200: {
                                                slidesPerView: 4,
                                                grid: {
                                                    rows: 2,
                                                    fill: "row"
                                                },
                                                spaceBetween: 30
                                            }
                                        }}

                                    >
                                        {pdata?.data?.map((v, i) => {
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

                                            const wishlistselect = uid ? (wdata?.body?.products?.filter((v1) => v1?.product_id === v._id)) : ''
                                            console.log("wishlistselect", wishlistselect);

                                            const isInWishlist = uid ? wishlistselect?.some(
                                                (v1) => v1.variant_id === selectedVariant._id
                                            ) : '';
                                            console.log("wishlistvarient", isInWishlist)
                                            return (
                                                <SwiperSlide key={v.id}>
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
                                                                    ₹{v.price}
                                                                </Typography>


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
                                                </SwiperSlide>
                                            )
                                        })}
                                    </Swiper>
                                    <button ref={prevRef3} className="custom-prev swiper-button-prev" style={{ border: 'none' }}>
                                        <FaArrowLeftLong />
                                    </button>

                                    <button ref={nextRef3} className="custom-next swiper-button-next" style={{ border: 'none' }}>
                                        <FaArrowRightLong />
                                    </button>
                                </Box>
                            </Box>

                            <a href="#" className="my-custome-button" style={{ margin: '20px auto 0 auto' }}>View More Product</a>
                        </div>
                    </section>
                </ThemeProvider>

                {/* new arraival fecutre section */}
                <ThemeProvider theme={theme}>
                    <section id="newarrival">
                        <div className="container" >
                            <Box className="sub-title">
                                <i className="fa-solid fa-square"></i>
                                <Typography sx={{ fontWeight: 600 }} className="subtitle">Featured</Typography>
                            </Box>

                            <Box sx={{ position: 'relative', mt: 2 }}>
                                <Typography variant="h4" sx={{ fontWeight: 600 }} className="title">New Arrival</Typography>
                            </Box>

                            <Box sx={{ marginTop: { xs: '20px', sm: '23px', md: '35px' } }} >
                                <Grid container columnSpacing={{ xs: 10, sm: 2, md: 4, lg: 4, xl: 3 }} rowSpacing={{ xs: 3, sm: 4, md: 0 }} sx={{ height: "100%" }} >

                                    <Grid size={{ xs: 12, sm: 6, md: 6 }} sx={{ overflow: 'hidden' }}>
                                        <Box className='newarrival-grid-box' sx={{ height: { sm: "350px", md: "500px" } }}>
                                            <img src="../../../public/assets/images/newarrival/playstation.png" alt="" className="firstimg-new" />

                                            <div className="newarrival-grid-box-text">
                                                <Typography variant="h5" sx={{
                                                    fontWeight: 600, fontSize: {
                                                        xs: '16px', sm: '20px', md: "22px", lg: '24px'
                                                    }
                                                }}>PlayStation 5</Typography>
                                                <Typography variant="body2" sx={{
                                                    fontWeight: '400', maxWidth: '242px', margin: { xs: "5px 0", sm: "6px 0", md: '8px 0' },
                                                    fontSize: {
                                                        xs: '12px',
                                                        sm: "10px",
                                                        md: '14px',
                                                        lg: '18px',
                                                        xl: "18px"
                                                    }
                                                }}>Black and White version of the PS5 coming out on sale.</Typography>
                                                <a href="#" className="newarrival-shpnow">Shop Now</a>
                                            </div>
                                        </Box>
                                    </Grid>


                                    <Grid size={{ xs: 12, sm: 6, md: 6 }} container rowSpacing={{ sm: 1, md: 3.5, lg: 4 }}>
                                        <Grid size={{ xs: 12, sm: 12, md: 12 }} sx={{ height: { sm: '180px', md: '230px', lg: '250px' } }}>
                                            <Box className='newarrival-grid-box' sx={{ display: 'flex', paddingRight: '0', paddingTop: '20px', height: '100%' }}>
                                                <img src="../../../public/assets/images/newarrival/womens-collection.png" alt="" className="womenimg" style={{ marginLeft: "auto" }} />

                                                <div className="newarrival-grid-box-text">
                                                    <Typography variant="h5" sx={{
                                                        fontWeight: 600, fontSize: {
                                                            xs: '16px', sm: '18px', md: "22px", lg: '24px'
                                                        }
                                                    }}>Women’s Collections</Typography>
                                                    <Typography variant="body2" sx={{
                                                        fontWeight: '400', maxWidth: '242px', margin: { xs: "5px 0", sm: "6px 0", md: '8px 0' },
                                                        fontSize: {
                                                            xs: '12px',
                                                            sm: "10px",
                                                            md: '14px',
                                                            lg: '18px',
                                                            xl: "18px"
                                                        }
                                                    }}>Featured woman collections that give you another vibe.</Typography>
                                                    <a href="#" className="newarrival-shpnow">Shop Now</a>
                                                </div>
                                            </Box>
                                        </Grid>


                                        <Grid container columnSpacing={{ xs: 0, sm: 2, md: 3, lg: 4, xl: 3 }} display="flex" size={12}
                                            sx={{ height: { sm: "150px", md: '240px', lg: '218px' } }}>
                                            <Grid size={{ xs: 12, sm: 6 }} sx={{ height: { sm: '100%' } }}>
                                                <Box className='newarrival-grid-box lastbox' sx={{ height: '100%', width: "100%" }}>
                                                    <img src="../../../public/assets/images/newarrival/speaker.png" alt="" />

                                                    <div className="newarrival-grid-box-text">
                                                        <Typography variant="h5" sx={{
                                                            fontWeight: 600, fontSize: {
                                                                xs: '16px', sm: '18px', md: "22px", lg: '24px'
                                                            }
                                                        }}>Speakers</Typography>
                                                        <Typography variant="body2" sx={{
                                                            fontWeight: '400', maxWidth: '242px', margin: { xs: "5px 0", sm: "6px 0", md: '8px 0' },
                                                            fontSize: {
                                                                xs: '12px',
                                                                sm: "10px",
                                                                md: '14px',
                                                                lg: '18px',
                                                                xl: '18px'
                                                            }
                                                        }}>Amazon wireless speakers</Typography>
                                                        <a href="#" className="newarrival-shpnow">Shop Now</a>
                                                    </div>
                                                </Box>
                                            </Grid>

                                            <Grid size={{ xs: 12, sm: 6 }} sx={{ height: { sm: '100%' } }}>
                                                <Box className='newarrival-grid-box lastbox' sx={{ height: '100%', width: "100%" }}>
                                                    <img src="../../../public/assets/images/newarrival/perfume.png" alt="" />

                                                    <div className="newarrival-grid-box-text">
                                                        <Typography variant="h5" sx={{
                                                            fontWeight: 600, fontSize: {
                                                                xs: '16px', sm: '18px', md: "22px", lg: '24px'
                                                            }
                                                        }}>Perfume</Typography>
                                                        <Typography variant="body2" sx={{
                                                            fontWeight: '400', maxWidth: '242px', margin: { xs: "5px 0", sm: "6px 0", md: '8px 0' },
                                                            fontSize: {
                                                                xs: '10px',
                                                                sm: "10px",
                                                                md: '14px',
                                                                lg: '18px',
                                                                xl: '18px'

                                                            }
                                                        }}>GUCCI INTENSE OUD EDP</Typography>
                                                        <a href="#" className="newarrival-shpnow">Shop Now</a>
                                                    </div>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>

                            </Box>


                        </div>
                    </section>
                </ThemeProvider>

                {/* why choose us */}
                <ThemeProvider theme={theme}>
                    <section id="aboutus-whychoosus">
                        <div className="container whycoose-con">
                            <Grid container columnSpacing={{ xs: 3, sm: 5, md: 10 }} rowSpacing={{ xs: 4, lg: 5 }}
                                sx={{
                                    justifyContent: {
                                        xs: 'center'
                                    }
                                }}
                            >
                                <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ textAlign: 'center' }}>
                                    <Box className="whychoose-box">
                                        <IconButton aria-label="deleLocalShipping" className="whychoos-iconebtn">
                                            <LocalShippingOutlinedIcon className="whychoos-icone" />
                                        </IconButton>
                                    </Box>
                                    <Typography variant="subtitle1" className="whychoose-typography1" sx={{ fontSize: '20px', fontWeight: '600' }}>FREE AND FAST DELIVERY</Typography>
                                    <Typography variant="subtitle1" className="whychoose-typography2" sx={{ fontSize: '14px', fontWeight: '500' }}> Free delivery for all orders over $140</Typography>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ textAlign: 'center' }}>
                                    <Box className="whychoose-box">
                                        <IconButton aria-label="SupportAgent" className="whychoos-iconebtn">
                                            <SupportAgentIcon className="whychoos-icone" />
                                        </IconButton>
                                    </Box>
                                    <Typography variant="subtitle1" className="whychoose-typography1" sx={{ fontSize: '20px', fontWeight: '600' }}>24/7 CUSTOMER SERVICE</Typography>
                                    <Typography variant="subtitle1" className="whychoose-typography2" sx={{ fontSize: '14px', fontWeight: '500' }}> Friendly 24/7 customer support</Typography>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 7, md: 4 }} sx={{ textAlign: 'center' }}>
                                    <Box className="whychoose-box">
                                        <IconButton aria-label="GppGoodOutlined" className="whychoos-iconebtn">
                                            <GppGoodOutlinedIcon className="whychoos-icone" />
                                        </IconButton>
                                    </Box>
                                    <Typography variant="subtitle1" className="whychoose-typography1" sx={{ fontSize: '20px', fontWeight: '600' }}>MONEY BACK GUARANTEE</Typography>
                                    <Typography variant="subtitle1" className="whychoose-typography2" sx={{ fontSize: '14px', fontWeight: '500' }}> We reurn money within 30 days</Typography>
                                </Grid>
                            </Grid>
                        </div>
                    </section>
                </ThemeProvider>

                {/* <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end', // 👉 move to right
                        // mt: 3,
                        mb:{xs:-2},
                        px: { xs: 2, sm: 4, md: 6 } // responsive spacing
                    }}
                >
                    <IconButton
                        onClick={handleScrollTop}
                        sx={{
                            bgcolor: '#eee',
                            boxShadow: 1,
                            width: { xs: 35, sm: 40 },
                            height: { xs: 35, sm: 40 },
                            '&:hover': { bgcolor: '#ddd' }
                        }}
                    >
                        <ArrowUpwardIcon style={{
                            fontSize: {
                                xs: '12px',
                                sm: '18px',
                                md: '18px',
                                lg: '25px'
                            }, color: 'black'

                        }} />
                    </IconButton>
                </Box> */}
                {showButton && (
                    <Box
                        sx={{
                            position: 'fixed',
                            bottom: 20,
                            right: { xs: 15, md: 50, lg: 40, xl: 60 },
                            zIndex: 1000
                        }}
                    >
                        <IconButton
                            onClick={handleScrollTop}
                            sx={{
                                bgcolor: '#eee',
                                boxShadow: 1,
                                width: { xs: 35, sm: 40 },
                                height: { xs: 35, sm: 40 },
                                '&:hover': { bgcolor: '#ddd' }
                            }}
                        >
                            <ArrowUpwardIcon
                                sx={{
                                    fontSize: { xs: 12, sm: 18, md: 18, lg: 25 },
                                    color: 'black'
                                }}
                            />
                        </IconButton>
                    </Box>
                )}

            </main >

        </>
    )
}

export default Homepage;
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


function Homepage() {

    const [fsale, setFsale] = useState([])
    const [bestsellp, setBestsellp] = useState([])
    const [elecategory, setElecategory] = useState([])
    const [products, setProducts] = useState([]);
    // const [isMobile, setIsMobile] = useState(false);
    //console.log("mobile", isMobile)
    const theme1 = useTheme();

    // ✅ Use MUI breakpoint (BEST PRACTICE)
    const isMobile = useMediaQuery(theme1.breakpoints.down("md"));
    const [selectedColors, setSelectedColors] = useState({});


    const [anchorEl, setAnchorEl] = React.useState(null);
    const [activeIndex, setActiveIndex] = React.useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event, index) => {
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

        // const defaultColors = {};

        // products.forEach((v) => {
        //     if (v.colors?.length) {
        //         defaultColors[v.id] = products.colors[0];
        //     }
        // });

        // setSelectedColors(defaultColors);

    }, [])

    useEffect(() => {
        if (swiperInstance && prevRef3.current && nextRef3.current) {
            swiperInstance.params.navigation.prevEl = prevRef3.current;
            swiperInstance.params.navigation.nextEl = nextRef3.current;

            swiperInstance.navigation.init();
            swiperInstance.navigation.update();
        }
    }, [swiperInstance]);


    const caticone = {
        "phone": <PhoneIphoneOutlinedIcon className="caticone" />,
        "computer": <DesktopMacOutlinedIcon className="caticone" />,
        "smartwatch": <WatchOutlinedIcon className="caticone" />,
        "camera": <CameraAltOutlinedIcon className="caticone" />,
        "headphone": <HeadphonesOutlinedIcon className="caticone" />,
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

    // const menuItems = [
    //     "Woman’s Fashion",
    //     "Men’s Fashion",
    //     "Electronics",
    //     "Home & Lifestyle",
    //     "Medicine",
    //     "Sports & Outdoor",
    //     "Baby’s & Toys",
    //     "Groceries & Pets",
    //     "Health & Beauty",
    // ];

    const menuItems = [
        { name: "Woman’s Fashion", subcategories: ["Dresses", "Tops", "Shoes"] },
        { name: "Men’s Fashion", subcategories: ["Shirts", "Pants", "Shoes"] },
        { name: "Electronics", subcategories: [] },
        { name: "Home & Lifestyle", subcategories: [] },
        { name: "Medicine", subcategories: [] },
        { name: "Sports & Outdoor", subcategories: ["Fitness", "Camping"] },
        { name: "Baby’s & Toys", subcategories: [] },
        { name: "Groceries & Pets", subcategories: [] },
        { name: "Health & Beauty", subcategories: [] },
    ];

    const colors = [
        { name: "Red", value: "#ff0000" },
        { name: "Blue", value: "#0000ff" },
        { name: "Black", value: "#000000" },
        { name: "White", value: "#ffffff" },
    ];

    //console.log(menuItems.name)

    return (
        <>
            <main>
                <section className="hero">
                    <div className="container">
                        <ThemeProvider theme={theme}>
                            <Grid container alignItems="stretch" rowSpacing={3}>
                                <Grid size={{ xs: 12, sm: 12, md: 3, lg: 2 }}>
                                    {/* <Box className="hero-left" sx={{ p: '25px 20px 0 0' }}>
                                    <MenuList className="heroleft-menu">
                                        <MenuItem className="my-custome-list">
                                            <ListItemText
                                                id="basic-button"
                                                aria-controls={open ? 'basic-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={handleClick}
                                                sx={{ width: "100%", display: 'flex', justifyContent: 'space-between' }}
                                            >
                                                Woman’s Fashion
                                                <IconButton sx={{ p: 0, ml: 2 }} >
                                                    <ArrowForwardIosIcon sx={{ fontSize: '16px' }} />
                                                </IconButton>
                                            </ListItemText>
                                            <Menu
                                                id="basic-menu"
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                                slotProps={{
                                                    list: {
                                                        'aria-labelledby': 'basic-button',
                                                    },
                                                }}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}

                                            >
                                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                                            </Menu>
                                        </MenuItem>
                                        <MenuItem className="my-custome-list">
                                            <ListItemText
                                                id="basic-button"
                                                aria-controls={open ? 'basic-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={handleClick}
                                            >
                                                <Typography>Men’s Fashion</Typography>
                                                <IconButton sx={{ p: 0 }} >
                                                    <ArrowForwardIosIcon sx={{ fontSize: '16px' }} />
                                                </IconButton>
                                            </ListItemText>
                                            <Menu
                                                id="basic-menu"
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                                slotProps={{
                                                    list: {
                                                        'aria-labelledby': 'basic-button',
                                                    },
                                                }}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}

                                            >
                                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                                            </Menu>
                                        </MenuItem>
                                        <MenuItem className="my-custome-list">
                                            <ListItemText>Electronics</ListItemText>
                                        </MenuItem>
                                        <MenuItem className="my-custome-list">
                                            <ListItemText>Home & Lifestyle</ListItemText>
                                        </MenuItem>
                                        <MenuItem className="my-custome-list">
                                            <ListItemText>Medicine</ListItemText>
                                        </MenuItem>
                                        <MenuItem className="my-custome-list">
                                            <ListItemText>Sports & Outdoor</ListItemText>
                                        </MenuItem>
                                        <MenuItem className="my-custome-list">
                                            <ListItemText>Baby’s & Toys</ListItemText>
                                        </MenuItem>
                                        <MenuItem className="my-custome-list">
                                            <ListItemText>Groceries & Pets</ListItemText>
                                        </MenuItem>
                                        <MenuItem className="my-custome-list">
                                            <ListItemText>Health & Beauty</ListItemText>
                                        </MenuItem>
                                    </MenuList>

                                 
                                </Box> */}

                                    {/* <Box className="hero-left" sx={{ p: '25px 20px 0 0' }}>
                                    {isMobile ? (
                                        <Swiper
                                            slidesPerView="auto"
                                            spaceBetween={10}
                                            freeMode={true}
                                        >
                                            {menuItems.map((item, index) => (
                                                <SwiperSlide key={index} style={{ width: 'auto' }}>
                                                    <Box sx={{
                                                        p: 1,
                                                        border: '1px solid #ddd',
                                                        borderRadius: 1,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        minWidth: '120px'
                                                    }}>

                                                        {item.subcategories.length > 0 ?
                                                            <>
                                                                <Typography
                                                                    id="demo-positioned-button"
                                                                    aria-controls={open ? 'demo-positioned-menu' : undefined}
                                                                    aria-haspopup="true"
                                                                    aria-expanded={open ? 'true' : undefined}
                                                                    onClick={handleClick}
                                                                    sx={{ fontSize: '14px' }}
                                                                >
                                                                    {item.name}
                                                                </Typography>
                                                                <Menu
                                                                    id="demo-positioned-menu"
                                                                    aria-labelledby="demo-positioned-button"
                                                                    anchorEl={anchorEl}
                                                                    open={open}
                                                                    onClose={handleClose}
                                                                    anchorOrigin={{
                                                                        vertical: 'top',
                                                                        horizontal: 'left',
                                                                    }}
                                                                    transformOrigin={{
                                                                        vertical: 'top',
                                                                        horizontal: 'left',
                                                                    }}
                                                                >
                                                                    {
                                                                        item.subcategories.map((v, i) => (
                                                                            <MenuItem onClick={handleClose}>{v}</MenuItem>
                                                                        ))
                                                                    }

                                                                    
                                                                </Menu>
                                                            </>
                                                            : <Typography variant="body2">{item.name}</Typography>}

                                                        {item.subcategories.length > 0 ? <IconButton sx={{ p: 0, ml: 1 }}>
                                                            <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
                                                        </IconButton> : ""}

                                                       
                                                    </Box>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    ) : (
                                        <MenuList className="heroleft-menu">
                                            {menuItems.map((item, index) => (
                                                <MenuItem key={index} className="my-custome-list">
                                                    <ListItemText
                                                        sx={{ width: "100%", display: 'flex', justifyContent: 'space-between' }}
                                                    >
                                                        {item.name}
                                                        {item.subcategories.length > 0 ? <IconButton sx={{ p: 0, ml: 2 }}>
                                                            <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
                                                        </IconButton> : ""}
                                                    </ListItemText>
                                                </MenuItem>
                                            ))}
                                        </MenuList>
                                    )}
                                </Box> */}

                                    <Box className="hero-left" sx={{ p: { xs: '25px 0 0 0', md: "25px 20px 0 0" }, borderRight: { xs: 'none', md: 'solid 1px rgb(224, 222, 224)' } }}>
                                        {/* ================= MOBILE (SWIPER) ================= */}
                                        {isMobile ? (
                                            <>
                                                <Swiper key="mobile-swiper" slidesPerView="auto" spaceBetween={10} freeMode={true}>
                                                    {menuItems.map((item, index) => (
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
                                                                {item.subcategories.length > 0 ? (
                                                                    <Typography
                                                                        onClick={(e) => handleClick(e, index)}
                                                                        sx={{ fontSize: { xs: "13px", sm: '16px' }, cursor: "pointer" }}
                                                                    >
                                                                        {item.name}
                                                                    </Typography>
                                                                ) : (
                                                                    <Typography variant="body2" sx={{ fontSize: { xs: "13px", sm: '16px' } }}>
                                                                        {item.name}
                                                                    </Typography>
                                                                )}

                                                                {item.subcategories.length > 0 && (
                                                                    <IconButton
                                                                        sx={{ p: 0, ml: 1 }}
                                                                        onClick={(e) => handleClick(e, index)}
                                                                    >
                                                                        <ArrowForwardIosIcon sx={{ fontSize: { xs: 12, sm: 16 } }} />
                                                                    </IconButton>
                                                                )}
                                                            </Box>
                                                        </SwiperSlide>
                                                    ))}
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
                                                    {activeIndex !== null &&
                                                        menuItems[activeIndex]?.subcategories.map((sub, i) => (
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
                                                    {menuItems.map((item, index) => (
                                                        <MenuItem
                                                            key={index}
                                                            className="my-custome-list"
                                                            onMouseEnter={(e) =>
                                                                item.subcategories.length > 0 &&
                                                                handleClick(e, index)
                                                            }
                                                            onMouseLeave={handleClose}
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

                                                                {item.subcategories.length > 0 && (
                                                                    <IconButton sx={{ p: 0, ml: 2 }}>
                                                                        <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
                                                                    </IconButton>
                                                                )}
                                                            </Box>
                                                        </MenuItem>
                                                    ))}
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
                                                    {activeIndex !== null &&
                                                        menuItems[activeIndex]?.subcategories.map((sub, i) => (
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
                                        // "& .swiper-pagination": {
                                        //     position: "absolute",
                                        //     bottom: "10px",
                                        //     left: "50%",
                                        //     transform: "translateX(-50%)", // ✅ center
                                        //     width: "auto",
                                        // },
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
                                                // "--swiper-pagination-bullet-size": "10px",
                                                // "--swiper-pagination-bullet-horizontal-gap": "10px"
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
                <section className="todays" style={{ position: 'relative' }}>
                    <div className="container">
                        <Box className="todays-title">
                            <i className="fa-solid fa-square"></i>
                            <Typography sx={{ fontWeight: 600 }}>Todays's</Typography>
                        </Box>

                        <Box sx={{
                            display: 'flex', alignItems: 'end', mt: 2, columnGap: { xs: 5, md: 5, lg: 10 }, position: 'relative',
                            flexWrap: {
                                xs: 'wrap',
                                sm: 'nowrap'
                            },
                            rowGap: 2
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

                    </div>

                    {/* style={{ maxWidth: '1480px', marginLeft: "auto", marginTop: '40px', marginRight: 0 }} */}
                    <Box className="container" sx={{ marginTop: { xs: '20px', sm: '40px' }, }}>
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

                            className="mySwiper"
                            loop={true}
                            breakpoints={{
                                0: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                                576: {
                                    slidesPerView: 2,
                                    spaceBetween: 30,
                                },
                                768: {
                                    slidesPerView: 3,
                                    spaceBetween: 30,
                                },
                                992: {
                                    slidesPerView: 3.5,
                                    spaceBetween: 30,
                                },
                            }}


                        >
                            {
                                fsale.map((v, i) => {
                                    const r = v.rating.reduce((acc, v) => acc + v, 0)
                                    // console.log(r)
                                    const rate = r / v.rating.length;
                                    // console.log(rate)
                                    return (
                                        <SwiperSlide>
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
                                                            bottom: '10%', padding: '8px 0', borderRadius: '0 0 5px 5px',
                                                            fontSize: {
                                                                xs: '12px',
                                                                sm: '16px',
                                                                md: '16px'
                                                            }
                                                        }}
                                                    >
                                                        Add To Cart
                                                    </Typography>
                                                </Box>


                                                <CardContent sx={{ outline: 0, padding: 0, pt: { xs: 3.5, md: 3 } }}>
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

                                                    <Box sx={{
                                                        bgcolor: '#DB4444', color: 'white', width: 'fit-content',
                                                        padding: {
                                                            xs: '2px 8px',
                                                            sm: '2px 12px'
                                                        }, borderRadius: 1, position: 'absolute', top: '3%', left: '6%'
                                                    }}>
                                                        <Typography variant="body2" sx={{
                                                            fontSize: {
                                                                xs: '10px',
                                                                sm: '14px'
                                                            }
                                                        }}>{v.discount}</Typography>
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
                                                                lg: '24px'
                                                            },
                                                        }} />
                                                    </IconButton>
                                                    <IconButton sx={{ bgcolor: 'white', boxShadow: 1 }} size="small">
                                                        <RemoveRedEyeOutlinedIcon sx={{
                                                            fontSize: {
                                                                xs: '12px',
                                                                sm: '18px',
                                                                md: '20px',
                                                                lg: '24px'
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
                        <button ref={prevRef1} className="custom-prev swiper-button-prev" style={{ border: 'none' }}>
                            <FaArrowLeftLong />
                        </button>

                        <button ref={nextRef1} className="custom-next swiper-button-next" style={{ border: 'none' }}>
                            <FaArrowRightLong />
                        </button>
                    </Box>

                    <a href="#" className="my-custome-button" >View More Product</a>
                </section>

                <hr />

                {/* category section */}

                <section id="category">
                    <div className="container" >
                        <Box className="todays-title">
                            <i className="fa-solid fa-square"></i>
                            <Typography sx={{ fontWeight: 600 }}>Categories</Typography>
                        </Box>

                        <Box sx={{ position: 'relative', mt: 2 }}>
                            <Typography variant="h4" sx={{ fontWeight: 600 }} className="title">Browse By Category</Typography>


                            <Box sx={{ marginTop: { xs: '20px', sm: '40px' } }}>
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
                                        elecategory.map((v, i) => (
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

                <hr />

                <ThemeProvider theme={theme}>
                    {/* best selling product */}
                    <section id="bestsellingproduct">
                        <div className="container">
                            <Box className="todays-title">
                                <i className="fa-solid fa-square"></i>
                                <Typography sx={{ fontWeight: 600 }}>This Month</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', mt: 1, columnGap: 10, position: 'relative' }}>
                                <Typography variant="h4" sx={{ fontWeight: 600 }} className="title">Best Selling Products</Typography>
                                <a href="#" className="bsleft-btn my-custome-button">View All</a>
                            </Box>

                            <Grid container spacing={{ xs: 1, sm: 3, lg: 4 }}
                                sx={{
                                    marginTop: { xs: '20px', sm: '45px' }
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
                                                                    <Rating name="half-rating" defaultValue={rate} precision={0.5}
                                                                        sx={{
                                                                            fontSize: {
                                                                                xs: '18px',
                                                                                sm: '18px',
                                                                                md: '20px'
                                                                            }
                                                                        }} readOnly />
                                                                </Stack>
                                                            </Typography>
                                                            <Typography sx={{ color: 'grey', fontWeight: '600' }}>
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
                                                                    lg: '25px'
                                                                }, color: 'black'
                                                            }} />
                                                        </IconButton>
                                                        <IconButton sx={{ bgcolor: 'white', boxShadow: 1 }} size="small">
                                                            <RemoveRedEyeOutlinedIcon sx={{
                                                                fontSize: {
                                                                    xs: '12px',
                                                                    sm: '18px',
                                                                    md: '20px',
                                                                    lg: '25px'
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
                <section id="allproducts">
                    <div className="container" >
                        <Box className="todays-title">
                            <i className="fa-solid fa-square"></i>
                            <Typography sx={{ fontWeight: 600 }}>Our Products</Typography>
                        </Box>

                        <Box sx={{ position: 'relative', mt: 2 }}>
                            <Typography variant="h4" sx={{ fontWeight: 600 }} className="title">Explore Our Products</Typography>

                            <Box sx={{ width: '100%', marginTop: { xs: '20px', sm: '40px' } }}>
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
                                            slidesPerView: 2,
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
                                    {products.map((v, i) => {
                                        const r = v.rating.reduce((acc, v) => acc + v, 0)
                                        // console.log(r)
                                        const rate = r / v.rating.length;
                                        console.log(rate)
                                        return (
                                            <SwiperSlide key={v.id}>
                                                <Card sx={{ maxWidth: '100%', position: 'relative', boxShadow: 0 }}>
                                                    <Box
                                                        className="carttop"
                                                        sx={{
                                                            bgcolor: '#eef0f3', display: 'flex', justifyContent: 'center',
                                                            alignItems: 'center', padding: '20px  0 0', borderRadius: 1,
                                                            height: {
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
                                                            title="productimg"

                                                        />

                                                        <Typography
                                                            className="addcart"
                                                            sx={{
                                                                bgcolor: 'black', width: "100%", color: 'white', display: 'none',
                                                                textAlign: 'center', justifySelf: 'flex-end', position: 'absolute',
                                                                bottom: '10%', padding: '8px 0', borderRadius: '0 0 5px 5px'
                                                            }}
                                                        >
                                                            Add To Cart
                                                        </Typography>
                                                    </Box>


                                                    <CardContent sx={{ outline: 0 }}>
                                                        <Typography gutterBottom variant="h6" component="div" className="product-name">
                                                            {v.name}
                                                        </Typography>
                                                        <Box sx={{ display: 'flex', columnGap: 2, mb: 1, alignItems: 'center' }}>

                                                            <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500, color: '#DB4444' }}>
                                                                {v.price}
                                                            </Typography>


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
                                                        </Box>



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

                                                        <Box sx={{ display: "flex", gap: "10px", mt: 1 }}>
                                                            {

                                                                v?.colors?.map((v1) => (

                                                                    <label key={v1} style={{ cursor: "pointer" }}>
                                                                        <input
                                                                            type="radio"
                                                                            name={`color-${v.id}`} // 👈 unique per product
                                                                            value={v1}
                                                                            checked={(selectedColors[v.id] || v.colors[0]) === v1}
                                                                            onChange={() =>
                                                                                setSelectedColors((prev) => ({
                                                                                    ...prev,
                                                                                    [v.id]: v1, // 👈 store per product
                                                                                }))
                                                                            }
                                                                            style={{ display: "none" }}
                                                                        />

                                                                        <span
                                                                            style={{
                                                                                width: "15px",
                                                                                height: "15px",
                                                                                borderRadius: "50%",
                                                                                backgroundColor: v1,
                                                                                display: "inline-block",
                                                                                border: "1px solid #ccc",
                                                                                outline:
                                                                                    (selectedColors[v.id] || v.colors[0]) === v1
                                                                                        ? "1px solid black"
                                                                                        : "none",
                                                                                outlineOffset: "3px",
                                                                            }}
                                                                        />
                                                                    </label>
                                                                ))
                                                            }
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
                                                                    lg: '25px'
                                                                }
                                                            }} />
                                                        </IconButton>
                                                        <IconButton sx={{ bgcolor: 'white', boxShadow: 1 }} size="small">
                                                            <RemoveRedEyeOutlinedIcon sx={{
                                                                fontSize: {
                                                                    xs: '12px',
                                                                    sm: '18px',
                                                                    md: '20px',
                                                                    lg: '25px'
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

                        <a href="#" className="my-custome-button" style={{ margin: '0px auto 0 auto' }}>View More Product</a>
                    </div>
                </section>


                {/* new arraival fecutre section */}
                <ThemeProvider theme={theme}>
                    <section id="newarrival">
                        <div className="container" >
                            <Box className="todays-title">
                                <i className="fa-solid fa-square"></i>
                                <Typography sx={{ fontWeight: 600 }}>Featured</Typography>
                            </Box>

                            <Box sx={{ position: 'relative', mt: 2 }}>
                                <Typography variant="h4" sx={{ fontWeight: 600 }} className="title">New Arrival</Typography>
                            </Box>

                            <Box sx={{ marginTop: { xs: '20px', sm: '45px' } }} >
                                <Grid container columnSpacing={{ xs: 10, sm: 0, md: 4, lg: 8, xl: 4 }} rowSpacing={4} alignItems="stretch" sx={{ height: "100%" }} >

                                    <Grid size={{ xs: 12, md: 6, lg: 6 }} sx={{ overflow: 'hidden' }}>
                                        <Box className='newarrival-grid-box' >
                                            <img src="../../../public/assets/images/newarrival/playstation.png" alt="" className="firstimg-new" />

                                            <div className="newarrival-grid-box-text">
                                                <Typography variant="h5" sx={{
                                                    fontWeight: 600, fontSize: {
                                                        xs: '16px', sm: '20px', md: '24px'
                                                    }
                                                }}>PlayStation 5</Typography>
                                                <Typography variant="body2" sx={{
                                                    fontWeight: '400', maxWidth: '242px', margin: { xs: "5px 0", sm: "6px 0", md: '16px 0' },
                                                    fontSize: {
                                                        xs: '12px',
                                                        sm: "12px",
                                                        md: '16px'
                                                    }
                                                }}>Black and White version of the PS5 coming out on sale.</Typography>
                                                <a href="#">Shop Now</a>
                                            </div>
                                        </Box>
                                    </Grid>


                                    <Grid size={{ sx: 12, md: 6 }} container display="flex" >
                                        <Grid size={12} >
                                            <Box className='newarrival-grid-box' sx={{ display: 'flex', paddingRight: '0' }}>
                                                <img src="../../../public/assets/images/newarrival/womens-collection.png" alt="" style={{ marginLeft: "auto" }} />

                                                <div className="newarrival-grid-box-text">
                                                    <Typography variant="h5" sx={{
                                                        fontWeight: 600, fontSize: {
                                                            xs: '16px', sm: '20px', md: '24px'
                                                        }
                                                    }}>Women’s Collections</Typography>
                                                    <Typography variant="body2" sx={{
                                                        fontWeight: '400', maxWidth: '242px', margin: { xs: "5px 0", sm: "6px 0", md: '16px 0' },
                                                        fontSize: {
                                                            xs: '12px',
                                                            sm: "12px",
                                                            md: '16px'
                                                        }
                                                    }}>Featured woman collections that give you another vibe.</Typography>
                                                    <a href="#">Shop Now</a>
                                                </div>
                                            </Box>
                                        </Grid>


                                        <Grid container columnSpacing={{ xs: 0, sm: 2, lg: 4, xl: 4 }} display="flex" size={12}>
                                            <Grid size={{ xs: 12, sm: 6 }} >
                                                <Box className='newarrival-grid-box lastbox'>
                                                    <img src="../../../public/assets/images/newarrival/speaker.png" alt="" />

                                                    <div className="newarrival-grid-box-text">
                                                        <Typography variant="h5" sx={{
                                                            fontWeight: 600, fontSize: {
                                                                xs: '16px', sm: '20px', md: '24px'
                                                            }
                                                        }}>Speakers</Typography>
                                                        <Typography variant="body2" sx={{
                                                            fontWeight: '400', maxWidth: '242px', margin: { xs: "5px 0", sm: "6px 0", md: '16px 0' },
                                                            fontSize: {
                                                                xs: '12px',
                                                                sm: "12px",
                                                                md: '16px'
                                                            }
                                                        }}>Amazon wireless speakers</Typography>
                                                        <a href="#">Shop Now</a>
                                                    </div>
                                                </Box>
                                            </Grid>

                                            <Grid size={{ xs: 12, sm: 6 }} >
                                                <Box className='newarrival-grid-box lastbox'>
                                                    <img src="../../../public/assets/images/newarrival/perfume.png" alt="" />

                                                    <div className="newarrival-grid-box-text">
                                                        <Typography variant="h5" sx={{
                                                            fontWeight: 600, fontSize: {
                                                                xs: '16px', sm: '20px', md: '24px'
                                                            }
                                                        }}>Perfume</Typography>
                                                        <Typography variant="body2" sx={{
                                                            fontWeight: '400', maxWidth: '242px', margin: { xs: "5px 0", sm: "6px 0", md: '16px 0' },
                                                            fontSize: {
                                                                xs: '12px',
                                                                sm: "12px",
                                                                md: '16px'
                                                            }
                                                        }}>GUCCI INTENSE OUD EDP</Typography>
                                                        <a href="#">Shop Now</a>
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
                            <Grid container columnSpacing={{ xs: 3, sm: 5, md: 10 }} rowSpacing={5}
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



            </main >

        </>
    )
}

export default Homepage;
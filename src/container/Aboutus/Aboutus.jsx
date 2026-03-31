
import React, { useEffect, useState } from "react";
import { Box, Breadcrumbs, Card, CardActions, CardContent, CardMedia, createTheme, Grid, IconButton, ThemeProvider, Typography } from "@mui/material";
import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import { Link } from "react-router-dom";

function Aboutus() {

    const [team, setTeam] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/team")
            .then(response => response.json())
            .then(data => setTeam(data))
    }, [])

    console.log(team)

    const theme = createTheme({
        breakpoints: {
            values: {
                xs: 0,
                sm: 576,
                md: 768,
                lg: 1200,
                xl: 1536,
            },
        },
    });

    return (
        <main>
            {/* our story */}
            <section id="ourstory">
                <div className="container-fluid px-0">

                    <div className="container">
                        <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">\
                            <Link
                                underline="hover"
                                color="error"
                                href="/material-ui/getting-started/installation/"
                            >
                                Home
                            </Link>
                            <Typography sx={{ color: 'text.primary' }} className="breadcrumbs-typo">About</Typography>
                        </Breadcrumbs>
                    </div>


                    <Grid
                        container
                        alignItems="center"
                        sx={{
                            mt: 5,
                            pl: {
                                xs: 2,
                                sm: 3,
                                md: 6,
                                lg: "calc((100% - 1140px)/2)",
                                xl: "calc((100% - 1320px)/2)"
                            },
                            pr: {
                                xs: 2,
                                sm: 0
                            }
                        }}
                        spacing={{ sm: 4, md: 5, lg: 15 }}
                    >

                        <Grid size={6} >


                            <Typography variant="h3" className="ourstory-title" sx={{ fontWeight: "bold" }}>Our Story</Typography>

                            <Typography variant="subtitle1" className="ourstory-summary" sx={{ mt: { xs: 3, md: 3, lg: 5, xl: 1 }, textAlign: "justify" }}>
                                Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region.
                            </Typography>

                            <Typography variant="subtitle1" className="ourstory-summary" sx={{ mt: 3 }}>
                                Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.
                            </Typography>

                        </Grid>

                        <Grid size={6} className="image-aboutfirst">
                            <img src="../../../public/assets/images/aboutus/ourstory.png" alt="" width='100%' />
                        </Grid>
                    </Grid>

                </div>
            </section>

            {/* second-about */}
            <ThemeProvider theme={theme}>
                <section className="second-about">
                    <div className="container" >
                        <Grid
                            container
                            columnSpacing={{ xs: 20, sm: 6, md: 3, lg: 5 }} rowSpacing={{ xs: 4, sm: 4, md: 6 }}
                            sx={{
                                justifyContent: {
                                    xs: 'center'
                                },

                            }}
                        >
                            <Grid size={{ xs: 10, sm: 6, md: 3, lg: 3 }} sx={{ textAlign: 'center' }} >
                                <Box className="siteinfo-card">
                                    <Box className="siteinfo-box">
                                        <IconButton aria-label="deleLocalShipping" className="siteinfo-iconebtn">
                                            <OtherHousesOutlinedIcon className="siteinfo-icone" />
                                        </IconButton>
                                    </Box>
                                    <Typography variant="h4" className="siteinfo-typography1" sx={{ fontWeight: '600' }}>10.5k </Typography>
                                    <Typography variant="h6" className="siteinfo-typography2" sx={{ fontWeight: '500', mt: 1 }}>Sallers active our site</Typography>
                                </Box>

                            </Grid>

                            <Grid size={{ xs: 10, sm: 6, md: 3, lg: 3 }} sx={{ textAlign: 'center' }} >
                                <Box className="siteinfo-card">
                                    <Box className="siteinfo-box">
                                        <IconButton aria-label="deleLocalShipping" className="siteinfo-iconebtn">
                                            <AttachMoneyOutlinedIcon className="siteinfo-icone" />
                                        </IconButton>
                                    </Box>
                                    <Typography variant="h4" className="siteinfo-typography1" sx={{ fontWeight: '600' }}>33k </Typography>
                                    <Typography variant="h6" className="siteinfo-typography2" sx={{ fontWeight: '500', mt: 1 }}>Mopnthly Produduct Sale</Typography>
                                </Box>
                            </Grid>

                            <Grid size={{ xs: 10, sm: 6, md: 3, lg: 3 }} sx={{ textAlign: 'center' }} >
                                <Box className="siteinfo-card">
                                    <Box className="siteinfo-box">
                                        <IconButton aria-label="deleLocalShipping" className="siteinfo-iconebtn">
                                            <ShoppingBagOutlinedIcon className="siteinfo-icone" />
                                        </IconButton>
                                    </Box>
                                    <Typography variant="h4" className="siteinfo-typography1" sx={{ fontWeight: '600' }}>45.5k </Typography>
                                    <Typography variant="h6" className="siteinfo-typography2" sx={{ fontWeight: '500', mt: 1 }}>Customer active in our site</Typography>
                                </Box>

                            </Grid>

                            <Grid size={{ xs: 10, sm: 6, md: 3, lg: 3 }} sx={{ textAlign: 'center' }} >
                                <Box className="siteinfo-card">
                                    <Box className="siteinfo-box">
                                        <IconButton aria-label="deleLocalShipping" className="siteinfo-iconebtn">
                                            <MonetizationOnOutlinedIcon className="siteinfo-icone" />
                                        </IconButton>
                                    </Box>
                                    <Typography variant="h4" className="siteinfo-typography1" sx={{ fontWeight: '600' }}>25k </Typography>
                                    <Typography variant="h6" className="siteinfo-typography2" sx={{ fontWeight: '500', mt: 1 }}>Anual gross sale in our site</Typography>
                                </Box>

                            </Grid>
                        </Grid>
                    </div>
                </section>
            </ThemeProvider>

            {/* our-team section */}
            <section id="our-team">
                <div className="container">

                    <div className="teamcards">
                        <Swiper
                            // slidesPerView={3}
                            // spaceBetween={30}
                            className="mySwiper"
                            modules={[Pagination]}
                            pagination={{
                                clickable: true,
                            }}
                            breakpoints={{
                                320: {
                                    slidesPerView: 2,
                                    spaceBetween: 10,
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
                                    slidesPerView: 3,
                                    spaceBetween: 30,
                                },
                            }}
                        >
                            {
                                team.map((v, i) => (
                                    <SwiperSlide>
                                        <Card sx={{ position: 'relative', boxShadow: 0 }}>
                                            <Box
                                                className="carttop"
                                                sx={{
                                                    bgcolor: '#eef0f3', display: 'flex', justifyContent: 'center',
                                                    alignItems: 'center', padding: '20px  0 0', borderRadius: 1, position: 'relative'
                                                }}>
                                                <CardMedia
                                                    component="img"
                                                    // height="391"
                                                    className="our-cardimg"
                                                    sx={{ objectFit: "contain" }}
                                                    image={v.img}
                                                    title="green iguana"
                                                />
                                            </Box>


                                            <CardContent sx={{ outline: 0 }}>
                                                <Typography gutterBottom variant="h4" component="div" className="teamname">
                                                    {v.name}
                                                </Typography>
                                                <Box sx={{ display: 'flex', columnGap: 2 }}>
                                                    <Typography variant="h6" sx={{ fontWeight: 500 }} className="teamrole">
                                                        {v.role}
                                                    </Typography>
                                                </Box>
                                            </CardContent>

                                            <CardActions sx={{
                                                pt: 0,
                                                '& ..css-3c4hsc-MuiCardActions-root>:not(style)~:not(style)': {
                                                    ml: 0
                                                }
                                            }}>
                                                <IconButton size="small" >
                                                    <InstagramIcon className="about-socialicone" />
                                                </IconButton>
                                                <IconButton size="small" className="a-ione">
                                                    <TwitterIcon className="about-socialicone" />
                                                </IconButton>
                                                <IconButton size="small" className="">
                                                    <LinkedInIcon className="about-socialicone" />
                                                </IconButton>
                                            </CardActions>
                                        </Card>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </div>
                </div>
            </section>


            {/* why choose us */}
            <section id="about-whychoosus" >
                <div className="container whycoose-con">
                    <Grid container columnSpacing={10} rowSpacing={{ xs: 5 }}
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
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ textAlign: 'center' }}>
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
        </main>
    )
}

export default Aboutus;
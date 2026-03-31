import React from "react"
import '../../../public/assets/style/headerfooter.css'
import Grid from '@mui/material/Grid';
import { Box, createTheme, ListItemText, MenuItem, MenuList, TextField, ThemeProvider, Typography } from "@mui/material";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import CopyrightIcon from '@mui/icons-material/Copyright';
import { GrFacebookOption } from "react-icons/gr";
import { LuTwitter } from "react-icons/lu";
import { FiInstagram } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";


function Footer() {

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

    return (
        <>
         <ThemeProvider theme={theme}>
            <div className="footer">
                <div className="container">
                    <Grid container
                        sx={{
                            
                            justifyContent:{
                                lg:"space-between"
                            } 
                        }}
                        rowSpacing={4}
                    >
                        <Grid size={{xs:12,sm: 6, md: 4, lg: 3 }} >
                            <Box className="my-cutome-grid first-box">
                                <Typography variant="h6" sx={{ fontWeight: 600, fontSize:{xs:'20px', sm:'24px'} }}>Exclusive</Typography>
                                <Typography variant="subtitle1" sx={{ mt: 1, mb: 1, fontWeight: 500, fontSize:{xs:'16px', sm:'20px'} }}>Subscribe</Typography>
                                <Typography variant="subtitle1" sx={{ fontSize: {xs:'13px', sm:'16px'} }}>Get 10% off your first order</Typography>

                                <form className="footerform" style={{ marginTop: '16px',maxWidth:'250px' }}>
                                    <input type="email" name="subemali" id="subemail" placeholder="Enter Email" />
                                    <SendOutlinedIcon sx={{ mr: 1, my: 0.5 }} />
                                </form>
                            </Box>
                        </Grid>

                        <Grid size={{xs:12,sm: 6, md: 4, lg: 2 }} >
                            <Box className="my-cutome-grid support-box">
                                <Typography variant="h6" className="my-custome-title">Support</Typography>
                                <Typography className="my-custome-text">111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh.</Typography>
                                <Typography className="my-custome-text">exclusive@gmail.com</Typography>
                                <Typography className="my-custome-text">+88015-88888-9999</Typography>
                            </Box>
                        </Grid>

                        <Grid size={{xs:12,sm: 6, md: 4, lg: 2 }} >
                            <Box className="my-cutome-grid account-box">
                                <Typography variant="h6" className="my-custome-title">Account</Typography>
                                <MenuList >
                                    <MenuItem className="my-custome-list">
                                        <ListItemText>My Account</ListItemText>
                                    </MenuItem>
                                    <MenuItem className="my-custome-list">
                                        <ListItemText>Login / Register</ListItemText>
                                    </MenuItem>
                                    <MenuItem className="my-custome-list">
                                        <ListItemText>Cart</ListItemText>
                                    </MenuItem>
                                    <MenuItem className="my-custome-list">
                                        <ListItemText>Wishlist</ListItemText>
                                    </MenuItem>
                                    <MenuItem className="my-custome-list">
                                        <ListItemText>Shop</ListItemText>
                                    </MenuItem>
                                </MenuList>
                            </Box>
                        </Grid>

                        <Grid size={{xs:12,sm: 6, md: 4, lg: 2 }} >
                            <Box className="my-cutome-grid ">
                                <Typography variant="h6" className="my-custome-title">Quick Link</Typography>
                                <MenuList >
                                    <MenuItem className="my-custome-list">
                                        <ListItemText>Privacy Policy</ListItemText>
                                    </MenuItem>
                                    <MenuItem className="my-custome-list">
                                        <ListItemText>Terms Of Use</ListItemText>
                                    </MenuItem>
                                    <MenuItem className="my-custome-list">
                                        <ListItemText>FAQ</ListItemText>
                                    </MenuItem>
                                    <MenuItem className="my-custome-list">
                                        <ListItemText>Contact</ListItemText>
                                    </MenuItem>
                                </MenuList>
                            </Box>
                        </Grid>

                        <Grid size={{xs:12, sm: 9,md: 4, lg: 3 }} >
                            <Box className="my-cutome-grid last-box">
                                <Typography variant="h6" className="my-custome-title">Download App</Typography>
                                <Typography variant="subtitle2" className="my-custome-text">Save $3 with App New User Only</Typography>
                                <Grid container columnSpacing={{ xs:2,sm: 3, xl: 0 }} sx={{ mt: 1 }}>
                                    <Grid size={{xs:3,sm:3,md:4}} className="qrcode">
                                        <img src="../../../public/assets/images/Qr_Code.png" alt="qrcode" />
                                    </Grid>
                                    <Grid size={{xs:4,sm:4,md:8}} >
                                        <img src="../../../public/assets/images/GooglePlay.png" alt="qrcode" />
                                        <img src="../../../public/assets/images/download-appstore.png" alt="qrcode" />
                                    </Grid>
                                </Grid>

                                <Box sx={{display:'flex',columnGap:'35px',mt:3}}>
                                    <GrFacebookOption className="footer-social" />
                                    <LuTwitter  className="footer-social" />
                                    <FiInstagram  className="footer-social" />
                                    <FaLinkedinIn className="footer-social" />
                                </Box>
                            </Box>
                        </Grid>

                      
                    </Grid>

                    <Box sx={{ display: 'flex', mt: 8, justifyContent: 'center', color: '#a5a1a1', gap: '0 5px', alignItems: 'center' }}>
                        <CopyrightIcon sx={{
                            fontSize:{
                                xs:'20px',
                                sm:'24px'
                            }
                        }}/><Typography sx={{
                            fontSize:{
                                xs:'12px',
                                sm:'16px'
                            }
                        }}>Copyright Rimel 2022. All right reserved</Typography>
                    </Box>
                </div>
            </div>
        </ThemeProvider>
        </>
    )
}

export default Footer;
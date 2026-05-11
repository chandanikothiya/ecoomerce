import React, { useState } from "react"
import '../../../public/assets/style/headerfooter.css'
import Grid from '@mui/material/Grid';
import { Box, createTheme, Divider, IconButton, ListItemText, MenuItem, MenuList, TextField, ThemeProvider, Typography } from "@mui/material";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import CopyrightIcon from '@mui/icons-material/Copyright';
import { GrFacebookOption } from "react-icons/gr";
import { LuTwitter } from "react-icons/lu";
import { FiInstagram } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useAddsubscribeMutation } from "../../redux/api/subscribe.api";
import { useDispatch } from "react-redux";
import { setalert } from "../../redux/slice/Alert.slice";


function Footer() {

    const [email, setEmail] = useState();
    const dispatch = useDispatch();

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

    const [addsubscribeemail] = useAddsubscribeMutation();

    const handlesubscribe = async (e) => {
        e.preventDefault();
        console.log("ok", email)

        const response = await addsubscribeemail({ email })
        console.log("ok", response)

        if (response?.data?.success) {
            dispatch(setalert({ text: response.data.message, variant: 'success' }))
        } else if (response.error) {
            dispatch(setalert({ text: response.error.data?.message, variant: 'error' }))
        }
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <div className="footer">
                    <div className="container">
                        <Grid container
                            sx={{

                                justifyContent: {
                                    lg: "space-between"
                                },
                                "& .MuiListItemText-primary": {
                                    fontSize: {
                                        xs: '14px',
                                        sm: '15px',
                                        md: '16px'
                                    }
                                },
                                // "& .MuiMenuItem-root":{
                                //     height: { xs:10, sm: 36, md: 40 }
                                // },

                            }}
                            rowSpacing={{ xs: 5, sm: 4 }}
                        >
                            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} >
                                <Box className="my-cutome-grid first-box">
                                    <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '20px', sm: '24px' } }}>Exclusive</Typography>
                                    <Typography variant="subtitle1" sx={{ mt: 1, mb: 1, fontWeight: 500, fontSize: { xs: '16px', sm: '20px' } }}>Subscribe</Typography>
                                    <Typography variant="subtitle1" sx={{ fontSize: { xs: '13px', sm: '16px' } }}>Get 10% off your first order</Typography>

                                    <form className="footerform" style={{ marginTop: '16px', maxWidth: '250px' }} onSubmit={handlesubscribe}>
                                        <input type="email" name="subemali" id="subemail" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />
                                        <IconButton sx={{ p: 0 }} type="submit"><SendOutlinedIcon sx={{ color: 'white', my: 0.5 }} /></IconButton>
                                    </form>
                                </Box>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }} >
                                <Box className="my-cutome-grid support-box">
                                    <Typography variant="h6" className="my-custome-title">Support</Typography>
                                    <Typography className="my-custome-text">111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh.</Typography>
                                    <Typography className="my-custome-text">exclusive@gmail.com</Typography>
                                    <Typography className="my-custome-text">+88015-88888-9999</Typography>
                                </Box>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }} >
                                <Box className="my-cutome-grid account-box">
                                    <Typography variant="h6" className="my-custome-title">Account</Typography>
                                    <MenuList sx={{
                                        "& .MuiMenuItem-root": {
                                            minHeight: { xs: 32, sm: 32, md: 36 },
                                            py: 0.5,
                                        }

                                    }}>
                                        <MenuItem className="my-custome-list">
                                            <ListItemText><NavLink to="/myaccount">My Account</NavLink></ListItemText>
                                        </MenuItem>
                                        <MenuItem className="my-custome-list">
                                            <ListItemText><NavLink to="/signup">Login / Register</NavLink></ListItemText>
                                        </MenuItem>
                                        <MenuItem className="my-custome-list">
                                            <ListItemText><NavLink to="/cart">Cart</NavLink></ListItemText>
                                        </MenuItem>
                                        <MenuItem className="my-custome-list">
                                            <ListItemText><NavLink to="/wishlist">Wishlist</NavLink></ListItemText>
                                        </MenuItem>
                                        <MenuItem className="my-custome-list">
                                            <ListItemText><NavLink to="/allproduct?type=allproduct">Shop</NavLink></ListItemText>
                                        </MenuItem>
                                    </MenuList>
                                </Box>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }} sx={{ marginTop: { xs: '-10px', sm: 0 } }}>
                                <Box className="my-cutome-grid ">

                                    <Typography variant="h6" className="my-custome-title">Quick Link</Typography>
                                    <MenuList sx={{
                                        "& .MuiMenuItem-root": {
                                            minHeight: { xs: 32, sm: 32, md: 36 },
                                            py: 0.5,
                                        }

                                    }}>
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

                            <Grid size={{ xs: 12, sm: 9, md: 4, lg: 3 }} sx={{ marginTop: { xs: '-10px', sm: 0 } }}>
                                <Box className="my-cutome-grid last-box">
                                    <Typography variant="h6" className="my-custome-title">Download App</Typography>
                                    <Typography variant="subtitle2" className="my-custome-text">Save $3 with App New User Only</Typography>
                                    <Grid container columnSpacing={{ xs: 2, sm: 2, md: 3, xl: 0 }} sx={{ mt: 1 }}>
                                        <Grid size={{ xs: 3, sm: 2.8, md: 4 }} className="qrcode">
                                            <img src="../../../public/assets/images/Qr_Code.png" alt="qrcode" />
                                        </Grid>
                                        <Grid size={{ xs: 4, sm: 4, md: 8 }} >
                                            <img src="../../../public/assets/images/GooglePlay.png" alt="qrcode" />
                                            <img src="../../../public/assets/images/download-appstore.png" alt="qrcode" />
                                        </Grid>
                                    </Grid>

                                    <Box sx={{ display: 'flex', columnGap: '35px', mt: 3 }}>
                                        <GrFacebookOption className="footer-social" />
                                        <LuTwitter className="footer-social" />
                                        <FiInstagram className="footer-social" />
                                        <FaLinkedinIn className="footer-social" />
                                    </Box>
                                </Box>
                            </Grid>


                        </Grid>
                    </div>
                    <Divider sx={{ mt: 5, maxWidth: '100%', color: '#999696' }} />


                    <Box className="container" sx={{ display: 'flex', mt: { xs: 3, sm: 3 }, justifyContent: 'center', color: '#a5a1a1', gap: '0 5px', alignItems: 'center' }}>
                        <CopyrightIcon sx={{
                            fontSize: {
                                xs: '20px',
                                sm: '24px'
                            }
                        }} /><Typography sx={{
                            fontSize: {
                                xs: '12px',
                                sm: '16px',
                                md: '18px', color: '#999696'
                            }
                        }}>Copyright Rimel 2022. All right reserved</Typography>
                    </Box>

                </div>
            </ThemeProvider>
        </>
    )
}

export default Footer;
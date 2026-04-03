import { Box, Breadcrumbs, Button, createTheme, Grid, TextField, ThemeProvider, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { Link } from "react-router-dom";

function Contact() {

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

    const theme1 = useTheme();
  const isMobile = useMediaQuery("(max-width:320px)");


    return (
        <main>
            <ThemeProvider theme={theme}>
                <section id="contactus">
                    <div className="container">
                        {/* <Typography><span style={{ color: 'grey' }}>Home / </span> Contact</Typography> */}

                        <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">

                            <Link
                                underline="hover"
                                color="error"
                                href="/material-ui/getting-started/installation/"
                            >
                                Home
                            </Link>
                            <Typography sx={{ color: 'text.primary' }} className="breadcrumbs-typo">Contact</Typography>
                        </Breadcrumbs>


                        <Grid container sx={{ padding:{ xs:'10px',sm:'40px'},paddingTop:{xs:0,sm:0,md:'10px',lg:'40px'}}} columnSpacing={{ md: 5, lg: 10, xl: 20 }} >
                            <Grid size={{ md: 4, lg: 4 }} sx={{ mt:{ xs:3,md:5} }}>
                                <Box sx={{ mb: 5 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                        <CallOutlinedIcon sx={{ bgcolor: '#DB4444', borderRadius: '50%', p: 1, color: 'white', fontSize: '40px' }} />
                                        <Typography sx={{ fontSize: '20px' }} className="conatct-left-title">Call To Us</Typography>
                                    </Box>
                                    <Typography className="contact-custome-text">We are available 24/7, 7 days a week.</Typography>
                                    <Typography className="contact-custome-text">Phone: +8801611112222</Typography>
                                </Box>

                                <hr />

                                <Box sx={{ mt: 5 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                        <EmailOutlinedIcon sx={{ bgcolor: '#DB4444', borderRadius: '50%', p: 1, color: 'white', fontSize: '40px' }} />
                                        <Typography sx={{ fontSize: '20px' }} className="conatct-left-title">Write To US</Typography>
                                    </Box>
                                    <Typography className="contact-custome-text">Fill out our form and we will contact you within 24 hours.</Typography>
                                    <Typography className="contact-custome-text">Emails: customer@exclusive.com</Typography>
                                    <Typography className="contact-custome-text">Emails: support@exclusive.com</Typography>
                                </Box>

                            </Grid>

                            <Grid container size={{ xs:12,md: 8, lg: 8 }} id="contact-grid" sx={{ mt: 5,"& .MuiGrid-container":{padding:0}}}>
                                <form style={{ width: "100%" }}>
                                    <Grid container size={12} spacing={3} >
                                        <Grid size={{ xs: 12, sm: 12,md:4 }}>
                                            <TextField
                                                id="name"
                                                name="name"
                                                label="Your Name"
                                                variant="filled"
                                                InputProps={{ disableUnderline: true }}
                                                className="contactus-textfiled"
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm:12,md:4 }}>
                                            <TextField
                                                id="email"
                                                name="email"
                                                label="Your Email"
                                                variant="filled" InputProps={{ disableUnderline: true }}
                                                className="contactus-textfiled"
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm:12,md:4 }}>
                                            <TextField
                                                id="phone"
                                                name="phone"
                                                label="Your Phone"
                                                variant="filled"
                                                InputProps={{ disableUnderline: true }}
                                                className="contactus-textfiled"
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid size={12} sx={{ mt: 5 }}>
                                        <TextField
                                            id="message"
                                            name="message"
                                            label="Your Message"
                                            multiline
                                            rows={isMobile ? 5 : 8}
                                            variant="filled" InputProps={{ disableUnderline: true }}
                                            className="contactus-textfiled"
                                        />
                                    </Grid>

                                    <button type="submit" className="my-custome-button">Send Message</button>

                                </form>
                            </Grid>
                        </Grid>
                    </div>
                </section>
            </ThemeProvider>
        </main>
    )
}

export default Contact;
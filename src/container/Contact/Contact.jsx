import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

function Contact() {
    return (
        <main>
            <section id="contactus">
                <div className="container">
                    <Typography><span style={{ color: 'grey' }}>Home / </span> Contact</Typography>

                    <Grid container sx={{ padding: '40px' }} spacing={20}>
                        <Grid size={4} sx={{ mt: 5 }}>
                            <Box sx={{ mb: 5 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                    <CallOutlinedIcon sx={{ bgcolor: '#DB4444', borderRadius: '50%', p: 1, color: 'white', fontSize: '40px' }} />
                                    <Typography sx={{ fontSize: '20px' }}>Call To Us</Typography>
                                </Box>
                                <Typography className="contact-custome-text">We are available 24/7, 7 days a week.</Typography>
                                <Typography className="contact-custome-text">Phone: +8801611112222</Typography>
                            </Box>

                            <hr />

                            <Box sx={{ mt: 5 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                    <EmailOutlinedIcon sx={{ bgcolor: '#DB4444', borderRadius: '50%', p: 1, color: 'white', fontSize: '40px' }} />
                                    <Typography sx={{ fontSize: '20px' }}>Write To US</Typography>
                                </Box>
                                <Typography className="contact-custome-text">Fill out our form and we will contact you within 24 hours.</Typography>
                                <Typography className="contact-custome-text">Emails: customer@exclusive.com</Typography>
                                <Typography className="contact-custome-text">Emails: support@exclusive.com</Typography>
                            </Box>

                        </Grid>

                        <Grid container size={8} sx={{ mt: 5 }}>
                            <form style={{width:"100%"}}>
                                <Grid container size={12} spacing={3}>
                                    <Grid size={4} >
                                        <TextField
                                            id="name"
                                            name="name"
                                            label="Your Name"
                                            variant="filled"
                                            InputProps={{ disableUnderline: true }}
                                            className="contactus-textfiled"
                                        />
                                    </Grid>
                                    <Grid size={4}>
                                        <TextField
                                            id="email"
                                            name="email"
                                            label="Your Email"
                                            variant="filled" InputProps={{ disableUnderline: true }}
                                           className="contactus-textfiled"
                                        />
                                    </Grid>
                                    <Grid size={4}>
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
                                <Grid size={12} sx={{mt:5}}>
                                    <TextField
                                        id="message"
                                        name="message"
                                        label="Your Message"
                                        multiline
                                        rows={8}
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
        </main>
    )
}

export default Contact;
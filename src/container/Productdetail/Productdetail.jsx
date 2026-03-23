import React from "react";
import { Box, Button, Grid, Radio, Rating, Typography } from "@mui/material";
import { PiLineVerticalThin } from "react-icons/pi";

function Productdetail() {

    const [selectedValue, setSelectedValue] = React.useState('a');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const availableColors = [
        { value: '#E07575', label: 'Black' },
        { value: '#8aa8d4', label: 'White' },
    ];

    const Size = ['XS', 'S', 'M', 'L', 'XL']

    return (
        <main>
            <section id="product-detail">
                <div className="container">
                    <Typography><span style={{ color: 'grey' }}>Home / Gaming / </span>Havic HV G-92 Gamepad</Typography>

                    <Grid container sx={{ mt: 10 }} spacing={6}>
                        <Grid size={7} container spacing={3} alignItems="stretch">
                            <Grid size={3} container direction='column' spacing={2} >
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

                            <Box sx={{ mt: 3, display: "flex", alignItems: 'center' }}>
                                <Typography sx={{ fontSize: '20px' }}>Colours :</Typography>
                                <div>
                                    {
                                        availableColors.map((v) => (
                                            <Radio
                                                checked={selectedValue === 'a'}
                                                onChange={handleChange}
                                                value="a"
                                                name="radio-buttons"
                                                inputProps={{ 'aria-label': 'A' }}
                                                sx={{
                                                    color: v.value, // Unchecked
                                                    '&.Mui-checked': {
                                                        color: v.value, // Checked
                                                    },
                                                    padding: '5px'
                                                }}
                                            />
                                        ))
                                    }

                                </div>
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
                            <Box sx={{ display: 'flex',mt:2 }}>
                                <Box className='countbox'>
                                    <button className="count-btn" style={{borderRight:'solid 1px black'}}>-</button>
                                    <Typography sx={{padding:'0 20px'}}>1</Typography>
                                     <button className="count-btn" style={{borderLeft:'solid 1px black'}}>+</button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>

                </div>
            </section>
        </main>
    )
}

export default Productdetail
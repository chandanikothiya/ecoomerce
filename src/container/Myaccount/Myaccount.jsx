import React, { useEffect, useState } from "react";
import { Box, Breadcrumbs, Collapse, Divider, FormControl, FormLabel, Grid, List, ListItemButton, Menu, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ListItemText from '@mui/material/ListItemText';

function Myaccount() {

    const [menuname, setMenuname] = useState('My Profile');

    const handlechnage = (event) => {
        setMenuname(event.target.innerText)
    }

    console.log(menuname)

    useEffect(() => {
        console.log("Updated menuname:", menuname);
    }, [menuname]);

    return (
        <main>
            <section id="myaccount">
                <div className="container">
                    {/* <Typography><span style={{ color: 'grey' }}>Home / </span> My Account</Typography> */}

                    <Box sx={{display:'flex',justifyContent:'space-between'}}>
                        <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">
                            <Link underline="hover" color="inherit" href="/">
                                MUI
                            </Link>
                            <Link
                                underline="hover"
                                color="error"
                                href="/material-ui/getting-started/installation/"
                            >
                                Core
                            </Link>
                            <Typography sx={{ color: 'text.primary' }}>My account</Typography>
                        </Breadcrumbs>

                        <Breadcrumbs sx={{'& .MuiBreadcrumbs-separator':{display:'none'}}} aria-label="breadcrumb" className="breadcrumbs">
                            <Typography sx={{ color: 'text.primary' }}>Welcome</Typography>
                            <Typography sx={{ color: '#DB4444',ml:1 }}>Md Rimel</Typography>
                        </Breadcrumbs>
                    </Box>

                    <Grid container sx={{ mt: 5 }}>
                        <Grid size={4}>
                            <List component="nav" sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                {/* Main Item */}
                                <Box>
                                    <ListItemButton className="menu">
                                        <ListItemText primary="Manage My Account" />
                                    </ListItemButton>
                                    {/* Submenu Item (Always Visible) */}
                                    <Collapse in={true} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            <ListItemButton sx={{ pl: 4 }} className="submenu" onClick={handlechnage}>
                                                <ListItemText primary="My Profile" sx={{ color: menuname === 'My Profile' ? '#DB4444' : '' }} />
                                            </ListItemButton>
                                            <ListItemButton sx={{ pl: 4 }} className="submenu" onClick={handlechnage}>
                                                <ListItemText primary="Address Book" sx={{ color: menuname === 'Address Book' ? '#DB4444' : '' }} />
                                            </ListItemButton>
                                            <ListItemButton sx={{ pl: 4 }} className="submenu" onClick={handlechnage}>
                                                <ListItemText primary="My Payment Options" sx={{ color: menuname === 'My Payment Options' ? '#DB4444' : '' }} />
                                            </ListItemButton>
                                        </List>
                                    </Collapse>
                                </Box>

                                <Box>
                                    <ListItemButton className="menu">
                                        <ListItemText primary="My Orders" />
                                    </ListItemButton>
                                    {/* Submenu Item (Always Visible) */}
                                    <Collapse in={true} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            <ListItemButton sx={{ pl: 4 }} className="submenu" onClick={handlechnage}>
                                                <ListItemText primary="My Returns" sx={{ color: menuname === 'My Returns' ? '#DB4444' : '' }} />
                                            </ListItemButton>
                                            <ListItemButton sx={{ pl: 4 }} className="submenu" onClick={handlechnage}>
                                                <ListItemText primary="My Cancellations" sx={{ color: menuname === 'My Cancellations' ? '#DB4444' : '' }} />
                                            </ListItemButton>
                                        </List>
                                    </Collapse>
                                </Box>

                                <Box>
                                    <ListItemButton className="menu" to='/wishlist'>
                                        <ListItemText primary="My Wishlist" />
                                    </ListItemButton>
                                </Box>

                                <Box>
                                    <ListItemButton className="menu" to='/cart'>
                                        <ListItemText primary="My Cart" />
                                    </ListItemButton>
                                </Box>

                            </List>

                        </Grid>

                        <Grid size={8} sx={{ padding: '65px 0' }}>
                            <Typography variant="h6" sx={{ color: '#DB4444', fontWeight: '600' }}>Edit Your Profile</Typography>
                            <form>
                                <Grid container size={12} columnSpacing={6}>
                                    <Grid size={6}>
                                        <FormControl className="myaccount-textfiled">
                                            <FormLabel htmlFor="component-outlined" className="input-label">First Name</FormLabel>
                                            <TextField
                                                id="fname"
                                                name="fname"
                                                value='md'
                                                variant="filled"
                                                InputProps={{ disableUnderline: true }}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid size={6}>
                                        <FormControl className="myaccount-textfiled">
                                            <FormLabel htmlFor="component-outlined" className="input-label">Last Name</FormLabel>
                                            <TextField
                                                id="lname"
                                                name="lname"
                                                value='Rimple'
                                                variant="filled"
                                                InputProps={{ disableUnderline: true }}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid size={6}>
                                        <FormControl className="myaccount-textfiled">
                                            <FormLabel htmlFor="component-outlined" className="input-label">Email</FormLabel>
                                            <TextField
                                                id="email"
                                                name="email"
                                                value='rimel1111@gmail.com'
                                                variant="filled"
                                                InputProps={{ disableUnderline: true }}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid size={6}>
                                        <FormControl className="myaccount-textfiled">
                                            <FormLabel htmlFor="component-outlined" className="input-label">Address</FormLabel>
                                            <TextField
                                                id="address"
                                                name="address"
                                                value='Kingston, 5236, United State@gmail.com'
                                                variant="filled"
                                                InputProps={{ disableUnderline: true }}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid size={12}>
                                        <FormControl className="myaccount-textfiled">
                                            <FormLabel htmlFor="component-outlined" className="input-label" sx={{ pb: 0 }}>Password Change</FormLabel>
                                            <TextField
                                                id="address"
                                                name="address"
                                                label="Current Passwod"
                                                variant="filled"
                                                InputProps={{ disableUnderline: true }}

                                            />

                                            <TextField
                                                id="address"
                                                name="address"
                                                label="New Passwod"
                                                variant="filled"
                                                InputProps={{ disableUnderline: true }}
                                                className="passwodtext-filed"
                                            />

                                            <TextField
                                                id="address"
                                                name="address"
                                                label="Confirm New Passwod"
                                                variant="filled"
                                                InputProps={{ disableUnderline: true }}
                                                className="passwodtext-filed"
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid container size={12} justifyContent='end' spacing={0} sx={{ mt: 3 }}>
                                        <Grid size={2}>
                                            <button className="cancel-btn my-custome-button">Cancel</button>
                                        </Grid>

                                        <Grid size={3}>
                                            <button className="my-custome-button">save Change</button>
                                        </Grid>
                                    </Grid>

                                </Grid>
                            </form>
                        </Grid>
                    </Grid>
                </div>
            </section>
        </main>
    )
}

export default Myaccount;
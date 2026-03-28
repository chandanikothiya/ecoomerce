import React, { useEffect, useState } from "react";
import { Box, Breadcrumbs, Button, Collapse, Divider, Drawer, FormControl, FormLabel, Grid, List, ListItemButton, Menu, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';

function Myaccount() {

    const [menuname, setMenuname] = useState('My Profile');

    const handlechnage = (event) => {
        setMenuname(event.target.innerText)
    }

    console.log(menuname)

    useEffect(() => {
        console.log("Updated menuname:", menuname);
    }, [menuname]);

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    return (
        <main>
            <section id="myaccount">
                <div className="container">
                    {/* <Typography><span style={{ color: 'grey' }}>Home / </span> My Account</Typography> */}
                    <Box sx={{ display: 'flex', gap: '0px', alignItems: 'center' }}>
                        <Box className="myaccount-drawer">
                            <Button onClick={toggleDrawer(true)} sx={{ pl: 0 }}><MenuIcon /></Button>
                            <Drawer open={open} onClose={toggleDrawer(false)}>
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
                            </Drawer>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: "100%" }}>
                            <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">
                                <Link underlin e="hover" color="inherit" href="/">
                                    Home
                                </Link>
                                <Typography sx={{ color: 'text.primary' }}>My account</Typography>
                            </Breadcrumbs>

                            <Breadcrumbs sx={{ '& .MuiBreadcrumbs-separator': { display: 'none' } }} aria-label="breadcrumb" className="breadcrumbs">
                                <Typography sx={{ color: 'text.primary' }}>Welcome</Typography>
                                <Typography sx={{ color: '#DB4444', ml: 1 }}>Md Rimel</Typography>
                            </Breadcrumbs>
                        </Box>
                    </Box>




                    <Grid container sx={{ mt: { xs: 4, sm: 2, md: 5 } }} spacing={{ sm: 4, md: 7, lg: 0 }} justifyContent='center'>
                        <Grid size={{ sm: 4, md: 3, lg: 3 }} className="accpont-menu">
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


                        <Grid size={{ xs: 11, sm: 10, md: 8, lg: 8 }}
                            sx={{
                                padding: {
                                    sm: '20px 0',
                                    md: '65px 0'
                                }
                                , ml: {
                                    xs: 0,
                                    md: 3,
                                    lg: 0
                                }
                            }}>
                            <Typography variant="h6" sx={{ color: '#DB4444', fontWeight: '600' }}>Edit Your Profile</Typography>
                            <form className="my-form">
                                <Grid container size={12} columnSpacing={{ xs: 3, sm: 3, md: 6 }}>
                                    <Grid size={{ xs: 12, sm: 6, md: 6 }}>
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

                                    <Grid size={{ xs: 12, sm: 6, md: 6 }}>
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

                                    <Grid size={{ xs: 12, sm: 6, md: 6 }}>
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

                                    <Grid size={{ xs: 12, sm: 6, md: 6 }}>
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

                                    <Grid container size={12} spacing={0} sx={{ mt: 3, justifyContent: { xs: 'center', md: 'end' } }}>
                                        <Grid size={{ md: 3, lg: 2 }}>
                                            <button className="cancel-btn my-custome-button">Cancel</button>
                                        </Grid>

                                        <Grid size={{ md: 4, lg: 3 }}>
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
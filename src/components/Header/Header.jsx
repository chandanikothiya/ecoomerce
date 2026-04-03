import React, { useEffect, useState } from "react";
import '../../../public/assets/style/headerfooter.css'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import { NavLink, useLocation } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import { FiUser } from "react-icons/fi";
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import { TbLogout2 } from "react-icons/tb";
import { Box } from "@mui/material";


function Header() {

    const [anchorEll, setAnchorEll] = React.useState(null);
    const openl = Boolean(anchorEll);
    const handleClickl = (event) => {
        setAnchorEll(event.currentTarget);
    };
    const handleClosel = () => {
        setAnchorEll(null);
    };

    const [openMenu, setOpenMenu] = useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [showAccount, setShowAccount] = useState(false);

    useEffect(() => {
        if (openMenu) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [openMenu]);


    const location = useLocation();

    useEffect(() => {
        setOpenMenu(false);
        setShowAccount(false);
    }, [location]);

    return (
        <>
            <header id="header">
                <div className="top-header">
                    <div className="container first-header">
                        <p className="topheader-p">Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <a href="#">ShopNow</a></p>
                        <div>
                            <Button
                                id="demo-positioned-button "
                                aria-controls={openl ? 'demo-positioned-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={openl ? 'true' : undefined}
                                onClick={handleClickl}
                                sx={{ color: 'white' }}
                                className="topheader-lang"
                                endIcon={<KeyboardArrowDownIcon />}
                            >
                                LANG
                            </Button>
                            <Menu
                                id="demo-positioned-menu"
                                aria-labelledby="demo-positioned-button"
                                anchorEl={anchorEll}
                                open={openl}
                                onClose={handleClosel}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                sx={{ mt: 4 }}
                            >
                                <MenuItem onClick={handleClosel}>English</MenuItem>
                                <MenuItem onClick={handleClosel}>Hindi</MenuItem>
                            </Menu>
                        </div>
                    </div>
                </div>

                <div className="second-header">
                    <div className="container">
                        <div className="menus-header">

                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton className="menuicone" onClick={() => setOpenMenu(true)}>
                                    <MenuIcon sx={{ p: 0, mr: 1 }} />
                                </IconButton>
                                <h4 className="logo"><NavLink to="/">Exclusive</NavLink></h4>
                            </Box>

                            <div className="menus">
                                <ul>
                                    <li><NavLink to="/">Home</NavLink></li>
                                    <li><NavLink to="/contact">Contact</NavLink></li>
                                    <li><NavLink to="/about">About</NavLink></li>
                                    <li><NavLink to="/signup">Sign Up</NavLink></li>
                                </ul>
                            </div>

                            <div className="search_cart_wishlist">
                                <form>
                                    <div className="seachbox">
                                        <input type="text" name="seacrh" id="seacrh" placeholder="What are you looking for?" />
                                        <SearchOutlinedIcon className="header-icone" />
                                    </div>
                                </form>

                                <FavoriteBorderIcon className="header-icone" />

                                <ShoppingCartOutlinedIcon className="header-icone" />

                                <Tooltip title="Account settings" className="account-menu1">
                                    <IconButton
                                        onClick={handleClick}
                                        size="small"
                                        aria-controls={open ? 'account-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}

                                    >
                                        <Avatar sx={{ width: 32, height: 32, bgcolor: open ? '#DB4444' : 'white', color: open ? 'white' : 'black' }} className="profile-avtar"><FiUser /></Avatar>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    anchorEl={anchorEl}
                                    id="account-menu"
                                    open={open}
                                    onClose={handleClose}
                                    onClick={handleClose}
                                    slotProps={{
                                        paper: {
                                            elevation: 0,
                                            sx: {
                                                bgcolor: "rgba(0, 0, 0, 0.69)",   // ✅ FIX HERE
                                                backdropFilter: "blur(10px)", // optional glass effect
                                                boxShadow: "none",
                                                color: "white",
                                                mt: 1,
                                                zIndex: 9999,   // ✅ higher than navbar
                                            }
                                        },
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <MenuItem onClick={handleClose}>
                                        <ListItemIcon sx={{ fontSize: '25px', color: 'white' }}>
                                            <FiUser />
                                        </ListItemIcon><NavLink to="/myaccount" style={{ color: "white" }}>Manage My Account</NavLink>
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <ListItemIcon sx={{ color: 'white' }}>
                                            <LocalMallOutlinedIcon />
                                        </ListItemIcon>
                                        My Order
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={handleClose}>
                                        <ListItemIcon sx={{ color: 'white' }}>
                                            <CancelOutlinedIcon />
                                        </ListItemIcon>
                                        My Cancellation
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <ListItemIcon sx={{ color: 'white' }}>
                                            <StarBorderRoundedIcon />
                                        </ListItemIcon>
                                        My Review
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <ListItemIcon sx={{ fontSize: '25px', color: 'white' }}>
                                            <TbLogout2 />
                                        </ListItemIcon>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </div>


                        </div>
                    </div>
                    <div className={`responsive-menu ${openMenu ? "active" : ""}`}>
                        <IconButton onClick={() => setOpenMenu(false)}>
                            <CloseIcon />
                        </IconButton>
                        <ul>
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/contact">Contact</NavLink></li>
                            <li><NavLink to="/about">About</NavLink></li>
                            <li><NavLink to="/signup">Sign Up</NavLink></li>
                        </ul>
                        <IconButton onClick={() => setShowAccount(!showAccount)} className="account-menu2">
                            <Avatar>
                                <FiUser />
                            </Avatar>
                        </IconButton>
                        <ul>
                            {showAccount && (
                                <div className="mobile-dropdown">
                                    <li><NavLink to="/myaccount">Manage My Account</NavLink></li>
                                    <li>My Order</li>
                                    <li>My Cancellation</li>
                                    <li>My Review</li>
                                    <li>Logout</li>
                                </div>
                            )}
                        </ul>
                    </div>
                </div>

            </header >


        </>
    )
}

export default Header;
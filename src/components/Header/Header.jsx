import React, { useEffect, useRef, useState } from "react";
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
import { Badge, badgeClasses, Box } from "@mui/material";
import { useLogoutMutation } from "../../redux/api/user.api";
import { useDispatch } from "react-redux";
import { setalert } from "../../redux/slice/Alert.slice";
import { useGetCartQuery } from "../../redux/api/cart.api";
import { styled } from '@mui/material/styles';
import { useGetWishlistQuery } from "../../redux/api/wishlist.api";


function Header() {

    const [anchorEll, setAnchorEll] = React.useState(null);
    const [showBudget, setShowBudget] = useState(false);
    const [showwBudget, setShowwBudget] = useState(false);
    const prevcounter = useRef(0)
    const prevcounterwishlist = useRef(0)
    const dispatch = useDispatch();
    const openl = Boolean(anchorEll);
    const handleClickl = (event) => {
        setAnchorEll(event.currentTarget);
    };
    const handleClosel = () => {
        setAnchorEll(null);
    };

    let id;

    if (localStorage.getItem('loginid')) {
        id = localStorage.getItem('loginid');
        console.log(id)
    }

    //cart count
    const { data, error, isLoading } = useGetCartQuery(id, {
        skip: !id,
    });
    console.log({ data, error, isLoading })

    console.log(data, data?.body?.products?.length)
    const cartcount = data?.body?.products?.length || 0;
    console.log(cartcount)

    //wishlit count
    const { data: wdata, error: werror, isLoading: wisLoading } = useGetWishlistQuery(id, {
        skip: !id,
    });
    //console.log(wdata)
    const wishlistcount = wdata?.body?.products?.length || 0;
    console.log(wishlistcount)

    const [logout] = useLogoutMutation();


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


    const handleLogout = async () => {

        const id = localStorage.getItem('loginid')
        console.log("id", id)


        if (id) {
            const response = await logout({ _id: id });
            console.log("response", response)
            if (response?.data?.success) {
                dispatch(setalert({ text: response.data.message, variant: 'success' }))
                localStorage.removeItem('loginid')
            } else {
                dispatch(setalert({ text: response.data.message, variant: 'error' }))
            }
        }
    }

    const location = useLocation();

    useEffect(() => {
        setOpenMenu(false);
        setShowAccount(false);
    }, [location]);

    const NotificationBadge = styled(Badge)`
        & .${badgeClasses.badge} {
            top: -12px;
            right: -6px;
            min-width: 15px;
            height: 15px;
            font-size:8px;
        }

         @media (min-width: 768px) {
    & .${badgeClasses.badge} {
      min-width: 20px;
      height: 20px;
    }
  }
        
        `;

    useEffect(() => {
        if (wishlistcount > prevcounterwishlist.current) {
            setShowwBudget(true);
        }

        prevcounterwishlist.current = wishlistcount;

        if (cartcount > prevcounter.current) {
            setShowBudget(true);
        }

        prevcounter.current = cartcount;

    }, [cartcount, wishlistcount]);

    useEffect(() => {
        if (location.pathname === '/cart') {
            setShowBudget(false)
        } else if (location.pathname === '/wishlist') {
            setShowwBudget(false);
        }
    }, [location.pathname])
    console.log(showBudget)

    return (
        <>
            <header id="header">
                <div className="top-header">
                    <div className="container first-header">
                        <p className="topheader-p">Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <a href="#">ShopNow</a></p>
                        <div>
                            <Button
                                id="demo-positioned-button"
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
                                    {
                                        localStorage.getItem('loginid') ?
                                            <li ><NavLink onClick={handleLogout}>SignOut</NavLink></li> :
                                            <li><NavLink to="/signup" >Sign Up</NavLink></li>
                                    }

                                </ul>
                            </div>

                            <div className="search_cart_wishlist">
                                <form>
                                    <div className="seachbox">
                                        <input type="text" name="seacrh" id="seacrh" placeholder="What are you looking for?" />
                                        <SearchOutlinedIcon className="header-icone" />
                                    </div>
                                </form>

                                <NavLink to="/wishlist">
                                    <IconButton>
                                        <FavoriteBorderIcon className="header-icone" />
                                        {wishlistcount > 0 && showwBudget && (<NotificationBadge badgeContent={wishlistcount} color="error" overlap="circular" />)}
                                    </IconButton>
                                </NavLink>

                                <NavLink to="/cart">
                                    <IconButton >
                                        <ShoppingCartOutlinedIcon className="header-icone" />
                                        {cartcount > 0 && showBudget && (<NotificationBadge badgeContent={cartcount} color="error" overlap="circular" />)}
                                    </IconButton>
                                </NavLink>



                                {
                                    localStorage.getItem('loginid') &&

                                    <>
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
                                            <MenuItem onClick={() => {
                                                handleClose();
                                                handleLogout();
                                            }}>
                                                <ListItemIcon sx={{ fontSize: '25px', color: 'white' }}>
                                                    <TbLogout2 />
                                                </ListItemIcon>
                                                Logout
                                            </MenuItem>
                                        </Menu>
                                    </>
                                }

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
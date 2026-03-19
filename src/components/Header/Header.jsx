import React from "react";
import '../../../public/assets/style/headerfooter.css'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function Header() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <header className="header">
                <div className="top-header">
                    <div className="container first-header">
                        <p>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <a href="#">ShopNow</a></p>
                        <div>
                            <Button
                                id="demo-positioned-button"
                                aria-controls={open ? 'demo-positioned-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                sx={{ color: 'white' }}
                                endIcon={<KeyboardArrowDownIcon />}
                            >
                                LANG
                            </Button>
                            <Menu
                                id="demo-positioned-menu"
                                aria-labelledby="demo-positioned-button"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
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
                                <MenuItem onClick={handleClose}>English</MenuItem>
                                <MenuItem onClick={handleClose}>Hindi</MenuItem>
                            </Menu>
                        </div>
                    </div>
                </div>

                <div className="second-header">
                    <div className="container">
                        <div className="menus-header">
                            <h4>Exclusive</h4>

                            <div className="menus">
                                <ul>
                                    <li>Home</li>
                                    <li>Contact</li>
                                    <li>About</li>
                                    <li>Sign Up</li>
                                </ul>
                            </div>

                            <div className="search_cart_wishlist">
                                <form>
                                    <div className="seachbox">
                                        <input type="text" name="seacrh" id="seacrh" placeholder="What are you looking for?" />
                                        <SearchOutlinedIcon />
                                    </div>
                                </form>

                                <FavoriteBorderIcon />

                                <ShoppingCartOutlinedIcon />
                            </div>

                        </div>



                    </div>
                </div>
            </header>


        </>
    )
}

export default Header;
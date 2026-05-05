import React from "react";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead';
import { BiSolidCategory } from "react-icons/bi";
import { BiSolidDashboard } from "react-icons/bi";
import { FaBoxOpen } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

// DESKTOP ONLY: Standard permanent mini-variant drawer
const DesktopDrawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}));

function Layout({ children }) {
    const theme = useTheme();
    const isMobile = useMediaQuery("(max-width:768px)");
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

    const menulist = [
        { label: "Dashboard", icone: <BiSolidDashboard style={{fontSize:'20px'}}/>, to: "/admin/dashboard" },
        { label: "Category", icone: <BiSolidCategory style={{fontSize:'20px'}}/>, to: "/admin/category" },
        { label: "Products", icone: <FaBoxOpen style={{fontSize:'20px'}}/>, to: "/admin/product" },
        { label: "Contact/Messages", icone: <ContactMailIcon />, to: "/admin/contact" },
        { label: "Order", icone: <MarkChatReadIcon />, to: "/admin/order" },
    ];

    // Reusable Menu List to avoid code duplication
    const drawerContent = (
        <>
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {menulist.map((v, index) => (
                    <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            component={NavLink}
                            to={v.to}
                            onClick={isMobile ? handleDrawerClose : null} // Auto-close drawer on mobile after clicking a link
                            sx={[
                                {
                                    minHeight: 48,
                                    px: 2.5,
                                    '&.active': {
                                        backgroundColor: 'rgba(219, 68, 68, 0.1)',
                                        color: '#DB4444',
                                        '& .MuiListItemIcon-root': { color: '#DB4444' },
                                    }
                                },
                                !isMobile && (open
                                    ? { justifyContent: 'initial' }
                                    : { justifyContent: 'center' }
                                ),
                            ]}
                        >
                            <ListItemIcon
                                sx={[
                                    { minWidth: 0, justifyContent: 'center' },
                                    !isMobile && (open ? { mr: 3 } : { mr: 'auto' }),
                                ]}
                            >
                                {v.icone}
                            </ListItemIcon>
                            <ListItemText
                                primary={v.label}
                                sx={[
                                    !isMobile && (open ? { opacity: 1 } : { opacity: 0 }),
                                ]}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <AppBar position="fixed" open={open} sx={{ backgroundColor: '#DB4444' }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={[
                            { marginRight: 5 },
                            open && !isMobile && { display: 'none' }, // Hide hamburger only on Desktop when open
                        ]}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Mini variant drawer
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* 1. DESKTOP DRAWER: Hidden on mobile, renders the pure Mini-Variant logic */}
            {!isMobile && (
                <DesktopDrawer variant="permanent" open={open}>
                    {drawerContent}
                </DesktopDrawer>
            )}

            {/* 2. MOBILE DRAWER: Hidden on desktop, acts as a clean overlay */}
            {isMobile && (
                <MuiDrawer
                    variant="temporary"
                    open={open}
                    onClose={handleDrawerClose}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawerContent}
                </MuiDrawer>
            )}

            <Box component="main" sx={{ flexGrow: 1, width: '100%',mt:{xs:-8,sm:-5} }}>
                {/* CRITICAL: DrawerHeader acts as a spacer so your content doesn't hide behind the Top App Bar */}
                {/* <DrawerHeader /> */}
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
}

export default Layout;
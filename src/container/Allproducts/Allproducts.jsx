import React, { useState } from "react";
import { useGetProductQuery } from "../../redux/api/product.api";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { Box, Card, CardActions, CardContent, CardMedia, createTheme, Grid, IconButton, Rating, Stack, ThemeProvider, Typography, useTheme } from "@mui/material";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAddWishlistMutation, useDeleteWishlistMutation, useGetWishlistQuery } from "../../redux/api/wishlist.api";
import { IMG_URL } from "../../utility/url";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAddCartMutation } from "../../redux/api/cart.api";
import { useDispatch } from "react-redux";
import { setalert } from "../../redux/slice/Alert.slice";
import { useGetCategoryQuery } from "../../redux/api/category.api";


function Allproducts() {

    const [selectedColors, setSelectedColors] = useState({});
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let uid;
    if (localStorage.getItem('loginid')) {
        uid = localStorage.getItem('loginid');
        console.log(uid)
    }

    const { data: pdata,
        error: perror,
        isLoading: pisLoading } = useGetProductQuery();
    console.log("productdata", pdata?.data, pdata?.data[0]?.variants)

    // const { data: catdata, error: caterror, isLoading: catislaoding } = useGetCategoryQuery();
    // catdata?.data?.map((v) => {console.log("catid", v.name.toLowerCase() === searchParams.get('search').toLowerCase())});
    // const catid = catdata?.data?.filter((v) => v.name.toLowerCase().includes(searchParams.get('search').toLowerCase()));
    // console.log("catid", catid, searchParams.get('search'), catdata);

    // const filterproduct = pdata?.data?.filter((v) => catid.some(v1 => v1._id === v.category_id))
    // console.log("filterproduct",filterproduct)

    //const produxt = pdata?.data?.filter((v) => v.category)

    const { data: wdata, error: werror, isLoading: wisLoading, refetch } = useGetWishlistQuery(uid, {
        skip: !uid,
    });

    const theme1 = useTheme();

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

    const handlepProduct = (id) => {
        navigate(`/productdetail/${id}`)
    }

    const [addcart] = useAddCartMutation();
    const [addwishlist] = useAddWishlistMutation();
    const [deletewishlist] = useDeleteWishlistMutation();

    const handleCartClick = async (id, vid) => {
        console.log("click", id, vid)

        if (localStorage.getItem('loginid')) {
            const response = await addcart({ user_id: localStorage.getItem('loginid'), product_id: id, variant_id: vid })
            console.log("cartres", response)
            if (response?.data?.success) {
                dispatch(setalert({ text: response.data.message, variant: 'success' }))
            } else if (response.error) {
                dispatch(setalert({ text: response.error.data?.message, variant: 'error' }))
            }
        } else {
            navigate('/signup')
        }

    }

    const handleWishlistClick = async (id, vid) => {
        console.log("click", id, vid)
        if (localStorage.getItem('loginid')) {


            const response = await addwishlist({ user_id: localStorage.getItem('loginid'), product_id: id, variant_id: vid })
            console.log("cartres", response)
            if (response.data.success) {
                dispatch(setalert({ text: response.data.message, variant: 'success' }))
            } else {
                dispatch(setalert({ text: response.data.message, variant: 'error' }))
            }


            refetch();
            // setInwhishlist(false)
        } else {
            navigate('/signup')
        }
    }

    const handledelWishlistClick = async (id, vid) => {
        if (localStorage.getItem('loginid')) {
            deletewishlist({ variant_id: vid, id: localStorage.getItem('loginid') })
            refetch();
            // setInwhishlist(false)
        } else {
            navigate('/signup')
        }
    }


    return (
        <>
            <ThemeProvider theme={theme}>
                <section id="allproducts">
                    <div className="container" >
                        <Box className="sub-title">
                            <i className="fa-solid fa-square"></i>
                            <Typography sx={{ fontWeight: 600 }} className="subtitle">Search Products</Typography>
                        </Box>

                        <Box sx={{ position: 'relative', mt: 2 }}>
                            {/* <Typography variant="h4" sx={{ fontWeight: 600 }} className="title">Explore Our Products</Typography> */}

                            <Box sx={{ width: '100%', marginTop: { xs: '20px', sm: '23px', md: '35px' } }}>
                                <Grid container columnSpacing={{ xs: 1, sm: 3, lg: 4 }} rowSpacing={{ xs: 2, sm: 5 }}
                                    sx={{
                                        marginTop: { xs: '20px', sm: '23px', md: '35px' }
                                    }}>
                                    {pdata?.data?.map((v, i) => {
                                        const validVariants = v?.variants?.filter(
                                            (x) => x?.color && x.color.trim() !== ""
                                        );
                                        let selectedVariant;

                                        if (validVariants.length > 0) {
                                            const selectedColor =
                                                selectedColors[v._id] || validVariants[0]?.color;

                                            selectedVariant = v?.variants?.find(
                                                (x) => x.color === selectedColor
                                            );
                                        } else {
                                            // ✅ fallback when no color exists
                                            selectedVariant = v?.variants?.[0];
                                        }
                                        console.log(selectedVariant)
                                        // const r = v.rating.reduce((acc, v) => acc + v, 0)
                                        // console.log(r)
                                        // const rate = r / v.rating.length;
                                        // console.log(rate)

                                        const wishlistselect = uid ? (wdata?.body?.products?.filter((v1) => v1?.product_id === v._id)) : ''
                                        console.log("wishlistselect", wishlistselect);

                                        const isInWishlist = uid ? wishlistselect?.some(
                                            (v1) => v1.variant_id === selectedVariant._id
                                        ) : '';
                                        console.log("wishlistvarient", isInWishlist)
                                        return (
                                            <Grid size={{ xs: 6, sm: 4, md: 3, lg: 3 }}>
                                                <Card sx={{ maxWidth: '100%', position: 'relative', boxShadow: 0 }}>
                                                    <Box
                                                        className="carttop"
                                                        sx={{
                                                            bgcolor: '#eef0f3', display: 'flex', justifyContent: 'center',
                                                            alignItems: 'center', padding: '20px  0 0', borderRadius: 1,
                                                            height: {
                                                                xs: '120px',
                                                                sm: '160px',
                                                                lg: '250px'
                                                            }, position: 'relative'
                                                        }}>
                                                        {
                                                            (() => {


                                                                return (
                                                                    <>
                                                                        <CardMedia
                                                                            component="img"
                                                                            className="cardimg"
                                                                            sx={{ objectFit: "contain", mixBlendMode: "multiply" }}
                                                                            image={
                                                                                selectedVariant?.images?.[0]
                                                                                    ? IMG_URL + selectedVariant.images[0]
                                                                                    : IMG_URL + v.variants[0]?.images?.[0]
                                                                            }
                                                                            title={v.name}
                                                                            onClick={() => handlepProduct(v._id)}
                                                                            alt={v.name}
                                                                        />


                                                                        <Typography
                                                                            className="addcart"
                                                                            sx={{
                                                                                bgcolor: 'black', width: "100%", color: 'white', display: 'none',
                                                                                textAlign: 'center', justifySelf: 'flex-end', position: 'absolute',
                                                                                bottom: '10%', padding: { xs: '3px 0', md: '8px 0' }, borderRadius: '0 0 5px 5px',
                                                                                fontSize: {
                                                                                    xs: '12px',
                                                                                    sm: '14px',
                                                                                    md: '16px'
                                                                                },
                                                                                cursor: 'default'
                                                                            }}
                                                                            onClick={(e) => handleCartClick(v?._id, selectedVariant?._id)}
                                                                        >
                                                                            <ShoppingCartOutlinedIcon /> Add To Cart
                                                                        </Typography>
                                                                    </>

                                                                );
                                                            })()}



                                                    </Box>


                                                    <CardContent sx={{ outline: 0, pl: 0, pb: '0px !important' }}>
                                                        <Typography gutterBottom variant="h6" component="div" className="product-name">
                                                            {v.name}
                                                        </Typography>
                                                        <Box sx={{ display: 'flex', columnGap: 2, mb: 1, alignItems: 'center', flexWrap: { xs: 'wrap', md: 'nowrap' } }}>

                                                            <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500, color: '#DB4444' }}>
                                                                ₹{v.price}
                                                            </Typography>


                                                            <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}>
                                                                <Typography sx={{ color: '#FFAD33' }}>
                                                                    <Stack spacing={1}>
                                                                        <Rating name="half-rating" defaultValue={4} precision={0.5} sx={{
                                                                            fontSize: {
                                                                                xs: '15px',
                                                                                sm: '18px',
                                                                                md: '20px'
                                                                            }
                                                                        }} />
                                                                    </Stack>
                                                                </Typography>
                                                                <Typography sx={{
                                                                    color: 'grey', fontWeight: '600',
                                                                    fontSize: {
                                                                        xs: '12px',
                                                                        sm: '16px'
                                                                    }
                                                                }}>
                                                                    (4)
                                                                    {/* {`(${r})`} */}
                                                                </Typography>
                                                            </Box>
                                                        </Box>



                                                        {
                                                            v.new ?
                                                                <Box sx={{
                                                                    bgcolor: '#00FF66', color: 'white', width: 'fit-content', padding: {
                                                                        xs: '2px 8px',
                                                                        sm: '2px 12px'
                                                                    }, borderRadius: 1, position: 'absolute', top: '3%', left: '4%'
                                                                }}>
                                                                    <Typography variant="body2" sx={{
                                                                        fontSize: {
                                                                            xs: '10px',
                                                                            sm: '12px',
                                                                            md: '14px'
                                                                        }
                                                                    }}>NEW</Typography>
                                                                </Box> :
                                                                ""
                                                        }

                                                        {
                                                            v?.variants?.length > 1 && (() => {

                                                                const validVariants = v?.variants?.filter(
                                                                    (x) => x?.color && x.color.trim() !== ""
                                                                )

                                                                const selectedColor =
                                                                    selectedColors[v._id] || validVariants[0]?.color;


                                                                // const selectedColor =
                                                                //     selectedColors[v._id] ??
                                                                //     v?.variants?.find((x) => x?.color && x.color.trim() !== "")?.color;
                                                                // console.log(selectedColor, selectedColors)
                                                                // const [selectedColors, setSelectedColors] = useState({});

                                                                return (
                                                                    <Box sx={{ display: "flex", gap: "10px", mt: 1, pl: '5px' }}>
                                                                        {
                                                                            validVariants?.map((v1) => {
                                                                                if (!v1?.color || v1.color.trim() === "") return null;


                                                                                return (
                                                                                    <label key={v1.color} style={{ cursor: "pointer" }}>
                                                                                        <input
                                                                                            type="radio"
                                                                                            name={`color-${v._id}`}
                                                                                            value={v1.color}
                                                                                            checked={selectedColor === v1.color}
                                                                                            onChange={() =>
                                                                                                setSelectedColors((prev) => ({
                                                                                                    ...prev,
                                                                                                    [v._id]: v1.color,
                                                                                                }))
                                                                                            }
                                                                                            style={{ display: "none" }}
                                                                                        />

                                                                                        <span
                                                                                            style={{
                                                                                                width: "15px",
                                                                                                height: "15px",
                                                                                                borderRadius: "50%",
                                                                                                backgroundColor: v1.color,
                                                                                                display: "inline-block",
                                                                                                border: "1px solid #ccc",
                                                                                                outline:
                                                                                                    selectedColor === v1.color
                                                                                                        ? "2px solid black"
                                                                                                        : "none",
                                                                                                outlineOffset: "3px",
                                                                                            }}
                                                                                        />
                                                                                    </label>
                                                                                )
                                                                            }

                                                                            )
                                                                        }
                                                                    </Box>
                                                                )
                                                            })()
                                                        }
                                                    </CardContent>



                                                    <CardActions
                                                        sx={{
                                                            flexDirection: 'column', rowGap: 1, position: "absolute", top: '5px', right: '0',
                                                            '& .MuiIconButton-root': {
                                                                marginLeft: 0
                                                            }
                                                        }}
                                                    >
                                                        {isInWishlist ?
                                                            <IconButton sx={{ bgcolor: 'white', boxShadow: 1, }} size="small" onClick={(e) => { handledelWishlistClick(v?._id, selectedVariant?._id) }}>
                                                                <FavoriteIcon sx={{
                                                                    fontSize: {
                                                                        xs: '12px',
                                                                        sm: '18px',
                                                                        md: '20px',
                                                                        lg: '22px'
                                                                    },
                                                                    color: 'red'
                                                                }} />
                                                            </IconButton>
                                                            : <IconButton sx={{ bgcolor: 'white', boxShadow: 1, }} size="small" onClick={(e) => { handleWishlistClick(v?._id, selectedVariant?._id) }}>
                                                                <FavoriteBorderIcon sx={{
                                                                    fontSize: {
                                                                        xs: '12px',
                                                                        sm: '18px',
                                                                        md: '20px',
                                                                        lg: '22px'
                                                                    }
                                                                }} />
                                                            </IconButton>
                                                        }
                                                        <IconButton sx={{ bgcolor: 'white', boxShadow: 1 }} size="small" onClick={() => handlepProduct(v._id)}>
                                                            <RemoveRedEyeOutlinedIcon sx={{
                                                                fontSize: {
                                                                    xs: '12px',
                                                                    sm: '18px',
                                                                    md: '20px',
                                                                    lg: '22px'
                                                                }
                                                            }} />
                                                        </IconButton>
                                                    </CardActions>
                                                </Card>
                                            </Grid>
                                        )
                                    })}
                                </Grid>
                            </Box>
                        </Box>                
                    </div>
                </section>
            </ThemeProvider>
        </>
    )
}

export default Allproducts;
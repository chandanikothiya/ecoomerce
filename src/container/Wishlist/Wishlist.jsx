import { Box, Card, CardActions, CardContent, CardMedia, createTheme, Grid, IconButton, Rating, Stack, ThemeProvider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { useDeleteWishlistMutation, useGetWishlistQuery } from "../../redux/api/wishlist.api";
import { useAddCartMutation, useGetCartQuery } from "../../redux/api/cart.api";
import { useGetProductQuery } from "../../redux/api/product.api";
import { IMG_URL } from "../../utility/url";
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';
import { useNavigate } from "react-router-dom";

function Wishlist() {

    const [allproducts, setAllproducts] = useState([]);
    const [cartproducts, setCartproducts] = useState([]);
    const [selectedColors, setSelectedColors] = useState({});
    const navigate = useNavigate();

    let uid;
    if (localStorage.getItem('loginid')) {
        uid = localStorage.getItem('loginid');
        console.log(uid)
    }

    // const id = localStorage.getItem('loginid');
    // console.log("cdata", id)


    const { data, error, isLoading } = useGetWishlistQuery(uid);
    console.log(data?.body)

    const { data: pdata, error: perror, isLoading: pisloading } = useGetProductQuery();
    console.log(pdata?.data)

    const [deletewishlist] = useDeleteWishlistMutation();
    const [addcart] = useAddCartMutation();


    const wlistdata = data?.body?.products?.map((v1) => {
        const product = pdata?.data?.find(
            (p) => p._id === v1.product_id
        );

        if (!product) return null;

        const variant = product?.variants?.find(
            (v) => v._id === v1.variant_id
        );

        return {
            ...product,
            selectedVariant: variant || product?.variants?.[0],

        };
    })

    console.log("variant", wlistdata)

    useEffect(() => {
        fetch("http://localhost:3000/products")
            .then(response => response.json())
            .then(data => setAllproducts(data))

        fetch("http://localhost:3000/wishlist")
            .then(response => response.json())
            .then(data => setCartproducts(data))
    }, [])

    // console.log(allproducts, cartproducts)

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

    const handledeletewishlist = (v) => {
        console.log('ok', v)

        deletewishlist({ variant_id: v?.selectedVariant?._id, id: localStorage.getItem('loginid') })
    }

    const handlecartaddd = async () => {
        if (localStorage.getItem('loginid')) {

            //  data?.body?.products?.map(async (v) => {
            //     const response = await addcart({ user_id: localStorage.getItem('loginid'), product_id: v.product_id, variant_id: v.variant_id })
            //     console.log('response',response)
            //     if (response.error) {
            //         console.log("error", response)
            //     }
            // })

            for (const v of data?.body?.products || []) {
                const response = await addcart({ user_id: localStorage.getItem('loginid'), product_id: v.product_id, variant_id: v.variant_id })
                console.log('response', response)
                if (response.error) {
                    console.log("error", response)
                }
            }

            navigate('/cart');
        }
    }

    const handlepProduct = (id) => {
        navigate(`/productdetail/${id}`)
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <main>

                    {
                        wlistdata?.length > 0 ?

                            <section id="cart wishlist">
                                <div className="container">
                                    <Box className="cart-title">
                                        <Typography variant="h5" sx={{ fontWeight: 600 }} className="title">Wishlist ({cartproducts.length})</Typography>
                                        <a href="#" className="my-custome-button wishlist-btn" onClick={handlecartaddd}>Move All To Bag</a>
                                    </Box>
                                    <Grid container sx={{ mt: 3 }} spacing={{ xs: 1, sm: 3, lg: 4 }}>
                                        {
                                            wlistdata?.map((v) => {
                                                // const cp = allproducts.find((v1) => v1.id === v.product_id);
                                                // console.log(cp)
                                                console.log(v)

                                                const discount = ((v.price - v.selectedVariant.flashPrice) / v.price) * 100;

                                                console.log(v)
                                                if (wlistdata) {
                                                    return (
                                                        <Grid size={{ xs: 6, sm: 4, md: 3, lg: 3 }}>
                                                            <Card sx={{ maxWidth: 310, position: 'relative', boxShadow: 0 }}>
                                                                <Box
                                                                    className="carttop"
                                                                    sx={{
                                                                        bgcolor: '#eef0f3', display: 'flex', justifyContent: 'center',
                                                                        alignItems: 'center', padding: '20px  0 0', borderRadius: 1,
                                                                        height: {
                                                                            xs: '120px',
                                                                            sm: '160px',
                                                                            lg: '250px'
                                                                        },
                                                                        position: 'relative'
                                                                    }}>
                                                                    <CardMedia
                                                                        component="img"
                                                                        className="cardimg"
                                                                        sx={{ objectFit: "contain", mixBlendMode: "multiply" }}
                                                                        image={IMG_URL + v?.selectedVariant?.images?.[0]}
                                                                        title="green iguana"

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
                                                                </Box>


                                                                <CardContent sx={{ outline: 0, pl: 0, pt: { xs: 3.5, md: 3 } }}>
                                                                    <Typography gutterBottom variant="h6" component="div" className="cart-name">
                                                                        {v.name}
                                                                    </Typography>
                                                                    <Box sx={{ display: 'flex', columnGap: 2, mb: 1 }}>
                                                                        {/* <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500, color: '#DB4444' }}>
                                                                    {v?.discoutprice}
                                                                </Typography> */}
                                                                        <Typography variant="body1" sx={{ color: '#DB4444', fontWeight: 500 }}>
                                                                            ₹{v.selectedVariant.isFlashSale ? v.selectedVariant.flashPrice : v.price}
                                                                        </Typography>
                                                                        {
                                                                            v.selectedVariant.isFlashSale &&
                                                                            <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500, textDecoration: 'line-through', color: 'grey' }}>
                                                                                ₹{v.price}
                                                                            </Typography>
                                                                        }
                                                                    </Box>

                                                                    {
                                                                        v.selectedVariant.isFlashSale &&
                                                                        <Box sx={{
                                                                            bgcolor: '#DB4444', color: 'white', width: 'fit-content',
                                                                            padding: {
                                                                                xs: '2px 8px',
                                                                                sm: '2px 8px',
                                                                                md: '2px 12px'
                                                                            }, borderRadius: 1, position: 'absolute', top: '3%', left: '6%'
                                                                        }}>
                                                                            <Typography variant="body2" sx={{
                                                                                fontSize: {
                                                                                    xs: '10px',
                                                                                    sm: '12',
                                                                                    md: '14px'
                                                                                }
                                                                            }}>-{parseInt(discount)}%</Typography>
                                                                        </Box>

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
                                                                    <IconButton size="small" sx={{ bgcolor: "white" }} onClick={() => handledeletewishlist(v)}>
                                                                        <DeleteOutlineSharpIcon sx={{
                                                                            fontSize: {
                                                                                xs: '18px',
                                                                                sx: '18px',
                                                                                md: '20px',
                                                                                lg: '25px'
                                                                            }, color: 'black',
                                                                        }} />
                                                                    </IconButton>

                                                                </CardActions>
                                                            </Card>
                                                        </Grid>

                                                    )
                                                }
                                            })
                                        }
                                    </Grid>
                                </div>
                            </section>
                            :
                            <Box sx={{ textAlign: 'center',mt:2 }}>
                                <img src="../../../public/assets/images/emptywishlist.png" className="emptyimages"/>
                                <Typography fontSize={{ fontSize:{ xs:'18px',sm:'22px'} }}>No Product in Wishlist</Typography>
                                <a className="my-custome-button" style={{ margin: '10px auto 0 auto', backgroundColor: '#DB4444', border: '0', color: 'white' }} onClick={() => { navigate('/allproduct?type=allproduct') }}>
                                    Continue Shopping
                                </a>
                            </Box>
                    }

                    <section id="foryou">
                        <div className="container">
                            <Box className="foryou-title">
                                <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}>
                                    <i className="fa-solid fa-square" style={{ color: '#DB4444', fontSize: '30px' }}></i>
                                    <Typography variant="h6" sx={{ fontWeight: '400', color: 'black' }} className="title">Just For You</Typography>
                                </Box>
                                <a href="#" className="my-custome-button" onClick={() => { navigate('/allproduct?type=allproduct') }}>See All</a>
                            </Box>

                            <Grid container sx={{ mt: 3 }} spacing={{ xs: 1, sm: 3, lg: 4 }}>
                                {pdata?.data?.slice(0, 4)?.map((v, i) => {
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



                                    let discount;
                                    discount = ((v?.price - selectedVariant?.flashPrice) / v.price) * 100;

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

                                                        <Typography variant="body1" sx={{ color: '#DB4444', fontWeight: 500 }}>
                                                            ₹{selectedVariant?.isFlashSale ? selectedVariant?.flashPrice : v?.price}
                                                        </Typography>
                                                        {
                                                            selectedVariant?.isFlashSale &&
                                                            <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500, textDecoration: 'line-through', color: 'grey' }}>
                                                                ₹{v?.price}
                                                            </Typography>
                                                        }

                                                        <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}>
                                                            <Typography sx={{ color: '#FFAD33' }}>
                                                                <Stack spacing={1}>
                                                                    <Rating name="half-rating" defaultValue={4} precision={0.5} sx={{
                                                                        fontSize: {
                                                                            xs: '15px',
                                                                            sm: '18px',
                                                                            md: '20px'
                                                                        }
                                                                    }} readOnly />
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



                                                    {
                                                        selectedVariant.isFlashSale ?
                                                            <Box sx={{
                                                                bgcolor: '#DB4444', color: 'white', width: 'fit-content',
                                                                padding: {
                                                                    xs: '2px 8px',
                                                                    sm: '2px 8px',
                                                                    md: '2px 12px'
                                                                }, borderRadius: 1, position: 'absolute', top: '3%', left: '6%'
                                                            }}>
                                                                <Typography variant="body2" sx={{
                                                                    fontSize: {
                                                                        xs: '10px',
                                                                        sm: '12',
                                                                        md: '14px'
                                                                    }
                                                                }}>-{parseInt(discount)}%</Typography>
                                                            </Box>
                                                            : ''
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
                        </div>
                    </section>
                </main>
            </ThemeProvider>

        </>
    )
}

export default Wishlist;
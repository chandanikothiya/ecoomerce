import { Box, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Rating, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

function Wishlist() {

    const [allproducts, setAllproducts] = useState([]);
    const [cartproducts, setCartproducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/products")
            .then(response => response.json())
            .then(data => setAllproducts(data))

        fetch("http://localhost:3000/wishlist")
            .then(response => response.json())
            .then(data => setCartproducts(data))
    }, [])

    console.log(allproducts, cartproducts)

    return (
        <>
            <main>
                <section id="cart">
                    <div className="container">
                        <Box className="cart-title">
                            <Typography variant="h5" sx={{ fontWeight: 600 }}>Wishlist ({cartproducts.length})</Typography>
                            <a href="#" className="my-custome-button">Move All To Bag</a>
                        </Box>
                        <Grid container sx={{ mt: 7 }} spacing={4}>
                            {
                                cartproducts.map((v) => {
                                    const cp = allproducts.find((v1) => v1.id === v.product_id);
                                    console.log(cp)
                                    if (cp) {
                                        return (

                                            <Grid size={3}>
                                                <Card sx={{ maxWidth: 310, position: 'relative', boxShadow: 0 }}>
                                                    <Box
                                                        className="carttop"
                                                        sx={{
                                                            bgcolor: '#eef0f3', display: 'flex', justifyContent: 'center',
                                                            alignItems: 'center', padding: '20px  0 0', borderRadius: 1, height: '250px', position: 'relative'
                                                        }}>
                                                        <CardMedia
                                                            component="img"
                                                            height="140"
                                                            className="cardimg"
                                                            sx={{ objectFit: "contain" }}
                                                            image={cp.img}
                                                            title="green iguana"

                                                        />


                                                        <Typography
                                                            className="addcart"
                                                            sx={{
                                                                bgcolor: 'black', width: "100%", color: 'white', display: 'none',
                                                                textAlign: 'center', justifySelf: 'flex-end', position: 'absolute',
                                                                bottom: '10%', padding: '8px 0', borderRadius: '0 0 5px 5px'
                                                            }}
                                                        >
                                                            <ShoppingCartOutlinedIcon /> Add To Cart
                                                        </Typography>
                                                    </Box>


                                                    <CardContent sx={{ outline: 0 }}>
                                                        <Typography gutterBottom variant="h6" component="div">
                                                            {cp.name}
                                                        </Typography>
                                                        <Box sx={{ display: 'flex', columnGap: 2, mb: 1 }}>
                                                            <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500, color: '#DB4444' }}>
                                                                {cp.discoutprice}
                                                            </Typography>
                                                            <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500, textDecoration: 'line-through', color: 'grey' }}>
                                                                {cp.price}
                                                            </Typography>
                                                        </Box>

                                                        {
                                                            cp.discount ?
                                                                <Box sx={{ bgcolor: '#DB4444', color: 'white', width: 'fit-content', padding: '2px 12px', borderRadius: 1, position: 'absolute', top: '3%' }}>
                                                                    <Typography variant="body2">{cp.discount}</Typography>
                                                                </Box>
                                                                : ""
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
                                                        <IconButton size="small">
                                                            <DeleteForeverOutlinedIcon sx={{ fontSize: '34px', color: 'black' }} />
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

                <section id="foryou">
                    <div className="container">
                        <Box className="foryou-title">
                            <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}>
                                <i className="fa-solid fa-square" style={{ color: '#DB4444', fontSize: '30px' }}></i>
                                <Typography variant="h6" sx={{ fontWeight: '400', color: 'black' }}>Just For You</Typography>
                            </Box>
                            <a href="#" className="my-custome-button">See All</a>
                        </Box>

                        <Grid container sx={{ mt: 7 }} spacing={4}>
                            {
                                allproducts.slice(0, 4).map((v) => {
                                    const r = v.rating.reduce((acc, v) => acc + v, 0)
                                    // console.log(r)
                                    const rate = r / v.rating.length;
                                    // console.log(rate)
                                    return (
                                        <Grid size={3}>
                                            <Card sx={{ maxWidth: 310, position: 'relative', boxShadow: 0 }}>
                                                <Box
                                                    className="carttop"
                                                    sx={{
                                                        bgcolor: '#eef0f3', display: 'flex', justifyContent: 'center',
                                                        alignItems: 'center', padding: '20px  0 0', borderRadius: 1, height: '250px', position: 'relative'
                                                    }}>
                                                    <CardMedia
                                                        component="img"
                                                        height="140"
                                                        className="cardimg"
                                                        sx={{ objectFit: "contain" }}
                                                        image={v.img}
                                                        title="green iguana"

                                                    />


                                                    <Typography
                                                        className="addcart"
                                                        sx={{
                                                            bgcolor: 'black', width: "100%", color: 'white', display: 'none',
                                                            textAlign: 'center', justifySelf: 'flex-end', position: 'absolute',
                                                            bottom: '10%', padding: '8px 0', borderRadius: '0 0 5px 5px'
                                                        }}
                                                    >
                                                        <ShoppingCartOutlinedIcon /> Add To Cart
                                                    </Typography>
                                                </Box>


                                                <CardContent sx={{ outline: 0 }}>
                                                    <Typography gutterBottom variant="h6" component="div">
                                                        {v.name}
                                                    </Typography>
                                                    <Box sx={{ display: 'flex', columnGap: 2, mb: 1 }}>
                                                        <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500, color: '#DB4444' }}>
                                                            {v.discoutprice}
                                                        </Typography>
                                                        <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500, textDecoration: 'line-through', color: 'grey' }}>
                                                            {v.price}
                                                        </Typography>
                                                    </Box>

                                                    <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}>
                                                        <Typography sx={{ color: '#FFAD33' }}>
                                                            <Stack spacing={1}>
                                                                <Rating name="half-rating" defaultValue={rate} precision={0.5} sx={{ fontSize: '20px' }} />
                                                            </Stack>
                                                        </Typography>
                                                        <Typography sx={{ color: 'grey', fontWeight: '600' }}>
                                                            {`(${r})`}
                                                        </Typography>
                                                    </Box>

                                                    {
                                                        v.discount ?
                                                            <Box sx={{ bgcolor: '#DB4444', color: 'white', width: 'fit-content', padding: '2px 12px', borderRadius: 1, position: 'absolute', top: '3%' }}>
                                                                <Typography variant="body2">{v.discount}</Typography>
                                                            </Box>
                                                            : ""
                                                    }

                                                    {
                                                        v.new ?
                                                            <Box sx={{ bgcolor: '#00FF66', color: 'white', width: 'fit-content', padding: '2px 12px', borderRadius: 1, position: 'absolute', top: '3%' }}>
                                                                <Typography variant="body2">NEW</Typography>
                                                            </Box> :
                                                            ""
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
                                                    <IconButton size="small">
                                                        <DeleteForeverOutlinedIcon sx={{ fontSize: '34px', color: 'black' }} />
                                                    </IconButton>

                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </div>
                </section>
            </main>

        </>
    )
}

export default Wishlist;
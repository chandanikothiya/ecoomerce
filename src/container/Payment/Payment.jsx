import React, { useEffect, useRef, useState } from "react";
import { useAddPaymentMutation, useGetCashfreePaymentQuery, useGetPdfQuery } from "../../redux/api/payment.api";
import { NavLink, useParams, useSearchParams } from "react-router-dom";
import Confetti from 'react-confetti'
import { useWindowSize } from "react-use";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { FaCheckCircle } from "react-icons/fa";
import { useReducer } from "react";


function Payment() {

    // const { width, height } = useWindowSize()
    const [searchParams] = useSearchParams();
    const { width, height } = useWindowSize()
    const [showConfetti, setShowConfetti] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const boxref = useRef(null);
    const [boxsize, setBoxsize] = useState({ width: 0, height: 0 })

    console.log(searchParams.get('order_id'))

    const { data, error, isLoading } = useGetCashfreePaymentQuery(searchParams.get('order_id'))
    console.log(data)


    useEffect(() => {
        // Set a timer for 5 seconds

        let { width, height } = boxref.current.getBoundingClientRect();
        const styles = window.getComputedStyle(boxref.current)

        const paddingLeft = parseFloat(styles.paddingLeft);
        const paddingRight = parseFloat(styles.paddingRight);

        const paddingtop = parseFloat(styles.paddingTop);
        const paddingbottom = parseFloat(styles.paddingBottom);

        setBoxsize({ width: width - (paddingLeft + paddingRight), height: height - (paddingtop + paddingbottom) })

        const timer = setTimeout(() => {
            setShowConfetti(false);
        }, 5000);

        return () => clearTimeout(timer); // Cleanup on unmount   
    }, []);

    const date = new Date(data?.data?.[0]?.payment_completion_time)
    const time = date.toLocaleTimeString();
    console.log(time)
    const date1 = date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
    console.log(date1)

    const payment = {
        user_id: data?.customer?.customer_details?.customer_id,
        order_id: data?.customer?.order_id,
        amount: data?.data?.[0]?.payment_amount,
        paymentmethod: data?.data?.[0]?.payment_method?.card?.card_type,
        paymentstatus: data?.data?.[0]?.payment_status,
        transectionid: data?.data?.[0]?.cf_payment_id,
        paymentgatway: data?.data?.[0]?.payment_gateway_details?.gateway_name
    }

    console.log(payment)

    const [addpayment] = useAddPaymentMutation();
   // const [downloadpdf] = useGetPdfQuery();
    // if (payment) {
    //     addpayment(payment)
    // }

    useEffect(() => {
        if (data && !isSubmitted) {
            addpayment(payment);
            setIsSubmitted(true);
        }
    }, [data, isSubmitted, addpayment]);

    console.log(boxsize)

    const handledownloadinvoice = async () => {
        try {
            //downloadpdf()
             const orderId = searchParams.get("order_id");

             const res = await fetch(`http://localhost:8080/invoice/${orderId}`);

               const blob = await res.blob();

        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "invoice.pdf";
        document.body.appendChild(a);
        a.click();

        a.remove();
        window.URL.revokeObjectURL(url);
        } catch (error) {
             console.log("Download failed", error);
        }
    }

    return (
        <>
            <div className="container">
                <Box
                    sx={{
                        position: "relative",
                        overflow: "hidden",
                        margin: '0 auto',
                        mt: 5, padding: 5, boxShadow: 1,
                        textAlign: 'center', width: '500px'
                    }}
                    ref={boxref}
                >

                    {showConfetti &&
                        <Confetti
                            width={boxsize.width}
                            height={boxsize.height}
                            recycle={false}
                            style={{
                                position: 'absolute',
                                
                                left:'50%',
                                transform:'translate(-50%)',
                                pointerEvents: "none"
                            }}
                            // confettiSource={{
                            //     x: boxsize.width / 2,
                            //     y: 0,
                            //     w: 0,
                            //     h: 0
                            // }}
                            drawShape={(ctx) => {
                                const size = 6;

                                if (Math.random() > 0.5) {
                                    //  Square
                                    ctx.fillRect(0, 0, size, size);
                                } else {
                                    //  Star
                                    ctx.beginPath();
                                    const spikes = 5;
                                    const outerRadius = size;
                                    const innerRadius = size / 2;

                                    let rot = Math.PI / 2 * 3;
                                    let x = 0;
                                    let y = 0;

                                    ctx.moveTo(0, -outerRadius);
                                    for (let i = 0; i < spikes; i++) {
                                        x = Math.cos(rot) * outerRadius;
                                        y = Math.sin(rot) * outerRadius;
                                        ctx.lineTo(x, y);
                                        rot += Math.PI / spikes;

                                        x = Math.cos(rot) * innerRadius;
                                        y = Math.sin(rot) * innerRadius;
                                        ctx.lineTo(x, y);
                                        rot += Math.PI / spikes;
                                    }
                                    ctx.closePath();
                                    ctx.fill();
                                }
                            }}
                        />
                    }

                    <FaCheckCircle style={{ fontSize: '60px', color: '#4EC153' }} />
                    <Typography variant="h5" sx={{ fontWeight: '600', mt: 1 }}>Payment Successful</Typography>

                    <Typography variant="h6" sx={{ textAlign: "start", fontWeight: '600', mt: 2 }}>Details</Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
                        <Typography>Transection Id</Typography>
                        <Typography>{data?.data?.[0]?.cf_payment_id}</Typography>
                    </Box>

                    <Divider sx={{ color: '#E5E4E2' }} />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
                        <Typography>Time</Typography>
                        <Typography>{time}</Typography>
                    </Box>

                    <Divider sx={{ color: '#E5E4E2' }} />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
                        <Typography>Date</Typography>
                        <Typography>{date1}</Typography>
                    </Box>

                    <Divider sx={{ color: '#E5E4E2' }} />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
                        <Typography>Payment Method</Typography>
                        <Typography>{data?.data?.[0]?.payment_method?.card?.card_type}</Typography>
                    </Box>

                    <Divider sx={{ color: '#E5E4E2' }} />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
                        <Typography>Total Amount</Typography>
                        <Typography>{data?.data?.[0]?.payment_amount}</Typography>
                    </Box>

                    <Grid container spacing={2} sx={{ mt: 5 }}>
                        <Grid size={6}>
                            <NavLink to='/'><Button variant="contained" color="success" sx={{ width: '100%', padding: '8px 16px' }} >Done</Button></NavLink>
                        </Grid>
                        <Grid size={6}>
                            <Button variant="contained" color="success" sx={{ width: '100%', padding: '8px 16px' }} onClick={handledownloadinvoice}>
                                Download Invoice</Button>
                        </Grid>
                    </Grid>
                </Box>

            </div>
        </>
    )
}

export default Payment;
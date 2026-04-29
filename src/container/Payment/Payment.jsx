import React, { useEffect, useState } from "react";
import { useAddPaymentMutation, useGetCashfreePaymentQuery } from "../../redux/api/payment.api";
import { useParams, useSearchParams } from "react-router-dom";
import Confetti from 'react-confetti'
import { useWindowSize } from "react-use";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { FaCheckCircle } from "react-icons/fa";


function Payment() {

    // const { width, height } = useWindowSize()
    const [searchParams] = useSearchParams();
    const { width, height } = useWindowSize()
    const [showConfetti, setShowConfetti] = useState(true);

    console.log(searchParams.get('order_id'))

    const { data, error, isLoading } = useGetCashfreePaymentQuery(searchParams.get('order_id'))
    console.log(data)


    useEffect(() => {
        // Set a timer for 5 seconds
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
        user_id:data?.customer?.customer_details?.customer_id,
        order_id:data?.customer?.order_id,
        amount:data?.data?.[0]?.payment_amount,
        paymentmethod:data?.data?.[0]?.payment_method?.card?.card_type,
        paymentstatus:data?.data?.[0]?.payment_status,
        transectionid:data?.data?.[0]?.cf_payment_id,
        paymentgatway:data?.data?.[0]?.payment_gateway_details?.gateway_name
    }

    console.log(payment)

    const [addpayment] = useAddPaymentMutation();
    //  if (payment) {
    //     addpayment(payment)
    //  }


    return (
        <>
            <div className="container">
                <Box sx={{ margin: '0 auto', mt: 5, padding: 5, boxShadow: 1, width: 'fit-content', textAlign: 'center', width: '500px' }}>
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
                            <Button variant="contained" color="success" sx={{ width: '100%', padding: '8px 16px' }} >Done</Button>
                        </Grid>
                        <Grid size={6}>
                            <Button variant="contained" color="success" sx={{ width: '100%', padding: '8px 16px' }}>Download Invoice</Button>
                        </Grid>
                    </Grid>
                </Box>
                {showConfetti &&
                    <Confetti
                        width={width}
                        height={height}
                        recycle={false}
                    />
                }
            </div>
        </>
    )
}

export default Payment;
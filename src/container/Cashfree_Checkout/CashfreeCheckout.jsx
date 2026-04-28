import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { load } from "@cashfreepayments/cashfree-js";
import { useCreatePaymentMutation } from "../../redux/api/payment.api";
import { useSnackbar } from "notistack";

function CashfreeCheckout() {

    const [sessionid, setSessionId] = useState();

    let cashfree;
    var initializeSDK = async function () {
        cashfree = await load({
            mode: "sandbox",
        });
    };
    initializeSDK();

    const [createpayemnt] = useCreatePaymentMutation();

    useEffect(() => {
        const getresponse = async () => {
            const response = await createpayemnt().unwrap();;
            console.log("response", response)
            setSessionId(response?.payment_session_id)
        }

        getresponse();
    }, [])
    console.log(sessionid)

    const doPayment = async () => {
        if (!cashfree || !sessionid) {
            console.log("Cashfree not loaded");
            return;
        }
        console.log("ok")
        let checkoutOptions = {
            paymentSessionId: sessionid,
            redirectTarget: "_self",
        };
        cashfree.checkout(checkoutOptions);
    };

    return (
        <div class="row">
            <p>Click below to open the checkout page in the current tab</p>
            <button type="submit" className="btn btn-primary" id="renderBtn" onClick={doPayment}>
                Pay Now
            </button>
        </div>
    );
}

export default CashfreeCheckout;
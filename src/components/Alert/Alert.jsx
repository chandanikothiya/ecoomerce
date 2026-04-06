import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetalert } from "../../redux/slice/Alert.slice";

function Alert() {

    const {enqueueSnackbar,closeSnackbar} = useSnackbar();
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
        if (alert.text !== '') {
            enqueueSnackbar(alert.text,{
                 anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                },
                variant: alert.variant
            })
            dispatch(resetalert())
        }
    },[alert.text])


    return (
        <>

        </>
    )
}

export default Alert;
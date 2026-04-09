import { Padding, Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { number, object, string } from "yup";
import { FcGoogle } from "react-icons/fc";
import { useAddUserMutation, useForgetpasswordMutation, useLoginUserMutation, useResetpasswordMutation, useVerifyUserMutation } from "../../redux/api/user.api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setalert } from "../../redux/slice/Alert.slice";


function Authendication() {
    const [authtype, setAuthtype] = useState('login');
    console.log(authtype)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };


    const [adduser] = useAddUserMutation();
    const [verifyuser] = useVerifyUserMutation();
    const [loginuser] = useLoginUserMutation();
    const [forgetpassword] = useForgetpasswordMutation();
    const [resetpassword] = useResetpasswordMutation();

    let authschema = "";
    let intialvalues = "";

    if (authtype === 'signup') {
        authschema = {
            name: string().required(),
            // emailphone: string().required(),
            emailphone: string()
                .required("Required")
                .test("email-or-phone", "Enter valid email or phone", (value) => {
                    if (!value) return false;

                    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                    const isPhone = /^[0-9]{10}$/.test(value);

                    return isEmail || isPhone;
                }),
            password: string().required()
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
                ),
        }

    } else if (authtype === 'verify OTP') {
        authschema = {
            otp: number().required(),
        }
    } else if (authtype === 'login') {
        authschema = {
            emailphone: string()
                .required("Required")
                .test("email-or-phone", "Enter valid email or phone", (value) => {
                    if (!value) return false;

                    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                    const isPhone = /^[0-9]{10}$/.test(value);

                    return isEmail || isPhone;
                }),
            password: string().required()
        }
    } else if (authtype === 'forgetpassword') {
        authschema = {
            email: string()
                .required("Required")
                .test("email-or-phone", "Enter valid email or phone", (value) => {
                    if (!value) return false;

                    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                    const isPhone = /^[0-9]{10}$/.test(value);

                    return isEmail || isPhone;
                }),
        }
    } else if (authtype === 'resetpassword') {
        authschema = {
            fotp: number().required(),
            fpassword: string().required()
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
                ),
        }
    }


    if (authtype === 'signup') {
        intialvalues = {
            name: '',
            emailphone: '',
            password: '',
        }
    } else if (authtype === 'verify OTP') {
        intialvalues = {
            otp: '',
        }
    } else if (authtype === 'login') {
        intialvalues = {
            emailphone: '',
            password: '',
        }
    } else if (authtype === 'forgetpassword') {
        intialvalues = {
            email: '',
        }
    } else if (authtype === 'forgetpassword') {
        intialvalues = {
            fotp: '',
            fpassword: ''
        }
    }



    const handlesubmit = async (values) => {
        console.log(values)
        try {
            if (authtype === 'signup') {
                localStorage.setItem("emailphone", values.emailphone)

                const response = await adduser(values).unwrap();
                console.log("SUCCESS:", response);

                if (response.success) {
                    setAuthtype('verify OTP')

                }
            } else if (authtype === 'verify OTP') {

                const response = await verifyuser({ emailphone: localStorage.getItem('emailphone'), otp: values.otp }).unwrap();
                console.log("SUCCESS:", response);

                if (response.success) {
                    setAuthtype('login')
                    dispatch(setalert({ text: response.message, variant: 'success' }))
                } else {
                    dispatch(setalert({ text: response.message, variant: 'error' }))
                }
            }
            else if (authtype === 'login') {
                const response = await loginuser({ emailphone: values.emailphone, password: values.password }).unwrap();
                console.log("SUCCESS:", response);
                localStorage.setItem("loginid",response.data._id)

                if (response.success) {
                    navigate('/')
                    dispatch(setalert({ text: response.message, variant: 'success' }))
                } else {
                    dispatch(setalert({ text: response.message, variant: 'error' }))
                }
            } else if (authtype === 'forgetpassword') {
                localStorage.setItem("femailphone", values.email)
                const response = await forgetpassword({ emailphone: values.email }).unwrap();
                console.log("SUCCESS:", response);

                if (response.success) {
                    setAuthtype('resetpassword')
                    dispatch(setalert({ text: response.message, variant: 'success' }))
                } else {
                    dispatch(setalert({ text: response.message, variant: 'error' }))
                }
            } else if (authtype === 'resetpassword') {
                const response = await resetpassword({ emailphone: localStorage.getItem('femailphone'), otp: values.fotp, password: values.fpassword }).unwrap();
                console.log("SUCCESS:", response);

                if (response.success) {
                    setAuthtype('login')
                    dispatch(setalert({ text: response.message, variant: 'success' }))
                } else {
                    dispatch(setalert({ text: response.message, variant: 'error' }))
                }
            }

        } catch (error) {
            console.error("FAILED:", error);
        }
    }



    const formik = useFormik({
        initialValues: intialvalues,
        validationSchema: object(authschema),
        onSubmit: values => {
            console.log(values)
            handlesubmit(values)
        },
    });

    const { handleSubmit, handleChange, handleBlur, errors, touched, values } = formik;
    console.log(errors, touched)
    console.log(authtype)

    const handlegoogle = () => {
        try {
            window.location.href = 'http://localhost:8080/api/v1/user/auth/google'
           
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <main>
                <section id="authendication">
                    <Grid container
                        alignItems="stretch"
                        sx={{
                            justifyContent: {
                                xs: 'center',
                                md: 'flex-start'
                            }
                        }}
                    >
                        <Grid size={6}
                            display='flex'
                            sx={{
                                display: {
                                    xs: 'none',
                                    md: 'block'
                                }
                            }}
                        >
                            <img src="../../../public/assets/images/authendication.png" alt="" width='100%' height='100%' />
                        </Grid>

                        <Grid size={{ xs: 10, sm: 8, md: 6 }} display='flex'>
                            <Box
                                sx={{
                                    width: {
                                        md: '371px'
                                    },
                                    margin: '0 auto 0 auto', display: 'flex',
                                    flexDirection: 'column', justifyContent: 'center'
                                }}
                            >
                                <Typography variant="h4" sx={{ fontWeight: 500 }} className="auth-title">
                                    {
                                        authtype === 'signup'
                                            ? "Create an account"
                                            : authtype === 'login'
                                                ? "Log in to Exclusive"
                                                : authtype === 'verify OTP'
                                                    ? "Enter OTP"
                                                    : ""
                                    }
                                    {/* {authtype === 'signup' || authtype === 'login' ?
                                        authtype === 'signup' ? "Create an account" : "Log in to Exclusive" : ""
                                    } */}
                                    {
                                        authtype === 'forgetpassword' ? "Enter Email address" : ""
                                    }
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 400, mt: 3 }} className="authsub-title" >Enter your details below</Typography>

                                <form onSubmit={handleSubmit}>
                                    {authtype === 'signup' || authtype === 'login' || authtype === 'verify OTP' ?
                                        <>
                                            {
                                                authtype === 'signup' || authtype === 'login' ?
                                                    <>
                                                        {
                                                            authtype === 'signup' &&
                                                            <>
                                                                <TextField
                                                                    className="my-cutome-textfiled"
                                                                    id="name"
                                                                    name="name"
                                                                    label="Name"
                                                                    variant="standard"
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                />
                                                                {errors.name && touched.name ? <span>**{errors.name}</span> : ""}
                                                            </>
                                                        }
                                                        <TextField
                                                            className="my-cutome-textfiled"
                                                            id="emailphone"
                                                            name="emailphone"
                                                            label="Email or Phone Number"
                                                            variant="standard"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                        {errors.emailphone && touched.emailphone ? <span>**{errors.emailphone}</span> : ""}

                                                        <TextField
                                                            className="my-cutome-textfiled"
                                                            id="password"
                                                            name="password"
                                                            label="Password"
                                                            type={showPassword ? 'text' : 'password'}
                                                            variant="standard"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            InputProps={{
                                                                endAdornment: (
                                                                    <InputAdornment position="end">
                                                                        <IconButton
                                                                            onClick={handleClickShowPassword}
                                                                            onMouseDown={handleMouseDownPassword}
                                                                            onMouseUp={handleMouseUpPassword}
                                                                        >
                                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                                        </IconButton>
                                                                    </InputAdornment>
                                                                )
                                                            }}
                                                        />
                                                        {errors.password && touched.password ? <span>**{errors.password}</span> : ""}
                                                    </>
                                                    : <>
                                                        <TextField

                                                            className="my-cutome-textfiled"
                                                            id="otp"
                                                            name="otp"
                                                            label="OTP"
                                                            variant="standard"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            sx={{ width: '100%' }}
                                                        />
                                                        {errors.otp && touched.otp ? <span>**{errors.otp}</span> : ""}
                                                    </>
                                            }

                                        </>
                                        : authtype === 'forgetpassword' || authtype === 'resetpassword' ?
                                            <>
                                                {authtype === 'forgetpassword' ?
                                                    <>
                                                        <TextField
                                                            className="my-cutome-textfiled"
                                                            id="email"
                                                            name="email"
                                                            label="Email or Phone Number"
                                                            variant="standard"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}

                                                        />
                                                        {errors.email && touched.email ? <span>**{errors.email}</span> : ""}
                                                    </>
                                                    :
                                                    <>
                                                        <TextField

                                                            className="my-cutome-textfiled"
                                                            id="fotp"
                                                            name="fotp"
                                                            label="OTP"
                                                            variant="standard"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            sx={{ width: '100%' }}
                                                        />
                                                        {errors.fotp && touched.fotp ? <span>**{errors.fotp}</span> : ""}

                                                        <TextField
                                                            className="my-cutome-textfiled"
                                                            id="fpassword"
                                                            name="fpassword"
                                                            label="Password"
                                                            type={showPassword ? 'text' : 'password'}
                                                            variant="standard"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            InputProps={{
                                                                endAdornment: (
                                                                    <InputAdornment position="end">
                                                                        <IconButton
                                                                            onClick={handleClickShowPassword}
                                                                            onMouseDown={handleMouseDownPassword}
                                                                            onMouseUp={handleMouseUpPassword}
                                                                        >
                                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                                        </IconButton>
                                                                    </InputAdornment>
                                                                )
                                                            }}
                                                        />
                                                        {errors.fpassword && touched.fpassword ? <span>**{errors.fpassword}</span> : ""}
                                                    </>
                                                }
                                            </>
                                            :
                                            ''

                                    }


                                    {
                                        authtype === 'signup' &&
                                        <>
                                            <button type="submit" className="submit-btn my-custome-button" >Create Account</button>
                                            <a href="#" className="social-auth my-custome-button" style={{ marginTop: '40px' }} onClick={handlegoogle}>
                                                <FcGoogle className="socialauth-icon" />
                                                {/* <img src="../../../public/assets/images/google.png" alt="" width='25' style={{ marginRight: '8px' }} className="socialauth-icon"/> */}
                                                Sign up with Google
                                            </a>
                                        </>
                                    }

                                    {
                                        authtype === 'login' &&
                                        <Box className="login-forget-btn" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: "center", mt: 5 }}>
                                            <button type="submit" className="login-btn my-custome-button" >Log in </button>
                                            <a href="#" style={{ color: '#DB4444', textDecoration: 'none', fontWeight: '600' }} onClick={() => setAuthtype('forgetpassword')}>Forget Password ?</a>
                                        </Box>
                                    }

                                    {
                                        authtype === 'resetpassword' &&
                                        <>
                                            <button type="submit" className="submit-btn my-custome-button">Reset Password</button>
                                        </>
                                    }

                                    {
                                        authtype === 'forgetpassword' &&
                                        <>
                                            <button type="submit" className="submit-btn my-custome-button">Send OTP</button>
                                        </>
                                    }

                                    {
                                        authtype === 'verify OTP' &&
                                        <>
                                            <button type="submit" className="submit-btn my-custome-button">verify OTP</button>
                                        </>
                                    }



                                    {
                                        authtype === 'signup' &&
                                        <Typography variant="subtitle1" className="authlink">
                                            Already have account? <a href="#" onClick={() => setAuthtype('login')}>Log in</a>
                                        </Typography>
                                    }

                                    {
                                        authtype === 'login' &&

                                        <Typography variant="subtitle1" className="authlink">
                                            dont have account? <a href="#" onClick={() => setAuthtype('signup')}>sign up</a>
                                        </Typography>
                                    }

                                </form>
                            </Box>

                        </Grid>
                    </Grid>
                </section>
            </main>
            
        </>
    )
}

export default Authendication;
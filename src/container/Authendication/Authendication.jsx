import { Padding } from "@mui/icons-material";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { object, string } from "yup";

function Authendication() {
    const [authtype, setAuthtype] = useState('signup');

    let authschema = "";
    let intialvalues = "";

    if (authtype === 'signup') {
        authschema = {
            name: string().required(),
            emailphone: string().email().required(),
            password: string().required()
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
                ),
        }
    } else if (authtype === 'login') {
        authschema = {
            emailphone: string().email().required(),
            password: string().required()
        }
    } else if (authtype === 'forgetpassword') {
        authschema = {
            email: string().email().required(),
        }
    }


    if (authtype === 'signup') {
        intialvalues = {
            name: '',
            emailphone: '',
            password: '',
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
    }


    const formik = useFormik({
        initialValues: intialvalues,
        validationSchema: object(authschema),
        onSubmit: values => {
            console.log(values)
        },
    });

    const { handleSubmit, handleChange, handleBlur, errors, touched } = formik;
    console.log(errors, touched)
    console.log(authtype)

    return (
        <>
            <main>
                <section id="authendication">
                    <Grid container alignItems="stretch">
                        <Grid size={6}>
                            <img src="../../../public/assets/images/authendication.png" alt="" />
                        </Grid>

                        <Grid size={6} display='flex'>
                            <Box sx={{ maxWidth: '371px', margin: '0 auto 0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <Typography variant="h4" sx={{ fontSize: '36px', fontWeight: 500 }}>
                                    {authtype === 'signup' || authtype === 'login' ?
                                        authtype === 'signup' ? "Create an account" : "Log in to Exclusive" : ""}
                                    {
                                        authtype === 'forgetpassword' ? "Enter Email address" : ""
                                    }
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 400, mt: 3 }}>Enter your details below</Typography>

                                <form onSubmit={handleSubmit}>
                                    {authtype === 'signup' || authtype === 'login' ?
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
                                                variant="standard"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.password && touched.password ? <span>**{errors.password}</span> : ""}
                                        </>
                                        : authtype === 'forgetpassword' ?
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
                                            : ""
                                    }


                                    {
                                        authtype === 'signup' &&
                                        <>
                                            <button type="submit" className="submit-btn my-custome-button" >Create Account</button>
                                            <a href="#" className="social-auth my-custome-button" style={{ marginTop: '40px' }}>
                                                <img src="../../../public/assets/images/google.png" alt="" width='25' style={{ marginRight: '8px' }} />
                                                Sign up with Google
                                            </a>
                                        </>
                                    }

                                    {
                                        authtype === 'login' &&
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: "center", mt: 5 }}>
                                            <button type="submit" className="login-btn my-custome-button" >Log in </button>
                                            <a href="#" style={{ color: '#DB4444', textDecoration: 'none', fontWeight: '600' }} onClick={() => setAuthtype('forgetpassword')}>Forget Password ?</a>
                                        </Box>
                                    }

                                    {
                                        authtype === 'forgetpassword' &&
                                        <>
                                            <button type="submit" className="submit-btn my-custome-button" onClick={() => setAuthtype(OTPverify)}>Send OTP</button>
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
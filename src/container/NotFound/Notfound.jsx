import { Breadcrumbs, Typography } from "@mui/material";
import React from "react";
import { Link, NavLink } from "react-router-dom";

function Notfound() {

    
    return (
        <main>
            <section id="notfound">
                <div className="container">
                    {/* <Typography><span style={{ color: 'grey' }}>Home / </span> 404 Error</Typography> */}


                    <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">
                        <Link
                            underline="hover"
                            color="error"
                            href="/material-ui/getting-started/installation/"
                        >
                            Home
                        </Link>
                        <Typography sx={{ color: 'text.primary' }} className="breadcrumbs-typo">404 Error</Typography>
                    </Breadcrumbs>

                    <Typography variant="h1" sx={{ fontWeight: 600, textAlign: 'center', mt:8,fontSize:{xs:'35px',sm:'60px',md:'70px',lg:'80px'},letterSpacing:{xs:'1px',sm:'5px'} }}>404 Not Found</Typography>

                    <Typography variant="h6" sx={{ fontWeight: 400, textAlign: 'center',fontSize:{xs:'16px',sm:'18px',md:'20px'},mt:{xs:2,md:3} }}>Your visited page not found. You may go home page.</Typography>

                    <NavLink to='/' className='my-custome-button'>Back to home page</NavLink>

                </div>
            </section>
        </main>
    )
}

export default Notfound;
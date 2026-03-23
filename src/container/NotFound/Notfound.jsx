import { Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

function Notfound() {
    return (
        <main>
            <section id="notfound">
                <div className="container">
                    <Typography><span style={{ color: 'grey' }}>Home / </span> 404 Error</Typography>
               
                    <Typography variant="h1" sx={{fontWeight:600,textAlign:'center',mt:10}}>404 Not Found</Typography>
                
                    <Typography variant="h6"  sx={{fontWeight:400,textAlign:'center',mt:5}}>Your visited page not found. You may go home page.</Typography>
               
                    <NavLink to='/' className='my-custome-button'>Back to home page</NavLink>

                </div>
            </section>
        </main>
    )
}

export default Notfound;
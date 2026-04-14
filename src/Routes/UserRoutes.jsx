import React, { useEffect } from 'react';
import Header from '../components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Home from '../container/Homepage/Homepage';
import Contact from '../container/Contact/Contact'
import Auth from '../container/Authendication/Authendication'
import Footer from '../components/Footer/Footer';
import Aboutus from '../container/Aboutus/Aboutus';
import Notfound from '../container/NotFound/Notfound';
import Productdetail from '../container/Productdetail/Productdetail';
import Wishlist from '../container/Wishlist/Wishlist';
import Cart from '../container/Cart/Cart';
import Checkout from '../container/Checkout/Checkout';
import Myaccount from '../container/Myaccount/Myaccount';
import { useCheckauthQuery } from '../redux/api/user.api';
import Demo from '../container/Demo/Demo';

function UserRoutes(props) {

    const { data, error, isLoading, refetch } = useCheckauthQuery(undefined, {
        refetchOnMountOrArgChange: true
    }
    );

    //console.log(data)

    useEffect(() => {
        refetch();
    }, [])

    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/signup' element={<Auth />} />
                <Route path='/about' element={<Aboutus />} />
                <Route path='/notfound' element={<Notfound />} />
                <Route path='/productdetail/:id' element={<Productdetail />} />
                <Route path='/wishlist' element={<Wishlist />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/checkout' element={<Checkout />} />
                <Route path='/myaccount' element={<Myaccount />} />
                <Route path='/demo' element={< Demo/>} />
            </Routes>
            <Footer />
        </>
    );
}

export default UserRoutes;
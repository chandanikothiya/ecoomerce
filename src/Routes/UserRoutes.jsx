import React from 'react';
import Header from '../components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Home from '../container/Homepage/Homepage';
import Contact from '../container/Contact/Contact'
import Auth from '../container/Authendication/Authendication'

function UserRoutes(props) {
    return (
        <>
        <Header/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/signup' element={<Auth/>}/>
        </Routes>
        </>
    );
}

export default UserRoutes;
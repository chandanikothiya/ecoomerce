import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../admin/components/Layout';
import Category from '../admin/container/Category/Category'
import Product from '../admin/container/Product/Product';
import Contact from '../admin/container/Contact/Contact';
import Order from '../admin/container/Order/Order';
import Payment from '../admin/container/Payment/Payment';
import Coupon from '../admin/container/Coupon/Coupon';

function AdminRoutes(props) {
    return (
        <>
            <Layout>
                <Routes>
                    <Route path="/category" element={<Category />} />
                    <Route path="/product" element={< Product/>} />
                    <Route path="/contact" element={< Contact/>} />
                    <Route path="/order" element={< Order/>} />
                    <Route path="/payment" element={< Payment/>} />
                    <Route path="/coupon" element={< Coupon/>} />
                </Routes>
            </Layout>
        </>
    );
}

export default AdminRoutes;
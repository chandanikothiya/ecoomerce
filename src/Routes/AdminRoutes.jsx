import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../admin/components/Layout';
import Category from '../admin/container/Category/Category'
import Product from '../admin/container/Product/Product';

function AdminRoutes(props) {
    return (
        <>
            <Layout>
                <Routes>
                    <Route path="/category" element={<Category />} />
                    <Route path="/product" element={< Product/>} />
                </Routes>
            </Layout>
        </>
    );
}

export default AdminRoutes;
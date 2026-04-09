import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../admin/components/Layout';
import Category from '../admin/container/Category/Category'

function AdminRoutes(props) {
    return (
        <>
            <Layout>
                <Routes>
                    <Route path="/category" element={<Category />} />
                </Routes>
            </Layout>
        </>
    );
}

export default AdminRoutes;
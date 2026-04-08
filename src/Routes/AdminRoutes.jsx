import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Category from '../admin/container/category';
import Layout from '../admin/components/Layout';

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
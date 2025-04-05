import React from 'react'
import Sidebar from './Sidebar'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom';

const drawerWidth = 240;
const Layout = ({ role, isAuthenticated }) => {
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Sidebar {...{ role, isAuthenticated }} />

                <Box component="main" sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }} >
                    <Outlet />
                </Box>
            </Box>
        </>
    )
}

export default Layout
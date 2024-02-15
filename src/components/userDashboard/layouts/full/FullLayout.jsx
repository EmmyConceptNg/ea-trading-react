import React, { useEffect, useState } from "react";
import { styled, Container, Box } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";


const MainWrapper = styled("div")(() => ({
    display: "flex",
    minHeight: "100vh",
    width: "100%",
}));

const PageWrapper = styled("div")(() => ({
    display: "flex",
    flexGrow: 1,
    paddingBottom: "60px",
    flexDirection: "column",
    zIndex: 1,
    backgroundColor: "#88A2FF14",
}));

const FullLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    // const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    useEffect(() => {
        // if (!user?.logged) {
        //     navigate("/login");
        // }
    });

   

    
    return (
        <>
            <Helmet>
                <title>EA-Trading || Dashboard</title>
            </Helmet>
            <MainWrapper className="mainwrapper">
                {/* ------------------------------------------- */}
                {/* Sidebar */}
                {/* ------------------------------------------- */}
                <Sidebar
                    isSidebarOpen={isSidebarOpen}
                    isMobileSidebarOpen={isMobileSidebarOpen}
                    onSidebarClose={() => setMobileSidebarOpen(false)}
                />
                {/* ------------------------------------------- */}
                {/* Main Wrapper */}
                {/* ------------------------------------------- */}
                <PageWrapper className="page-wrapper">
                    {/* ------------------------------------------- */}
                    {/* Header */}
                    {/* ------------------------------------------- */}
                    <Header
                        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
                        toggleMobileSidebar={() => setMobileSidebarOpen(true)}
                    />
                    {/* ------------------------------------------- */}
                    {/* PageContent */}
                    {/* ------------------------------------------- */}
                    <Container
                        sx={{
                            paddingTop: "20px",
                            maxWidth: "100vw",
                        }}
                    >
                        {/* ------------------------------------------- */}
                        {/* Page Route */}
                        {/* ------------------------------------------- */}
                        <Box sx={{ minHeight: "calc(100vh - 170px)" }}>
                            <Outlet />
                        </Box>
                        {/* ------------------------------------------- */}
                        {/* End Page */}
                        {/* ------------------------------------------- */}
                    </Container>
                </PageWrapper>
            </MainWrapper>

            
        </>
    );
};

export default FullLayout;

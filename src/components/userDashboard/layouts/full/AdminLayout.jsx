import React, { useEffect, useState } from "react";
import { styled, Container, Box } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

import AdminSidebar from "./sidebar/AdminSidebar";
import AdminHeader from "./header/AdminHeader";
// import axios from "@/api/axios";
import PasswordChangeModal from "@/Components/Admin/PasswordChangeModal";

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

const AdminLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    // const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        const admin = localStorage.getItem("admin");
        if (!user && !admin) {
            navigate("/admin");
        }
    }, []);

    return (
        <>
            <MainWrapper className="mainwrapper">
                {/* ------------------------------------------- */}
                {/* Sidebar */}
                {/* ------------------------------------------- */}
                <AdminSidebar
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
                    <AdminHeader
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
            <PasswordChangeModal open={openModal} setOpen={setOpenModal} />
        </>
    );
};

export default AdminLayout;

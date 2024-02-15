import React, { useEffect, useState } from "react";
import { styled, Container, Box } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import TeacherSidebar from "./sidebar/TeacherSidebar";
import TeacherHeader from "./header/TeacherHeader";
import { ToastContainer } from "react-toastify";
import { notify } from "../../utils/utils";

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

const TeacherLayout = ({ children }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        //or user type is not school
        if (!user?.logged && !user?.type === 'teacher') {
            navigate("/login");
            notify('You are not a teacher', 'error')
        }
    }, []);
    return (
        <MainWrapper className="mainwrapper">
            <ToastContainer />
            <TeacherSidebar
                isSidebarOpen={isSidebarOpen}
                isMobileSidebarOpen={isMobileSidebarOpen}
                onSidebarClose={() => setMobileSidebarOpen(false)}
            />

            <PageWrapper className="page-wrapper">
                <TeacherHeader
                    toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
                    toggleMobileSidebar={() => setMobileSidebarOpen(true)}
                />

                <Container
                    sx={{
                        paddingTop: "20px",
                        maxWidth: "100vw",
                    }}
                >
                    <Box sx={{ minHeight: "calc(100vh - 170px)" }}>
                        <Outlet />
                    </Box>
                </Container>
            </PageWrapper>
        </MainWrapper>
    );
};

export default TeacherLayout;

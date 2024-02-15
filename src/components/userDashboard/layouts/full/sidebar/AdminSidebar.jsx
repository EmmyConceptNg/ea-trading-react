import { useMediaQuery, Box, Drawer, Typography, Button } from "@mui/material";
/* import Logo from '../shared/logo/Logo'; */
import SidebarItems from "./SidebarItems";
import { Upgrade } from "./Updrade";
import { useNavigate } from "react-router-dom";
import AdminSidebarItems from "./AdminSidebarItems";

const AdminSidebar = (props) => {
    const navigate = useNavigate();
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

    const sidebarWidth = "270px";

    if (lgUp) {
        return (
            <Box
                sx={{
                    width: sidebarWidth,
                    flexShrink: 0,
                }}
                className="left_bar_knob"
            >
                {/* ------------------------------------------- */}
                {/* Sidebar for desktop */}
                {/* ------------------------------------------- */}
                <Drawer
                    anchor="left"
                    open={props.isSidebarOpen}
                    variant="permanent"
                    PaperProps={{
                        sx: {
                            width: sidebarWidth,
                            boxSizing: "border-box",
                        },
                    }}
                >
                    {/* ------------------------------------------- */}
                    {/* Sidebar Box */}
                    {/* ------------------------------------------- */}
                    <Box
                        sx={{
                            height: "100%",
                            overflowX: "hidden",
                        }}
                    >
                        {/* ------------------------------------------- */}
                        {/* Logo */}
                        {/* ------------------------------------------- */}
                        <Box
                            onClick={() => navigate("/dashboard")}
                            px={3}
                            sx={{ mb: 4 }}
                            component="img"
                            width="200px"
                            src="/assets/logo/logo.svg"
                            alt="Genius Logo"
                        />

                        <Box>
                            {/* ------------------------------------------- */}
                            {/* Sidebar Items */}
                            {/* ------------------------------------------- */}
                            <AdminSidebarItems onSidebarClose={props.onSidebarClose}/>
                        </Box>

                    </Box>
                </Drawer>
            </Box>
        );
    }

    return (
        <Drawer
            anchor="left"
            open={props.isMobileSidebarOpen}
            onClose={props.onSidebarClose}
            variant="temporary"
            PaperProps={{
                sx: {
                    width: sidebarWidth,
                    boxShadow: (theme) => theme.shadows[8],
                },
            }}
        >
            {/* ------------------------------------------- */}
            {/* Logo */}
            {/* ------------------------------------------- */}
            <Box
                onClick={() => navigate("/dashboard")}
                px={3}
                sx={{ mb: 4, cursor: "pointer" }}
                component="img"
                width="200px"
                src="/assets/logo/logo.svg"
                alt="Genius Logo"
            />
            {/* ------------------------------------------- */}
            {/* Sidebar For Mobile */}
            {/* ------------------------------------------- */}
            <AdminSidebarItems onSidebarClose={props.onSidebarClose} />
        </Drawer>
    );
};

export default AdminSidebar;

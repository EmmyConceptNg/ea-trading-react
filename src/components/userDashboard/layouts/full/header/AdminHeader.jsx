import React, { useState, useEffect } from "react";
import {
    Box,
    AppBar,
    Toolbar,
    styled,
    Stack,
    IconButton,
    Badge,
    Button,
    Avatar,
} from "@mui/material";
import PropTypes from "prop-types";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import SavingsIcon from "@mui/icons-material/Savings";
// components
import Profile from "./Profile";

import Notification from "./Notification";
import Cart from "./Cart";
import Wishlist from "./Wishlist";
import BrowseStore from "./BrowseStore";
import { useNavigate } from "react-router-dom";

const AdminHeader = (props) => {
    // const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
    // const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));
    const [user, setUser] = useState({ coin_balance: "000" });
    const AppBarStyled = styled(AppBar)(({ theme }) => ({
        boxShadow: "none",
        background: theme.palette.background.paper,
        justifyContent: "center",
        backdropFilter: "blur(4px)",
        [theme.breakpoints.up("lg")]: {
            minHeight: "70px",
        },
    }));
    const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
        width: "100%",
        color: theme.palette.text.secondary,
    }));

    const navigate = useNavigate();

    // const user = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        const _user = localStorage.getItem("user");
        if (_user) {
            setUser(JSON.parse(_user));
        }
    }, []);

    return (
        <AppBarStyled position="sticky" color="default">
            <ToolbarStyled>
                <IconButton
                    color="inherit"
                    aria-label="menu"
                    onClick={props.toggleMobileSidebar}
                    sx={{
                        display: {
                            lg: "hidden",
                            md: "hidden",
                            xs: "inline",
                            sm: "inline",
                        },
                        my: "auto",
                    }}
                >
                    <MenuIcon />
                </IconButton>

                <Box flexGrow={1} sx={{ display: "flex" }}>
                    <Typography variant="h5" sx={{ my: "auto" }}>
                        Hi, Welcome {user?.username}
                    </Typography>
                </Box>
                {/* <Stack spacing={1} direction="row" alignItems="center">
                    <Typography variant="h6" sx={{ color: "#FFBF3D" }}>
                        <SavingsIcon sx={{ color: "#FFBF3D" }} />
                        {user?.coin_balance &&
                            `Wallet - ${user?.coin_balance.toLocaleString()} ${
                                user?.coin_balance > 1 ? "Gcoins" : "Gcoin"
                            }`}
                    </Typography>
                    <Avatar
                        alt="Notification"
                        src="/assets/icons/notification.svg"
                        sx={{ width: "30px", height: "30px", p: "3px" }}
                    />
                    <Profile />
                </Stack> */}
            </ToolbarStyled>
        </AppBarStyled>
    );
};

AdminHeader.propTypes = {
    sx: PropTypes.object,
};

export default AdminHeader;

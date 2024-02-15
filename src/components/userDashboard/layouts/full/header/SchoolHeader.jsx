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
import { useSelector } from "react-redux";

const SchoolHeader = ({ toggleMobileSidebar }) => {
    // const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
    // const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));

    const user = useSelector((state) => state.user);

    const [timeRemaining, setTimeRemaining] = useState(0);
    const [trial, setTrial] = useState(false);
    const [verifiedByAdmin, setVerifiedByAdmin] = useState(false);
    const [loading, setLoading] = useState(true)
    const [subscribed, setSubscribed] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (!user?.logged) {
            navigate("/login");
        }

    }, []);
    useEffect(() => {
        if (user?.verified_by_admin) {
            setVerifiedByAdmin(true)

        }
        setLoading(false);
    }, []);

    useEffect(() => {
        axios.get(`/api/check-subscription/${user?.id}`).then((response) => {
            // console.log("check sub...", response.data.subscribed);
            setSubscribed(response?.data?.subscribed);

            if (response.data.trial) {
                setTimeRemaining(response.data.days_remaining);
                setTrial(response.data.trial);
            }
        });
    }, [user]);

    const AppBarStyled = styled(AppBar)(({ theme }) => ({
        boxShadow: "none",
        background: "transparent",
        justifyContent: "center",
        backdropFilter: "blur(4px)",
        [theme.breakpoints.up("lg")]: {
            minHeight: "70px",
            marginBottom: "20px",
        },
    }));
    const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
        width: "100%",
        color: theme.palette.text.secondary,
        background: theme.palette.background.paper,
    }));

    // const user = JSON.parse(localStorage.getItem("user"));

    return (
        <>
            <AppBarStyled position="sticky" color="default">
                <ToolbarStyled>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        width="100%"
                    >
                        <IconButton
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleMobileSidebar}
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
                        <Stack spacing={1} direction="row" alignItems="center">
                            <Profile />
                        </Stack>
                    </Stack>
                </ToolbarStyled>
                {!loading && !verifiedByAdmin && (
                    <Box
                        sx={{
                            backgroundColor: "#ff5722",
                            borderRadius: {
                                md: "20px 0 0 20px",
                                xs: "0",
                                lg: "20px 0 0 20px",
                                sm: "0",
                            },
                            color: "#fff",
                            marginLeft: {
                                md: "auto",
                                lg: "auto",
                                sm: "0",
                                xs: "0",
                            },
                            padding: 2,
                        }}
                    >
                        <Typography variant="h6" align="center">
                            Hello, your account is awaiting verification by Genius Club Admin
                        </Typography>
                    </Box>
                )}
                {/* {!trial && !subscribed && (
                    <Box
                        sx={{
                            backgroundColor: "#ff5722",
                            borderRadius: {
                                md: "20px 0 0 20px",
                                xs: "0",
                                lg: "20px 0 0 20px",
                                sm: "0",
                            },
                            color: "#fff",
                            marginLeft: {
                                md: "auto",
                                lg: "auto",
                                sm: "0",
                                xs: "0",
                            },
                            padding: 2,
                        }}
                    >
                        <Typography
                            variant="h6"
                            align="center"
                        >{`Your Trial Period Has Expired, Please Subscribe to Aceess all Features `}</Typography>
                    </Box>
                )} */}
            </AppBarStyled>
        </>
    );
};

// SchoolHeader.propTypes = {
//     sx: PropTypes.object,
// };

export default SchoolHeader;

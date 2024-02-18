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
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";

const Header = (props) => {
    // const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
    // const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));

    const user = useSelector((state) => state.user);

    
    
    const [subscribed, setSubscribed] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, []);

    // useEffect(() => {
    //     axios.get(`/api/check-subscription/${user?.id}`).then((response) => {
    //         // console.log("check sub...", response.data.subscribed);
    //         setSubscribed(response?.data?.subscribed);

    //         if (response.data.trial) {
    //             setTimeRemaining(response.data.days_remaining);
    //             setTrial(response.data.trial);
    //         }
    //     });
    // }, [user]);

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
                onClick={props.toggleMobileSidebar}
                sx={{
                  display: {
                    lg: "none",
                    md: "inline",
                    xs: "inline",
                    sm: "inline",
                  },
                  my: "auto",
                }}
              >
                <MenuIcon />
              </IconButton>

              <Box
                flexGrow={1}
                display={{ xs: "none", sm: "none", md: "flex" }}
              >
                <Typography
                  variant="h5"
                  fontSize={{
                    xs: "12px",
                    sm: "12px",
                    md: "initial",
                  }}
                  textTransform="capitalize"
                  sx={{ my: "auto", fontWeight : 'bold' }}
                >
                  Hi, Welcome {user?.lastName }
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    my: "auto",
                    ml: 1,
                    display: {
                      md: "block",
                      sm: "none",
                      xs: "none",
                    },
                  }}
                  textTransform="capitalize"
                >
                  {user?.first_name}
                </Typography>
              </Box>
              <Stack spacing={1} direction="row" alignItems="center">
                <Icon color="#744BAB" icon="clarity:notification-solid" />
                <Profile />
              </Stack>
            </Stack>
          </ToolbarStyled>
          
        </AppBarStyled>
      </>
    );
};

Header.propTypes = {
    sx: PropTypes.object,
};

export default Header;

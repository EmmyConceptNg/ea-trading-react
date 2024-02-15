import {
    useMediaQuery,
    Box,
    Drawer,
    Typography,
    Button,
    Avatar,
    Stack,
    Divider,
} from "@mui/material";
/* import Logo from '../shared/logo/Logo'; */
import SidebarItems from "./SidebarItems";

import { useNavigate } from "react-router-dom";

import { Icon } from "@iconify/react";
import Swal from "sweetalert2";

const Sidebar = (props) => {
    const navigate = useNavigate();
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

    const sidebarWidth = "270px";
    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",

            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Log Out",
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();

                navigate("/login");
            }
        });
    };

    if (lgUp) {
        return (
          <Box
            sx={{
              width: sidebarWidth,
              flexShrink: 0,
            }}
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
                  overflowY: "scroll",
                }}
                className="tiny_scroll"
              >
                {/* ------------------------------------------- */}
                {/* Logo */}
                {/* ------------------------------------------- */}
                <Box
                  onClick={() => navigate("/dashboard")}
                  p={3}
                  sx={{ mb: 4 }}
                  component="img"
                  width="200px"
                  src="/assets/logo/logo.png"
                  alt="EA-Trading"
                  id="logo"
                />
                <Box>
                  {/* ------------------------------------------- */}
                  {/* Sidebar Items */}
                  {/* ------------------------------------------- */}
                  <SidebarItems onSidebarClose={props.onSidebarClose} />
                </Box>
                <Divider />
                <Box
                  p={1}
                  mx={3}
                  mt={2}
                  sx={{
                    cursor: "pointer",
                    borderRadius: "30px",
                  }}
                >
                  <Stack direction="row" spacing={2}>
                    <Avatar
                      sx={{
                        marginRight: "10px",
                        backgroundColor: "transparent",
                        my: "auto",
                      }}
                    >
                      <Icon color="#d33" icon="solar:logout-3-bold" />
                    </Avatar>

                    <Typography
                      variant="h6"
                      onClick={handleLogout}
                      sx={{
                        fontWeight: "bold !important",
                        color: "#d33",
                        my: "auto !important",
                      }}
                    >
                      Log Out
                    </Typography>
                  </Stack>
                </Box>
                <Box
                  px={3}
                  sx={{
                    mx: 2,
                    my: 4,
                    p: 3,
                    width: "200px",
                    height: "200px",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundImage: 'url("/assets/icons/upgrade.svg")',
                  }}
                >
                  <Box sx={{ display: "flex" }}>
                    <Box
                      component="img"
                      src="/assets/icons/light.svg"
                      alt=""
                      sx={{ mx: "auto" }}
                    />
                  </Box>
                  <Typography
                    variant="h3"
                    align="center"
                    sx={{ color: "#fff", fontWeight: "bolder" }}
                  >
                    Pro Account
                  </Typography>
                  <Typography
                    variant="h6"
                    align="center"
                    sx={{ color: "#fff" }}
                  >
                    Unlock all features
                  </Typography>
                  <Box sx={{ display: "flex" }}>
                    <Button
                      onClick={() => navigate("/dashboard/subscriptions")}
                      sx={{
                        width: "135px",
                        height: "27.79px",
                        backgroundImage: 'url("/assets/icons/play.svg")',
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        mx: "auto",
                        mt: 1,
                        px: "auto",
                        color: "#fff",
                      }}
                    >
                      Upgrade
                    </Button>
                  </Box>
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
                sx={{ my: 4, cursor: "pointer" }}
                component="img"
                width="200px"
                src="/assets/logo/logo.png"
                alt="EA-Trading"
            />
            {/* ------------------------------------------- */}
            {/* Sidebar For Mobile */}
            {/* ------------------------------------------- */}
            <Box>
                <SidebarItems onSidebarClose={props.onSidebarClose} />
            </Box>
            <Box
                p={1}
                mx={3}
                mt={2}
                sx={{
                    backgroundColor: "#d33",
                    cursor: "pointer",
                    borderRadius: "30px",
                }}
            >
                <Stack direction="row" spacing={2}>
                    <Avatar
                        sx={{
                            marginRight: "10px",
                            backgroundColor: "transparent",
                            my: "auto",
                        }}
                    >
                        <Icon color="#fff" icon="solar:logout-3-bold" />
                    </Avatar>

                    <Typography
                        variant="h6"
                        onClick={handleLogout}
                        sx={{
                            fontWeight: "bold !important",
                            color: "#fff",
                            my: "auto !important",
                        }}
                    >
                        Log Out
                    </Typography>
                </Stack>
            </Box>
            <Box
                px={3}
                sx={{
                    mx: 2,
                    my: 4,
                    p: 3,
                    width: "200px",
                    height: "200px",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundImage: 'url("/assets/icons/upgrade.svg")',
                }}
            >
                <Box sx={{ display: "flex" }}>
                    <Box
                        component="img"
                        src="/assets/icons/light.svg"
                        alt=""
                        sx={{ mx: "auto" }}
                    />
                </Box>
                <Typography
                    variant="h3"
                    align="center"
                    sx={{ color: "#fff", fontWeight: "bolder" }}
                >
                    Pro Account
                </Typography>
                <Typography variant="h6" align="center" sx={{ color: "#fff" }}>
                    Unlock all features
                </Typography>
                <Box sx={{ display: "flex" }}>
                    <Button
                        onClick={() => navigate("/dashboard/subscriptions")}
                        sx={{
                            width: "135px",
                            height: "27.79px",
                            backgroundImage: 'url("/assets/icons/play.svg")',
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            mx: "auto",
                            mt: 1,
                            px: "auto",
                            color: "#fff",
                        }}
                    >
                        Upgrade
                    </Button>
                </Box>
            </Box>
        </Drawer>
    );
};

export default Sidebar;

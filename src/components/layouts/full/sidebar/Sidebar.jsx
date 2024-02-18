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
import { useDispatch } from "react-redux";

const Sidebar = (props) => {
    const navigate = useNavigate();
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
    const dispatch = useDispatch()

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
                dispatch({ type: "LOGOUT" });

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
         
        </Drawer>
    );
};

export default Sidebar;

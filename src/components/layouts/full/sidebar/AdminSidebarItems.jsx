import React from "react";

import { useLocation } from "react-router";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup/NavGroup";
import AdminMenuitems from "./AdminMenuItems";

const AdminSidebarItems = ({ onSidebarClose }) => {
    const { pathname } = useLocation();
    const pathDirect = pathname;

    return (
        <Box sx={{ px: 3 }}>
            <List sx={{ pt: 0 }} className="sidebarNav">
                {AdminMenuitems.map((item) => {
                    // {/********SubHeader**********/}
                    if (item.subheader) {
                        return <NavGroup item={item} key={item.subheader} />;

                        // {/********If Sub Menu**********/}
                        /* eslint no-else-return: "off" */
                    } else {
                        return (
                            <NavItem
                                onSidebarClose={onSidebarClose}
                                item={item}
                                key={item.id}
                                
                                pathDirect={pathDirect}
                            />
                        );
                    }
                })}
            </List>
        </Box>
    );
};
export default AdminSidebarItems;

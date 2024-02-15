import React, { useEffect, useState } from "react";

import { useLocation } from "react-router";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup/NavGroup";
import AdminMenuitems from "./AdminMenuItems";
import SuperAdminMenuitems from "./SuperAdminMenuItems";

const AdminSidebarItems = ({ onSidebarClose }) => {
    const { pathname } = useLocation();
    const pathDirect = pathname;
    const [userType, setUserType] = useState("admin");
    useEffect(() => {
        if (localStorage && localStorage.user) {
            const userType = JSON.parse(localStorage.getItem("user")).type;
            if (userType === "super_admin") {
                setUserType("super_admin");
            }
        }
    }, []);

    return (
        <Box sx={{ px: 3 }}>
            <List sx={{ pt: 0 }} className="sidebarNav">
                {userType === "super_admin"
                    ? SuperAdminMenuitems.map((item) => {
                          // {/********SubHeader**********/}
                          if (item.subheader) {
                              return (
                                  <NavGroup item={item} key={item.subheader} />
                              );

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
                      })
                    : AdminMenuitems.map((item) => {
                          // {/********SubHeader**********/}
                          if (item.subheader) {
                              return (
                                  <NavGroup item={item} key={item.subheader} />
                              );

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

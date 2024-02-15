import React from "react";

import { useLocation } from "react-router";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup/NavGroup";
import { uniqueId } from "lodash";

const SchoolSideItems = ({ onSidebarClose }) => {
    const { pathname } = useLocation();
    // const pathDirect = pathname;

    // console.log("pathname oo", pathDirect);
    const Menuitems = [
        {
            id: uniqueId(),
            title: "Dashboard",
            icon: "fluent:trophy-16-filled",
            href: "/school/dashboard",
        },
        {
            id: uniqueId(),
            title: "Students",
            icon: "fluent:text-bullet-list-tree-16-filled",
            href: "/school/students",
        },
        {
            id: uniqueId(),
            title: "Teachers",
            icon: "fluent:playing-cards-20-filled",
            href: "/school/teachers",
        },
        /* {
            id: uniqueId(),
            title: "Learn",
            icon: "material-symbols:robot",
            href: "/school/ai",
        }, */
        {
            id: uniqueId(),
            title: "Weekly Quests",
            icon: "fluent:learning-app-24-filled",
            href: "/school/quests",
        },
        // {
        //     id: uniqueId(),
        //     title: "Questions",
        //     icon: "fluent:learning-app-24-filled",
        //     href: "/school/practice",
        // },
        /* {
            id: uniqueId(),
            title: "Live Games",
            icon: "mdi:head-question",
            href: "/dashboard/challenge",
        }, */
        {
            id: uniqueId(),
            title: "Ask AI Friend ",
            icon: "mdi:head-question",
            href: "/dashboard/challenge",
        },
        {
            id: uniqueId(),
            title: "Subscriptions",
            icon: "fluent:live-20-filled",
            href: "/school/subscriptions",
        },
    ];
    return (
        <Box sx={{ px: 3 }}>
            <List sx={{ pt: 0 }} className="sidebarNav">
                {Menuitems?.map((item) => {
                    if (item?.subheader) {
                        return <NavGroup item={item} key={item.subheader} />;
                    } else {
                        return (
                            <NavItem
                                onSidebarClose={onSidebarClose}
                                item={item}
                                key={item.id}
                                pathDirect={pathname}
                            />
                        );
                    }
                })}
            </List>
        </Box>
    );
};
export default SchoolSideItems;

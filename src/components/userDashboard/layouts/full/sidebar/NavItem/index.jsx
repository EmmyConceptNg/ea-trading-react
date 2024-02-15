import PropTypes from "prop-types";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
// mui imports
import {
    ListItemIcon,
    ListItem,
    List,
    styled,
    ListItemText,
    useTheme,
    Avatar,
    ListItemButton,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Icon } from "@iconify/react";
const NavItem = ({ item, level, pathDirect, onClick, onSidebarClose }) => {
    const SubmenuIcon = item.items?.icon;
    const theme = useTheme();
    const location = useLocation();
    const currentPath = location.pathname;

    const ListItemStyled = styled(ListItemButton)(() => ({
        whiteSpace: "nowrap",
        marginBottom: "2px",
        padding: "8px 10px",
        borderRadius: "15px",
        backgroundColor: level > 1 ? "transparent !important" : "inherit",
        color: theme.palette.text.secondary,
        paddingLeft: "10px",
        "&:hover": {
            // backgroundColor: "red",
            // color: "green",
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.main,
        },
        "&.Mui-selected": {
            color: "white",
            backgroundColor: theme.palette.primary.main,
            "&:hover": {
                backgroundColor: theme.palette.primary.main,
                color: "white",
            },
        },
    }));

    const [open, setOpen] = useState(false);
    const toggleSubmenu = (id) => {
        if (open) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    };

    const url = window.location.pathname;

    return (
        <List
            component="li"
            sx={{ display: "flex" }}
            disablePadding
            key={item.id}
            id={item.id}
        >
            <ListItemStyled
                button
                component={item.external ? "a" : NavLink}
                to={item.href}
                href={item.external ? item.href : ""}
                disabled={item.disabled}
                selected={currentPath.startsWith(item.href)}
                target={item.external ? "_blank" : ""}
                onClick={() => {
                    toggleSubmenu(item.id);
                    onSidebarClose();
                }}
            >
                <Avatar
                    sx={{
                        marginRight: "10px",
                        backgroundColor: "transparent",
                        border: currentPath.startsWith(item.href)
                            ? "2px solid #fff"
                            : "2px solid #744BAB",
                    }}
                >
                    <Icon
                        color={
                            currentPath.startsWith(item.href)
                                ? "#fff"
                                : "#744BAB"
                        }
                        icon={item.icon}
                    />
                </Avatar>

                <ListItemText sx={{ fontWeight: "bold !important" }}>
                    <>{item.title} </>
                </ListItemText>
                {item.dropdown && <ArrowDropDownIcon />}
            </ListItemStyled>
        </List>
    );
};

NavItem.propTypes = {
    item: PropTypes.object,
    level: PropTypes.number,
    pathDirect: PropTypes.any,
};

export default NavItem;

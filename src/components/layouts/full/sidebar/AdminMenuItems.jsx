import { uniqueId } from "lodash";

const AdminMenuitems = [
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: "material-symbols:dashboard",
    href: "/admin/dashboard",
  },

  {
    id: uniqueId(),
    title: "Users",
    icon: "ant-design:transaction-outlined",
    href: "/admin/users",
  },
  {
    id: uniqueId(),
    title: "Subscriptions",
    icon: "wpf:renew-subscription",
    href: "/admin/subscriptions",
  },
  {
    id: uniqueId(),
    title: "Withdrawals",
    icon: "mdi:cash-multiple",
    href: "/admin/withdrawals",
  },
  {
    id: uniqueId(),
    title: "Settings",
    icon: "material-symbols:settings",
    href: "/admin/settings",
  },
];

export default AdminMenuitems;

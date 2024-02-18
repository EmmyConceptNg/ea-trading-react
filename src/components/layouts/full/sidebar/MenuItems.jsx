import { uniqueId } from "lodash";

const Menuitems = [
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: "material-symbols:dashboard",
    href: "/dashboard/app",
  },

  {
    id: uniqueId(),
    title: "Withdrawals",
    icon: "ant-design:transaction-outlined",
    href: "/dashboard/withdrawals",
  },
  {
    id: uniqueId(),
    title: "Subscriptions",
    icon: "wpf:renew-subscription",
    href: "/dashboard/subscriptions",
  },
  {
    id: uniqueId(),
    title: "Profile",
    icon: "wpf:renew-subscription",
    href: "/dashboard/profile",
  },
];

export default Menuitems;

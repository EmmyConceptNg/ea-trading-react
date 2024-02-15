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
    title: "Transactions",
    icon: "ant-design:transaction-outlined",
    href: "/dashboard/transactions",
  },
  {
    id: uniqueId(),
    title: "Subscriptions",
    icon: "wpf:renew-subscription",
    href: "/dashboard/subscriptions",
  },
];

export default Menuitems;

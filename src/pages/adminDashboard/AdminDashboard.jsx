import { Icon } from "@iconify/react";
import { Box, Button, Container, Grid, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import Text from "../../components/utils/Text";
import Chart from "../../components/userDashboard/Chart";
import { useNavigate } from "react-router-dom";
import TransactionsTable from "../../components/adminDashboard/AdminWithdrawalsTable";
import SubscriptionsTable from "../../components/adminDashboard/SubscriptionsTable";
import axios from "../../api/axios";

export default function AdminDashboard() {

    const [balancesVisible, setBalancesVisible] = useState([
    true, 
    true, 
    true, 
  ]);

  const toggleBalancesVisibility = (index) => {
    const updatedVisibility = [...balancesVisible];
    updatedVisibility[index] = !updatedVisibility[index];
    setBalancesVisible(updatedVisibility);
  };


  const [dash, setDash] = useState({
    users:0,
balance:0,
withdrawal:0,
    
  });

  useEffect(() => {
    axios.get(`/api/admin/dashboard`).then((response) => {
      setDash((prev) => ({
        prev,
        users: response.data.users,
        balance: response.data.balance,
        withdrawal: response.data.withdrawal,
      }));
    });
  }, []);

  const navigate = useNavigate()

  const replaceItem = (index, item) => {
    // var theItem = quests[index];
    var copyAll = [...transactions];
    copyAll[index] = item;
    setTransactions(copyAll);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [paginationObj, setPaginationObj] = useState({
    next_page_url: "/api/admin/transactions",
    total: "",
  });

   const handleLoadMore = () => {
     if (paginationObj?.next_page_url) {
       setPaginationLoading(true);
       //   getData(
       //     paginationObj?.next_page_url,
       //     setPaginationLoading,
       //     transactions,
       //     setTransactions,
       //     setPaginationObj,
       //     true
       //   );
     }
   };
  return (
    <Box>
      <Text fw="600" fs="24px" color="#000" mb="10px">
        Dashboard Overview
      </Text>
      <Grid container spacing={2}>
        {[
          {
            icon: "mdi:cash-multiple",
            color: "#FFE2E5",
            iconColor: "#FA5A7D",
            name: "Total Amount Deposited",
            amount: `£${dash.balance}`,
            profit: "",
          },
          {
            icon: "mdi:cash-multiple",
            color: "#DCFCE7",
            iconColor: "#3CD856",
            name: "Total Withdrawal Made",
            amount: `£${dash.withdrawal}`,
            profit: "",
          },
          {
            icon: "mdi:users",
            color: "#F3E8FF",
            iconColor: "#BF83FF",
            name: "Total Registered Users",
            amount: `${dash.users}`,
            profit: "",
          },
        ].map((item, index) => (
          <Grid item md={3} lg={3} sm={6} xs={12} key={index}>
            <Box
              bgcolor={item.color}
              borderRadius="12px"
              height="100px"
              px={3}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              py={2}
            >
              <Box display="flex" justifyContent="space-between">
                <Box my="auto">
                  <Icon
                    color={item.iconColor}
                    icon={item.icon}
                    width={32}
                    height={32}
                  />
                </Box>
                <Text
                  my="auto"
                  fs="14px"
                  fw="400"
                  color="#000"
                  sx={{ textAlign: "left" }}
                >
                  {item.name}
                </Text>
                <IconButton
                  sx={{
                    cursor: "pointer",
                    my: "auto",
                  }}
                  // Toggle visibility when the eye icon is clicked
                  onClick={() => toggleBalancesVisibility(index)}
                >
                  <Icon
                    color="#5E6E78"
                    icon={balancesVisible[index] ? "mdi:eye" : "mdi:eye-off"}
                    width={20}
                    height={20}
                  />
                </IconButton>
              </Box>
              <Text fs="24px" fw="600" color="#000" sx={{ textAlign: "left" }}>
                {balancesVisible[index] ? item.amount : "******"}
              </Text>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Box mt={3}>
        <Text fw="600" fs="24px" color="#000" my="10px">
          Subscriptions History
        </Text>
        <SubscriptionsTable dashboard />
      </Box>
    </Box>
  );
}

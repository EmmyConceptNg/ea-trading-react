import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";


import { useSelector } from "react-redux";




import SkeletonLoader from "../../components/loader/TableLoader";
import TransactionsTable from "../../components/userDashboard/WithdrawalsTable";
import SubscriptionsTable from "../../components/userDashboard/SubscriptionsTable";
import Text from "../../components/utils/Text";
import { CheckOutlined } from "@mui/icons-material";
export default function Subscriptions() {
  const user = useSelector((state) => state.user);

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Typography variant="h6" color="initial" fontWeight="bold">
          Active Subscription
        </Typography>
      </Stack>
      <Box borderRadius="22px">
        <Stack
          direction={{ md: "row", lg: "row", xs: "column", sm: "column" }}
          justifyContent={"space-evenly"}
        >
          <Box
            bgcolor="#22BB9C"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            width="100%"
            height="300px"
          >
            <Text fs="50px" color="#fff" fw="600">
              {user?.bot?.name}
            </Text>
            <Text fs="60px" color="#fff" fw="600">
              {`£${user?.bot?.amount}`}
            </Text>
          </Box>
          <Box
            bgcolor="#fff"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            width="100%"
            height="300px"
          >
            {[`${user?.bot?.roi}% Weekly ROI`, "Weekly Withdrawal"].map((item, index) => (
              <Box key={index} display="flex" alignItems="center">
                <CheckOutlined color="primary" />
                <Text
                  fs="24px"
                  fw="400"
                  color="#616161"
                  sx={{ textAlign: "left" }}
                >
                  {item}
                </Text>
              </Box>
            ))}
          </Box>
        </Stack>
      </Box>
      <Box mt={5}>
        <Stack direction="row" justifyContent="space-between" mb={3}>
          <Typography variant="h6" color="initial" fontWeight="bold">
            Subscription History
          </Typography>
        </Stack>
       
          <SubscriptionsTable />
        
      </Box>
    </Box>
  );
}

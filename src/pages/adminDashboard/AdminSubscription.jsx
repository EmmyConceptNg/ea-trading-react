import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";


import { useSelector } from "react-redux";




import SkeletonLoader from "../../components/loader/TableLoader";

import SubscriptionsTable from "../../components/adminDashboard/SubscriptionsTable";
export default function AdminSubscriptions() {
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  
 
  return (
    <Box>
     
      <Box >
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

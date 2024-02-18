import { Button, Container, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";


import { useSelector } from "react-redux";

import AdminWithdrawalsTable from "../../components/adminDashboard/AdminWithdrawalsTable";

export default function AdminWithdrawals() {
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  
  return (
    <Container>
      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Typography variant="h6" color="initial" fontWeight="bold">
          All Withdrawals
        </Typography>
       
      </Stack>
      
        <AdminWithdrawalsTable />
      


    </Container>
  );
}

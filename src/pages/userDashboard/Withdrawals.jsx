import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";


import { useSelector } from "react-redux";




import SkeletonLoader from "../../components/loader/TableLoader";
import WithdrawalsTable from "../../components/userDashboard/WithdrawalsTable";
import WithdrawalModal from "../../components/userDashboard/WithdrawalModal";
import axios from "../../api/axios";
import { notify } from "../../utils/utils";
import moment from "moment";
export default function Withdrawals() {
  const user = useSelector((state) => state.user);
const [open, setOpen] = useState(false)
  const navigate = useNavigate();

  const handleWithdrawal = () =>{
    if(!kycVerified){
      notify('You cannot make withdrawals until your account is verified', 'error')
      return false
    }

    const currentDayOfWeek = moment().day();
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    // Get the name of the current day of the week
    const currentDayName = daysOfWeek[currentDayOfWeek];

    if(currentDayName !== 'Sunday'){
      notify(
        "Sorry, you can only make withdrawals on Sunday",
        "error"
      );
      return false;
    }
setOpen(true);
 setRefresh(true);
  }

   const [kycVerified, setKycVerified] = useState(user?.verified || false);
   useEffect(() => {
     axios.get(`/api/auth/kyc-status/${user?._id}`).then((response) => {
       setKycVerified(response.data.kycStatus);
     });
   }, []);

   const [refresh, setRefresh] = useState(false)

  return (
    <Box>
      <Stack direction={{ lg:"row", md : 'row', sm :'column', xs : 'column' }} justifyContent="space-between" mb={3}>
        <Typography variant="h6" color="initial" fontWeight="bold">
          Withdrawals
        </Typography>
        <Button variant="contained"  onClick={handleWithdrawal} >
          Request Withdrawal
        </Button>
      </Stack>

      <WithdrawalsTable refresh={refresh} />
      <WithdrawalModal open={open} setOpen={setOpen} user={user}  setRefresh={setRefresh} />
    </Box>
  );
}

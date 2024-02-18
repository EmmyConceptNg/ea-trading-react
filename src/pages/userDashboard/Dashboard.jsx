import { Icon } from "@iconify/react";
import { Box, Button, Container, Grid, IconButton, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import Text from "../../components/utils/Text";
import Chart from "../../components/userDashboard/Chart";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "../../api/axios";

export default function Dashboard() {
  const user = useSelector((state) => state.user);
  const [showMessage, setShowMessage] = useState(false);
  const [balancesVisible, setBalancesVisible] = useState([false, false, false, false]);

  const [dash, setDash] = useState({
    balance: 0,
    totalRoi: 0,
    totalWithdrawal: 0,
    availableRoi: 0,
  });

  useEffect(() => {
    axios.get(`/api/dashboard/${user?._id}`).then((response) => {
      setDash((prev) => ({
        prev,
        balance: response.data.balance,
        totalRoi: response.data.totalRoi,
        availableRoi: response.data.availableRoi,
        totalWithdrawal: response.data.totalWithdrawal,
        referralEarned : response.data.referralEarned,
        botAmount : response.data.botAmount,
        totalAmount : response.data.totalAmount,
        referralCount : response.data.referralCount
      }));
    });
  },[]);
  const [kycVerified, setKycVerified] = useState(user?.verified || false);

  const toggleBalancesVisibility = (index) => {
    const updatedVisibility = [...balancesVisible];
    updatedVisibility[index] = !updatedVisibility[index];
    setBalancesVisible(updatedVisibility);
  };

  const navigate = useNavigate();

  useEffect(() => {
    // Delay showing the message by a few seconds
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 3000); // Adjust the delay time as needed (in milliseconds)

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    axios.get(`/api/auth/kyc-status/${user?._id}`).then((response) => {
      setKycVerified(response.data.kycStatus);
    });
  }, []);

  return (
    <Container>
      {!user?.subscribed && (
        <Box
          bgcolor="#FFB849"
          width="100%"
          borderRadius="9px"
          mb={2}
          p={2}
          sx={{
            transition: "transform 0.5s ease",
            transform: showMessage ? "translateX(0)" : "translateX(-150%)",
          }}
        >
          <Text fs="16px" fw="600" color="#fff" sx={{ textAlign: "center" }}>
            Please wait while your payment is being verified
          </Text>
        </Box>
      )}
      {!user?.identity ? (
        <Box
          bgcolor="#4dabf5"
          sx={{
            transition: "transform 0.5s ease",
            transform: showMessage ? "translateX(0)" : "translateX(-150%)",
          }}
          width="100%"
          borderRadius="9px"
          mb={4}
          p={2}
        >
          <Text fs="16px" fw="600" color="#fff" sx={{ textAlign: "center" }}>
            You need to verify your identity before your account can be
            activated.{" "}
            <Button
              color="secondary"
              onClick={() => navigate("/dashboard/kyc")}
            >
              Click to Verify
            </Button>
          </Text>
        </Box>
      ) : (
        !kycVerified && (
          <Box
            bgcolor="#4dabf5"
            sx={{
              transition: "transform 0.5s ease",
              transform: showMessage ? "translateX(0)" : "translateX(-150%)",
            }}
            width="100%"
            borderRadius="9px"
            mb={4}
            p={2}
          >
            <Text fs="16px" fw="600" color="#fff" sx={{ textAlign: "center" }}>
              Your account is currently undergoing verification. Please hold on
              as we verify your account
            </Text>
          </Box>
        )
      )}
      <Grid container spacing={2}>
        {[
          {
            icon: "material-symbols:account-balance-wallet",
            color: "#744BAB",
            name: "Estimated Balance",
            amount: `£${dash.balance}`,
            botAmount: `£${dash.botAmount}`,
          },
          {
            icon: "material-symbols:account-balance-wallet",
            color: "#FFB849",
            name: "Available ROI",
            amount: `£${dash.totalAmount}`,
            roi: `£${dash.availableRoi}`,
            referralEarned: `£${dash.referralEarned}`,
          },
          {
            icon: "material-symbols:account-balance-wallet",
            color: "#FA5A7D",
            name: "Number of Referral",
            amount: `${dash.referralCount}`,
          },
          {
            icon: "material-symbols:account-balance-wallet",
            color: "#9181DB",
            name: "Total Withdrawal",
            amount: `£${dash.totalWithdrawal}`,
          },
        ].map((item, index) => (
          <Grid item md={3} lg={3} sm={6} xs={12} key={index}>
            <Box
              bgcolor="#fff"
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
                    color={item.color}
                    icon={item.icon}
                    width={32}
                    height={32}
                  />
                </Box>
                <Text
                  my="auto"
                  fs="16px"
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
                {balancesVisible[index] ? `${item.amount}` : "******"}
              </Text>
              {item?.botAmount && (
                <Text
                  fs="14px"
                  fw="400"
                  color="green"
                  sx={{ textAlign: "left" }}
                >
                  Amount Subscribed:{" "}
                  {balancesVisible[index] ? `${item?.botAmount}` : "******"}
                </Text>
              )}
              <Stack direction="row" justifyContent="space-between">
                {item?.roi && (
                  <Text
                    fs="14px"
                    fw="400"
                    color="green"
                    sx={{ textAlign: "left" }}
                  >
                    ROI: {balancesVisible[index] ? `${item?.roi}` : "******"}
                  </Text>
                )}
                {item?.roi && (
                  <Text
                    fs="14px"
                    fw="400"
                    color="green"
                    sx={{ textAlign: "left" }}
                  >
                    referral:{" "}
                    {balancesVisible[index]
                      ? `${item?.referralEarned}`
                      : "******"}
                  </Text>
                )}
              </Stack>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Box mt={3}>
        <Chart />
      </Box>
    </Container>
  );
}

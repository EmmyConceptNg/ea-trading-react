import { Icon } from "@iconify/react";
import { Box, Container, Grid, IconButton } from "@mui/material";
import React, { useState } from "react";
import Text from "../../components/utils/Text";
import Chart from "../../components/userDashboard/Chart";

export default function Dashboard() {

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

  return (
    <Container>
      <Grid container spacing={2}>
        {[
          {
            icon: "material-symbols:account-balance-wallet",
            color: "#744BAB",
            name: "Estimated Balance",
            amount: "$123,987",
            profit: "",
          },
          {
            icon: "material-symbols:account-balance-wallet",
            color: "#FFB849",
            name: "Total ROI",
            amount: "$123,987",
            profit: "",
          },
          {
            icon: "material-symbols:account-balance-wallet",
            color: "#9181DB",
            name: "Total Withdrawal",
            amount: "$123,987",
            profit: "",
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
                {balancesVisible[index] ? item.amount : "******"}
              </Text>
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

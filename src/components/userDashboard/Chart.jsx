import { Box } from "@mui/material";
import React from "react";
import TradeViewChart from "react-crypto-chart";

export default function Chart() {
  return (
    <Box>
      <Box bgcolor="#fff" p={3} borderRadius="15px" sx={{ overflow: "hidden" }}>
        <TradeViewChart
          containerStyle={{
            height: "300px",
            minWidth: "400px",
            marginBottom: "50px",
          }}
          pair="BTCUSDT"
        />
      </Box>
      {/* <Box bgcolor="#fff" p={3} borderRadius="15px" sx={{ overflow: "hidden" }}>
        <TradeViewChart
          containerStyle={{
            height: "300px",
            minWidth: "400px",
            marginBottom: "50px",
          }}
          pair="ETHUSDT"
        />
      </Box> */}
    </Box>
  );
}

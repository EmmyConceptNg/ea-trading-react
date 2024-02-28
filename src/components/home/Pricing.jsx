import { Box, Button, Grid } from '@mui/material'
import React, {useState} from 'react'
import Text from '../utils/Text';
import SubscriptionModal from './SubscriptionModal';

export default function Pricing() {
  const [bot, setBot] = useState({})
  const [open, setOpen] = useState(false)


  const handleInvest = (item) =>{
    setBot(item);
    setOpen(true)
  }
  return (
    <>
    <Box>
      <Box>
        <Text
          my="auto"
          fs="48px"
          fw="500"
          color="#FFF"
          mx="auto"
          sx={{
            textAlign: "center",
          }}
        >
          Pricing
        </Text>
        <Text
          my="auto"
          fs="24px"
          fw="400"
          color="#A5A3A8"
          mx="auto"
          sx={{
            textAlign: "center",
          }}
        >
          Select the best Bot that suits your budget
        </Text>
      </Box>

      <Grid container justifyContent="space-between" spacing={5} mt={3}>
        {[
          {
            name: "BOT 1",
            amount: "300",
            roi: "10",
            months: "6-12",
          },
          {
            name: "BOT 2",
            amount: "1200",
            roi: "15",
            months: "6-12",
          },
          {
            name: "BOT 3",
            amount: "1800",
            roi: "20",
            months: "6-12",
          },
        ].map((item, index) => (
          <Grid item md={4} lg={4} sm={6} xs={12} key={index}>
            <Box
              sx={{
                backgroundImage: "url('/assets/images/pricing.svg')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                minHeight: "381px",
                overflow: "hidden",
                py: { md: 5, sm: 2, xs: 2, lg: 5, xl: 5 },
                display: "flex",
              }}
            >
              <Box
                my="auto"
                mx="auto"
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Text
                  mb={20}
                  my="auto"
                  fs="32px"
                  fw="800"
                  color="#fff"
                  mx="auto"
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  mb={20}
                  my="auto"
                  fs="25px"
                  fw="800"
                  color="#fff"
                  mx="auto"
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {`Minimum Deposit £ ${item.amount}`}
                </Text>
                <Text
                  my="auto"
                  fs="16px"
                  fw="400"
                  color="#A5A3A8"
                  mx="auto"
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {item.roi}% Weekly ROI
                </Text>
                <Text
                  my="auto"
                  fs="16px"
                  fw="400"
                  color="#A5A3A8"
                  mx="auto"
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {item.months} months Investment
                </Text>
                <Text
                  my="auto"
                  fs="16px"
                  fw="400"
                  color="#A5A3A8"
                  mx="auto"
                  sx={{
                    textAlign: "center",
                  }}
                >
                  Weekly ROI withdrawal
                </Text>
                <Box mt={5}>
                  <Button variant="contained" onClick={() => handleInvest(item)} color="secondary">
                    Invest
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
    <SubscriptionModal open={open} setOpen={setOpen} bot={bot}  />
    </>
  );
}

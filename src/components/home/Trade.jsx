import { Grid, Box, Typography, Button } from "@mui/material";
import React from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";

export default function Trade() {

    const navigate = useNavigate()
  return (
    <Grid container spacing={3} justifyContent="space-between" sx={{ mt: 3 }}>
      <Grid item xs={12} md={6} lg={6} sx={{ display: "flex", py: 5 }}>
        <Box sx={{ my: "auto" }}>
          <Typography
            variant="h1"
            sx={{
              color: "#fff",
              fontWeight: "bold",
              lineSpacing: "auto",
              lineHeight: {
                md: "68px",
                xs: "40px",
                sm: "40px",
                lg: "68px",
              },
              fontSize: {
                md: "40px",
                xs: "40px",
                sm: "40px",
                lg: "40px",
              },
              mb: 3,
              textAlign: {
                lg: "left",
                md: "left",
                sm: "center",
                xs: "center",
              },
            }}
          >
            Trade with confidence with Our platform and easy to use.
          </Typography>

          <Typography
            sx={{
              color: "#fff",
              fontWeight: "light",
              mb: 3,
              fontSize: {
                lg: "16px",
                md: "16px",
                sm: "12px",
                xs: "12px",
              },
              textAlign: {
                lg: "left",
                md: "left",
                sm: "center",
                xs: "center",
              },
              lineHeight: {
                md: "28px",
                xs: "18px",
                sm: "18px",
                lg: "28px",
              },
            }}
          >
            Stay up-to-date with the latest news and trends in the crypto space.
            Follow our market insights to make informed decisions.
          </Typography>
          <Box display="flex">
            <Box
              sx={{
                mx: {
                  md: 0,
                  lg: 0,
                  xs: "auto",
                  sm: "auto",
                },
              }}
            >
              <Link
                style={{
                  color: "#fff",
                  cursor: "pointer",
                }}
                to="pricing"
                smooth={true}
                duration={500}
              >
                <Button
                  sx={{
                    mx: {
                      md: 0,
                      lg: 0,
                      xs: "auto",
                      sm: "auto",
                    },
                    width: "198px",
                  }}
                  variant="outlined"
                  color="secondary"
                  size="large"
                >
                  Invest Now
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item md={6}>
        <Box display="flex">
          <Box
            my="auto"
            component="img"
            src="/assets/images/bitcoin-tower.png"
            sx={{ width: "100%" }}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

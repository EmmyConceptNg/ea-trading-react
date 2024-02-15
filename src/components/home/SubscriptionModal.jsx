import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";


import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import QRCode from "react-qr-code";
import { useState } from "react";
import Text from "../utils/Text";
import { notify } from "../../utils/utils";
import { ArrowBack, CopyAll } from "@mui/icons-material";
import { ToastContainer } from "react-toastify";
import { LoadingButton } from "@mui/lab";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
export default function SubscriptionModal({ open, setOpen, bot, wallet }) {
  const [register, setRegister] = useState(false);
    const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const handleCopyAddress =()=>{
    navigator.clipboard.writeText('text');
    notify('Wallet Address Copied', 'success')
  }

  const [payload, setPayload] = useState({
    email : '',
    network : '',
    walletAddress : '',
  })
  const handleChange = (e) => {
    setPayload({...payload, [e.target.name] : e.target.value})
  }
  
  const handleSubmit = e =>{
    e.preventDefault()
    notify('Thank you for subscribing. Once payment is confirmed, an email will be sent to you containing your login Details', 'success')
    setOpen(false)
  }
  return (
    <>
      <ToastContainer />
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        PaperProps={{
          sx: {
            width: "500px", // Set the desired width here
          },
        }}
        BackdropProps={{
          onClick: handleClose,
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Subscribe to {bot?.name}
          </Typography>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {!register && (
            <Box>
              <Text
                my="auto"
                fs="16px"
                fw="700"
                color="#00"
                mx="auto"
                sx={{
                  textAlign: "center",
                }}
              >
                Scan QR Code below or copy wallet Address
              </Text>
              <Box
                display={"flex"}
                alignItems="center"
                justifyContent="center"
                p={5}
              >
                <QRCode
                  size={100}
                  style={{ height: "auto", maxWidth: "100%", width: "50%" }}
                  value={"jdieoemdso"}
                  viewBox={`0 0 256 256`}
                />
              </Box>
              <Box>
                <Text
                  my="auto"
                  fs="16px"
                  fw="600"
                  color="#000"
                  sx={{
                    textAlign: "center",
                  }}
                >
                  Bitcoin wallet Address
                </Text>
              </Box>

              <Stack
                mx="auto"
                direction="row"
                spacing={3}
                justifyContent="center"
                alignItems="center"
              >
                <Text
                  my="auto"
                  fs="16px"
                  fw="400"
                  color="#000"
                  sx={{
                    textAlign: "left",
                  }}
                >
                  1X009030f0v9030vd890
                </Text>
                <IconButton aria-label="" onClick={handleCopyAddress}>
                  <CopyAll />
                </IconButton>
              </Stack>
              <Box display="flex">
                <Button
                  sx={{ mx: "auto", mt: 2 }}
                  variant="contained"
                  onClick={() => {
                    setRegister(true);
                  }}
                >
                  Proceed
                </Button>
              </Box>
            </Box>
          )}

          {register && (
            <Box component="form" onSubmit={handleSubmit}>
              <Button
                startIcon={<ArrowBack />}
                onClick={() => setRegister(false)}
              >
                Go Back
              </Button>
              <Stack spacing={2}>
                <FormControl variant="outlined" sx={{ width: "100%" }}>
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <OutlinedInput
                    required
                    id="email"
                    type="email"
                    name="email"
                    value={payload.email}
                    onChange={handleChange}
                    label="Email"
                  />
                </FormControl>
                <FormControl>
                  <InputLabel id="network">Network</InputLabel>
                  <Select
                    size="small"
                    labelId="network"
                    id="network"
                    name="network"
                    value={payload.network}
                    onChange={handleChange}
                    label="Network"
                  >
                    <MenuItem value="">
                      <em>Select Network</em>
                    </MenuItem>

                    <MenuItem value="BITCOIN">BTC</MenuItem>
                    <MenuItem value="ETHEREUM">ETH</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="outlined" sx={{ width: "100%" }}>
                  <InputLabel htmlFor="walletAddress">
                    Wallet Address
                  </InputLabel>
                  <OutlinedInput
                    required
                    id="walletAddress"
                    type="walletAddress"
                    name="walletAddress"
                    value={payload.walletAddress}
                    onChange={handleChange}
                    label="Wallet Address"
                  />
                </FormControl>

                <Box display="flex">
                  <LoadingButton type="submit" variant="contained">
                    Save
                  </LoadingButton>
                </Box>
              </Stack>
            </Box>
          )}
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}

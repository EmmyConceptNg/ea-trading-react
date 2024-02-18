import {
  Box,
  Button,
  CircularProgress,
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
import { useState, useEffect } from "react";
import Text from "../utils/Text";
import { notify } from "../../utils/utils";
import { ArrowBack, CopyAll } from "@mui/icons-material";
import { ToastContainer } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import axios from "../../api/axios";
import WalletSwitch from "../utils/WalletSwitch";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
export default function SubscriptionModal({ open, setOpen, bot }) {
  
  const [register, setRegister] = useState(false);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(
      wallet === "Ethereum" ? walletAddress?.ethereum : walletAddress?.bitcoin
    );
    notify("Wallet Address Copied", "success");
  };
  const [loading, setLoading] = useState(true);

  const [walletAddress, setWalletAddress] = useState({});

  const [wallet, setWallet] = useState("Ethereum");

  const [save, setSave] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/admin/wallet-address")
      .then((response) => {
        setWalletAddress(response.data.walletAddress[0]);

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        notify("An error occurred. Please try again later", "error");
      });
  }, []);

  const [payload, setPayload] = useState({
    email: "",
    network: "",
    walletAddress: "",
    duration: "",
    referral: "",
  });
  const handleChange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [checkingReferral, setCheckingReferral] = useState(false);

  const validateReferral = (code) =>{
   if(code.length >= 6){
     setCheckingReferral(true);
     axios
       .get(`/api/referral/${code}`, {
         headers: {
           "Content-Type": "application/json",
         },
       })
       .then((response) => {
        setErrorMsg('')
         setSuccessMsg(response.data.message);
         setPayload({ ...payload, referral: response.data.referralCode });
         setCheckingReferral(false);
       })
       .catch((error) => {
        setSuccessMsg('')
         setErrorMsg(error.response.data.error);
         setCheckingReferral(false);
       });
   }
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSave(true);
const newData = { bot : {...bot}, ...payload };

    axios
      .post("/api/auth/register", newData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        notify(
          "Thank you for subscribing. Once payment is confirmed, an email will be sent to you containing your login Details",
          "success"
        );
        setSave(false);
        setOpen(false);
      })
      .catch((error) => {
        notify(error?.response?.data?.error, "error");
        setSave(false);
      });
  };
  return (
    <>
      <ToastContainer />
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        PaperProps={{
          sx: {
            width: "500px",
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
          s
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
          {!register &&
            (loading ? (
              <Box display="flex">
                <CircularProgress mx="auto" />
              </Box>
            ) : (
              <Box>
                <Box display="flex">
                  <Box mx="auto">
                    <Box display="flex" alignItems={"center"}>
                      <WalletSwitch wallet={wallet} setWallet={setWallet} />
                    </Box>
                  </Box>
                </Box>
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
                    value={
                      wallet === "Ethereum"
                        ? walletAddress?.ethereum
                        : wallet === "Bitcoin"
                        ? walletAddress?.bitcoin
                        : "12"
                    }
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
                    {wallet} wallet Address
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
                    {wallet === "Ethereum"
                      ? walletAddress?.ethereum
                      : walletAddress?.bitcoin}
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
            ))}

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

                <FormControl>
                  <InputLabel id="duration">Duration</InputLabel>
                  <Select
                    size="small"
                    labelId="duration"
                    id="duration"
                    name="duration"
                    value={payload.duration}
                    onChange={handleChange}
                    label="duration"
                  >
                    <MenuItem value="">
                      <em>Select Duration</em>
                    </MenuItem>

                    <MenuItem value="6">6 Months</MenuItem>
                    <MenuItem value="12">12 Months</MenuItem>
                  </Select>
                </FormControl>

                <Stack direction="row" spacing={2}>
                  <FormControl variant="outlined" sx={{ width: "100%" }}>
                    <InputLabel htmlFor="referral">
                      Referral Code (optional)
                    </InputLabel>
                    <OutlinedInput
                      required
                      id="referral"
                      type="referral"
                      name="referral"
                      onChange={(e) => validateReferral(e.target.value)}
                      label="Referral Code (Optional)"
                    />
                  </FormControl>
                  {checkingReferral && <CircularProgress />}
                </Stack>
                <Box>
                  {errorMsg && (
                    <Text color="red" fs="14px" fw="400">
                      {errorMsg}
                    </Text>
                  )}
                  {successMsg && (
                    <Text color="green" fs="14px" fw="400">
                      {successMsg}
                    </Text>
                  )}
                </Box>

                <Box display="flex">
                  <LoadingButton
                    loading={save}
                    type="submit"
                    variant="contained"
                  >
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

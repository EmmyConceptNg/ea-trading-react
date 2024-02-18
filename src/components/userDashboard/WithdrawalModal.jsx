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
export default function WithdrawalModal({ open, setOpen, user, setRefresh }) {
  const handleClose = () => {
    setOpen(false);
    setRefresh(true);
  };
  const navigate = useNavigate();

  const [save, setSave] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [payload, setPayload] = useState({
    amount: "",
  });
  const handleChange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSave(true);

    if (payload.amount === "") {
      notify("Please enter a valid number", "error");
      setErrorMsg("Please enter a valid number");
      setSave(false);
      return false;
    }

    const newData = { userId: user?._id, ...payload };

    axios
      .post("/api/withdrawals/request", newData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        notify(response.data.message, "success");
        setRefresh(true);
        setSave(false);
        setOpen(false);
      })
      .catch((error) => {
        notify(error?.response?.data?.error, "error");
        setErrorMsg(error?.response?.data?.error);
        setRefresh(true);
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
            Withdrawal Request
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
          <Text fs="16px" fw="600" color="#000" sx={{ textAlign: "center" }}>
            Please fill out this withdrawal form
          </Text>

          <Box component="form" onSubmit={handleSubmit} mt={5}>
            <Stack spacing={2}>
              <FormControl variant="outlined" sx={{ width: "100%" }}>
                <InputLabel htmlFor="email">Enter Amount</InputLabel>
                <OutlinedInput
                  required
                  id="amount"
                  type="number"
                  name="amount"
                  value={payload.amount}
                  onChange={handleChange}
                  label="Enter Amount"
                />
              </FormControl>
              {/* <FormControl>
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

                 */}
              <Box>
                {errorMsg && (
                  <Text
                    fs="14px"
                    fw="400"
                    color="red"
                    sx={{ textAlign: "center" }}
                  >
                    {errorMsg}
                  </Text>
                )}
              </Box>
              <Box display="flex">
                <LoadingButton loading={save} type="submit" variant="contained">
                  Request Withdrawal
                </LoadingButton>
              </Box>
            </Stack>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}

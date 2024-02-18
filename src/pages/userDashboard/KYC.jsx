
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axios from "../../api/axios";
import { notify } from "../../utils/utils";



export default function KYC() {
  const [loadButton, setLoadButton] = useState(false);
  const user = useSelector(state => state.user)
   const [payload, setPayload] = useState({
     firstName: "",
     lastName: "",
     identityType: "",
     identityImage: null,
     profileImage: null,
     network: "",
     walletAddress: "",
   });

  const navigate = useNavigate();

   const handleChange = (e) => {
     const { name, value, files } = e.target;
     setPayload((prevState) => ({
       ...prevState,
       [name]: files ? files[0] : value, 
     }));
   };

   const dispatch = useDispatch()
  const handleKYC = (e) => {
    e.preventDefault();
    setLoadButton(true);
    const formData = new FormData();

    // Append form data
    Object.entries(payload).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.append("userId", user?._id);

    axios
      .post("/api/auth/kyc", formData)
      .then((response) => {
        setLoadButton(false);
        notify(response.data.message, "success");
dispatch({type:'SET_USER', payload : response.data.user})
        navigate('/dashboard')
      })
      .catch((err) => {
        setLoadButton(false);
        notify(err.response.data.error, "error");
      });
  };
  return (
    <>
      <ToastContainer />
      <Container>
        <Card sx={{ p: 3 }}>
          <Box component="form" onSubmit={handleKYC}>
            <Stack spacing={2}>
              <FormControl variant="outlined" sx={{ width: "100%" }}>
                <InputLabel htmlFor="firstName">First Name</InputLabel>
                <OutlinedInput
                  required
                  id="firstName"
                  type="firstName"
                  name="firstName"
                  value={payload.firstName}
                  onChange={handleChange}
                  label="First Name"
                />
              </FormControl>
              <FormControl variant="outlined" sx={{ width: "100%" }}>
                <InputLabel htmlFor="lastName">Last Name</InputLabel>
                <OutlinedInput
                  required
                  id="lastName"
                  type="lastName"
                  name="lastName"
                  value={payload.lastName}
                  onChange={handleChange}
                  label="Last Name"
                />
              </FormControl>
              <FormControl>
                <InputLabel id="identityType">Identity Type</InputLabel>
                <Select
                  size="small"
                  labelId="identityType"
                  id="identityType"
                  name="identityType"
                  value={payload.identityType}
                  onChange={handleChange}
                  label="identityType"
                >
                  <MenuItem value="">
                    <em>Select Identity Type</em>
                  </MenuItem>

                  <MenuItem value="NATIONAL_ID_CARD">National ID Card</MenuItem>
                  <MenuItem value="VOTERS_CARD">VOTER'S CARD</MenuItem>
                  <MenuItem value="NIN">NIN</MenuItem>
                  <MenuItem value="DRIVERS_LICENCE">DRIVER'S LICENCE</MenuItem>
                </Select>
              </FormControl>

              <Box>
                <InputLabel id="subject">Upload Document</InputLabel>
                <TextField
                  type="file"
                  fullWidth
                  name="identityImage"
                  size="small"
                  onChange={handleChange}
                />
              </Box>

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
                <InputLabel htmlFor="walletAddress">Wallet Address</InputLabel>
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

              <Box>
                <InputLabel id="subject">Profile Image </InputLabel>
                <TextField
                  type="file"
                  fullWidth
                  name="profileImage"
                  size="small"
                  onChange={handleChange}
                />
              </Box>

              <Stack spacing={2} direction="row">
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={loadButton}
                >
                  Activate Account
                </LoadingButton>
              </Stack>
            </Stack>
          </Box>
        </Card>
      </Container>
    </>
  );
}

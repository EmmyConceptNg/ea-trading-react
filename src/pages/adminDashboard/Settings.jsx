import { Edit, Save, Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axios from "../../api/axios";
import { notify } from "../../utils/utils";
import Text from "../../components/utils/Text";
import { useSelector } from "react-redux";

export default function Settings() {
  const [loadButton, setLoadButton] = useState(false);
  const [wallet, setWallet] = useState({});

  const [payload, setPayload] = useState({
    bitcoinAddress: "",
    ethereumAddress: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files) {
      setPayload({ ...payload, [e.target.name]: e.target.files[0] });
    }
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const handleUpdateSettings = (e) => {
    e.preventDefault();
    setLoadButton(true);
    axios
      .post(
        "/api/admin/wallet-address",
        {
          ethereumAddress: payload?.ethereumAddress,
          bitcoinAddress: payload?.bitcoinAddress,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        setWallet(response.data.walletAddress);
        setLoadButton(false);
      })
      .catch((error) => {
        notify(error.response.data.error, "error");
        setLoadButton(false);
      });
  };

  useEffect(() => {
    axios
      .get("/api/admin/wallet-address", {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setWallet(response.data.walletAddress[0]);
        setPayload({
          ...payload,
          bitcoinAddress: response.data.walletAddress[0].bitcoin,
          ethereumAddress: response.data.walletAddress[0].ethereum,
        });
      });
  }, []);

  const [editBtc, setEditBtc] = useState(false);
  const [editEth, setEditEth] = useState(false);

  const handleClickEditBtc = () => setEditBtc((edit) => !edit);
  const handleClickEditEth = () => setEditEth((edit) => !edit);

  const handleMouseDownBtc = (event) => {
    event.preventDefault();
  };
  const handleBlurBtc = (event) => {
    event.preventDefault();
    setEditBtc(false);
  };
  const handleMouseDownEth = (event) => {
    event.preventDefault();
  };
  const handleBlurEth = (event) => {
    event.preventDefault();
    setEditEth(false);
  };
  return (
    <>
      <ToastContainer />
      <Container>
        <Card sx={{ p: 3, borderRadius: "15px" }}>
          <Box component="form" onSubmit={handleUpdateSettings}>
            <Stack spacing={2}>
              <FormControl variant="outlined" sx={{ width: "100%" }}>
                <InputLabel htmlFor="bitcoinAddress">
                  Bitcoin Wallet Address
                </InputLabel>
                <OutlinedInput
                  required
                  id="bitcoinAddress"
                  type="bitcoinAddress"
                  name="bitcoinAddress"
                  value={payload.bitcoinAddress}
                  onChange={handleChange}
                  label="Bitcoin Wallet Address"
                  readOnly={!editBtc}
                  onBlur={handleBlurBtc}
                  endAdornment={
                    <InputAdornment position="end">
                      {!editBtc && (
                        <IconButton
                          aria-label="toggle edit  bitcoin address"
                          onClick={handleClickEditBtc}
                          onMouseDown={handleMouseDownBtc}
                          edge="end"
                        >
                          <Edit />
                        </IconButton>
                      )}
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl variant="outlined" sx={{ width: "100%" }}>
                <InputLabel htmlFor="ethereumAddress">
                  Ethereum Wallet Address
                </InputLabel>
                <OutlinedInput
                  required
                  id="ethereumAddress"
                  type="ethereumAddress"
                  name="ethereumAddress"
                  value={payload.ethereumAddress}
                  readOnly={!editEth}
                  onBlur={handleBlurEth}
                  onChange={handleChange}
                  label="Ethereum Wallet Address"
                  endAdornment={
                    <InputAdornment position="end">
                      {!editEth && (
                        <IconButton
                          aria-label="toggle edit  ethereum address"
                          onClick={handleClickEditEth}
                          onMouseDown={handleMouseDownEth}
                          edge="end"
                        >
                          <Edit />
                        </IconButton>
                      )}
                    </InputAdornment>
                  }
                />
              </FormControl>

              <Box display="flex" mt={2}>
                <LoadingButton
                  sx={{ ml: "auto" }}
                  startIcon={<Save />}
                  type="submit"
                  variant="contained"
                  loading={loadButton}
                >
                  Save Details
                </LoadingButton>
              </Box>
            </Stack>
          </Box>
        </Card>
        <ChangePass />
      </Container>
    </>
  );
}

const ChangePass = () => {
  const [loadPassword, setLoadPassword] = useState(false)
  const user = useSelector(state =>state.user)
  const [payload, setPayload] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };

  

  const [showOldPassword, setShowOldPassword] = useState(false);

  const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);

  const handleMouseDownOldPassword = (event) => {
    event.preventDefault();
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
setLoadPassword(true)
    if (payload.password !== payload.confirmPassword) {
      notify("New Password Mismatch", "error");
      setLoadPassword(false)
      return false;
    }

    const newData = { ...payload, userId: user?._id };
    axios
      .post("/api/admin/settings/change-password", newData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {notify(response.data.message, "success"); setLoadPassword(false); setPayload({ oldPassword: "", password: "", confirmPassword: "" });})
      .catch((error) => {notify(error.response.data.error, "error"); setLoadPassword(false);});
  };

  return (
    <>
      <Box my={5}>
        <Text fw="600" fs="24px" color="#000">
          Manage Password
        </Text>
      </Box>
      <Card sx={{ p: 3, borderRadius: "15px" }}>
        <Box my="auto" mx="auto">
          <Box
            bgcolor="#fff"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            padding="20px"
            borderRadius="15px"
            component="form"
            onSubmit={handleChangePassword}
          >
            <Stack spacing={2} mt={5} sx={{ width: "100%" }}>
              <FormControl variant="outlined" sx={{ width: "100%" }}>
                <InputLabel htmlFor="oldPassword">Old Password</InputLabel>
                <OutlinedInput
                  required
                  id="oldPassword"
                  type={showOldPassword ? "text" : "password"}
                  name="oldPassword"
                  value={payload.oldPassword}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowOldPassword}
                        onMouseDown={handleMouseDownOldPassword}
                        edge="end"
                      >
                        {showOldPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Old Password"
                />
              </FormControl>
              <FormControl variant="outlined" sx={{ width: "100%" }}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  required
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={payload.password}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <FormControl variant="outlined" sx={{ width: "100%" }}>
                <InputLabel htmlFor="confirm-password">
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  required
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={payload.confirmPassword}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                />
              </FormControl>

              <Box display="flex" mt={2}>
                <LoadingButton
                  sx={{ ml: "auto" }}
                  startIcon={<Save />}
                  type="submit"
                  variant="contained"
                  loading={loadPassword}
                >
                  Save Password
                </LoadingButton>
              </Box>
              
            </Stack>
          </Box>
        </Box>
      </Card>
    </>
  );
};

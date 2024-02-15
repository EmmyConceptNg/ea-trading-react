import React, { useState } from "react";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import Text from "../../components/utils/Text";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [payload, setPayload] = useState({
    email: "",
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

  const handleRegister = (e) => {
    e.preventDefault();
    navigate('/verify')
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box minHeight="100vh" bgcolor="#100819">
      <Box
        display="flex"
        sx={{
          backgroundImage: "url('/assets/images/gradient.svg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "auto",
          minHeight: "520px",
          overflow: "hidden",
          py: { md: 5, sm: 2, xs: 2, lg: 5, xl: 5 },
        }}
      >
        <Box my="auto" mx="auto" width={{ md: "40vw", sm: "70vw", xs: "80vw" }}>
          <Box
            bgcolor="#fff"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            padding="20px"
            borderRadius="15px"
            component="form"
            onSubmit={handleRegister}
          >
            <Box
              component="img"
              src="/assets/logo/logo.png"
              sx={{ height: "40px" }}
            />
            <Stack spacing={2} mt={5} sx={{ width: "100%" }}>
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
                <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
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
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                />
              </FormControl>

              <LoadingButton type="submit" variant="contained" color="primary">
                Register
              </LoadingButton>
            </Stack>
          </Box>
          <Box display="flex" mt={2} justifyContent="space-between" >
            <Box mx="auto">
              <Text
                fs="16px"
                fw="400"
                color="#A5A3A8"
                sx={{
                  cursor: "pointer",
                }}
                onClick={() => navigate("/login")}
              >
                Already have an account? Login
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

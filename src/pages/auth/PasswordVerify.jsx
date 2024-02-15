import React, { useState, useRef } from "react";
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

export default function PasswordVerify() {
  const [verificationCode, setVerificationCode] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);

  const navigate = useNavigate();
  const handleResendCode = () =>{}

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value.length > 1) return; // Limit input to 1 character
    const newVerificationCode = [...verificationCode];
    newVerificationCode[index] = value;
    setVerificationCode(newVerificationCode);
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !verificationCode[index]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerifyPassword = (e) => {
    e.preventDefault();
    const code = verificationCode.join("");
    navigate('/password/change')
  };

  return (
    <Box minHeight="100vh" bgcolor="#100819">
      <Box
        display="flex"
        flexDirection="column"
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
          <Box bgcolor="#fff" padding="20px" borderRadius="15px">
            <Text
              fs="16px"
              fw="400"
              color="#A5A3A8"
             
            >
              A verification code was sent to you email. Enter code to change your password
            </Text>
          </Box>
          <Box my={2}
            bgcolor="#fff"
            display="flex"
            flexDirection="column"
            
            justifyContent="center"
            padding="20px"
            borderRadius="15px"
            component="form"
            onSubmit={handleVerifyPassword}
          >
            <Stack direction="row" spacing={2} mx="auto" mb={3}>
              {verificationCode.map((digit, index) => (
                <TextField
                  key={index}
                  inputRef={(el) => (inputRefs.current[index] = el)}
                  variant="outlined"
                  type="text"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  size="small"
                  sx={{ width: "40px", m: 1 }}
                />
              ))}
            </Stack>
            <LoadingButton mt={2} type="submit" variant="contained" color="primary">
              Verify
            </LoadingButton>
          </Box>
          <Box display="flex">
            <Text mx="auto"
              fs="16px"
              fw="400"
              color="#A5A3A8"
              sx={{
                cursor: "pointer",
              }}
              onClick={handleResendCode}
            >
              Resend Code
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

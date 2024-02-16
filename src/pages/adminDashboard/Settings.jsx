
import { Edit } from "@mui/icons-material";
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
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";



export default function Settings() {
  const [loadButton, setLoadButton] = useState(false);
  const [payload, setPayload] = useState({
    bitcoinAddress : '',
    ethereumAddress : '',
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault()
    if(e.target.files){
        setPayload({ ...payload, [e.target.name]: e.target.files[0] });
    }
    setPayload( {...payload, [e.target.name] : e.target.value})
  }

  const handleUpdateSettings = (e) => {
    e.preventDefault();
    setLoadButton(true);
    
  };


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
        <Card sx={{ p: 3 }}>
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

              <Stack spacing={2} direction="row">
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={loadButton}
                >
                  Save Details
                </LoadingButton>
              </Stack>
            </Stack>
          </Box>
        </Card>
      </Container>
    </>
  );
}

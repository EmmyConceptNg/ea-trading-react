import React, { useState } from "react";
import { Switch, FormControlLabel } from "@mui/material";

const WalletSwitch = ({ wallet, setWallet }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = async() => {
    await setChecked((prev) => !prev);
    if (checked) {
      setWallet("Bitcoin");
    } else {
      setWallet("Ethereum");
    }
  };

  return (
    <FormControlLabel
      control={
        <Switch
          checked={checked}
          onChange={handleChange}
          color={checked ? "primary" : "secondary"}
        />
      }
      labelPlacement="start"
      label={wallet}
    />
  );
};

export default WalletSwitch;

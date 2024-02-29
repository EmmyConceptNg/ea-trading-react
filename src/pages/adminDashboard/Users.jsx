import { Box, Button, Container, Stack, Typography } from "@mui/material";

import UsersTable from "../../components/adminDashboard/UsersTable";
export default function Users() {

  

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Typography variant="h6" color="initial" fontWeight="bold">
          Users
        </Typography>
       
      </Stack>
      
        <UsersTable
        
        />
      
    </Box>
  );
}

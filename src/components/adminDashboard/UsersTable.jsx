import { Box, Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Button, IconButton, Menu, MenuItem } from '@mui/material'
import React, { useState } from "react";
import Text from '../utils/Text';
import { MoreVert } from '@mui/icons-material';
import Swal from 'sweetalert2';

export default function UsersTable({
  transactions,
  handleLoadMore,
  setTransactions,
  hasNextPage,
  paginationLoading,
  replaceItem,
  loadMore = true,
}) {


  const [anchorEls, setAnchorEls] = useState(Array(transactions.length).fill(null));

  const handleClick = (event, index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = event.currentTarget;
    setAnchorEls(newAnchorEls);
  };

  const handleClose = (index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = null;
    setAnchorEls(newAnchorEls);
  };


  const handleDelete = (id, index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = null;
    setAnchorEls(newAnchorEls);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      // if (result.isConfirmed) {
      //   axios
      //     .get(`/api/admin/quest/delete/${id}`)
      //     .then((response) => {
      //       console.log(response);
      //       setLessons((prevData) => prevData.filter((item) => item.id !== id));
      //     })
      //     .then(() => {
      //       Swal.fire("Deleted!", "Quest deleted.", "success");
      //     });
      //   // notify("Deleted Successfully", "success");
      // }
    });
  };

  const handleActivation = (id, index) => {
    // axios
    //   .post("/api/admin/quests/update-status", { id: id })
    //   .then((response) => {
    //     if (response.data.done) {
    //       notify(response.data.msg, "success");
    //       handleClose(index);
    //       replaceItem(index, response.data.quest);
    //     }
    //   });
  };
  return (
    <Box>
      <Box bgcolor="#fff" p={3} borderRadius="15px">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ background: "#F3F9FF" }}>
                {[
                  "S/N",
                  "First Name",
                  "Last Name",
                  "Email",
                  "Wallet Address",
                  "Network",
                  "Bot Name",
                  "Amount",
                  "Status",
                  "Action",
                ].map((table, _index) => (
                  <TableCell sx={{ fontWeight: "bold" }} key={_index}>
                    {table}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((user, index) => (
                // {quests.map(({ quest, subject, classes }, index) => (

                <TableRow
                  key={user.id}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                    background: index % 2 == 0 ? "#FFF" : "#F3F9FF",
                    cursor: "pointer",
                  }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user?.date}</TableCell>

                  <TableCell>{user?.wallet_address}</TableCell>
                  <TableCell>{user?.coin}</TableCell>
                  <TableCell>{user?.amount}</TableCell>

                  <TableCell>
                    <Text
                      style={{
                        textTransform: "capitalize",
                      }}
                      color={user?.status == "active" ? "green" : "red"}
                    >
                      {user?.status}
                    </Text>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={(event) => handleClick(event, index)}>
                      <MoreVert />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEls[index]}
                      keepMounted
                      open={Boolean(anchorEls[index])}
                      onClose={() => handleClose(index)}
                    >
                      <MenuItem
                        onClick={() => {
                          handleActivation(user?.id, index);
                        }}
                      >
                        {user.status === "active" ? "Deactivate" : "Activate"}
                      </MenuItem>
                    
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {loadMore && hasNextPage && (
        <Box sx={{ display: "flex", mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ borderRadius: "30px", mx: "auto" }}
            onClick={
              paginationLoading ? () => console.log("end") : handleLoadMore
            }
          >
            {paginationLoading ? "Loading..." : "Load More"}
          </Button>
        </Box>
      )}
    </Box>
  );
}

import { Box, Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material'
import React from 'react'
import Text from '../utils/Text';

export default function SubscriptionsTable({
  transactions,
  handleLoadMore,
  setTransactions,
  hasNextPage,
  paginationLoading,
  replaceItem,
}) {
  return (
    <Box>
      <Box bgcolor="#fff" p={3} borderRadius="15px">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ background: "#F3F9FF" }}>
                {[
                  "S/N",
                  "Transaction Date",
                  "Wallet Address",
                  "Coin",
                  "BOT",
                  "Amount",
                  "Status",
                ].map((table, _index) => (
                  <TableCell sx={{ fontWeight: "bold" }} key={_index}>
                    {table}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction, index) => (
                // {quests.map(({ quest, subject, classes }, index) => (

                <TableRow
                  key={transaction.id}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                    background: index % 2 == 0 ? "#FFF" : "#F3F9FF",
                    cursor: "pointer",
                  }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{transaction?.date}</TableCell>

                  <TableCell>{transaction?.wallet_address}</TableCell>
                  <TableCell>{transaction?.coin}</TableCell>
                  <TableCell>{transaction?.bot}</TableCell>
                  <TableCell>{transaction?.amount}</TableCell>

                  <TableCell>
                    <Text
                      style={{
                        textTransform: "capitalize",
                      }}
                      color={transaction?.status == "active" ? "green" : "red"}
                    >
                      {transaction?.status}
                    </Text>
                  </TableCell>
                  {/* <TableCell>
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
                          handleEdit(quest?.id);
                        }}
                      >
                        Edit
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          navigate(`/admin/quests/reports/${quest?.id}`);
                        }}
                      >
                        Report
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleActivation(quest?.id, index);
                        }}
                      >
                        {quest.status === "active" ? "Deactivate" : "Activate"}
                      </MenuItem>
                      <MenuItem onClick={() => handleDelete(quest?.id, index)}>
                        Delete
                      </MenuItem>
                    </Menu>
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {hasNextPage && (
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

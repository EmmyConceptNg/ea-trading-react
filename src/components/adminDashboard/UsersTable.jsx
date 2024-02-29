import {
  Box,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Text from "../utils/Text";
import { MoreVert } from "@mui/icons-material";
import Swal from "sweetalert2";
import { RenderPagination } from "../RenderPagination";
import axios from "../../api/axios";
import SkeletonLoader from "../loader/TableLoader";
import { notify } from "../../utils/utils";
import { getSuggestedQuery } from "@testing-library/react";
import { useNavigate } from "react-router-dom";

export default function UsersTable(dashboard = false) {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate()

  useEffect(() => {
    getUsers();
  }, [currentPage]);

  const getUsers = () => {
    setLoading(true);
    axios
      .get(`/api/admin/users?page=${currentPage}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setUsers(response.data.users);
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      });
  };

  const [anchorEls, setAnchorEls] = useState(Array(users.length).fill(null));

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
    axios
      .post("/api/admin/users/account-status", { userId: id })
      .then((response) => {
        notify(response.data.message, "success");
        handleClose(index);
        getUsers();
      })
      .catch((error) => notify(error?.response?.data?.error, "error"));
  };
  return (
    <Box>
      <Box bgcolor="#fff" p={{ md:3,lg:3,xs:1,sm:1 }} borderRadius="15px">
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
              {loading
                ? Array(4)
                    .fill("")
                    .map((item, i) => (
                      <TableRow key={i}>
                        {Array(10)
                          .fill("")
                          .map((item, i) => (
                            <TableCell key={i}>
                              <SkeletonLoader h="40px" />
                            </TableCell>
                          ))}
                      </TableRow>
                    ))
                : users.map((user, index) => (
                    <>
                      <TableRow
                        key={user.id}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                          background: index % 2 === 0 ? "#FFF" : "#F3F9FF",
                          cursor: "pointer",
                        }}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{user?.firstName}</TableCell>

                        <TableCell>{user?.lastName}</TableCell>
                        <TableCell>{user?.email}</TableCell>
                        <TableCell>{user?.wallet?.address}</TableCell>
                        <TableCell>{user?.wallet?.network}</TableCell>
                        <TableCell>{user?.bot?.name}</TableCell>
                        <TableCell>{`£${user?.bot?.amount}`}</TableCell>

                        <TableCell>
                          <Text
                            style={{
                              textTransform: "capitalize",
                            }}
                            color={user?.verified ? "green" : "red"}
                          >
                            {user?.verified ? "Verified" : "Pending"}
                          </Text>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={(event) => handleClick(event, index)}
                          >
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
                                navigate(`/admin/profile/${user?._id}`)
                              }}
                            >
                              View Profile
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                handleActivation(user?._id, index);
                              }}
                            >
                              {user.verified ? "Deactivate" : "Activate"}
                            </MenuItem>
                          </Menu>
                        </TableCell>
                      </TableRow>
                    </>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box mt={3}>
          {!loading && !users?.length > 0 && (
            <Text fw="600" fs="16px" color="#000" sx={{ textAlign: "center" }}>
              No User Available
            </Text>
          )}
        </Box>
      </Box>

      <RenderPagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </Box>
  );
}

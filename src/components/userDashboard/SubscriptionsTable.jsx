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
import { useSelector } from "react-redux";
import moment from "moment";

export default function SubscriptionsTable(dashboard = false) {
  const [loading, setLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const user = useSelector(state=>state.user)

  useEffect(() => {
    getSubscriptions();
  }, [currentPage]);

  const getSubscriptions = () => {
    setLoading(true);
    axios
      .get(`/api/subscriptions/${user?._id}?page=${currentPage}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setSubscriptions(response.data.subscriptions);
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      });
  };

  const [anchorEls, setAnchorEls] = useState(Array(subscriptions.length).fill(null));

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
      .post("/api/admin/subscriptions/account-status", { subscriptionId: id })
      .then((response) => {
        notify(response.data.message, "success");
        handleClose(index);
        getSubscriptions();
      })
      .catch((error) => notify(error?.response?.data?.error, "error"));
  };
  return (
    <Box>
      <Box bgcolor="#fff" p={{ md:3, lg:3, sm:1,xs:1 }} borderRadius="15px">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ background: "#F3F9FF" }}>
                {[
                  "S/N",
                  "Transaction Date",
                  "Wallet Address",
                  "Network",
                  "BOT",
                  "Amount",
                  "Duration",
                  "Status",
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
                        {Array(8)
                          .fill("")
                          .map((item, i) => (
                            <TableCell key={i}>
                              <SkeletonLoader h="40px" />
                            </TableCell>
                          ))}
                      </TableRow>
                    ))
                : subscriptions.map((subscription, index) => (
                    <>
                      <TableRow
                        key={subscription._id}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                          background: index % 2 === 0 ? "#FFF" : "#F3F9FF",
                          cursor: "pointer",
                        }}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          {moment(subscription?.date).format("MMMM Do YYYY")}
                        </TableCell>

                        <TableCell>{subscription?.wallet?.address}</TableCell>
                        <TableCell>{subscription?.wallet?.network}</TableCell>
                        <TableCell>{subscription?.bot?.name}</TableCell>
                        <TableCell>{`£${subscription?.bot?.amount}`}</TableCell>
                        <TableCell>{`${subscription?.duration} Months`}</TableCell>
                        <TableCell>
                          <Text
                            style={{
                              textTransform: "capitalize",
                            }}
                            color={subscription?.verified ? "green" : "red"}
                          >
                            {subscription?.verified ? "Verified" : "Pending"}
                          </Text>
                        </TableCell>
                      </TableRow>
                    </>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box mt={3}>
          {!loading && !subscriptions?.length > 0 && (
            <Text fw="600" fs="16px" color="#000" sx={{ textAlign: "center" }}>
              No Subscription Available
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

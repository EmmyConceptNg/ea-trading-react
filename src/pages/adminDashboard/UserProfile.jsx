import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Stack, Button, Avatar, Skeleton } from "@mui/material";
import { ToastContainer } from "react-toastify";

import { useSelector } from "react-redux";
import axios, { getImageUrl } from "../../api/axios";
import SkeletonLoader from "../../components/loader/TableLoader";
import Text from "../../components/utils/Text";
import { ArrowBack, CheckCircle } from "@mui/icons-material";
import { notify } from "../../utils/utils";
import { LoadingButton } from "@mui/lab";

export default function UsersProfile() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeTab, setActiveTab] = useState("personal-details");
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [activating, setActivating] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    axios.get(`/api/admin/users/${id}`).then((response) => {
      setUser(response.data.user);
      setIsLoading(false);
    });
  };

  const handleActivation = () => {
    setActivating(true);
    axios
      .post("/api/admin/users/account-status", { userId: id })
      .then((response) => {
        notify(response.data.message, "success");
        getUser();
        setActivating(false);
      })
      .catch((error) => {
        notify(error?.response?.data?.error, "error");
        setActivating(false);
      });
  };
  return (
    <>
      <Box>
        <Helmet>
          <title>EA-Trading - User Profile</title>
        </Helmet>

        <ToastContainer />
        <Stack
          direction={{ xs: "column", sm: "row", md: "row" }}
          justifyContent={{
            xs: "initial",
            sm: "space-between",
            md: "space-between",
          }}
          alignItems={{
            xs: "flex-start",
            sm: "center",
            md: "center",
          }}
        >
          <Box width="100%">
            <Stack
              direction="row"
              spacing="10px"
              alignItems="center"
              onClick={() => navigate(-1)}
            >
              <ArrowBack fontSize="small" color="primary" />
              <Text fs="14px" fw="400" cursor="pointer" color="&$$BAC">
                Back
              </Text>
            </Stack>

            <Stack
              width="100%"
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text fs="20px" fw="700" mt="10px" color="#212121">
                {isLoading
                  ? Array(1)
                      .fill("")
                      .map((_, index) => (
                        <SkeletonLoader h="52px" w="100px" key={index} />
                      ))
                  : `${user?.firstName || ""} ${
                      user?.lastName || "User"
                    }'s profile`}
              </Text>
              <LoadingButton
                loading={activating}
                onClick={handleActivation}
                sx={{ ml: "auto" }}
                variant="contained"
                color={user?.verified ? "warning" : "primary"}
              >
                {user?.verified ? "Deactivate User" : "Activate User"}{" "}
              </LoadingButton>
            </Stack>
          </Box>
        </Stack>

        <Stack
          direction={{
            xs: "column",
            sm: "column",
            md: "row",
          }}
          width="100%"
          spacing="10px"
          justifyContent={{
            xs: "initial",
            sm: "initial",
            md: "space-between",
          }}
          alignItems="flex-start"
          marginTop="30px"
        >
          <Box
            width={{ xs: "100%", sm: "100%", md: "25%" }}
            borderRadius="12px"
            height="400px"
            bgcolor="#fff"
            overflow="hidden"
            position="relative"
          >
            <Box
              height="150px"
              width="150px"
              borderRadius="50%"
              bgcolor="#fff"
              position="absolute"
              left="50%"
              right="50%"
              top="150px"
              padding="10px"
              sx={{ transform: "translate(-50%, -50%)" }}
            >
              <Avatar
                alt="Remy Sharp"
                sx={{ width: "130px", height: "130px" }}
                src={
                  user?.profileImage
                    ? getImageUrl(user?.profileImage)
                    : "/assets/icons/ai-avatar.svg"
                }
              />
            </Box>
            <Box width="100%" bgcolor="#744BAB" height="150px"></Box>
            <Stack
              alignItems="center"
              width="100%"
              bgcolor="#fff"
              height="250px"
            >
              <Stack alignItems="center" marginTop="100px">
                <Text fs="24px" fw="700" color="#212121" cursor="pointer">
                  {isLoading
                    ? Array(1)
                        .fill("")
                        .map((_, index) => (
                          <SkeletonLoader h="52px" w="100%" key={index} />
                        ))
                    : `${user?.firstName || ""} ${user?.lastName || ""}`}
                </Text>
              </Stack>
            </Stack>
          </Box>
          <Box
            width={{ xs: "100%", sm: "100%", md: "73%" }}
            borderRadius="12px"
            minHeight="400px"
            bgcolor="#fff"
            overflow="hidden"
            padding="20px"
          >
            <Box
              overflow={{
                xs: "scroll",
                sm: "scroll",
                md: "initial",
              }}
              className="horizontal-thin-line"
              py="10px"
              width="100%"
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent={{
                  xs: "space-between",
                  sm: "space-between",
                  md: "initial",
                }}
                minWidth="600px"
              >
                {[
                  {
                    name: "Personal Details",
                    slug: "personal-details",
                  },

                  {
                    name: "Document",
                    slug: "document",
                  },
                ].map((item, i) => (
                  <Box
                    key={i}
                    width={{
                      xs: "140px",
                      sm: "140px",
                      md: "25%",
                    }}
                    onClick={() => setActiveTab(item?.slug)}
                  >
                    <Text
                      fs="16px"
                      fw="700"
                      cursor="pointer"
                      lineHeight="100%"
                      color={activeTab === item.slug ? "#744BAB" : "#BDBDBD"}
                    >
                      {item?.name}
                    </Text>
                  </Box>
                ))}
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                borderRadius="8px"
                height="6px"
                justifyContent={{
                  xs: "space-between",
                  sm: "space-between",
                  md: "initial",
                }}
                bgcolor="#e9f2ff"
                marginTop="15px"
                minWidth="600px"
              >
                {[
                  {
                    name: "Personal Details",
                    slug: "personal-details",
                  },

                  {
                    name: "Document",
                    slug: "document",
                  },
                ].map((item, i) => (
                  <Box
                    key={i}
                    height="6px"
                    width={{
                      xs: "140px",
                      sm: "140px",
                      md: "25%",
                    }}
                    borderRadius="8px"
                    bgcolor={activeTab === item.slug ? "#FFB62D" : "#e9f2ff"}
                  ></Box>
                ))}
              </Stack>
            </Box>

            {activeTab === "personal-details" ? (
              isLoading ? (
                Array(6)
                  .fill("")
                  .map((_, index) => (
                    <SkeletonLoader h="52px" w="100%" key={index} />
                  ))
              ) : (
                <PersonalDetails user={user} />
              )
            ) : (
              <Stack
                direction={{
                  xs: "column",
                  sm: "column",
                  md: "row",
                }}
                marginTop="25px"
                overflow="hidden"
                width="100%"
                minHeight="200px"
                borderRadius="16px"
                boxShadow="0px 4px 60px 0px rgba(4, 6, 15, 0.05)"
                p={4}
              >
                <Box display="flex" justifyContent="center">
                  <Text
                    fs="16px"
                    fw="600"
                    color="#000"
                    sx={{ textAlign: "center" }}
                  >
                    {user?.identity?.IDType}
                  </Text>
                </Box>
                <Box
                  component="img"
                  src={
                    user?.identity?.image
                      ? getImageUrl(user?.identity?.image)
                      : ""
                  }
                  width="500px"
                />
              </Stack>
            )}
          </Box>
        </Stack>
      </Box>
    </>
  );
}

function PersonalDetails({ user }) {
  return (
    <>
      <Stack direction="row" alignItems="center" width="100%" marginTop="25px">
        <Box width="50%">
          <Text fs="14px" fw="600" color="#0C0C0C" cursor="pointer">
            First Name
          </Text>
          <Text fs="14px" fw="400" mt="10px" color="#0C0C0C" cursor="pointer">
            {user.firstName}
          </Text>
        </Box>
        <Box width="50%">
          <Text fs="14px" fw="600" color="#0C0C0C" cursor="pointer">
            Last Name
          </Text>
          <Text fs="14px" fw="400" mt="10px" color="#0C0C0C" cursor="pointer">
            {user.lastName}
          </Text>
        </Box>
      </Stack>
      <Stack direction="row" alignItems="center" width="100%" marginTop="25px">
        <Box width="50%">
          <Text fs="14px" fw="600" color="#0C0C0C" cursor="pointer">
            Network
          </Text>
          <Text fs="14px" fw="400" mt="10px" color="#0C0C0C" cursor="pointer">
            {user.wallet?.network}
          </Text>
        </Box>
        <Box width="50%">
          <Text fs="14px" fw="600" color="#0C0C0C" cursor="pointer">
            Email
          </Text>
          <Text fs="14px" fw="400" mt="10px" color="#0C0C0C" cursor="pointer">
            {user.email}
          </Text>
        </Box>
      </Stack>
      <Stack direction="row" alignItems="center" width="100%" marginTop="25px">
        <Box width="50%">
          <Text fs="14px" fw="600" color="#0C0C0C" cursor="pointer">
            Wallet Address
          </Text>
          <Text fs="14px" fw="400" mt="10px" color="#0C0C0C" cursor="pointer">
            {user.wallet?.address}
          </Text>
        </Box>
        <Box width="50%">
          <Text fs="14px" fw="600" color="#0C0C0C" cursor="pointer">
            Subscription Status
          </Text>
          <Box display="flex">
            <CheckCircle
              color={user?.subscribed ? "primary" : "gray"}
              my="auto"
              fontSize="small"
            />
            <Text
              fs="14px"
              fw="400"
              mt="10px"
              color="#0C0C0C"
              cursor="pointer"
              my="auto"
            >
              {user.subscribed ? "Subscribed" : "Not Subscribed"}
            </Text>
          </Box>
        </Box>
      </Stack>
      <Stack direction="row" alignItems="center" width="100%" marginTop="25px">
        <Box width="50%">
          <Text fs="14px" fw="600" color="#0C0C0C" cursor="pointer">
            Subscription Plan
          </Text>
          <Text fs="14px" fw="400" mt="10px" color="#0C0C0C" cursor="pointer">
            {user.bot?.name}
          </Text>
        </Box>
        <Box width="50%">
          <Text fs="14px" fw="600" color="#0C0C0C" cursor="pointer">
            Subscription Amount
          </Text>
          <Text fs="14px" fw="400" mt="10px" color="#0C0C0C" cursor="pointer">
            {`£${user.bot?.amount}`}
          </Text>
        </Box>
      </Stack>
    </>
  );
}

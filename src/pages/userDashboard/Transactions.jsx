import { Button, Container, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";


import { useSelector } from "react-redux";




import SkeletonLoader from "../../components/loader/TableLoader";
import TransactionsTable from "../../components/userDashboard/TransactionsTable";
export default function Transactions() {
  const user = useSelector((state) => state.user);
//   const { getData } = useGeneralHttp();
  const navigate = useNavigate();

  
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [paginationObj, setPaginationObj] = useState({
    next_page_url: "/api/admin/transactions",
    total: "",
  });

  const handleLoadMore = () => {
    if (paginationObj?.next_page_url) {
      setPaginationLoading(true);
    //   getData(
    //     paginationObj?.next_page_url,
    //     setPaginationLoading,
    //     transactions,
    //     setTransactions,
    //     setPaginationObj,
    //     true
    //   );
    }
  };

  const replaceItem = (index, item) => {
    // var theItem = quests[index];
    var copyAll = [...transactions];
    copyAll[index] = item;
    setTransactions(copyAll);
  };
//   useEffect(() => {
//     const userId = user.type === "teacher" ? user?.creator_id : user.id;
//     getData(
//       paginationObj?.next_page_url + "/" + user.type + "/" + userId,
//       setIsLoading,
//       transactions,
//       setTransactions,
//       setPaginationObj
//     );
//   }, []);
  return (
    <Container>
      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Typography variant="h6" color="initial" fontWeight="bold">
          Withdrawals
        </Typography>
        <Button variant="contained" onClick={() => navigate("create")}>
          Request Withdrawal
        </Button>
      </Stack>
      {isLoading ? (
        Array(6)
          .fill("")
          .map((_, index) => <SkeletonLoader h="52px" w="100%" key={index} />)
      ) : (
        <TransactionsTable
          transactions={transactions}
          hasNextPage={paginationObj.next_page_url}
          handleLoadMore={handleLoadMore}
          setTransactions={setTransactions}
          replaceItem={replaceItem}
          paginationLoading={paginationLoading}
        />
      )}
    </Container>
  );
}

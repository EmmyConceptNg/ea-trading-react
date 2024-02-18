import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { Box, IconButton, Stack } from "@mui/material";
import Text from "./utils/Text";

export function RenderPagination({ currentPage, totalPages, setCurrentPage, setLoading }) {
  const handlePageChange = (page) => {
    // if (currentPage < totalPages) {
      setCurrentPage(page);
    // }
  };
  const pages = [];
  for (
    let i = Math.max(1, currentPage - 1);
    i <= Math.min(totalPages, currentPage + 1);
    i++
  ) {
    pages.push(i);
  }
  return (
    <Stack
      direction={{ xs: "column", sm: "row", md: "row" }}
      alignItems={{
        xs: "flex-start",
        sm: "center",
        md: "center",
      }}
      justifyContent="flex-end"
      marginTop="20px"
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing="15px"
        justifyContent="space-between"
        marginTop={{
          xs: "20px",
          sm: "initial",
          md: "initial",
        }}
      >
        <IconButton
          aria-label="next"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          sx={{ color: "#744BAB" }}
        >
          <ArrowLeft />
        </IconButton>
        {pages.map((page) => (
          <Box
            width="31px"
            height="31px"
            borderRadius="50%"
            bgcolor={currentPage === page ? "#744BAB" : "#fff"}
            display="flex"
            alignItems="center"
            justifyContent="center"
            border="1px solid #744BAB"
            sx={{
              cursor: "pointer",
            }}
            key={page}
            onClick={() => handlePageChange(page)}
          >
            <Text
              fs="12px"
              fw="400"
              color={currentPage === page ? "#fff" : "#744BAB"}
            >
              {page}
            </Text>
          </Box>
        ))}

        <IconButton
          aria-label="next"
          disabled={currentPage === totalPages}
          sx={{ color: "#744BAB" }}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <ArrowRight />
        </IconButton>
      </Stack>
    </Stack>
  );
}

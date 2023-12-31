"use client";

import { useProductStore, useCurrentPage } from "@/hooks/usePages";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function NavPages() {
  const productsStore = useProductStore();
  const totalPages = productsStore.getTotalPages();
  const pages = Array.from({ length: totalPages });
  const currentPage = useCurrentPage();

  const handleChangePage = (page) => {
    productsStore.setCurrentPage(parseInt(page));
  };

  return (
    <div className="mt-6">
      {/* <p>Página {currentPage}</p> */}
      <Stack spacing={2}>
        {totalPages && (
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(e, page) => handleChangePage(page)}
            size="large"
            sx={{ display: "flex", justifyContent: "center" }}
          />
        )}
      </Stack>
    </div>
  );
}

export default NavPages;

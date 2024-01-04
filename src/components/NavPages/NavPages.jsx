"use client";

import { useProductStore, useCurrentPage } from "@/hooks/usePages";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./Pagination.css";

function NavPages() {
  const productsStore = useProductStore();
  const totalPages = productsStore.getTotalPages();
  const pages = Array.from({ length: totalPages });
  const currentPage = useCurrentPage();

  const handleChangePage = (page) => {
    productsStore.setCurrentPage(parseInt(page));
  };

  return (
    <div className="pagination-container mt-6 w-full">
      {/* <p>Página {currentPage}</p> */}
      <Stack spacing={2} className="w-full flex items-center justify-center">
        {totalPages && (
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(e, page) => handleChangePage(page)}
            size="large"
            className="pagNav-large visible"
          />
        )}

        {totalPages && (
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(e, page) => handleChangePage(page)}
            className="pagNav-small hidden"
          />
        )}
      </Stack>
    </div>
  );
}

export default NavPages;

'use client'

import { useProductStore,useCurrentPage } from "@/hooks/usePages";


function NavPages(){
    const productsStore = useProductStore();
    const totalPages = productsStore.getTotalPages();
    const pages = Array.from({length:totalPages});
    const currentPage = useCurrentPage();    



    const handleChangePage = (page)=> {
            productsStore.setCurrentPage(parseInt(page));

    }

    return (
        <div>
            {totalPages && pages.map((_,index)=> (
           (<button key={index} name={index+1} onClick={(e) => handleChangePage(e.target.name)}>
           {index+1}
          </button> ))
            )}
            <h1>Actual: {currentPage}</h1>
            </div>
    )

}

export default NavPages;
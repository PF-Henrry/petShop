'use client'

import { useProductStore } from "@/hooks/usePages";


function NavPages(){
    const productsStore = useProductStore();
    const totalPages = productsStore.getTotalPages();
    const pages = Array.from({length:totalPages});
    



    const handleChangePage = (page)=> {
            productsStore.setCurrentPage(page);
    }

    return (
        <div>
            {totalPages && pages.map((_,index)=> (
           (<button key={index} name={index} onClick={(e) => handleChangePage(e.target.name)}>
           {index+1}
          </button> ))
            )}

            </div>
    )

}

export default NavPages;
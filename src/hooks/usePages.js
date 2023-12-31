// En tu estado global (Zustand)
import {create} from 'zustand';
 
export const useProductStore = create((set,get) => ({
  products: [], // Aquí se almacenarían tus datos de productos
  sizeGroup: 9, // Tamaño de grupo por defecto
  currentPage: 1, // Página actual por defecto
  filter:{},


  setFilter : ({category,specie}) => set({filter: {category,specie}}),

  getProductsFilter: async  () => {
    try {

      

      const {filter,setProducts,getArrayPage} = get();
      
      let result = {};

      if(!filter.category && !filter.specie) throw TypeError('no se establecieron filtros');
      
      if(filter.category) result = {...result,category: {...filter.category}}

      if(filter.specie) result = {...result, specie: {...filter.specie}}

      
      if(!result) return false
      const newProducts = await fetch('api/products/filter',{
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body:{
          query:{
            ...result
          }
        }
      });

      const productPush = await newProducts.json();

      if(productPush.ok){
        setProducts(productPush);
       return  getArrayPage();
      }


      
    } catch (error) {
        return error.message
    }

  },

  setProducts: (products) => set({ products }),

  setSizeGroup: (num) => set({ sizeGroup: num }),

  setCurrentPage: (page) => {
    const totalPages = get().getTotalPages();
    if (page <= totalPages && page > 0) {
      set({ currentPage: page });
    }
  },

  
  getArrayPage: () => {
    const { products, sizeGroup, currentPage } = get();
    const currentPageIndex = currentPage - 1;
    const startIndex = currentPageIndex * sizeGroup;
    const endIndex = startIndex + sizeGroup;
    return products.slice(startIndex, endIndex);
  },

  getCurrentPage: () => {
    const { currentPage } = get();
    return currentPage;
  },

  getTotalPages: () => {
    const { products, sizeGroup } = get();
    return Math.ceil(products.length / sizeGroup);
  },

}));
// En tu estado global (Zustand)
import {create} from 'zustand';


export const useProductStore = create(((set,get) => ({
  products: [], // Aquí se almacenarían tus datos de productos
  sizeGroup: 9, // Tamaño de grupo por defecto
  currentPage: 1, // Página actual por defecto
  filter:{
    category:null,
    species:null
  },
  dataId:{
    category:'',
    species:''
  },

  getTotalPages: () => {
    const { products, sizeGroup } = get();
    return Math.ceil(products.length / sizeGroup);
  },

  setFilter : (fill) => set((state) => ({
   filter: {
    ...state.filter,
    [fill.name]: fill.value,
   }
  })),
  getFilter : () => {
    const {filter} = get();
    return filter
  },
  setProducts: (products) => set({ products }),
  getProducts: () => {
    const {products} = get();
    return products
  },

  setSizeGroup: (num) => set({ sizeGroup: num }),

  setCurrentPage: (page) => {
    const totalPages = get().getTotalPages();
    if ((page -1) <= totalPages && (page -1) >= 0) {
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
  

  
  

})));


export const useCurrentPage = () => {
  const currentPage = useProductStore((state) => state.currentPage);
  return currentPage;
};